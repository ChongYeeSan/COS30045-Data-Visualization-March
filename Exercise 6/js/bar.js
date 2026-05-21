// Load CSV file
d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", function(d) {
    return {
        screenTech: d.Screen_Tech,
        meanEnergy: +d["Mean(Labelled energy consumption (kWh/year))"]
    };
}).then(data => {
    console.log(data);

    // Append the width and height 
    const width = 850;
    const height = 500;

    const margin = {top: 40, right: 80, bottom: 60, left: 120};

    const barsvg = d3.select("#bar")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
       
        // x axis to show labelled energy consumption
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.meanEnergy)])
        .range([margin.left, width - margin.right]);
    
        // y axis to show screen types
    const y = d3.scaleBand()
        .domain(data.map(d => d.screenTech))
        .range([margin.top, height - margin.bottom])
        .padding(0.3);

    barsvg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    barsvg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y));  

    // Add axis labels
    barsvg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    barsvg.append("text")
        .attr("x", -height / 2)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Screen Technology");

    barsvg.append("text")
        .attr("x", width / 2 )
        .attr("y", 30)  
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .text("Energy consumption based on screen types")   

    // added colors for each bar
    const barColors = ["#53a956", "#6666ff", "#fd6ab1"];

    // make the legend appear on the right side
    const barLegend = barsvg.append("g")
        .attr("transform", `translate(${width - margin.right - 50}, ${margin.top})`);

    data.forEach((d,i) => {
        barLegend.append("rect")
            .attr("x", 0)
            .attr("y", i * 25)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", barColors[i]);
    
        barLegend.append("text")
            .attr("x", 20)
            .attr("y", i * 25 + 12)
            .text(d.screenTech)
            .attr("fill", "black")
            .attr("font-size", "14px");

    });

    const tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "8px")
        .style("border-radius", "4px")
        .style("font-size", "12px")
        .style("display", "none");

    /* Added mouseover, mousemove, and mouseout events to the circles for interactivity */
    barsvg.append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", margin.left)
        .attr("y", d => y(d.screenTech))
        .attr("width", d => x(d.meanEnergy) - margin.left)
        .attr("height", y.bandwidth())
        .attr("fill", (d, i) => barColors[i])
        .on("mouseover", function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("opacity", 0.7);
            tooltip.style("display", "block")
                .html(`<strong>${d.screenTech}</strong><br>${d3.format(".1f")(d.meanEnergy)} kWh/year`);
        })
        .on("mousemove", function(event) {
            tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function() {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("opacity", 1);
            tooltip.style("display", "none");
        });
});
