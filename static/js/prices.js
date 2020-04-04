// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#price_plot")
  .append("svg")
  .attr("viewBox" ,"0 0 960 500")
// Followed instructions under heading SVG embedded inline using the <svg> tag
// https://tympanus.net/codrops/2014/08/19/making-svgs-responsive-with-css/
//  .attr("width", svgWidth)
//  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%m/%d/%Y");

// Load data from forcepoints.csv
d3.csv("/static/data/HistPrices.csv").then(function(forceData){

  // Print the forceData
//  console.log(forceData);

  // Format the date and cast the force value to a number
  forceData.forEach(function(data) {
    // console.log(data.Date)  
    data.Date = parseTime(data.Date);
    data.Close = parseFloat(data.Close);
    data.Volume = parseFloat(data.Volume);
    data.Open = parseFloat(data.Open);
    data.High = parseFloat(data.High);
    data.Low = parseFloat(data.Low);
    // data.Close = +data.Close;
    // console.log(data.Close)
  });

  // Configure a time scale
  // d3.extent returns the an array containing the min and max values for the property specified
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(forceData, data => data.Date))
    .range([0, chartWidth]);

  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(forceData, data => data.Close)])
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure a line function which will plot the x and y coordinates using our scales
  var drawLine = d3.line()
    .x(data => xTimeScale(data.Date))
    .y(data => yLinearScale(data.Close));

  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for forceData
    .attr("d", drawLine(forceData))
    .classed("line", true);

  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
}).catch(function(error) {
  console.log(error);
});
// Call updatePlotly() when a change takes place to the DOM
//d3.selectAll("#selDataset").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");

//   // Initialize x and y arrays
//   var x = [];
//   var y = [];

//   if (dataset === 'dataset1') {
//     x = [1, 2, 3, 4, 5];
//     y = [1, 2, 4, 8, 16];
//   }

//   if (dataset === 'dataset2') {
//     x = [10, 20, 30, 40, 50];
//     y = [1, 10, 100, 1000, 10000];
//   }

//   // Note the extra brackets around 'x' and 'y'
//   Plotly.restyle("plot", "x", [x]);
//   Plotly.restyle("plot", "y", [y]);

//   } Plotly.newplot("x", "y");



// // Create forceData
// date = forceData.Date
// close = forceData.Close
// // Create your trace.
// var trace = {
//   x: date,
//   y: close,
//   type: "line"
// };

// // Create the data array for our plot
// var data = [trace];

// // Define the plot layout
// var layout = {
//   title: "Oil Prices Over The Last Decade",
//   xaxis: { title: "Date" },
//   yaxis: { title: "Price"}
// };

// // Plot the chart to a div tag with id "bar-plot"
// Plotly.newPlot("Line", data, layout)
// })


// Line and scatter example from plotly
// var trace1 = {
//     x: [1, 2, 3, 4],
//     y: [10, 15, 13, 17],
//     mode: 'markers'
//   };
  
//   var trace2 = {
//     x: [2, 3, 4, 5],
//     y: [16, 5, 11, 9],
//     mode: 'lines'
//   };
  
//   var trace3 = {
//     x: [1, 2, 3, 4],
//     y: [12, 9, 15, 12],
//     mode: 'lines+markers'
//   };
  
//   var data = [ trace1, trace2, trace3 ];
  
//   var layout = {
//     title:'Line and Scatter Plot'
//   };
  
//   Plotly.newPlot('myDiv', data, layout)