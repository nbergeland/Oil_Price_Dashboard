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
  
    Plotly.newPlot("pie_chart_dropdown_plot", data, layout);
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
        "Oklahoma", "Texas", "Wyoming", "Rest of US"];
        values = [5874, 6101, 3820, 19177, 4800, 12389, 5102, 38140, 2380, 8187]
    }
  
    if (dataset === '2015') {
        labels = ["Alaska", "California", "Colorado", "Gulf of Mexico", "New Mexico", "North Dakota",
        "Oklahoma", "Texas", "Wyoming", "Rest of US"];
        values = [5796, 6619, 4036, 18174, 4856, 14123, 5484, 41335, 2842, 9914];
    }

    if (dataset === '2014') {
      labels = ["Alaska", "California", "Colorado", "Gulf of Mexico", "New Mexico", "North Dakota",
      "Oklahoma", "Texas", "Wyoming", "Rest of US"];
      values = [5958, 6729, 3139, 16761, 4108, 12963, 4605, 38049, 2501, 10251];
    }

    if (dataset === '2013') {
      labels = ["Alaska", "California", "Colorado", "Gulf of Mexico", "New Mexico", "North Dakota",
      "Oklahoma", "Texas", "Wyoming", "Rest of US"];
      values = [6182, 6540, 2175, 15068, 3378, 10263, 3786, 30475, 2088, 9630];
    }

    if (dataset === '2012') {
      labels = ["Alaska", "California", "Colorado", "Gulf of Mexico", "New Mexico", "North Dakota",
      "Oklahoma", "Texas", "Wyoming", "Rest of US"];
      values = [6310, 6465, 1626, 15189, 2804, 7939, 3095, 23742, 1900, 8937];
    }

    if (dataset === '2011') {
      labels = ["Alaska", "California", "Colorado", "Gulf of Mexico", "New Mexico", "North Dakota",
      "Oklahoma", "Texas", "Wyoming", "Rest of US"];
      values = [6742, 6449, 1295, 15805, 2347, 5003, 2534, 17393, 1795, 8466];
    }

    if (dataset === '2010') {
      labels = ["Alaska", "California", "Colorado", "Gulf of Mexico", "New Mexico", "North Dakota",
      "Oklahoma", "Texas", "Wyoming", "Rest of US"];
      values = [7199, 6588, 1086, 18640, 2159, 3695, 2239, 14026, 1771, 8338];
    }

    if (dataset === '2009') {
      labels = ["Alaska", "California", "Colorado", "Gulf of Mexico", "New Mexico", "North Dakota",
      "Oklahoma", "Texas", "Wyoming", "Rest of US"];
      values = [7749, 6815, 998, 18727, 2012, 2607, 2144, 13132, 1695, 8301];
    }

    if (dataset === '2008') {
      labels = ["Alaska", "California", "Colorado", "Gulf of Mexico", "New Mexico", "North Dakota",
      "Oklahoma", "Texas", "Wyoming", "Rest of US"];
      values = [4666, 4095, 589, 7302, 1155, 1322, 1286, 7773, 1013, 5010];
    }
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("pie_chart_dropdown_plot", "labels", [labels]);
    Plotly.restyle("pie_chart_dropdown_plot", "values", [values]);
  }
  
  init();