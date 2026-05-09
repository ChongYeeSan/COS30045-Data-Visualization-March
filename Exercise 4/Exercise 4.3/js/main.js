
    const width = 500;
    const height = 500;

    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    //Draw a rectangle using the rect element
    svg.append("rect")
        .attr("x", 50)
        .attr("y", 50)
        .attr("width", 100)
        .attr("height", 100)
        .attr("fill", "purple");
    //Draw a circle using the circle element
    svg.append("circle")
        .attr("cx", 300)
        .attr("cy", 300)
        .attr("r", 50)
        .attr("fill", "orange");
    //Draw a line using the line element
    svg.append("line")
        .attr("x1", 50)
        .attr("y1", 300)
        .attr("x2", 200)
        .attr("y2", 400)
        .attr("stroke", "crimson")
        .attr("stroke-width", 2);
    //Draw a triangle using the polygon element
    svg.append("polygon")
        .attr("points", "300,50 350,150 250,150")
        .attr("fill", "green");
    //Apply styling to the text elements
    d3.select("h2").style("color", "yellow");
    d3.select("p").style("color", "navy");
