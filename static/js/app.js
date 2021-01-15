// from data.js
// var tableData = data;

// select the table table

d3.csv("../../Clean/flights_cleaned.csv", function (tableData) {
  // console.log(tableData);

  var tb = d3.select("tbody");

  // nested forEach method (based on the clean and completed data)
  tableData.forEach((obj) => {
    row = tb.append("tr");
    Object.values(obj).forEach((obj2) => {
      row.append("td").text(obj2);
    });
  });
  // change the table head font size
  d3.selectAll(".table-head").style("font-size", "15px");
  // select the target
  var button = d3.select("#filter-btn");
  var form = d3.select("#fil-form");
  var input = d3.selectAll("input");
  // set up the list for fitering
  screenList = [
    "Date",
    "Airline",
    "Flight_Num",
    "Origin",
    "Destination",
    "Cancelled (Y/N)",
  ];

  function runEnter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    var filterData = tableData;

    // try the forEach method didn't work, si I changed back to for loop method.
    for (i = 0; i < screenList.length; i++) {
      var inputElement = d3.select("#" + screenList[i]);
      // get the input value
      var inputValue = inputElement.property("value");

      //   console.log(inputValue);
      // filter the data based on the screenlist condition
      if (inputValue === "") {
        filterData = filterData;
      } else {
        filterData = filterData.filter(
          (obj) => obj[screenList[i]] === inputValue
        );
      }

      tb.html("");
      // nested forEach for the filter data
      filterData.forEach((obj) => {
        row = tb.append("tr");
        Object.values(obj).forEach((obj2) => {
          row.append("td").text(obj2);
        });
      });
    }
  }
  // call the fucntion bu the click
  button.on("click", runEnter);
  // call the fuction based on the 'change' instead of the 'submit'. (Dan's suggestion)
  input.on("change", runEnter);
});
