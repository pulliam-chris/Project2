// Declaring Luxon JS Library DateTime object
const DateTime = luxon.DateTime;

// Declare a year for initial page load
let year = 2017;

// Creating Leaflet map object
let myMap = L.map("map", {
  //Portland 45.5051° N, 122.6750° W
  center: [45.5051, -122.6750],
  zoom: 11
});

function init (year) {

  // Arrays to capture accident data by hour
  let accidentHours = [];
  let accidentHourCount = [];

  // Arrays to capture accident data by zipcode
  let zipcodeAccidents = [];
  let zipcodeAccidentCount =[];
  
  // Adding tile layer to the leaflet map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  // Build hours in day array and set default counts
  for(let i = 0; i<24; i++){
    accidentHourCount[i] = 0;
    accidentHours[i] = i;
  }
  
  // Grab the accident data with d3 and local API call
  d3.json("/api/v1.0/accidents").then(adata => {
    
    // Create a new marker cluster group
    const markers = L.markerClusterGroup();
   
    // Loop through the accident data
    adata.forEach(accident => {
    
      // Grab data for plotting and markers
      let lat = accident.Start_Lat;
      let lng = accident.Start_Lng;
      let description = accident.Description;
      let weather = accident.Weather_Condition;

      // Capture the zipcode for
      let zip = Number(accident.Zipcode);

      // Capture time for accident by hour plot using Luxon library
      let time = DateTime.fromSQL(accident.Start_Time, {zone: "America/Los_Angeles" });

      // Record the zipcode count if the accident is in the selected year
      if(time.year === year) {
        // Count the number of accidents by Zipcode
        // If a new zipcode is found add it to the array along with default count
        if(zipcodeAccidents.indexOf(zip) === -1) {
          zipcodeAccidents.push(zip);
          zipcodeAccidentCount[zipcodeAccidents.indexOf(zip)] = 0;
        }
        // Increment the accident count at the appropriate index
        else if (zipcodeAccidents.indexOf(zip) > -1) {
          zipcodeAccidentCount[zipcodeAccidents.indexOf(zip)] += 1;
        }
      }
           
      // Only tabulate for selected year
      if(time.year === year) {
        // Increment the count for that hour
        accidentHourCount[time.hour] += 1;
      }
      
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([lat, lng])
        .bindPopup(`<strong>${time.toLocaleString(DateTime.DATETIME_HUGE)}</strong><br>Weather: ${weather}<br>Description: ${description}</strong>`));
      });

      // Add our marker cluster layer to the map
      myMap.addLayer(markers);
    
      // Create Plotly Accident by hour figure    
      // Plotly data
      let trace = [
      {
        x: accidentHours,
        y: accidentHourCount,
        type: 'bar',
        marker: {
          // Orange
          color: '#ff6a00',
          }
      }];

      // Plotly layout
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
    
      // Create plot at div
      Plotly.newPlot('bar', trace, layout);
      
      // Create arrays to hold Census data
      zipcodes = [];
      medAge = [];
      povertyRate = [];
      accidentCount = [];
    
      // Use D3 to capture Census data from local Flask-Mongo API
      d3.json("/api/v1.0/census").then(cdata => {
 
        cdata.forEach(entry => {
          if(entry.Year == year) {
            zipcodes.push(entry.Zipcode);
            medAge.push(entry.MedianAge);
            povertyRate.push(entry.PovertyRate);
            accidentCount.push(zipcodeAccidentCount[zipcodeAccidents.indexOf(Number(entry.Zipcode))]);
          } 
      })
  
      // Highcharts section
      // Accidents vs. Census Median Age
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
          }
        , {
          name: 'Accident Count',
          type: 'spline',
          data: accidentCount,
          color: Highcharts.getOptions().colors[1]
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
        }
        , {
          name: 'Accident Count',
          type: 'spline',
          data: accidentCount,
          color: Highcharts.getOptions().colors[1]
        }]
      });
    });
  });
}

// Run the init script with the default year or whatever year is then selected
init(year);


