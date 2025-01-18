import pika
import json

from app.constants.constant import VALID_MODES
from app.utils.conversation_count import ConvCountService
from app.utils.env_config import EnvConfiguration

class RMQConnection:
    """Establish connection and start listening"""

    def __init__(self):
        # try:
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
        # except Exception as e:
        #     print(f"Error connecting to RabbitMQ: {str(e)}")
        #     raise Exception("Failed to connect to RabbitMQ")

        self.conv_count_service = ConvCountService()


    def start_consuming(self)->None:
        """Start listening for events"""
        print("Started consuming messages...")
        self.channel.basic_consume(
            queue=self.env_variables.rmq_queue, on_message_callback=self.callback
        )
        self.channel.start_consuming()
        # try:
           
        #     print("Started consuming messages...")
        # except Exception as e:
        #    print(f"Error while consuming messages: {e}")

    def callback(self, ch, method, properties, body):
        """Receiving messages from the channel"""
        print(body)
        try:
            data = json.loads(body)
            self.validate_message(data)
            result = self.conv_count_service.insert_conversation_count(data['user_id'],data['mode_name'])
            if result:
                ch.basic_ack(delivery_tag=method.delivery_tag)
            else:
                print("unable to process queue data")
                ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)
        except ValueError as ve:
            print(f"Not a valid json to process: {ve}")
            ch.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            print(f"Error processing queue data: {str(e)}")
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)
    
    def validate_message(self,data):
        """Validate the structure of incoming messages"""
        required_keys = ['user_id', 'mode_name']
        if not all(key in data for key in required_keys):
            raise ValueError(f"Invalid message format: {data}")
        if data['mode_name'] not in VALID_MODES:
            raise ValueError(f"Invalid mode: {data['mode_name']}")
