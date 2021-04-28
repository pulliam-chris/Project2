//grabbing the accidents data

d3.json("http://127.0.0.1:5000/accidents").then(accidendsdata =>{
    console.log(accidendsdata)

});

d3.json("/api/v1.0/census").then(censusdata => {
    console.log(censusdata)
});

const years = []

censusdata.forEach(year => {

})

//loop through and collect each year and append to a year list

//add the years to a drop down

//pull the data of each year into variables to use in the chart

//create chart