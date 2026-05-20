d3.csv("data/Ex6_TVdata.csv", function(d) { //brand,model,screenSize,screenTech,energyConsumption,star
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

function drawHistogram(data) {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
          width = 600 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    const barColor = "#69b3a2";
    const bodyBackgroundColor = "#f0f0f0";
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear();
    const y = d3.scaleLinear();

    const binGenerator = d3.bin()
        .value(d => d.EnergyConsumption)
        
    const bins = binGenerator(data); // Generate the bins
    console.log(bins);
    
        //Defining the scales
        const minEng = bins[0].x0;
        const maxEng = bins[bins.length - 1].x1;
        const binMaxLength = d3.max(bins, d => d.length);

        x
            .domain([minEng, maxEng])
            .range([0, width]);

        y
            .domain([0, binMaxLength])
            .range([height, 0])
            .nice();

        // Drawing histogram bars
        svg.selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("x", d => x(d.x0))
            .attr("y", d => y(d.length))
            .attr("width", d => x(d.x1) - x(d.x0))
            .attr("height", d => height - y(d.length))
            .attr("fill", barColor)
            .attr("stroke", bodyBackgroundColor)
            .attr("stroke-width", 2);

        // Adding axes to the histogram
        const bottomAxis = d3.axisBottom(x);

        //Adding x-axis to the bottom of the chart realtive to the inner chart
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        svg.append("text")
            .text("Labelled energy Consumption (kWh/year)")
            .attr("x", width)
            .attr("y", height + 35)
            .attr("text-anchor", "end")
            .attr("class", "axis-label");
        
        //Adding a left axis

        const leftAxis = d3.axisLeft(y);

        //Adding y-axis to the left of the chart realtive to the inner chart
        svg.append("g")
            .call(leftAxis);

        svg.append("text")
            .text("Frequency")
            .attr("x", -margin.left + 10)
            .attr("y", -10)
            .attr("class", "axis-label");

    };

