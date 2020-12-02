d3.dsv(',','PRECAVG.csv', function(d){
    return{
        avg:+d.Value,
        year:+d.Date
    };
}).then(function (data){
    console.log(data);
})