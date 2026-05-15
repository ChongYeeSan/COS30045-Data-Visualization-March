function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    document.getElementById(pageId).style.display = 'block';

    document.querySelectorAll('.nav-links li').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById("link-" + pageId).classList.add('active');
}

showPage('home');

d3.csv("data/Energy_consumption_for_televion_in_Australia.csv", function(d) {
    return {
        brand: d.Brand_Reg,
        screentech: d.Screen_Tech,
        energyConsumption: +d["Labelled energy consumption (kWh/year)"]
    };
}).then(function(data) {
    console.log(data);
    console.log("Total records:", data.length);
    console.log("Max energy consumption:", d3.max(data, d => d.energyConsumption));
    console.log("Min energy consumption:", d3.min(data, d => d.energyConsumption));
});

// Data Story 1 

const width = 1200;
const height = 600;

const svg = d3.select("#chart1")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

const myData = [
    {Screen_Tech: "LCD(LED)", avgPower: 73.40},
    {Screen_Tech: "OLED", avgPower: 86.94},
    {Screen_Tech: "LCD", avgPower: 96.45}
];

const margin1 = {top: 20, right: 40, bottom: 50, left: 120};

const xScale = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.avgPower)])
    .range([margin1.left, width - margin1.right])
    
const yScale = d3.scaleBand()
    .domain(myData.map(d => d.Screen_Tech))
    .range([margin1.top, height - margin1.bottom])
    .padding(0.3);

svg.selectAll("rect")
    .data(myData)
    .join("rect")
    .attr("x", margin1.left)
    .attr("y", d => yScale(d.Screen_Tech))
    .attr("width", d => xScale(d.avgPower) - margin1.left)
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");

svg.append("g")
    .attr("transform", `translate(0, ${height - margin1.bottom})`)
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("transform", `translate(${margin1.left}, 0)`)
    .call(d3.axisLeft(yScale));

svg.selectAll("label")
    .data(myData)
    .join("text")
    .attr("class", "label")
    .attr("x", d =>xScale(d.avgPower) + 5)
    .attr("y", d => yScale(d.Screen_Tech) + yScale.bandwidth() / 2 + 5)
    .text(d => d.avgPower + "kWh/year")
    .attr("font-size", "14px");


// Chart 2 - Brands with the most models

const margin2 = {top:20, right: 20, bottom: 50, left: 60};

const svg2 = d3.select("#chart2")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

const myData2 = [
    {brand: "Samsung Electronics", modelCount: 731},
    {brand: "LG", modelCount: 683},
    {brand: "Kogan", modelCount: 416},
    {brand: "Hisense", modelCount: 323},
]

const xScale1 = d3.scaleBand()
    .domain(myData2.map(d => d.brand))
    .range([margin2.left, width - margin2.right])
    .padding(0.3);

const yScale2 = d3.scaleLinear()
    .domain([0, d3.max(myData2, d => d.modelCount)])
    .range([height - margin2.bottom, margin2.top]);

svg2.selectAll("rect")
    .data(myData2)
    .join("rect")
    .attr("x", d => xScale1(d.brand))
    .attr("y", d => yScale2(d.modelCount))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => height - margin2.bottom - yScale2(d.modelCount))
    .attr("fill", "steelblue");

svg2.append("g")
    .attr("transform", `translate(0, ${height - margin2.bottom})`)
    .call(d3.axisBottom(xScale1));

svg2.append("g")
    .attr("transform", `translate(${margin2.left}, 0)`)
    .call(d3.axisLeft(yScale2));

svg2.selectAll(".bar-label")
    .data(myData2)
    .join("text")
    .attr("x", d =>xScale1(d.brand) + 5)
    .attr("y", d => yScale2(d.modelCount) - 5)
    .text(d => d.modelCount)
    .attr("font-size", "14px");

