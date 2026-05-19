    const xSize = 500;
    const ySize = 500;
    const margin = 60;
    const xMax = xSize - margin*2;
    const yMax = ySize - margin*2;

    // Creating the SVG

    const Scattersvg = d3.select("#scatter")
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
        .range([margin, xSize - margin]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy_consumption)])
        .range([ySize - margin, margin]);
    
    Scattersvg.append("g")
        .attr("transform", `translate(0, ${ySize - margin})`)
        .call(d3.axisBottom(x));

    Scattersvg.append("g")
        .attr("transform", `translate(${margin}, 0)`)
        .call(d3.axisLeft(y));

    Scattersvg.append("g")
        .selectAll("circle")
        .data(data).enter()
        .append("circle")
        .attr("cx", d => x(d.star_rating))
        .attr("cy", d => y(d.energy_consumption))
        .attr("r", 5)
        .style("fill", "#9932e3");

    Scattersvg.append("text")
        .attr("x",xSize / 2)
        .attr("y", ySize - 5)
        .attr("text-anchor", "middle")
        .text("Star Rating");

    Scattersvg.append("text")
        .attr("x", -ySize / 2)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Energy Consumption");


}).catch(error => {
    console.error("Error loading the CSV file:", error);
});



