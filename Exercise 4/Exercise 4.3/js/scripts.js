function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    document.getElementById(pageId).style.display = 'block';

    document.querySelectorAll('.nav-links li').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById("link-" + pageId).classList.add('active');
}

showPage('home');

// 4.2 - Style element and append paragraph using D3
d3.select("h1").style("color", "#2b3a4f");


// 4.3 - Set up responsive SVG container
const width = 1200;
const height = 600;

const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)

// Left side shapes
svg.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 80)
    .attr("height", 80)
    .attr("fill", "#2c7be5")
    .attr("rx", 5);

svg.append("circle")
    .attr("cx", 50)
    .attr("cy", 150)
    .attr("r", 40)
    .attr("fill", "#f5a623");

svg.append("polygon")
    .attr("points", "50,220 10,290 90,290")
    .attr("fill", "#7ed321");

// Right side shapes
svg.append("rect")
    .attr("x", 1110)
    .attr("y", 10)
    .attr("width", 80)
    .attr("height", 80)
    .attr("fill", "#2c7be5")
    .attr("rx", 5);

svg.append("circle")
    .attr("cx", 1150)
    .attr("cy", 150)
    .attr("r", 40)
    .attr("fill", "#f5a623");

svg.append("polygon")
    .attr("points", "1150,220 1110,290 1190,290")
    .attr("fill", "#7ed321");