from bs4 import BeautifulSoup as bs
import pandas as pd
import requests
from splinter import Browser
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import os
def init_browser():
    executable_path = {'executable_path': '/Users/adamkatz/.wdm/drivers/chromedriver/mac64/87.0.4280.20/chromedriver'}
    return Browser('chrome', **executable_path, headless=False)
# use your own executable path, dont just use mine.

def scrape():
    browser = init_browser()
    url = 'https://www.faa.gov/news/search/?searchString=2018&newsTypeId=1'
    browser.visit(url)
    html = browser.html 
    soup = bs(html, 'lxml')
    date = []
    title = []

    for x in range(0, 12):
        date.append(soup.select('small')[32+x].text)
        title.append(soup.select('a')[128+x].text)
    table = pd.DataFrame({'date': date,'title': title})
    
    browser.quit()
    return table
    


