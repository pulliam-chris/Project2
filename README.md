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

- Moosavi, Sobhan, Mohammad Hossein Samavatian, Srinivasan Parthasarathy, and Rajiv Ramnath. “A Countrywide Traffic Accident Dataset.”, 2019.

- Moosavi, Sobhan, Mohammad Hossein Samavatian, Srinivasan Parthasarathy, Radu Teodorescu, and Rajiv Ramnath. "Accident Risk Prediction based on Heterogeneous Sparse Data: New Dataset and Insights." In proceedings of the 27th ACM SIGSPATIAL International Conference on Advances in Geographic Information Systems, ACM, 2019.
(Start Time End Time Start Lat Lng End Lat Lng Severity)

Possible Geo JSON (neighborhood files)
https://gis-pdx.opendata.arcgis.com/datasets/neighborhood-boundaries?geometry=-123.189%2C45.459%2C-122.146%2C45.627

# ______________________________________________

# Portland MVA Project 

## To run this page, you must follow the steps below:
1) Run the requirements.txt file to create the necessary enviromnent
2) Clone this repository and pull down the files and folders 
3) Go to the Kaggle website (link posted below) and download and save the US_Accidents_Dec20.csv to the accident_data\data folder
  https://www.kaggle.com/sobhanmoosavi/us-accidents

*** (This section can be completed but is discretionary since the Census JSON data file is present in the repository.)

4) Request a census.gov api key
5) Create a config.py file and copy your API key to that file

*** (If no changes are desired jump to MongoDB download)

6) Download MongoDB Compass
  https://www.mongodb.com/try/download/compass
7) Run the accidents_data\accidents.ipynb jupyter notebook
8) Request a mapbox api key for Leaflet ploting  https://account.mapbox.com/
9) Add that API_KEY to a static/js/config.js file
10) Run the app.py file in your your terminal to activate flask locally

### Census data 
 - See: https://github.com/datamade/census for library documentation
 - See: https://gist.github.com/afhaque/60558290d6efd892351c4b64e5c01e9b for labels

### Citing our visualization resources:
- Highcharts JS : https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/combo-dual-axes
- Bootstrap template : https://startbootstrap.com/previews/one-page-wonder
- Luxon JS (DateTime) library : https://moment.github.io/luxon/

### Importing data from Jupyter Notebook into MongoDB
*Accident Data*

![Mongo Accidents](https://github.com/pulliam-chris/Project2/blob/main/images/Mongo_accidents.JPG)

*Census Data*

![Mongo Census](https://github.com/pulliam-chris/Project2/blob/main/images/Mongo_census.JPG)

*Your mongo database should look similar to the image below with the Database titled accidents_db and 2 collections within - One called accidents and one called census.

![Screen Shot 2021-04-30 at 8 37 32 PM](https://user-images.githubusercontent.com/75045133/116770575-d6c33400-a9f9-11eb-8ecc-2b3429f93170.png)

*API Endpoints*

![API Endpoints](https://github.com/pulliam-chris/Project2/blob/main/images/API_endpoints.JPG)

