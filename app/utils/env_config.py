import json

PATH = ".env.json"

class EnvConfiguration:
    """Load environment variables from a JSON file."""
    def __init__(self):
        self.path = PATH
        self.env_vars = self.get_env_var()
        self.mongo_uri:str = self.env_vars['MONGO_URI']
        self.mongo_db_name:str = self.env_vars['MONGO_DB_NAME']
        self.rmq_username:str = self.env_vars['RMQ_USERNAME']
        self.rmq_password:str = self.env_vars['RMQ_PASSWORD']
        self.rmq_host:str = self.env_vars['RMQ_HOST']
        self.rmq_port:str = self.env_vars['RMQ_PORT']
        self.rmq_queue:str = self.env_vars['RMQ_QUEUE_NAME']

    def get_env_var(self) -> dict:
        """Load environment variables from the JSON file."""
        try:
            with open(self.path) as file:
                return json.load(file)
        except json.JSONDecodeError as e:
            msg = f"Error while decoding JSON {self.path}: {e}"
            raise KeyError(msg) from e
        except FileNotFoundError:
            msg = f"File Not Found: {self.path}"
            raise KeyError(msg) from None

