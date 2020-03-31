// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.csv("data/Crude_oil_reserve.csv").then((importedData) => {
  // console.log(importedData);
  var data = importedData;

  //console.log(data);
  // console.log(data[0]);
  // console.log(data[1]);

  var x_list = [];
  for (let i = 0; data.length > i;i++){
      //console.log(data[i]['Date']);
      x_list.push(data[i]['Date']);
  }
  
  var y_list=[];
  for (let i = 0; data.length > i;i++){
      y_list.push(data[i]['U.S. Crude Oil Proved Reserves (Million Barrels)']);
  }
//console.log(y_list);

  var trace1 = {
    x: x_list,
    y: y_list,
    type:"line",
    name: "test"
  };
  

  // data
  var chartData = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    title: "U.S. Crude Oil Proved Reserves(M) 1900-2018",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", chartData, layout);
});
