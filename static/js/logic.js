// Creating map object
const myMap = L.map("map", {
  //Portland 45.5051° N, 122.6750° W
  center: [45.5051, -122.6750],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Grab the data with d3
d3.json("http://127.0.0.1:5000/accidents").then(data => {
//let jsondata = d3.json("portland_cleaned.json");
//let accidents = jsondata;
//accidents = accidents.data;
//console.log(accidents);

//  for (const accident in data) {
    //console.log(`${accident}: ${accident[5]}`);
    //accident = 
    //console.log(accident);
  //}

  // Create a new marker cluster group
  const markers = L.markerClusterGroup();

  // Loop through data
  for (let i = 0; i < data.length; i++) {
    //console.log(data[i]);
    // Set the data location property to a variable
    //const accident = data[i] ;
    //accidents.forEach(accident => console.log(accident));
    //console.log(accident);
    let lat = data[i].Start_Lat;
    let lng = data[i].Start_Lng;
    let description = data[i].Description;
    //console.log(lat);
    //console.log(lng);
    //console.log(description);

    // Check for location property
    //if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([lat, lng])
        .bindPopup(description));
    }

  //}

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});

