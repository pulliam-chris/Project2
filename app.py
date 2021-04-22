# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
from flask_pymongo import PyMongo
from flask import Flask, render_template, redirect, url_for


# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
app.config["MONGO_URI"] = "mongodb://localhost:27017/phone_app"
mongo = PyMongo(app)

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.accident_db

#iterate through data to import rows into MongoDB as seperate documents

@app.route("/")
def index():
#    accid = mongo.db.accidents.find_one()
    return render_template("index.html")
=======
from flask import Flask, render_template, redirect, url_for, jsonify
from flask_pymongo import PyMongo
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

app = Flask(__name__)


@app.route("/")





#keep this at the bottom
if __name__ == "__main__":
    app.run(debug=True)
>>>>>>> 89f8a952c05f83c1dfa15226889a6179f8ab2e37
