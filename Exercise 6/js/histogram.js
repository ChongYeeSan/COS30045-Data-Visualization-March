d3.csv("data/Ex6_TVdata.csv", function(d) { 
    return {
        Brand: d.brand,
        Model: d.model,
        ScreenSize: +d.screenSize,
        ScreenTech: d.screenTech,
        EnergyConsumption: +d.energyConsumption,
        Star: +d.star
    };
}).then(data => {
    console.log(data);

    drawHistogram(data);
    populateFilters(data);

}).catch(error => {
    console.error("Error loading the data: ", error);
});

// creates a SVG canvas and positions the inner chart area
const drawHistogram = (data) => {

    const Histwidth = 900;
    const Histheight = 500;
    const Histmargin = {top: 40, right: 30, bottom:60, left:70};
    const innerWidth = Histwidth - Histmargin.left - Histmargin.right;
    const innerHeight = Histheight - Histmargin.top - Histmargin.bottom;

    const bins = binGenerator(data);
    console.log(bins);

    const svg = d3.select("#ex6-histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${Histwidth} ${Histheight}`);

        // uses margin values so it doesn't get cut off
        const innerChart = svg.append("g")
        .attr("transform", `translate(${Histmargin.left}, ${Histmargin.top})`);
    
        //Defining the scales
        const minEng = bins[0].x0;
        const maxEng = bins[bins.length - 1].x1;
        const binMaxLength = d3.max(bins, d => d.length);

        xHscale
            .domain([minEng, maxEng])
            .range([0, innerWidth]);

        yHscale
            .domain([0, binMaxLength])
            .range([innerHeight, 0])
            .nice();

        // Drawing histogram bars
        innerChart.append("g")
            .selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("x", d => xHscale(d.x0))
            .attr("y", d => yHscale(d.length))
            .attr("width", d => xHscale(d.x1) - xHscale(d.x0))
            .attr("height", d => innerHeight - yHscale(d.length))
            .attr("fill", barColor)
            .attr("stroke", bodyBackgroundColor)
            .attr("stroke-width", 2);

        // converting the x and y axis to integer number
        innerChart.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xHscale).tickFormat(d3.format("d")));
        
        innerChart.append("g")
            .call(d3.axisLeft(yHscale).tickFormat(d3.format("d")));
            

        svg.append("text")
            .text("Labelled energy Consumption (kWh/year)")
            .attr("x", Histmargin.left + innerWidth / 2)
            .attr("y", Histmargin.top + innerHeight + 35)
            .attr("text-anchor", "middle")
            .attr("class", "axis-label");
    

        //Adding y-axis to the left of the chart realtive to the inner chart
        svg.append("text")
            .text("Frequency")
            .attr("transform", "rotate(-90)")
            .attr("x", (-Histmargin.top - innerHeight / 2))
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .attr("class", "axis-label");
        
        svg.append("text")
            .attr("x", Histwidth / 2 )
            .attr("y", 30)  
            .attr("text-anchor", "middle")
            .attr("font-size", "16px")
            .attr("font-weight", "bold")
            .text("Energy Consumption of different TV screen types and sizes")

    };



