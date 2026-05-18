<script src="//d3js.org/d3.v3.min.js"></script>
    const xSize = 500;
    const ySize = 500;
    const margin = 40;
    const xMax = xSize - margin*2;
    const yMax = ySize - margin*2;

    // Creating the SVG

    const svg = d3.select("body")
        .append("svg")
        .attr("width", xSize)
        .attr("height", ySize)
        
    //Load CSV file

    d3.csv("data/Ex5_TV_energy.csv", function(d) {
        return {
            star_rating: +d.star2,
            energy_consumption: +d.energy_consumpt,       
        };
    }).then(data => {
        console.log(data);

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.star_rating)])
        .range([margin, xMax]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy_consumption)])
        .range([yMax, 0]);

    svg.append("g")
        .selectAll("dot")
        .data(data).enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.star_rating) })
        .attr("cy", function(d) { return y(d.energy_consumption) })
        .attr("r", 5)
        .style("fill", "#f61212");


}).catch(error => {
    console.error("Error loading the CSV file:", error);
});



