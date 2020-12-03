d3.dsv(',','PRECAVG.csv', function(d){
    return{
        avg:+d.Value,   //Average precipitation rates.
        year:+d.Year,   //Data is set in the month of May
        temp:+d.Temp,   //Average temp that month
        DSI:+d.DSI      //Drought Severity Index
    };
}).then(function (data) {
                        //Idea: Create a circular animated 2D barchart, whenever mouse hovers
                        //over the year of interest, pops out more information included temp
                        //and DSI. Different colors can indicate DSI levels.
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = 800 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom,
        innerRadius = 80,
        outerRadius = Math.min(width, height) / 2;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 100) + ")");
});