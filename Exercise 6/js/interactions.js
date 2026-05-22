// Defines function that buildsvand manages you chart filter buttons
const populateFilters = (data) => { // 
    d3.select("#ex6-filters")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.id === "All" ? "active" : ""}`)
        .text(d => d.label) // sets visible button to match labels in data, example "OLED", "LED"
        .on("click", (e, d) => {
            if(!d.isActive) { // active if user clicks on button
                filters_screen.forEach(filter => {
                    filter.isActive = filter.id === d.id;
                });
                
                d3.selectAll("#ex6-filters .filter")
                    .classed("active", filter => filter.id === d.id);

                    // calls the helper function below to fiter data and redraw the graph
                updateHistogram(d.id, data);
            }
        });


    const updateHistogram = (filterId, data) => {
        const updateData = filterId === "All"
            ? data
            : data.filter(tv => tv.ScreenTech === filterId);
        
        // pass the latest data into a bin genarator to regroup histogram
        const updateBins = binGenerator(updateData);

        // latest y axis range based on newest data and rounds the numbers cleanly
        yHscale.domain([0, d3.max(updateBins, d => d.length)]).nice();
        
        d3.select("#ex6-histogram svg g")
            .selectAll("rect")
            .data(updateBins)
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yHscale(d.length))
            .attr("height", d => innerHeight - yHscale(d.length));
    };
};