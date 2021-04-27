const DateTime = luxon.DateTime

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
      
      //luxon.DateTime
      let time = DateTime.fromSQL(data[i].Start_Time, {zone: "America/Los_Angeles" });
      //let newtime = DateTime.fromHTTP(data[i].Start_Time,  { zone: "America/Los_Angeles" });
      //console.log(data[i].Start_Time)
      //console.log(time.hour);
      //let time = data[i].Start_Time;
      //time = fromJSDate(time, "PST");
      //newtime = newtime.getHours();
      
      accidentHourCount[time.hour] += 1;
      //console.log(weather);
      
      
      // Check for location property
      //if (location) {
  
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([lat, lng])
          .bindPopup(`<strong>Weather: ${weather}<br>Description: ${description}</strong>`));
      }
  
    //}
    
    //console.log(accidentHourCount);
    
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

// Highcharts section
 /*  
let year2016 = [];
  let year2017 = [];
  let year2018 = [];
  let year2019 = [];
  

  d3.json("c:\portland_annual_accidents.json").then(data => {
    temp  = [entry.Zipcode, entry.counts];

    data.ForEach(entry => {
      console.log(entry)
      if (entry.Start_Time === "2016") {
        year2016.push([temp])
      }
      else if (entry.Start_Time === "2017") {
        year2017.push([temp])
      }
      else if (entry.Start_Time === "2018") {
        year2018.push([temp])
      }
      else if (entry.Start_Time === "2019") {
        year2019.push([temp])
      }
      else {}
      
    })
    dataPrev = [year2016,year2017,year2018,year2019]
    console.log(dataPrev) 
})


 
  var dataPrev = {
    2016: [
      ['South Korea', 0],
      ['Japan', 0],
      ['Australia', 0],
      ['Germany', 11],
      ['Russia', 24],
      ['China', 38],
      ['Great Britain', 29],
      ['United States', 46]
    ],
    2012: [
      ['South Korea', 13],
      ['Japan', 0],
      ['Australia', 0],
      ['Germany', 0],
      ['Russia', 22],
      ['China', 51],
      ['Great Britain', 19],
      ['United States', 36]
    ],
    2008: [
      ['South Korea', 0],
      ['Japan', 0],
      ['Australia', 0],
      ['Germany', 13],
      ['Russia', 27],
      ['China', 32],
      ['Great Britain', 9],
      ['United States', 37]
    ],
    2004: [
      ['South Korea', 0],
      ['Japan', 5],
      ['Australia', 16],
      ['Germany', 0],
      ['Russia', 32],
      ['China', 28],
      ['Great Britain', 0],
      ['United States', 36]
    ],
    2000: [
      ['South Korea', 0],
      ['Japan', 0],
      ['Australia', 9],
      ['Germany', 20],
      ['Russia', 26],
      ['China', 16],
      ['Great Britain', 0],
      ['United States', 44]
    ]
  };
  
  var data = {
    2016: [
      ['South Korea', 0],
      ['Japan', 0],
      ['Australia', 0],
      ['Germany', 17],
      ['Russia', 19],
      ['China', 26],
      ['Great Britain', 27],
      ['United States', 46]
    ],
    2012: [
      ['South Korea', 13],
      ['Japan', 0],
      ['Australia', 0],
      ['Germany', 0],
      ['Russia', 24],
      ['China', 38],
      ['Great Britain', 29],
      ['United States', 46]
    ],
    2008: [
      ['South Korea', 0],
      ['Japan', 0],
      ['Australia', 0],
      ['Germany', 16],
      ['Russia', 22],
      ['China', 51],
      ['Great Britain', 19],
      ['United States', 36]
    ],
    2004: [
      ['South Korea', 0],
      ['Japan', 16],
      ['Australia', 17],
      ['Germany', 0],
      ['Russia', 27],
      ['China', 32],
      ['Great Britain', 0],
      ['United States', 37]
    ],
    2000: [
      ['South Korea', 0],
      ['Japan', 0],
      ['Australia', 16],
      ['Germany', 13],
      ['Russia', 32],
      ['China', 28],
      ['Great Britain', 0],
      ['United States', 36]
    ]
  };
  
  var countries = [{
    name: 'South Korea',
    flag: 197582,
    color: 'rgb(201, 36, 39)'
  }, {
    name: 'Japan',
    flag: 197604,
    color: 'rgb(201, 36, 39)'
  }, {
    name: 'Australia',
    flag: 197507,
    color: 'rgb(0, 82, 180)'
  }, {
    name: 'Germany',
    flag: 197571,
    color: 'rgb(0, 0, 0)'
  }, {
    name: 'Russia',
    flag: 197408,
    color: 'rgb(240, 240, 240)'
  }, {
    name: 'China',
    flag: 197375,
    color: 'rgb(255, 217, 68)'
  }, {
    name: 'Great Britain',
    flag: 197374,
    color: 'rgb(0, 82, 180)'
  }, {
    name: 'United States',
    flag: 197484,
    color: 'rgb(215, 0, 38)'
  }];
  
  
  function getData(data) {
    return data.map(function (country, i) {
      return {
        name: country[0],
        y: country[1],
        color: countries[i].color
      };
    });
  }
  
  var chart = Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Summer Olympics 2016 - Top 5 countries by Gold medals'
    },
    subtitle: {
      text: 'Comparing to results from Summer Olympics 2012 - Source: <a href="https://en.wikipedia.org/wiki/2016_Summer_Olympics_medal_table">Wikipedia</a>'
    },
    plotOptions: {
      series: {
        grouping: false,
        borderWidth: 0
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      shared: true,
      headerFormat: '<span style="font-size: 15px">{point.point.name}</span><br/>',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} medals</b><br/>'
    },
    xAxis: {
      type: 'category',
      max: 4,
      labels: {
        useHTML: true,
        animate: true,
        formatter: function () {
          var value = this.value,
            output;
  
          countries.forEach(function (country) {
            if (country.name === value) {
              output = country.flag;
            }
          });
  
          return '<span><img src="https://image.flaticon.com/icons/svg/197/' + output + '.svg" style="width: 40px; height: 40px;"/><br></span>';
        }
      }
    },
    yAxis: [{
      title: {
        text: 'Gold medals'
      },
      showFirstLabel: false
    }],
    series: [{
      color: 'rgb(158, 159, 163)',
      pointPlacement: -0.2,
      linkedTo: 'main',
      data: dataPrev[2016].slice(),
      name: '2012'
    }, {
      name: '2016',
      id: 'main',
      dataSorting: {
        enabled: true,
        matchByName: true
      },
      dataLabels: [{
        enabled: true,
        inside: true,
        style: {
          fontSize: '16px'
        }
      }],
      data: getData(data[2016]).slice()
    }],
    exporting: {
      allowHTML: true
    }
  });
  
  var years = [2016, 2017, 2018, 2019];
  
  years.forEach(function (year) {
    var btn = document.getElementById(year);
  
    btn.addEventListener('click', function () {
  
      document.querySelectorAll('.buttons button.active').forEach(function (active) {
        active.className = '';
      });
      btn.className = 'active';
  
      chart.update({
        title: {
          text: 'Summer Olympics ' + year + ' - Top 5 countries by Gold medals'
        },
        subtitle: {
          text: 'Comparing to results from Summer Olympics ' + (year - 4) + ' - Source: <a href="https://en.wikipedia.org/wiki/' + (year) + '_Summer_Olympics_medal_table">Wikipedia</a>'
        },
        series: [{
          name: year - 4,
          data: dataPrev[year].slice()
        }, {
          name: year,
          data: getData(data[year]).slice()
        }]
      }, true, false, {
        duration: 800
      });
    });
  }); 
  
*/