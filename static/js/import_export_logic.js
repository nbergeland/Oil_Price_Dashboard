// put eia_api_key=<key> into config.js

var export_url="http://api.eia.gov/series/?api_key=";
var import_url=export_url

export_url = export_url.concat(eia_api_key,"&series_id=PET.WCREXUS2.W");
import_url = import_url.concat(eia_api_key,"&series_id=PET.WCRIMUS2.W")

// console.log(export_url);

var export_x=[];
var export_y=[];

// Fetch the JSON data and plot it
d3.json(export_url).then(function(data) {
    for (var i = 0; i < 52; i++) {
      my_string = data["series"][0]["data"][i][0];
      export_x.push(new Date(my_string.substring(0,4)+'-'+my_string.substring(4,6)+'-'+my_string.substring(6,9)));
      export_y.push(data["series"][0]["data"][i][1]);
    }
    var trace1 = {
      x: export_x,
      y: export_y,
      type: "line",
      mode: 'lines+markers',
      name: "Crude exports",
      line: {
        color: "navy"
      }
    };

    var layout = {
      title: "Oil Imports and Exports",
      xaxis: { title: "Date" },
      yaxis: { title: "Thousands of barrels" }
    };

    var import_x=[];
    var import_y=[];
    
    
    d3.json(import_url).then(function(data) {
      for (var i = 0; i < 52; i++) {
        my_string = data["series"][0]["data"][i][0];
        import_x.push(new Date(my_string.substring(0,4)+'-'+my_string.substring(4,6)+'-'+my_string.substring(6,9)));
        import_y.push(data["series"][0]["data"][i][1]);
      }
      var trace2 = {
        x: import_x,
        y: import_y,
        type: "line",
        mode: 'lines+markers',
        name: "Crude imports",
        line: {
          color: "crimson"
        }
      };
    
      var plot_data = [trace2, trace1];
    
      Plotly.newPlot("import_export_plot", plot_data, layout);
    });
    

});

// var import_x=[];
// var import_y=[];


// d3.json(import_url).then(function(data) {
//   for (var i = 0; i < 52; i++) {
//     my_string = data["series"][0]["data"][i][0];
//     import_x.push(new Date(my_string.substring(0,4)+'-'+my_string.substring(4,6)+'-'+my_string.substring(6,9)));
//     import_y.push(data["series"][0]["data"][i][1]);
//   }
//   var trace2 = {
//     x: import_x,
//     y: import_y,
//     type: "line",
//     mode: 'lines+markers',
//     name: "Crude imports",
//     line: {
//       color: "crimson"
//     }
//   };

//   var plot_data = [trace2];

//   var layout = {
//     title: "Crude Oil Imports",
//     xaxis_title: "Date",
//     yaxis_title: "Thousands of barrels",
//   };

//   Plotly.newPlot("import_plot", plot_data, layout);
// });
