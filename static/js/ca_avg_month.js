function chooseColor(aqi) {
  switch (aqi) {
  case (aqi < 50):
    return "green";
  case (aqi < 100):
    return "yellow";
  case (aqi < 150):
    return "orange";
  case (aqi < 200):
    return "orangered";
  case (aqi < 300):
    return "red";
  case (aqi > 300):
    return "firebrick";
  default:
    return "gray";
  }
}
var map;
function init(){
map = L.map("map", {
  center: [38.7749, -119.4194],
  zoom: 6
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);
}

function optionChanged(value){
  buildmethod(value);
}

function buildmethod(value1){
d3.json(`/aqiview2/months/${value1}`, function(data) {
  // console.log(data);
  console.log('map:');
  console.log(map);
  var layer = L.geoJson(data, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: chooseColor(feature.properties.aqi),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    onEachFeature: function(feature, layer) {
    // console.log('after feature')
      layer.on({
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // console.log('before add to map');
      // layer.bindPopup("<h1>" + feature.properties.county + "</h1> <hr> <h2>" + feature.properties.aqi + "</h2>");
    }
  });
  console.log('layer:');
  console.log(layer);
  layer.addTo(map);
});
}

init();