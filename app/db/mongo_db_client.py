from pymongo import MongoClient
from app.utils.env_config import EnvConfiguration


class MongDBClient:
    def __init__(self):
        self.env_variables = EnvConfiguration()
        client = MongoClient(self.env_variables.mongo_uri)
        self.db = client[self.env_variables.mongo_db_name]
        print("MongoDB client initialized")
    
    def get_collection(self, collection_name):
        return self.db[collection_name]