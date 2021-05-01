# Project2 - US Auto Accident Analysis

Members:
Chris Pulliam
Brienne Cole
Patrice Woida
Rylee Ahnen

Kaggle has a recent dataset of gathered US Auto Accidents.  The accident contain Lat Lng location information so we plan to clean the data and make visualization clustering the accident markers to analyze high volume areas.

Then we plan to collect GEO JSON data on those high volume accident areas to make another visualization representing the start-end lat lngs for the accidents and representing them in neightborhood areas such as the Portland neighborhood information listed below.

We also plan to factor in Census data to see if the demographics of the neighborhood have any correlation to the number of accidents for that zip code.  We believe that if the median age of the neighborhood is a younger age then accident rate will be higher.  We also believe that the poverty rate will make a difference in the number of reported accidents.  Our theory is that the higher the poverty rate the lower number of accidents.  

With these two data sets we are telling a story of accident data across the rose city. 

US Accident Dataset (2016-2020, 4.2 million records) - initially we will likely parse down the dataset to cover 2019-2020 due to the volume of records.
https://www.kaggle.com/sobhanmoosavi/us-accidents
(Start Time
End Time
Start Lat Lng
End Lat Lng
Severity)


Possible Geo JSON (neighborhood files)
https://gis-pdx.opendata.arcgis.com/datasets/neighborhood-boundaries?geometry=-123.189%2C45.459%2C-122.146%2C45.627

Census Data
- See: https://github.com/datamade/census for library documentation
- See: https://gist.github.com/afhaque/60558290d6efd892351c4b64e5c01e9b for labels




![API_endpoints](https://user-images.githubusercontent.com/73665660/116767835-817e2700-a9e7-11eb-9f60-0b703c1b8cbf.JPG)

![API_endpoints](https://github.com/pulliam-chris/Project2/blob/main/images/API_endpoints.JPG)







Visualization sources:
 - Highcharts : https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/combo-dual-axes
 - Bootstrap website layout: https://startbootstrap.com/previews/one-page-wonder
 - Luxon: https://moment.github.io/luxon/

