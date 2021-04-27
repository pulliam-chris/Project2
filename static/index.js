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

  let accidentHours = [];
  let accidentHourCount = [];

  // Build hours in day array
  for(let j = 0; j<24; j++){
    accidentHourCount[j] = 0;
    accidentHours[j] = j;
  }
  
  // Grab the data with d3
  d3.json("/api/v1.0/accidents").then(data => {
  //let jsondata = d3.json("portland_cleaned.json");
  //let accidents = jsondata;
  //accidents = accidents.data;
  //console.log(data);
  //  for (const accident in data) {
      //console.log(`${accident}: ${accident[5]}`);
      //accident = 
      //console.log(accident);
    //}
  
    // Create a new marker cluster group
    const markers = L.markerClusterGroup();
   

    //console.log(accidentHours);

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
      let weather = data[i].Weather_Condition;
      
      let time = new Date(data[i].Start_Time);
      //let time = data[i].Start_Time;
      time = time.getHours();
      
      accidentHourCount[time] += 1;
      //console.log(weather);
      //console.log(time);
      
      // Check for location property
      //if (location) {
  
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([lat, lng])
          .bindPopup(`<strong>Weather: ${weather}<br>Description: ${description}</strong>`));
      }
  
    //}
    
    console.log(accidentHourCount);
    
    let trace = [
      {
        x: accidentHours,
        y: accidentHourCount,
        type: 'bar'
      }
    ];

    let layout = {
      title: 'Accident by Hour of Day',
      font:{
        family: 'Raleway, sans-serif'
      },
      showlegend: false,
      xaxis: {
        // tickangle: -45,
        title: "Hour (24-Hour Clock)",
        dtick: 2
      },
      yaxis: {
        //zeroline: false,
        //gridwidth: 2
        title: "Total Accidents"
      },
      bargap :0.05
    };
    
    Plotly.newPlot('bar', trace, layout);

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
  });

  
  
  