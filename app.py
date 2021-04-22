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