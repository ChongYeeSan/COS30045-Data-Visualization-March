    const xLSize = 500;
    const yLSize = 500;
    const Lmargin = 60;
    const xLMax = xLSize - Lmargin*2;
    const yLMax = yLSize - Lmargin*2;

    // Creating the SVG

    const Linesvg = d3.select("#line")
        .append("svg")
        .attr("width", xLSize)
        .attr("height", yLSize)
        
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
            { name: "Snowy", key: "snowy", color: "#f612f6" }
        ];

    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([Lmargin, xLSize - Lmargin]);

    const maxY = d3.max(data, d => d3.max(states, s => d[s.key]));

    const y = d3.scaleLinear()
        .domain([0, maxY])
        .range([yLSize - Lmargin, Lmargin]);
    
    Linesvg.append("g")
        .attr("transform", `translate(0, ${yLSize - Lmargin})`)
        .call(d3.axisBottom(x));

    Linesvg.append("g")
        .attr("transform", `translate(${Lmargin}, 0)`)
        .call(d3.axisLeft(y));

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


}).catch(error => {
    console.error("Error loading the CSV file:", error);
});



