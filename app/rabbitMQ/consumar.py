import pika
import json

from app.constants.constant import VALID_MODES
from app.utils.conversation_count import ConvCountService
from app.utils.env_config import EnvConfiguration
from app.utils.logger import get_logger

class RMQConnection:
    """Establish connection and start listening"""

    def __init__(self):
        try:
            self.logger = get_logger(__name__)
            self.env_variables = EnvConfiguration()
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(
                    self.env_variables.rmq_host,
                    self.env_variables.rmq_port,
                    '/', 
                    pika.PlainCredentials(self.env_variables.rmq_username, self.env_variables.rmq_password))
                )
            self.channel = connection.channel()
            self.channel.queue_declare(queue=self.env_variables.rmq_queue, durable=True)
        except Exception as e:
            self.logger.error("Error connecting to RabbitMQ: %s",str(e))
            raise Exception("Failed to connect to RabbitMQ")

        self.conv_count_service = ConvCountService()


    def start_consuming(self)->None:
        """Start listening for events"""
        self.channel.basic_consume(
            queue=self.env_variables.rmq_queue, on_message_callback=self.callback
        )
        self.logger.info("Started consuming messages...")
        self.channel.start_consuming()

    def callback(self, ch, method, properties, body):
        """Receiving messages from the channel"""
        try:
            data = json.loads(body)
            self.validate_message(data)
            result = self.conv_count_service.insert_conversation_count(data['user_id'],data['mode_name'])
            if result:
                ch.basic_ack(delivery_tag=method.delivery_tag)
                self.logger.info("data processed successfully")
            else:
                self.logger.error("unable to process queue data")
                ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)
        except ValueError as ve:
            self.logger.error("Not a valid json to process: %s",str(ve))
            ch.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            self.logger.error("Error processing queue data: %s",str(e))
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)
    
    def validate_message(self,data):
        """Validate the structure of incoming messages"""
        required_keys = ['user_id', 'mode_name']
        if not all(key in data for key in required_keys):
            raise ValueError(f"Invalid message format: {data}")
        if data['mode_name'] not in VALID_MODES:
            raise ValueError(f"Invalid mode: {data['mode_name']}")
