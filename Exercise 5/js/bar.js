d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", function(d) {
    return {
        screenTech: d.Screen_Tech,
        meanEnergy: +d["Mean(Labelled energy consumption (kWh/year))"]
    };
}).then(data => {
    console.log(data);

    const width = 1200;
    const height = 600;

    const margin = {top: 20, right: 180, bottom: 50, left: 50};

    const barsvg = d3.select("#bar")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
       
        //Load CSV file
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.meanEnergy)])
        .range([margin.left, width - margin.right]);

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

    barsvg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", margin.left)
        .attr("y", d => y(d.screenTech))
        .attr("width", d => x(d.meanEnergy) - margin.left)
        .attr("height", y.bandwidth())
        .attr("fill", "steelblue");

        // Add axis labels
    barsvg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .text("Mean Energy Consumption (kWh/year)");

    barsvg.append("text")
        .attr("x", -height / 2)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Screen Technology");
});