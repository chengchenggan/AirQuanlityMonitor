from flask import Flask, render_template
from flask_pymongo import PyMongo
import scrape_craigslist

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/ca_data"
mongo = PyMongo(app)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/visual1")
def visual1():
# incomplete for now...

if __name__ == "__main__":
    app.run(debug=True)
