import pika
import json
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', 5672, '/', pika.PlainCredentials('guest', 'guest')))

channel = connection.channel()
channel.queue_declare(queue='event_queue_4', durable=True)

# Send a message
message = {
    'user_id': 'DCNDJCN86',
    'mode_name': 'prime_mode',
}
M = json.dumps(message)
for i in range(5):
    print(f"Sent: {message}")

    channel.basic_publish(
    exchange='',  # Default exchange
    routing_key='event_queue_4',  # Name of the queue
    body=M,  # The message body (e.g., JSON string)
    properties=pika.BasicProperties(
        delivery_mode=2 
    )
    )


connection.close()