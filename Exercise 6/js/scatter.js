    /* Insert tooltip for to show the values when the cursor hovers on a bar or plot */
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("padding", "8px")
        .style("border", "1px solid #ccc")
        .style("border-radius", "4px")
        .style("display", "none");


// Exercise 5 Scatter - focus on #scatter
    const xSize = 700;
    const ySize = 500;
    const margin = 80;
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
    

    /* Added mouseover, mousemove, and mouseout events to the circles for interactivity */
    Scattersvg.append("g")
        .selectAll("circle")
        .data(data).enter()
        .append("circle")
        .attr("cx", d => x(d.star_rating))
        .attr("cy", d => y(d.energy_consumption))
        .attr("r", 5)
        .style("fill", "#5c43bf")
        .on("mouseover", function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 10);
            tooltip.style("display", "block")
                .html(`<strong>Star Rating:</strong> ${d3.format(".1f")(d.star_rating)}<br><strong>Energy:</strong> ${d3.format(".1f")(d.energy_consumption)} kWh/year`);
        })
        .on("mousemove", function(event) {
            tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function() {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 5);
            tooltip.style("display", "none");
        });
    
    /* Added axes and labels for the scatter plot */
    Scattersvg.append("g")
        .attr("transform", `translate(0, ${ySize - margin})`)
        .call(d3.axisBottom(x));

    Scattersvg.append("g")
        .attr("transform", `translate(${margin}, 0)`)
        .call(d3.axisLeft(y));

    
    Scattersvg.append("text")
        .attr("x",xSize / 2)
        .attr("y", ySize - 5)
        .attr("text-anchor", "middle")
        .text("Star Rating");

    /* Added y-axis label for energy consumption */
    Scattersvg.append("text")
        .attr("x", -ySize / 2)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Energy Consumption");

    Scattersvg.append("text")
        .attr("x", xSize / 2 )
        .attr("y", 30)  
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .text("Energy consumed by star rating")   

}).catch(error => {
    console.error("Error loading the CSV file:", error);
});


//************************************************//
 /*Exercise 6 Scatter - targets #ex6-scatter*/ 
 //************************************************//

    const xSize6 = 800;
    const ySize6 = 500;
    const margin6 = 60;
    const xMax6 = xSize6 - margin6*2;
    const yMax6 = ySize6 - margin6*2;

    // Creating the SVG

    const scatter6svg = d3.select("#ex6-scatter")
        .append("svg")
        .attr("width", xSize6)
        .attr("height", ySize6)
        
    //Load CSV file

    d3.csv("data/Ex6_TVdata.csv", function(d) {
        return {
            star_rating: +d.star,
            Energy_consumption: +d.energyConsumption,    
            Screentech: d.screenTech   
        };
    }).then(data => {
        console.log(data);

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.star_rating)])
        .range([margin6, xSize6 - margin6]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Energy_consumption)])
        .range([ySize6 - margin6, margin6]);

    const colorScale = d3.scaleOrdinal()
        .domain(["LCD", "LED", "OLED"])
        .range(["#f5a623", "#4682b4", "#7ed321"])

    /* Added mouseover, mousemove, and mouseout events to the circles for interactivity */
    scatter6svg.append("g")
        .selectAll("circle")
        .data(data).enter()
        .append("circle")
        .attr("cx", d => x(d.star_rating))
        .attr("cy", d => y(d.Energy_consumption))
        .attr("r", 5)
        .style("fill", d => colorScale(d.Screentech))
        .on("mouseover", function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 10);
            tooltip.style("display", "block")
                .html(`<strong>ScreenTech:</strong> ${d.Screentech}<br>
                    <strong>Star Rating: </strong> ${d.star_rating}<br>
                    <strong>Energy:</strong> ${d.Energy_consumption} kWh/year`);
        })
        .on("mousemove", function(event) {
            tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function() {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 5);
            tooltip.style("display", "none");
        });
    
    /* Added axes and labels for the scatter plot */
    scatter6svg.append("g")
        .attr("transform", `translate(0, ${ySize6 - margin6})`)
        .call(d3.axisBottom(x));

    scatter6svg.append("g")
        .attr("transform", `translate(${margin6}, 0)`)
        .call(d3.axisLeft(y).tickFormat(d3.format("d")));

    scatter6svg.append("text")
        .attr("x",xSize6 / 2)
        .attr("y", ySize6 - 5)
        .attr("text-anchor", "middle")
        .text("Star Rating");

    /* Added y-axis label for energy consumption */
    scatter6svg.append("text")
        .attr("x", -ySize6 / 2)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Energy Consumption");

    scatter6svg.append("text")
        .attr("x", xSize6 / 2 )
        .attr("y", 30)  
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .text("Screen type based on star rating");
    
    const scatterColors = ["#f5a623", "#4682b4", "#7ed321"];
    const scatterLabels = ["LCD", "LED", "OLED"];

    const scatterLegend = scatter6svg.append("g")
        .attr("transform", `translate(${xSize6 - margin6 - 10}, ${margin6 + 50})`);

    scatterLabels.forEach((label, i) => {
        scatterLegend.append("rect")
            .attr("x", 0)
            .attr("y", i * 25)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", scatterColors[i]);

        scatterLegend.append("text")
            .attr("x", 20)
            .attr("y", i * 25 + 12)
            .text(label)
            .attr("fill", "black")
            .attr("font-size", "14px")
    });

}).catch(error => {
    console.error("Error loading the CSV file:", error);
});



