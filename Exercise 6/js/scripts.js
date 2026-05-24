// hides the rest of the page and shows Home
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

function showChart(chartId) {
    document.querySelectorAll('.chart-container').forEach(container => {
        container.style.display = 'none';
    });
    document.getElementById(chartId).style.display = 'block';
}

showChart('scatter'); // Show the scatter plot by default

// Loads CSV file
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

const margin1 = {top:20, right: 150, bottom: 50, left: 100};

const width = 800;
const height = 400;

const svg = d3.select("#chart1")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`);

const myData = [
    {Screen_Tech: "LCD(LED)", avgPower: 73.40},
    {Screen_Tech: "OLED", avgPower: 86.94},
    {Screen_Tech: "LCD", avgPower: 96.45}
];

const xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([margin1.left, width - margin1.right]);

const yScale = d3.scaleBand()
    .domain(myData.map(d => d.Screen_Tech))
    .range([margin1.top, height - margin1.bottom])
    .padding(0.3);

const colors1 = ["pink", "orange", "green", "red"];


// fill the bar with the colors from colors1
svg.selectAll("rect")
    .data(myData)
    .join("rect")
    .attr("x", margin1.left)
    .attr("y", d => yScale(d.Screen_Tech))
    .attr("width", d => xScale(d.avgPower) - margin1.left)
    .attr("height", yScale.bandwidth())
    .attr("fill", (d, i) => colors1[i]);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height - margin1.bottom})`)
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin1.left}, 0)`)
    .call(d3.axisLeft(yScale));

svg.selectAll("label")
    .data(myData)
    .join("text")
    .attr("class", "label")
    .attr("x", d =>xScale(d.avgPower) + 5)
    .attr("y", d => yScale(d.Screen_Tech) + yScale.bandwidth() / 2 + 5)
    .text(d => d.avgPower + " kWh/year")
    .attr("font-size", "16px");

const legend1 = svg.append("g")
    .attr("transform", `translate(${width - margin1.right + 20}, ${margin1.top})`);

myData.forEach((d, i) => {
    legend1.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("y", i * 30)
        .attr("fill", colors1[i]);

    legend1.append("text")
        .attr("x", 30)
        .attr("y", i * 30 + 15)
        .text(d.Screen_Tech)
        .attr("font-size", "14px");
});


// Chart 2 - Brands with the most models

const margin2 = {top:20, right: 150, bottom: 50, left: 100}

const width2 = 800;
const height2 = 400;

const svg2 = d3.select("#chart2")
    .append("svg")
    .attr("width", width2)
    .attr("height", height2)
    .attr("viewBox", `0 0 ${width2} ${height2}`);

// calls the data to display the 4 highest models
const myData2 = [
    {brand: "Samsung Electronics", modelCount: 731},
    {brand: "LG", modelCount: 683},
    {brand: "Kogan", modelCount: 416},
    {brand: "Hisense", modelCount: 323},
]

const xScale1 = d3.scaleBand()
    .domain(myData2.map(d => d.brand))
    .range([margin2.left, width2 - margin2.right])
    .padding(0.3);

const yScale2 = d3.scaleLinear()
    .domain([0, 800])
    .range([height2 - margin2.bottom, margin2.top]);


const colors2 = ["steelblue", "orange", "green", "purple"];

svg2.selectAll("rect")
    .data(myData2)
    .join("rect")
    .attr("x", d => xScale1(d.brand))
    .attr("y", d => yScale2(d.modelCount))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => height2 - margin2.bottom - yScale2(d.modelCount))
    .attr("fill", (d, i) => colors2[i]);

svg2.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height2 - margin2.bottom})`)
    .call(d3.axisBottom(xScale1));

svg2.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin2.left}, 0)`)
    .call(d3.axisLeft(yScale2));

svg2.selectAll(".bar-label")
    .data(myData2)
    .join("text")
    .attr("x", d =>xScale1(d.brand) + xScale1.bandwidth() / 2)
    .attr("y", d => yScale2(d.modelCount) - 5)
    .attr("text-anchor", "middle")
    .text(d => d.modelCount)
    .attr("font-size", "20px");

const legend = svg2.append("g")
    .attr("transform", `translate(${width2 - margin2.right - 20}, ${margin2.top})`);

myData2.forEach((d, i) => {
    legend.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("y", i * 30)
        .attr("fill", colors2[i]);

    legend.append("text")
        .attr("x", 30)
        .attr("y", i * 30 + 15)
        .text(d.brand)
        .attr("font-size", "14px");
});

// Exercise 4.3

const width43 = 1200;
const height43 = 600;

const svg43 = d3.select("#ex43-container")
    .append("svg")
    .attr("viewBox", `0 0 ${width43} ${height43}`)

// Left side shapes
svg43.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 80)
    .attr("height", 80)
    .attr("fill", "#2c7be5")
    .attr("rx", 5);

svg43.append("circle")
    .attr("cx", 50)
    .attr("cy", 150)
    .attr("r", 40)
    .attr("fill", "#f5a623");

svg43.append("polygon")
    .attr("points", "50,220 10,290 90,290")
    .attr("fill", "#7ed321");

// Right side shapes
svg43.append("rect")
    .attr("x", 1110)
    .attr("y", 10)
    .attr("width", 80)
    .attr("height", 80)
    .attr("fill", "#2c7be5")
    .attr("rx", 5);

svg43.append("circle")
    .attr("cx", 1150)
    .attr("cy", 150)
    .attr("r", 40)
    .attr("fill", "#f5a623");

svg43.append("polygon")
    .attr("points", "1150,220 1110,290 1190,290")
    .attr("fill", "#7ed321");

//Exercise 4.5

const myData45 = [
    {Screen_Tech: "LCD", avgPower: 96.45},
    {Screen_Tech: "OLED", avgPower: 86.94},
    {Screen_Tech: "LCD(LED)", avgPower: 73.40}
];

const height45 = 40;
const spacing45 = 10;

const svg45 = d3.select("#ex45-container")
    .append("svg")
    .attr("width", "100%")
    .attr("height", 200);

/* Adding the unscaled bars horisontally */
svg45.selectAll("rect")
    .data(myData45)
    .join("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * (height45 + spacing45))
    .attr("width", d => d.avgPower * 5)
    .attr("height", height45)
    .attr("fill", "#725dbd");

// Adds labels beside the chart    
svg45.selectAll("text") 
    .data(myData45)
    .join("text")
    .attr("x", d => d.avgPower * 5 + 5)
    .attr("y", (d, i) => i * (height45 + spacing45) + height45 / 2 + 5)
    .text(d => `${d.Screen_Tech}: ${d.avgPower}`)
    .attr("font-size", 16);


