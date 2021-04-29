from flask import Flask, render_template, redirect, url_for, jsonify
from flask_pymongo import PyMongo
#import plot
import pprint
import numpy as np

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/accidents_db"
mongo = PyMongo(app)

# Or set inline
# mongo = PyMongo(app, uri="mongodb://localhost:27017/accidents")

pp = pprint.PrettyPrinter(indent=4)
accidentinfo = mongo.db.accidents.find( {} )
pp.pprint(accidentinfo)

@app.route("/")
def index():
    dbinfo = mongo.db.accidents.find({}, {"_id": 0 })
    accidentinfo = jsonify(tuple(dbinfo))
    #pp.pprint(accidentinfo)
    return render_template("index2.html", accidentinfo = accidentinfo)



@app.route("/api/v1.0/accidents")
def accidents():
    dbinfo = mongo.db.accidents.find({}, {"_id": 0 })
    accidentinfo = jsonify(tuple(dbinfo))
    #pp.pprint(accidentinfo)
    return accidentinfo
#    #return render_template("index.html", accidentinfo=accidentinfo)
#    return redirect(url_for('index'), code=302)

@app.route("/api/v1.0/census")
def census():
    dbinfo = mongo.db.census.find({}, {"_id": 0 })
    censusinfo = jsonify(tuple(dbinfo))
    #pp.pprint(accidentinfo)
    return censusinfo

#@app.route("/api/v1.0/census/<year>")
#def census_year(year):
#    dbinfo = mongo.db.census.find({}, {"_id": 0, "Year": year, "Household Income": 1, "Median Age": 1, "Per Capita Income": 1, "Population" : 1, "Poverty Count" : 1, "Poverty Rate": 1, "Zipcode": 1})
#    censusinfo = jsonify(tuple(dbinfo))
    #pp.pprint(accidentinfo)
#    return censusinfo

if __name__ == "__main__":
    app.run(debug=True)
