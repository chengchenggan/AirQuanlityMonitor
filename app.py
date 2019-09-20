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

@app.route("/")
def index():
    return render_template('index.html')




@app.route("/2014-03-01")
def date_data():

    # Create a dictionary entry for each row of metadata information
    results = mongo.db.ca_avg.find({"date_local":"2016-03-01"},{'_id' : 0})
    # print(results)
    query_data = list(results)
    for data in query_data:
        print(data)
        print(type(data))
    #     sample_metadata["date_local"] = result[0]
    #     sample_metadata["aqi"] = result[1]
    #     sample_metadata["county_code"] = result[2]
        

    print(query_data)
    return jsonify(query_data)

# from .mongoflask import MongoJSONEncoder, ObjectIdConverter

# def create_app():
#     app = Flask(__name__)
#     app.json_encoder = MongoJSONEncoder
#     app.url_map.converters['objectid'] = ObjectIdConverter

#     # Client sends their string, we interpret it as an ObjectId
#     @app.route('/users/<objectid:user_id>')
#     def show_user(user_id):
#         # setup not shown, pretend this gets us a pymongo db object
#         db = get_db()

#         # user_id is a bson.ObjectId ready to use with pymongo!
#         results = mongo.db.ca_avg.find({"date_local":"2014-03-01"})
#         return jsonify(result)



if __name__ == "__main__":
    app.run(debug=True)
