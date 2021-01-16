# import necessary libraries
# from models import create_classes
# import os
# import [SCRAPE file]

from flask_pymongo import PyMongo
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    url_for,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################


# --------SAMPLE FROM MISSION_TO_MARS-----------------
# Use flask_pymongo to set up mongo connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
# mongo = PyMongo(app)

# create route that renders index.html template home/landing page
@app.route("/")
def home():
    return render_template("index.html")

# MAP page
@app.route("/map")
def map():
    return render_template("map.html")  

# PLOTS page
@app.route("/plots")
def plots():
    return render_template("plots.html")

# TABLE page
@app.route("/table")
def table():
    return render_template("table.html")

# LEAFLET page
@app.route("/leaflet")
def leaflet():
    return render_template("leaflet.html")



#  --------SAMPLE FROM HEROKU---------------
# Query the database and send the jsonified results
@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        name = request.form["petName"]
        lat = request.form["petLat"]
        lon = request.form["petLon"]

        pet = Pet(name=name, lat=lat, lon=lon)
        db.session.add(pet)
        db.session.commit()
        return redirect("/", code=302)

    return render_template("form.html")


#  --------SAMPLE FROM HEROKU---------------
# @app.route("/api/pals")
# def pals():
#     results = db.session.query(Pet.name, Pet.lat, Pet.lon).all()

#     hover_text = [result[0] for result in results]
#     lat = [result[1] for result in results]
#     lon = [result[2] for result in results]

#     pet_data = [{
#         "type": "scattergeo",
#         "locationmode": "USA-states",
#         "lat": lat,
#         "lon": lon,
#         "text": hover_text,
#         "hoverinfo": "text",
#         "marker": {
#             "size": 50,
#             "line": {
#                 "color": "rgb(8,8,8)",
#                 "width": 1
#             },
#         }
#     }]

    return jsonify(pet_data)


if __name__ == "__main__":
    app.run()
