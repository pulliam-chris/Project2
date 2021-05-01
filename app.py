from flask import Flask, render_template, redirect, url_for, jsonify
from flask_pymongo import PyMongo
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
    # Render HTML homepage
    return render_template("index2.html", accidentinfo = accidentinfo)

@app.route("/api/v1.0")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"<a href='/api/v1.0/accidents'>accidents</a><br/>"
        f"<a href='/api/v1.0/census'>census</a><br/>"
        f"Each endpoint returns the full Mongo Collection to be captured with D3 and parsed with javascript.")


@app.route("/api/v1.0/accidents")
def accidents():
    # Returns full JSONIFIED collection
    dbinfo = mongo.db.accidents.find({}, {"_id": 0 })
    accidentinfo = jsonify(tuple(dbinfo))
    return accidentinfo

@app.route("/api/v1.0/census")
def census():
    # Returns full JSONIFIED collection
    dbinfo = mongo.db.census.find({}, {"_id": 0 })
    censusinfo = jsonify(tuple(dbinfo))
    return censusinfo

if __name__ == "__main__":
    app.run(debug=True)
