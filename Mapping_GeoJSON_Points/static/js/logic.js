// geometry object type member values are Point, MultiPoint, LineString, MultiLineString
// Polygon, MultiPolyton or GeometryCollection

// street view tile layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// dark view tile layer
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// create a base layer that holds both maps
let baseMaps = {
  Strett: streets,
  Dark: dark
};

// Create the map object with center and zoom level.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
});

// pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// // Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/TeresaWehmeier/Mapping_Earthquakes/main/Mapping_GeoJSON_Points/static/json/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
   // createing a GeoJSON layer with the retrieved data.
   L.geoJson(data, {
    onEachFeature: function(features, layer){
      layer.bindPopup("<h3>Airport code: " + features.properties.faa + "</h3> <hr> <h4>Airport name: " + features.properties.name + "</h4>")
    }
  }).addTo(map);
  });