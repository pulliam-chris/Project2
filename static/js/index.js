// Declaring Luxon DateTime object
const DateTime = luxon.DateTime;

// Declare year for initial page load
let year = 2017;

// Creating Leaflet map object
let myMap = L.map("map", {
  //Portland 45.5051° N, 122.6750° W
  center: [45.5051, -122.6750],
  zoom: 11
});

//const document = Document("index2.html");
//let button = d3.select("#button");

//let button2017 = d3.select("#2017-btn");
//let button2018 = d3.select("#2018-btn");
//let button2019 = d3.select("#2019-btn");

function init (year) {

//let button2017 = d3.select("#2017-btn");
//let button2018 = d3.select("#2018-btn");
//let button2019 = d3.select("#2019-btn");

// Arrays to capture accident data by hour
let accidentHours = [];
let accidentHourCount = [];

let zipcodeAccidents = [];
let zipcodeAccidentCount =[];
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  // Build hours in day array and set default counts
  for(let j = 0; j<24; j++){
    accidentHourCount[j] = 0;
    accidentHours[j] = j;
  }
  
  // Grab the accident data with d3
  d3.json("/api/v1.0/accidents").then(adata => {
    
    // Create a new marker cluster group
    const markers = L.markerClusterGroup();
   
    // Loop through the accident data
    adata.forEach(accident => {
    
      let lat = accident.Start_Lat;
      let lng = accident.Start_Lng;
      let description = accident.Description;
      
      let weather = accident.Weather_Condition;

      let zip = Number(accident.Zipcode);

      // Count the number of accidents by Zipcode
      if(zipcodeAccidents.indexOf(zip) === -1) {
        zipcodeAccidents.push(zip);
        zipcodeAccidentCount[zipcodeAccidents.indexOf(zip)] = 0;
      }
      else if (zipcodeAccidents.indexOf(zip) > -1) {
        //let index = zipcodeAccidents.indexOf(zip);
        zipcodeAccidentCount[zipcodeAccidents.indexOf(zip)] += 1;
      }
                  
      // Capture time for accident by hour plot using Luxon library
      let time = DateTime.fromSQL(accident.Start_Time, {zone: "America/Los_Angeles" });
      
      // Only tabulate for selected year
      if(time.year === year) {
        // Increment the count for that hour
        //console.log(year)
        accidentHourCount[time.hour] += 1;
      }
      
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([lat, lng])
        .bindPopup(`<strong>${time.toLocaleString(DateTime.DATETIME_HUGE)}</strong><br>Weather: ${weather}<br>Description: ${description}</strong>`));
      });
    
    // Create plot based on arrays    
    let trace = [
      {
        x: accidentHours,
        y: accidentHourCount,
        type: 'bar',
        marker: {
          color: '#ff6a00',
          //opacity: 0.6,
          //line: {
          //  color: 'rgb(8,48,107)',
          //  width: 1.5
          }
      }
    ];

    let layout = {
      title: `Accident by Hour of Day ${year}`,
      font:{
        family: 'Raleway, sans-serif'
      },
      showlegend: false,
      xaxis: {
        title: "Hour (24-Hour Clock)",
        dtick: 2
      },
      yaxis: {
        title: "Total Accidents"
      },
      bargap :0.05,

    };
    
    Plotly.newPlot('bar', trace, layout);

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
  //});

//console.log(zipcodeAccidents);
//console.log(zipcodeAccidentCount);

zipcodes = [];
medAge = [];
povertyRate = [];
accidentCount = [];
    
d3.json("/api/v1.0/census").then(cdata => {
  // console.log(cdata)
 
  cdata.forEach(entry => {
    if(entry.Year == year) {
      zipcodes.push(entry.Zipcode);
      medAge.push(entry.MedianAge);
      povertyRate.push(entry.PovertyRate);
      //console.log(new String(entry.Zipcode));
      //let myIndex = zipcodeAccidents.find(97267);
      accidentCount.push(zipcodeAccidentCount[zipcodeAccidents.indexOf(Number(entry.Zipcode))]);
      }
    
    
    //let myIndex = new String(entry.Zipcode);
    //console.log(myIndex);
    //if(zipcodeAccidents.indexOf(myIndex) > -1) {
    //  accidentCount.push(zipcodeAccidentCount[zipcodeAccidents.indexOf(myIndex)])
    //}
    //else {
    //  accidentCount.push(0);
    //}
  })

//console.log(accidentCount);
//console.log(zipcodes);
//console.log(medAge);

  
// Highcharts section
Highcharts.chart('container', {
  chart: {
    zoomType: 'xy'
  },
  title: {
    text: `Accident Counts to Median Age ${year}`
  },
  subtitle: {
    text: 'Source: Accident Data Set and Census by Portland Zipcode'
  },
  xAxis: [{
    categories: zipcodes,
    crosshair: true
  }],
  yAxis: [{ // Primary yAxis
    labels: {
      format: '{value}',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    },
    title: {
      text: 'Accident Count',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    }
  }, { // Secondary yAxis
    title: {
      text: 'Median Age',
      style: {
        color: Highcharts.getOptions().colors[5]
      }
    },
    labels: {
      format: '{value}',
      style: {
        color: Highcharts.getOptions().colors[5]
      }
    },
    opposite: true
  }],
  tooltip: {
    shared: true
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    x: 120,
    verticalAlign: 'top',
    y: 50,
    floating: true,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || // theme
      'rgba(255,255,255,0.25)'
  },
  series: [{
    name: 'Median Age',
    type: 'column',
    yAxis: 1,
    data: medAge,
    color: Highcharts.getOptions().colors[5]
    //tooltip: {
      //valueSuffix: 'Age in Years'
    //}

  }
  , {
    name: 'Accident Count',
    type: 'spline',
    data: accidentCount,
    color: Highcharts.getOptions().colors[1]
    //tooltip: {
      //valueSuffix: 'Distinct Count'
    //}
  }]
});

Highcharts.chart('container2', {
  chart: {
    zoomType: 'xy'
  },
  title: {
    text: `Accident Counts to Poverty Rate ${year}`
  },
  subtitle: {
    text: 'Source: Accident Data Set and Census by Portland Zipcode'
  },
  xAxis: [{
    categories: zipcodes,
    crosshair: true
  }],
  yAxis: [{ // Primary yAxis
    labels: {
      format: '{value}',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    },
    title: {
      text: 'Accident Count',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    }
  }, { // Secondary yAxis
    title: {
      text: 'Poverty Rate',
      style: {
        color: Highcharts.getOptions().colors[5]
      }
    },
    labels: {
      format: '{value} %',
      style: {
        color: Highcharts.getOptions().colors[5]
      }
    },
    opposite: true
  }],
  tooltip: {
    shared: true
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    x: 120,
    verticalAlign: 'top',
    y: 50,
    floating: true,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || // theme
      'rgba(255,255,255,0.25)'
  },
  series: [{
    name: 'Poverty Rate',
    type: 'column',
    yAxis: 1,
    data: povertyRate,
    color: Highcharts.getOptions().colors[5]
    //tooltip: {
      //valueSuffix: 'Age in Years'
    //}

  }
  , {
    name: 'Accident Count',
    type: 'spline',
    data: accidentCount,
    color: Highcharts.getOptions().colors[1]
    //tooltip: {
      //valueSuffix: 'Distinct Count'
    //}
  }]
});

});
});

//Create event handlers
//document.getElementByID("button").addEventListener("click", init(button.value));
//button.on("click", console.log(button.value));
//button2018.on("click", init(button2018.value));
//button2019.on("click", init(button2019.value));

}

init(year);


