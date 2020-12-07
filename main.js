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
    var margin = {top: 20, right: 0, bottom: 20, left: 20},
        width = 750 - margin.left - margin.right,
        height = 750 - margin.top - margin.bottom,
        innerRadius= 80,
        outerRadius = Math.min(width, height) / 1.5;

    var svg = d3.select("body")
        .append("svg")
        .classed("svg", true)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + (margin.bottom + 50))
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height/3 + 75)+ ")");

    var xscale = d3.scaleBand()
        .range([0, (2* Math.PI)])
        .align(0)
        .domain(data.map(function(d){ return d.year; }))
    var yscale  =d3.scaleRadial()
        .domain([0, 15])
        .range([innerRadius, outerRadius]);
    // var tooltip = d3.select("body")
    //     .append("div")
    //     .style("position", "absolute")
    //     .style("z-index", "10")
    //     .style("visibility", "hidden")
    //     .html(data.map(function(d){return d.DSI; }));
    //
    svg.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", "#D7CCC8")
        .attr("d", d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(function(d){ return yscale(d['avg']); })
            .startAngle(function(d) { return xscale(d.year); })
            .endAngle(function(d) { return xscale(d.year) + xscale.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius))
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.85')
                .style("fill", function (d) {
                    if (parseInt(d.DSI) <= -4.00) {
                        return "#6B4205";
                    } else if (parseInt(d.DSI) <= -3.00 && parseInt(d.DSI) >= -3.99) {
                        return "#E08805";
                    } else if (parseInt(d.DSI) <= -2.00  && parseInt(d.DSI) >= -2.99) {
                        return "#DCA655";
                    } else if (parseInt(d.DSI) >= -1.90  && parseInt(d.DSI) <= 1.99) {
                        return "#F6CF95";
                    } else if (parseInt(d.DSI) >= 2.00  && parseInt(d.DSI) <= 2.99) {
                        return "#1A604E";
                    } else if (parseInt(d.DSI) >= 3.00  && parseInt(d.DSI) <= 3.99) {
                        return "#3FAE92";
                    } else if (parseInt(d.DSI) >= 3.99) {
                        return "#33F3C2";
                    }
                });

            //Make Tooltip Appear
            tooltip.style("visibility", "visible");

            //var eventX = d3.event.pageX;
            //var eventY = d3.event.pageY;
            div.html(d.value)
                //div.text(d);
                .style("left", (200+ 10) + "px")
                .style("top", (200 - 15) + "px");
        })
        .on("mousemove", function () {
            return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1')
                .style("fill", function (d) {
                    return "#D7CCC8";
                });
            tooltip.style("visibility", "hidden");
            div.transition()
                .duration('50')
                .style("opacity", 0);
        })

    //Circle for Bar Chart Key
    svg.append("circle").attr("cx", 70).attr("cy", 350).attr("r", 6).style("fill", "#6B4205")
    svg.append("circle").attr("cx",70).attr("cy",395).attr("r", 6).style("fill", "#E08805")
    svg.append("circle").attr("cx", 70).attr("cy", 435).attr("r", 6).style("fill", "#DCA655")
    svg.append("circle").attr("cx", 70).attr("cy", 475).attr("r", 6).style("fill", "#F6CF95")
    svg.append("circle").attr("cx", 220).attr("cy", 395).attr("r", 6).style("fill", "#3FAE92")
    svg.append("circle").attr("cx", 220).attr("cy", 350).attr("r", 6).style("fill", "#33F3C2")
    svg.append("circle").attr("cx", 220).attr("cy", 435).attr("r", 6).style("fill", "#1A604E")

    //Key Labels
    svg.append("text").attr("x",80).attr("y", 350).text("Extreme Drought").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 80).attr("y", 395).text("Severe Drought").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 80).attr("y", 435).text("Moderate Drought").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 80).attr("y", 475).text("Near Normal").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 230).attr("y", 395).text("Very Moist Soil").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 230).attr("y", 350).text("Extremely Moist").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 230).attr("y", 435).text("Unusual Moist Soil").style("font-size", "15px").attr("alignment-baseline","middle")

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

    svg.append("text")
        .attr("x", 120)
        .attr("y", 330)
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Drought Severity Index Key");
});