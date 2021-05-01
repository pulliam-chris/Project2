# Project2 - US Auto Accident Analysis Proposal

Members:
- Chris Pulliam
- Brienne Cole
- Patrice Woida
- Rylee Ahnen

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

# ______________________________________________

# Portland MVA Project 

## To run this page, you must follow the steps below:
1) Run the requirements.txt file to create the necessary enviromnent
2) Clone this repository and pull down the files and folders 
3) Go to the Kaggle website (link posted below) and download and save the US_Accidents_Dec20.csv to the Data folder
  https://www.kaggle.com/sobhanmoosavi/us-accidents
4) Request a census.gov api key
5) Create a config.js file and copy your API key to that file
6) ** not sure how to retrieve and convert the census data**
7) Download MongoDB Compass
  https://www.mongodb.com/try/download/compass
8) Run the jupyter notebook
9) Run the app.py file in your your terminal
10) VOILA!!

### Census data 
 - See: https://github.com/datamade/census for library documentation
 - See: https://gist.github.com/afhaque/60558290d6efd892351c4b64e5c01e9b for labels

### Citing our visualization resources:
- Highcharts : https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/combo-dual-axes
- Bootstrap template : https://startbootstrap.com/previews/one-page-wonder
- Luxon library : https://moment.github.io/luxon/

### Importing data from Jupyter Notebook into MongoDB
*Accident Data*

![Mongo Accidents](https://github.com/pulliam-chris/Project2/blob/main/images/Mongo_accidents.JPG)

*Census Data*

![Mongo Census](https://github.com/pulliam-chris/Project2/blob/main/images/Mongo_census.JPG)

*Your mongo database should look similar to the image below with the Database titled accidents_db and 2 collections within - One called accidents and one called census.



*API Endpoints*

![API Endpoints](https://github.com/pulliam-chris/Project2/blob/main/images/API_endpoints.JPG)

