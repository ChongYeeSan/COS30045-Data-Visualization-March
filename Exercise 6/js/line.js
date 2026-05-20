    const xLSize = 850;
    const yLSize = 500;
    const Lmargin = 60;
    const legendWidth = 160;
    const xLMax = xLSize - Lmargin*2;
    const yLMax = yLSize - Lmargin*2;

    // Creating the SVG

    const Linesvg = d3.select("#line")
        .append("svg")
        .attr("viewBox", `0 0 ${xLSize} ${yLSize}`)
        .attr("width", "100%")
        .attr("height", "auto");

    //Load CSV file

    d3.csv("data/Ex5_ARE_Spot_Prices.csv", function(d) {
        return {
            year: +d.Year,
            queensland: +d["Queensland ($ per megawatt hour)"],
            newSouthWales: +d["New South Wales ($ per megawatt hour)"],
            victoria: +d["Victoria ($ per megawatt hour)"],
            southAustralia: +d["South Australia ($ per megawatt hour)"],
            tasmania: +d["Tasmania ($ per megawatt hour)"],
            snowy: +d["Snowy ($ per megawatt hour)"],      
        };
    }).then(data => {
        console.log(data);

        //Array of states
        const states = [
            { name: "Queensland", key: "queensland", color: "#fc7676" },
            { name: "New South Wales", key: "newSouthWales", color: "#b912f6" },
            { name: "Victoria", key: "victoria", color: "#f6a212" },
            { name: "South Australia", key: "southAustralia", color: "#7b4817" },
            { name: "Tasmania", key: "tasmania", color: "#1212f6" },
            { name: "Snowy", key: "snowy", color: "#fa3c88" }
        ];

    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([Lmargin, xLSize - legendWidth - 20]);

    const maxY = d3.max(data, d => d3.max(states, s => d[s.key]));

    const y = d3.scaleLinear()
        .domain([0, maxY])
        .range([yLSize - Lmargin, Lmargin]);
    
    Linesvg.append("g")
        .attr("transform", `translate(0, ${yLSize - Lmargin})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    Linesvg.append("g")
        .attr("transform", `translate(${Lmargin}, 0)`)
        .call(d3.axisLeft(y));

    /* Shows a line for each state using the line generator and the corresponding colors from the states array */
    states.forEach(state => {
        const line = d3.line()
            .x(d => x(d.year))
            .y(d => y(d[state.key]));

    Linesvg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", state.color)
        .attr("stroke-width", 2)
        .attr("d", line);
    });

    Linesvg.append("text")
        .attr("x",xLSize / 2)
        .attr("y", yLSize - 5)
        .attr("text-anchor", "middle")
        .text("Year");

    Linesvg.append("text")
        .attr("x", -yLSize / 2)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Average Price");

const lineLegend = Linesvg.append("g")
    .attr("transform", `translate(${xLSize - legendWidth + 10}, ${Lmargin})`);

/* Insert tooltip for interactivity */
const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("background", "white")
    .style("border", "1px solid #ccc")
    .style("padding", "8px")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("display", "none");
    
states.forEach((state, i) => {
    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d[state.key]));

    /* Added mouseover, mousemove, and mouseout events to the lines for interactivity */
    Linesvg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", state.color)
        .attr("stroke-width", 2)
        .attr("d", line)
        .on("mouseover", function(event, d) {
            d3.select(this).attr("stroke-width", 4);
            tooltip.style("display", "block")
                .html(`<strong>${state.name}</strong>`);
        })
        .on("mousemove", function(event) {
            tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function() {
            d3.select(this).transition().duration(200).attr("stroke-width", 2);
            tooltip.style("display", "none");
        });

    /* Added legend with colored lines and labels for each state */
    lineLegend.append("line")
        .attr("x1", 0)
        .attr("x2", 20)
        .attr("y1", i * 25 + 8)
        .attr("y2", i * 25 + 8)
        .attr("stroke", state.color)
        .attr("stroke-width", 2);

    lineLegend.append("text")
        .attr("x", 30)
        .attr("y", i * 25 + 12)
        .text(state.name)
        .attr("font-size", "14px");
});

/* Shows a message in the console if there is an error loading the CSV file */
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});
