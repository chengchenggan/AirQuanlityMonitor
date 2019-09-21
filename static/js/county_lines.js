// function init(){
//     d3.json(`/aqiview3/data`, function(data) {
//         var chart = new Taucharts.Chart({
//             data: data,
//             type: 'scatterplot',
//             x: 'month',
//             y: 'aqi',
//             color: 'county',
//             size: 'aqi'
//         });
//     chart.renderTo('#scatter');
// });
// };
// init();

function init(){
    d3.json(`/aqiview3/data`, function(data) {
        var chart = new Taucharts.Chart({
            guide:{
                x:{ padding: 10,
                    label: {text:'Months of the Year', padding:35},
                },
                y:{ padding: 5,
                    label: {text:'Air Quality Index',padding:20},
                    // y: { min: 0, max: 200}
                    // y: { min: 0, max: 200, nice: false }
                }      
                // padding:{b:70,l:70,t:10,r:10},
                // showGridLines:'xy'
              },
            data: data,
            plugins: [
                Taucharts.api.plugins.get('tooltip')({
                    fields: ['county', 'aqi']})],
            type: 'scatterplot',
            x: 'month',
            y: 'aqi',
            color: 'county',
            size: 'aqi',
            // settings: {
            //     xDensityPadding: 1,
            //     yDensityPadding: 1000
            // }
        });
        chart.renderTo('#scatter');
        });
};
init();