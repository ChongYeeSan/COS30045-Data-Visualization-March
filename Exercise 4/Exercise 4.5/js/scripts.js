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

const barHeight = 60;
const spacing = 20;

svg.selectAll("rect")
    .data(myData)
    .join("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * (barHeight + spacing))
    .attr("width", d => d.avgPower * 10)
    .attr("height", barHeight)
    .attr("fill", "steelblue");

svg.selectAll("text")
    .data(myData)
    .join("text")
    .attr("x", d => d.avgPower * 10 + 10)
    .attr("y", (d, i) => i * (barHeight + spacing) + barHeight / 2 + 5)
    .text(d => `${d.Screen_Tech}: ${d.avgPower} kWh/year`)  
    .attr("fill", "black")
    .attr("font-size", "16")

// Chart 2 - Brands with the most models

const svg2 = d3.select("#chart2")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

const myData2 = [
    {brand: "Samsung Electronics", modelCount: 731},
    {brand: "LG", modelCount: 683},
    {brand: "Kogan", modelCount: 416},
    {brand: "Hisense", modelCount: 323},
];


svg2.selectAll("rect")
    .data(myData2)
    .join("rect")
    .attr("x", (d, i) => i * (barHeight + spacing))
    .attr("y", d => height - d.modelCount)
    .attr("width", barHeight)
    .attr("height", d => d.modelCount * 1.5)
    .attr("fill", "steelblue");

svg2.selectAll("text") 
    .data(myData2)
    .join("text")
    .attr("x", d, i => d.modelCount * 1.5 + 10)
    .attr("y",(d,i)=> i *(barHeight + spacing) + barHeight / 2 + 5)
    .text(d => `${d.brand}: ${d.modelCount}`)
    .attr("fill", "black")
    .attr("font-size", 16);