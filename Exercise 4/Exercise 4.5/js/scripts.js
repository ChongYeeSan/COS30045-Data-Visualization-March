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

const width1 = 1200;
const height1 = 600;

const margin1 = {top: 20, right: 20, bottom: 50, left: 60};

const innerWidth1 = width1 - margin1.left - margin1.right;
const innerHeight1 = height1 - margin1.top - margin1.bottom;

const svg = d3.select("#chart1")
    .append("svg")
    .attr("viewBox", `0 0 ${width1} ${height1}`);

const g1 = svg.append("g")
    .attr("transform", `translate(${margin1.left}, ${margin1.top})`);


const myData = [
    {Screen_Tech: "LCD", avgPower: 96.45},
    {Screen_Tech: "OLED", avgPower: 86.94},
    {Screen_Tech: "LCD(LED)", avgPower: 73.40}
    
    
];

const xBar = d3.scaleBand() // X axis values
    .domain(myData.map(d => d.Screen_Tech))
    .range([0, innerWidth1])
    .padding(0.2);

const yBar = d3.scaleLinear() // Y axis values
    .domain([0, d3.max(myData, d => d.avgPower)])
    .nice()
    .range([innerHeight1, 0]);

// Displays the bar 
g1.selectAll("rect")
    .data(myData)
    .join("rect")
    .attr("x", d => xBar(d.Screen_Tech))
    .attr("y", d => yBar(d.avgPower))
    .attr("width", xBar.bandwidth())
    .attr("height", d => innerHeight1 - yBar(d.avgPower))
    .attr("fill", "steelblue");

// Adds labels beside the chart    
g1.selectAll("text") 
    .data(myData)
    .join("text")
    .attr("x", d => xBar(d.Screen_Tech) + xBar.bandwidth() / 2)
    .attr("y", d => yBar(d.avgPower) - 5)
    .attr("text-anchor", "middle")
    .text(d => `${d.Screen_Tech}: ${d.avgPower}`)
    .attr("fill", "black")
    .attr("font-size", 16);

// Chart 2 - Brands with the most models

const margin2 = {top: 20, right: 20, bottom: 50, left: 60};

const width2 = 1200;
const height2 = 600;

const innerWidth2 = width2 - margin2.left - margin2.right;
const innerHeight2 = height2 - margin2.top - margin2.bottom;

const svg2 = d3.select("#chart2")
    .append("svg")
    .attr("viewBox", `0 0 ${width2} ${height2}`);

const g2 = svg2.append("g")
    .attr("transform", `translate(${margin2.left}, ${margin2.top})`);

const myData2 = [
    {brand: "Samsung Electronics", modelCount: 731},
    {brand: "LG", modelCount: 683},
    {brand: "Kogan", modelCount: 416},
    {brand: "Hisense", modelCount: 323},
];

const xBar2 = d3.scaleBand() // X axis values
    .domain(myData2.map(d => d.brand))
    .range([0, innerWidth2])
    .padding(0.2);

const yBar2 = d3.scaleLinear() // Y axis values
    .domain([0, d3.max(myData2, d => d.modelCount)])
    .nice()
    .range([innerHeight2, 0]);

// Displays the bar 
g2.selectAll(".bar")
    .data(myData2)
    .join("rect")
    .attr("x", d => xBar2(d.brand))
    .attr("y", d => yBar2(d.modelCount))
    .attr("width", xBar2.bandwidth())
    .attr("height", d => innerHeight2 - yBar2(d.modelCount))
    .attr("fill", "steelblue");

// Adds labels beside the chart    
g2.selectAll("text") 
    .data(myData2)
    .join("text")
    .attr("x", d => xBar2(d.brand) + xBar2.bandwidth() / 2)
    .attr("y", d => yBar2(d.modelCount) - 5)
    .attr("text-anchor", "middle")
    .text(d => `${d.brand}: ${d.modelCount}`)
    .attr("fill", "black")
    .attr("font-size", 16);