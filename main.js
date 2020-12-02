d3.dsv(',','PRECAVG.csv', function(d){
    return{
        avg:+d.Value,//Average precipitation rates.
        year:+d.Year, //Data is set in the month of May
        temp:+d.Temp, //Average temp that month
        DSI:+d.DSI //Drought Severity Index
    };
}).then(function (data){
    console.log();
})