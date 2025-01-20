import json
from threading import Lock
from typing import ClassVar
from app.utils.logger import get_logger

PATH = ".env.json"

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

class EnvConfiguration(metaclass=SingletonMetaClass):
    """Load environment variables from a JSON file."""
    def __init__(self):
        self.logger = get_logger(__name__)
        self.path = PATH
        self.env_vars = self.get_env_var()
        self.mongo_uri:str = self.env_vars['MONGO_URI']
        self.mongo_db_name:str = self.env_vars['MONGO_DB_NAME']
        self.rmq_username:str = self.env_vars['RMQ_USERNAME']
        self.rmq_password:str = self.env_vars['RMQ_PASSWORD']
        self.rmq_host:str = self.env_vars['RMQ_HOST']
        self.rmq_port:str = self.env_vars['RMQ_PORT']
        self.rmq_queue:str = self.env_vars['RMQ_QUEUE_NAME']
        self.port:int = self.env_vars['PORT']


    def get_env_var(self) -> dict:
        """Load environment variables from the JSON file."""
        try:
            with open(self.path) as file:
                self.logger.info("env variables parsed successfully")
                return json.load(file)
        except json.JSONDecodeError as e:
            msg = f"Error while decoding JSON {self.path}: {e}"
            self.logger.error(msg)
            raise KeyError(msg) from e
        except FileNotFoundError:
            msg = f"File Not Found: {self.path}"
            self.logger.error(msg)
            raise KeyError(msg) from None

