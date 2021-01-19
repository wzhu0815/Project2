rom flask import Flask, render_template, redirect
import pymongo
import scrape_mars


# Use PyMongo to establish Mongo connection
client = pymongo.MongoClient('mongodb://localhost:27017')
db = airline_db
collection = db.airline 
# Create an instance of Flask
app = Flask(__name__)


# Route to render index.html template using data from Mongo
@app.route('/')
def home():
	airline = collection.find_one()
	return render_template('index.html', airline=airline)

@app.route('/scrape')
def scrape():
	scrap2.scrape()
	return redirect('/', code = 302)

 


if __name__ == "__main__":
    app.run(debug=True)