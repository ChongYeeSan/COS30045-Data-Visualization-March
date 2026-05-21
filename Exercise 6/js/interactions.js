const populateFilters = (data) => {
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.id === "All" ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            if(!d.isActive) {
                filters_screen.forEach(filter => {
                    filter.isActive = filter.id === d.id;
                });
                
                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.id === d.id);

                updateHistogram(d.id, data);
            }
        });

    const updateHistogram = (filterId, data) => {
        const updateData = filterId === "All"
            ? data
            : data.filter(tv => tv.ScreenTech === filterId);
        
        const updateBins = binGenerator(updateData);
        
        d3.selectAll("#histogram rect")
            .data(updateBins)
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yHscale(d.length))
            .attr("height", d => innerHeight - yHscale(d.length));
    };
};