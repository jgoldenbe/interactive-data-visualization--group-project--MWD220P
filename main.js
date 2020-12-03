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
        height = 600 - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    var xscale = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function(d){ return d.year; }))
        .padding(2);
    var yscale  =d3.scaleLinear()
        .domain([0, 15])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisRight(yscale));

    svg.selectAll("mybar")
        .data(data)
        .enter().append("rect")
        .attr("fill", "#71c9f5")
        .attr("x", function(d){ return xscale(d.year);})
        .attr("width", xscale.bandwidth())
        .attr("y", function(d){ return yscale(d.avg);})
        .attr("height", function(d) { return height - yscale(d.avg);})

    svg.append("g")
        .attr("transform" , "translate(0,"+ height + ")")
        .call(d3.axisBottom(xscale))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
});