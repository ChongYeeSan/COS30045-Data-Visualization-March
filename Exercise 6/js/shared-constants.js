// determine the width and height of the canvas    
    const Histwidth = 900;
    const Histheight = 500;
    const Histmargin = {top: 40, right: 30, bottom:60, left:70};
    const innerWidth = Histwidth - Histmargin.left - Histmargin.right;
    const innerHeight = Histheight - Histmargin.top - Histmargin.bottom;
// adds color to the histogram bars    
const barColor = "#9162ef";
const bodyBackgroundColor = "#f0f0f0"; // adds a white background

//defines the x and y scale
const xHscale = d3.scaleLinear(); 
const yHscale = d3.scaleLinear(); 

// grouping data into bins base on the data and the range it has 
const binGenerator = d3.bin()
    .value(d => d.EnergyConsumption);

// defining the array for the filter buttons    
const filters_screen = [
    { id: "All", label: "All" },
    { id: "LCD(LED)", label: "LCD(LED)" },
    { id: "OLED", label: "OLED" },
    { id: "LCD", label: "LCD" }
];