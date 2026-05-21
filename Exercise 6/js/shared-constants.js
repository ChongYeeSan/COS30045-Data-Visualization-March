const Histmargin = {top: 20, right: 30, bottom: 50, left: 60};
const Histwidth = 800;
const Histheight = 400;
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