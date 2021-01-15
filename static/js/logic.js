//past week data
const url =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
const cycleScale = 100;

// https://leafletjs.com/examples/choropleth/
function getColor(d) {
  return d > 90
    ? "#800026"
    : d > 70
    ? "#BD0026"
    : d > 50
    ? "#E31A1C"
    : d > 30
    ? "#FF5733"
    : d > 10
    ? "#FFC300"
    : d > -10
    ? "#DAF7A6"
    : "#2EB1BB";
}
// #DAF7A6;

var light = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY,
  }
);

var street = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    // tileSize: 512,
    maxZoom: 18,
    // zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
  }
);

var sat = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY,
  }
);

// Only one base layer can be shown at a time
var baseMaps = {
  Satellite: sat,
  Light: light,
  Street: street,
};

// Overlays that may be toggled on or off
// var overlayMaps = {
//   Cities: cityLayer,
// };

// Pass our map layers into our layer control
// Add the layer control to the map

d3.csv("../../Clean/airport_cleaned.csv", function (data) {
  // console.log(data);
  var coor = [];
  var cityMarkers = [];
  data.forEach((d) => {
    d.Lat = +d.Lat;
    d.Lon = +d.Lon;
    d.Cancelled = +d.Cancelled;
    d.AvgDelay = +d.AvgDelay;
    d.AvgDelay = Math.round(d.AvgDelay * 100) / 100;
    d.Flights = +d.Flights;
    coor = [d.Lat, d.Lon];
    cityMarkers.push(
      L.circle(coor, {
        color: getColor(d.AvgDelay),
        fillColor: getColor(d.AvgDelay),
        fillOpacity: 1,
        radius: d.Flights * cycleScale,
      }).bindPopup(`<h3>${d.IATA_code}, ${d.City}, ${d.State}</h3>
          <p> ${d.Fullname}<\p><hr>
          <h4>Flights: ${d.Flights}, Cancelled: ${d.Cancelled}, AvgDelay: ${d.AvgDelay} min<\h4>`)
    );
  });
  var citylayer = L.layerGroup(cityMarkers);
  var overlayMaps = {
    Airports: citylayer,
  };

  // Create map object and set default layers
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street, citylayer],
  });

  L.control
    .layers(baseMaps, overlayMaps, {
      collapsed: false,
    })
    .addTo(myMap);

  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function (myMap) {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [-10, 10, 30, 50, 70, 90];
    // labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    // https://leafletjs.com/examples/choropleth/
    div.innerHTML = `<h3>AvgDelay (min)</h3>`;
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +
        '<i style="background:' +
        getColor(grades[i] + 1) +
        '"></i> ' +
        grades[i] +
        (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }

    return div;
  };
  legend.addTo(myMap);
});
