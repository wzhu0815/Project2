import pymongo
import requests
from splinter import Browser
from bs4 import BeautifulSoup as bs
import pandas as pd
import time

# For all reference homeworks on database setup and creation, scrape craigslist, and scrape costa example homeworks 
# https://www.w3schools.com/python/python_mongodb_create_db.asp

client = pymongo.MongoClient('mongodb://localhost:27017')
db = client.airline_db
collection = db.airline 

def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {'executable_path': 'C:/Users/IRENE/.wdm/drivers/chromedriver/win32/87.0.4280.20/chromedriver.exe'}
    return Browser("chrome", **executable_path,headless=False)

def scrape():
    browser = init_browser()
    collection.drop()

    
def scrape():
    browser = init_browser()
    url = 'https://www.faa.gov/news/search/?searchString=2018&newsTypeId=1'
    browser.visit(url)
    time.sleep()
    html = browser.html 
    soup = bs(html, 'lxml')
    date = []
    title = []

 # visit Nasa Mars news, find elements of title and define

  
    for x in range(0, 12):
        date.append(soup.select('small')[32+x].text)
        title.append(soup.select('a')[128+x].text)
    table = pd.DataFrame({'date': date,'title': title})
    
    browser.quit()
    return table
# JPL Mars Space Images -visit Featured Image find elements and define path. 
# ref: https://www.w3schools.com/python/ref_string_rstrip.asp;
   
        
   
    airline_html = table.to_html(header=False, index=False)
    


    # Return results,store in dictionary ref: lesson 3,5/6. Homeworks on databse creation and scrape/craigslist
    airline_data ={
         'airline_table': airline_html,
        
        }
    collection.insert(airline_data)





