//initiate function to get data for plot build & interaction between change events and plots (with name.id as link)
//ref activity 15/3/6
function getPlotdata(data){
  d3.csv(".\Resources\Avg_airline_delay.csv").then( (data) => {
  console.log(data) 
//setting index to be a variable so graphs update when ID changes
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
var index=data.names.indexOf(delay);
var delays=data.origin[index].delays;
console.log(delays)
var Values=data.samples[index].sample_values.slice(0,10).reverse()
console.log(sampleValues);

//gettop 10 otu_ids (ref  activity 15/3/7)
var top = data.origin[index].delay.slice(0,5).reverse()
console.log(otu_top10);
var otu_ids=otu_top10.map(d=> "otu" + d);



//Get top10 labels //* Use `sample_values` as the values for the bar chart. 
//Template string allows me to fill in variables in a string without redundancy (see HW references15/3/7).
var labels=data.samples[index].otu_labels.slice(0,10);
var sample_values=data.samples[index].sample_values.slice(0,10);
console.log(`otu_labels:${labels}`)

console.log(`id_values:${otu_top10}`)
console.log(`sample_values:${sample_values}`)

//2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//* Use `otu_ids` as the labels for the bar chart.//* Use `otu_labels` as the hovertext for the chart.
var trace={
  x:sampleValues,
  y:otu_ids,
  text:labels,
  color:'blue',
  type:"bar",
  orientation:"h"

};
var data=[trace];

var layout={
    title: "Top 10 OTU"  
}

Plotly.newPlot("bar",data,layout);

//3. Create a bubble chart that displays each sample. Set the layout for the bubble plot
var trace1 = {
  x: ids,
  y: sampleValues,
  mode: "markers",
  marker: {
    size: sampleValues,
      color: ids,
      colorscale:"YlGnBu"
    },
  text:  labels
};

var layout1 = {
  xaxis:{title: "OTU ID"},
  height: 600,
  width: 1000
};

var data1 = [trace1];

Plotly.newPlot("bubble", data1, layout1); 
  });
}

//4. Display individual's demographic information.
//filter metadata by id;create the function;
//render to div tag "#sample-metadata"

function getDemographicdata(id) {
	// read the json file to get data
 d3.json("samples.json").then((data)=> {
	var metadata = data.metadata;  
  console.log(metadata)
	
var result = metadata.filter(metadata => metadata.id.toString() === id)[0];

var demographicpanel = d3.select("#sample-metadata");
        
//clear panel before getting new id info
  demographicpanel.html("");

// append  demographic data  for the id with the next item on a new line to the panel
  Object.entries(result).forEach((key) => {   
  demographicpanel.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
      });
    });
}
// create the function for plots & panel link to change event, see also HW ref
//https://www.w3schools.com/jquery/event_change.asp
function optionChanged(id) {
  getPlotdata(id);
  getDemographicdata(id)
}

// create the function for the initial data rendering (ref classwork)
function init() {
  var dropdown = d3.select("#selDataset");

  // read the data 
    d3.csv("Avg_airline_delay").then((data)=> {
    console.log(data)
  // get the data to the dropdwown menu
  //ref https://stackoverflow.com/questions/20860260/dynamically-add-value-attribute-to-option-tag-with-d3
    data.names.forEach(function(name) {
    dropdown.append("option").text(name).property("value");
        });

  // call the functions to display the data and the plots to the page
    getPlotdata(data.names[0]);
    getDemographicdata(data.names[0]);
    });
}


  init();
