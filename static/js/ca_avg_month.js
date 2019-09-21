// Creating map object

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

function init(){
console.log('testinggg');
var map = L.map("map", {
  center: [38.7749, -119.4194],
  zoom: 6
});

// Adding tile layer
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
function buildmethod(value1)
{
   // Grabbing our GeoJSON data..
console.log('test2');
d3.json(`/aqiview2/months/${value1}`, function(data) {
  console.log(data)
 
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.aqi),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.county + "</h1> <hr> <h2>" + feature.properties.aqi + "</h2>");

    }
  }).addTo(map);
});
}
init();