# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
from flask_pymongo import PyMongo
from flask import Flask, render_template, redirect, url_for


# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
app.config["MONGO_URI"] = "mongodb://localhost:27017"
mongo = PyMongo(app)

# Pass connection to the pymongo instance.
#client = pymongo.MongoClient()

# Connect to a database. Will create one if not already available.
#db = client.accident_db

#iterate through data to import rows into MongoDB as seperate documents

@app.route("/")
def index():
#    accid = mongo.db.accidents.find_one()
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)

