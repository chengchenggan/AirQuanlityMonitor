var myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://api.myjson.com/bins/hs7f1";

d3.json(url, function(response) {

  console.log(response);

  var heatArray = [];
  for (var j =0; j < 63; j++){
  for (var i = 0; i < response[j].aqi; i++) {
      heatArray.push([response[j].latitude, response[j].longitude]);
    }
  };

  var heat = L.heatLayer(heatArray, {
    maxZoom:10,
    radius: 50,
    blur: 70
  }).addTo(myMap);

});
