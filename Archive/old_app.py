import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_pymongo import PyMongo

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/ca_data"
mongo = PyMongo(app)

# @app.route("/")
# def index():
#     return render_template('index.html')

@app.route("/2017-03-01")
def date_data():

    # Create a dictionary entry for each row of metadata information
    results = mongo.db.ca_avg.find({"date_local":"2016-03-01"},{'county_code': 1, 'aqi': 1, '_id' : 0})
    # print(results)
    query_data = list(results)
    for data in query_data:
        print(data)
    #     sample_metadata["date_local"] = result[0]
    #     sample_metadata["aqi"] = result[1]
    #     sample_metadata["county_code"] = result[2]
        

    print(query_data)
    return jsonify(query_data)

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/test-1")
def ca_avg():
    my_collection = db['ca_avg']
    mydoc = my_collection.find({'date_local': ''}, {'county_code': 1, 'aqi': 1, '_id': 0})
    return_list = []
    for x in mydoc:
        if x["aqi"] < 50:
            x["level"] = "good"
        elif x["aqi"] < 100:
            x["level"] = "moderate"
        elif x["aqi"] < 150:
            x["level"] = "unhealthy for sensitive groups"
        elif x["aqi"] < 200:
            x["level"] = "unhealthy"
        elif x["aqi"] < 300:
            x["level"] = "very unhealthy"
        elif x["aqi"] >= 300:
            x["level"] = "hazardous"
        return_list.append(x)
    return jsonify(return_list)
