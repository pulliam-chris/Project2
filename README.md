# Project2 - US Auto Accident Analysis Proposal

Members:
Chris Pulliam
Brienne Cole
Patrice Woida
Rylee Ahnen

Kaggle has a recent dataset of gathered US Auto Accidents.  The accident contain Lat Lng location information so we plan to clean the data and make visualization clustering the accident markers to analyze high volume areas.

Then we plan to collect GEO JSON data on those high volume accident areas to make another visualization representing the start-end lat lngs for the accidents and representing them in neightborhood areas such as the Portland neighborhood information listed below.

We also plan to use Census data to see if the demographics per neighborhood play a role in the number of accidents. We are predicting that the younger the median age of neighborhood will result in a higher accident rate,  and that the higher the poverty rate the lower the accident rate.  A higher poverty rate we believe will have factors such as a lower vehicle ownership rate and less of a chance that the accident will be reported.

The end result will show a story of the accident data across the rose city.



US Accident Dataset (2016-2020, 4.2 million records) - initially we will likely parse down the dataset to cover 2019-2020 due to the volume of records.
https://www.kaggle.com/sobhanmoosavi/us-accidents
(Start Time
End Time
Start Lat Lng
End Lat Lng
Severity)


Possible Geo JSON (neighborhood files)
https://gis-pdx.opendata.arcgis.com/datasets/neighborhood-boundaries?geometry=-123.189%2C45.459%2C-122.146%2C45.627

#________________________________________________________________________________________________________________________________

Census data 
 - See: https://github.com/datamade/census for library documentation
 - See: https://gist.github.com/afhaque/60558290d6efd892351c4b64e5c01e9b for labels

Citing our visualization resources:
- Highcharts : https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/combo-dual-axes
- Bootstrap template : https://startbootstrap.com/previews/one-page-wonder
- Luxon library : https://moment.github.io/luxon/
