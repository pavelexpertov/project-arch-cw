import pymongo
import pandas as pd
from os import path

# Delete collection if one already exists
client = pymongo.MongoClient()
db = client.data_set
db.drop_collection('sales')

# Converting data to JSON records
train_csv_path = "data/clean_data/train.csv"
train_csv_path = path.abspath(train_csv_path)
train_csv = pd.read_csv(train_csv_path)
json_format_train_data = train_csv.to_dict(orient="records")

# Inserting data into the database
collection = db.sales
result = collection.insert_many(json_format_train_data)
print("Number of records inserted:", len(result.inserted_ids))
print("Number of records in the collection: ", collection.count())
