    const Histwidth = 900;
    const Histheight = 500;
    const Histmargin = {top: 40, right: 30, bottom:60, left:70};
    const innerWidth = Histwidth - Histmargin.left - Histmargin.right;
    const innerHeight = Histheight - Histmargin.top - Histmargin.bottom;
const barColor = "#9162ef";
const bodyBackgroundColor = "#f0f0f0";

const xHscale = d3.scaleLinear();
const yHscale = d3.scaleLinear(); 

const binGenerator = d3.bin()
    .value(d => d.EnergyConsumption);

const filters_screen = [
    { id: "All", label: "All" },
    { id: "LCD(LED)", label: "LCD(LED)" },
    { id: "OLED", label: "OLED" },
    { id: "LCD", label: "LCD" }
];