from flask import Flask, render_template, redirect
import pymongo

import pandas as pd

# import yahoo finance
import yfinance as yf

from datetime import date, timedelta

def get_price():
    # Query oil price from yahoo finance
    today = date.today()
    query_date = today - timedelta(days=4)
    query_date_string = str(query_date.year)+'-'+str(query_date.month)+'-'+str(query_date.day)
    stock_data_df = yf.download("CMG", start=query_date_string, group_by="ticker")
    closing_price = stock_data_df.iloc[stock_data_df.shape[0]-1]['Close']
    change = closing_price - stock_data_df.iloc[stock_data_df.shape[0]-1]['Open']
    return [closing_price,change]

oil_price_list = get_price()

app = Flask(__name__)

# setup mongo connection
client = pymongo.MongoClient("mongodb://localhost:27017")

# connect to mongo db and collection
# pymongo.list_collection_names()
db = client.oil_price_data

try:
    db.oil_price_data.drop()
except:
    x = 1

oil_price_data = db.oil_price_data

oil_prices = {
    'price':oil_price_list[0],
    'change':oil_price_list[1]
}
oil_price_data.insert_many([oil_prices])

@app.route("/")
def index():
    returned_data  = list(oil_price_data.find())
    if returned_data[0]['change']<0:
        color = 'red'
    elif returned_data[0]['change']>0:
        color = 'green'
    else:
        color = 'black'
    # render an index.html template and pass it the data you retrieved from the database
    return render_template("index.html", oil_price=returned_data[0]['price'], oil_chage=returned_data[0]['change'], percent = returned_data[0]['change']/returned_data[0]['price']*100, color=color)

@app.route("/about")
def about():
    return render_template("about.html")


# @app.route('/scrape')
# def scrape_update():
#     try:
#         print('drop data.')
#         db.mars_data.drop()
#     except:
#         print('do not drop data.')
#         x = 1

#     mars_data = db.mars_data

#     scraped_data = scrape(5)

#     mars_data.insert_many([scraped_data])



#     return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)