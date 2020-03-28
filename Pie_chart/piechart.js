 var trace1 = {
   labels: ["Alaska", "California", "Colorado", "New Mexico",
       "North Dakota", "Oklahoma", "Texas", "Rest of US"],
   values: [2977, 2779, 2609, 3709, 7121, 3186, 24971, 14944],
   type: 'pie'
 };

 var data = [trace1];

 var layout = {
   title: "US Crude Oil Production",
 };

 Plotly.newPlot("plot", data, layout);