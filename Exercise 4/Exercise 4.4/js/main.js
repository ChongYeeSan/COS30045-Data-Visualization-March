d3.csv("data/Energy_consumption_for_televion_in_Australia.csv", function(d) {
    return {
        brand: d.Brand_Reg,
        screentech: d.Screen_Tech,
        energyConsumption: +d["Labelled energy consumption (kWh/year)"]
    };
}).then(function(data) {
    console.log(data);
    console.log("Total records:", data.length);
    console.log("Max energy consumption:", d3.max(data, d => d.energyConsumption));
    console.log("Min energy consumption:", d3.min(data, d => d.energyConsumption));
});