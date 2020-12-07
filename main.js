d3.dsv(',','PRECAVG.csv', function(d){
    return{
        avg:+d.Value,   //Average precipitation rates.
        year:+d.Year,   //Data is set in the month of May
        temp:+d.Temp,   //Average temp that month
        DSI:+d.DSI      //Drought Severity Index
    };
}).then(function (data) {
                        //Idea: Create a circular barchart, whenever mouse hovers
                        //over the year of interest, pops out more information included temp
                        //and DSI. Different colors can indicate DSI levels.
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = 1300 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom,
        innerRadius= 80,
        outerRadius = Math.min(width, height) / 2;

    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height/2)+ ")");

    var xscale = d3.scaleBand()
        .range([0, (2* Math.PI)])
        .align(0)
        .domain(data.map(function(d){ return d.year; }))
    var yscale  =d3.scaleRadial()
        .domain([0, 15])
        .range([innerRadius, outerRadius]);

    svg.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", "#b5f28d")
        .attr("d", d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(function(d){ return yscale(d['avg']); })
            .startAngle(function(d) { return xscale(d.year); })
            .endAngle(function(d) { return xscale(d.year) + xscale.bandwidth(); })
                .padAngle(0.01)
                .padRadius(innerRadius))

    svg.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("text-anchor", function(d) { return (xscale(d.year) + xscale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((xscale(d.year) + xscale.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (yscale(d['avg'])+10) + ",0)"; })
        .append("text")
        .text(function(d){return(d.year)})
        .attr("transform", function(d) { return (xscale(d.year) + xscale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "10px")
        .attr("alignment-baseline", "middle")
});