// Initializes the page with a default plot
function init() {
    var trace1 = {
        labels: ["Alaska", "California", "Colorado", "Gulf of Mexico", "New Mexico", "North Dakota",
            "Oklahoma", "Texas", "Wyoming", "Rest of US"],
        values: [2977, 2779, 2609, 9761, 3709, 7121, 3186, 24971, 1362, 3821],
        type: 'pie'
    };
    data = [trace1];

    var layout = {
        title: "US Crude Oil Production",
    };
  
    Plotly.newPlot("plot", data, layout);
  }
  
  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selDataset").on("change", updatePlotly);
  
  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
  
    // Initialize x and y arrays
    var labels = [];
    var values = [];
  
    if (dataset === '2018') {
      labels = ["Alaska", "California", "Colorado", "Gulf of Mexico", "New Mexico", "North Dakota",
      "Oklahoma", "Texas", "Wyoming", "Rest of US"];
      values = [2977, 2779, 2609, 9761, 3709, 7121, 3186, 24971, 1362, 3821];
    }
  
    if (dataset === '2017') {
      labels = ["Alaska", "California", "Colorado", "Gulf of Mexico", "New Mexico", "North Dakota",
      "Oklahoma", "Texas", "Wyoming", "Rest of US"];
      values = [5936, 5723, 4293, 20152, 5637, 12887, 5454, 41827, 2485, 7811];
    }
    
    if (dataset === '2016') {
        labels = ["Alaska", "California", "Colorado", "Gulf of Mexico", "New Mexico", "North Dakota",
        "Oklahoma", "Texas", "Wyoming", "Rest of US"]
        values = [5874, 6101, 3820, 19177, 4800, 12389, 5102, 38140, 2380, 8187]
    }
  
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("plot", "labels", [labels]);
    Plotly.restyle("plot", "values", [values]);
  }
  
  init();