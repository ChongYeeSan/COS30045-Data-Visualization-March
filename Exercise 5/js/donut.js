d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv", function(d) {
    return {
        screentech: d.Screen_Tech,
        meanEnergy: +d["Mean(Labelled energy consumption (kWh/year))"]
    };
}).then(data => {
    console.log(data);

    const width = 700;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const margin = {top: 20, right: 180, bottom: 50, left: 50};

    // Create SVG for donut chart
    const donutsvg = d3.select("#donut")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);
   

    // Group container
    const donutContainer = donutsvg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

        // Color scale
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.screentech))
        .range(d3.schemeCategory10);
    
    // Pie generator
    const pieGenerator = d3.pie()
        .value(d => d.meanEnergy)
        .sort(null);

    // Generate pie data
    const pieData = pieGenerator(data);

    // Arc generator
    const arcGenerator = d3.arc()
        .startAngle(d => d.startAngle)
        .endAngle(d => d.endAngle)
        .innerRadius(80) 
        .outerRadius(radius - 20)
        .padAngle(0.05)
        .cornerRadius(3);

    // Creating groups for each arc
    const grpArc = donutContainer
        .selectAll(".arc")
        .data(pieData)
        .join("g")
        .attr("class", "arc");

    // Draw arcs
    grpArc.append("path")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.screentech))
        .attr("stroke", "white")
        .attr("stroke-width", "2px");

    // Add labels
    grpArc.append("text")
        .text(d => { 
            d.percentage = (d.endAngle - d.startAngle) / (2 * Math.PI);
            return d3.format(".0%")(d.percentage);
        })

        .attr("x", d => arcGenerator.centroid(d)[0])
        .attr("y", d => arcGenerator.centroid(d)[1])
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .attr("dominant-baseline", "middle");

    // Center Title
    donutsvg.append("text")
        .attr("x", width / 2)
        .attr("y", 15)  
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .text("Mean Energy Consumption by Screen Technology");
    });