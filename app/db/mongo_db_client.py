from threading import Lock
from typing import ClassVar
from pymongo import MongoClient
from pymongo.collection import Collection
from app.utils.env_config import EnvConfiguration
from app.utils.logger import get_logger

class SingletonMetaClass(type):
    """Singleton design pattern"""
    _instances: ClassVar[dict] = {}
    _lock: Lock = Lock()

    def __call__(cls, *args, **kwargs):
        with cls._lock:
            if cls not in cls._instances:
                instance = super().__call__(*args, **kwargs)
                cls._instances[cls] = instance
        return cls._instances[cls]

class MongDBClient(metaclass=SingletonMetaClass):
    """Connect mongoDB client"""
    def __init__(self):
        self.logger = get_logger(__name__)
        self.env_variables = EnvConfiguration()
        client = MongoClient(self.env_variables.mongo_uri)
        self.db = client[self.env_variables.mongo_db_name]
        self.logger.info("MongoDB client initialized successfully")

    def get_collection(self, collection_name)->Collection:
        """Get collection"""
        return self.db[collection_name]