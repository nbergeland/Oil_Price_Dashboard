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