    const xSize = 500;
    const ySize = 500;
    const margin = 60;
    const xMax = xSize - margin*2;
    const yMax = ySize - margin*2;

    // Creating the SVG

    const svg = d3.select("#line")
        .append("svg")
        .attr("width", xSize)
        .attr("height", ySize)
        
    //Load CSV file

    d3.csv("data/Ex5_ARE_Spot_Prices.csv", function(d) {
        return {
            year: +d.Year,
            average_price: +d["Average Price (notTas-Snowy)"],       
        };
    }).then(data => {
        console.log(data);

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.year)])
        .range([margin, xSize - margin]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.average_price)])
        .range([ySize - margin, margin]);
    
    svg.append("g")
        .attr("transform", `translate(0, ${ySize - margin})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("transform", `translate(${margin}, 0)`)
        .call(d3.axisLeft(y));

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.average_price));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#f61212")
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.append("text")
        .attr("x",xSize / 2)
        .attr("y", ySize - 5)
        .attr("text-anchor", "middle")
        .text("Year");

    svg.append("text")
        .attr("x", -ySize / 2)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Average Price");


}).catch(error => {
    console.error("Error loading the CSV file:", error);
});



