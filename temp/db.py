from flask import Flask,jsonify
from pymongo import MongoClient
import json

app = Flask(__name__)

# Set the MongoDB URI for your container
client = MongoClient("mongodb://localhost:27017")
db = client["testDatabase"]

@app.route('/')
def home():
    # Example: Querying a collection in MongoDB
    users = db.users.find()  # Accessing the "users" collection
    
    return jsonify(json.loads(json.dumps(users)))

if __name__ == "__main__":
    app.run(debug=True)
