import pika
import json
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', 5672, '/', pika.PlainCredentials('guest', 'guest')))

channel = connection.channel()
channel.queue_declare(queue='event_queue', durable=True)

# Send a message

for i in range(3):
    message = {
    'user_id': f'DCNDJCN86{i}',
    'mode_name': 'research_mode',
    }
    print(f"Sent: {message}")
    M = json.dumps(message)

    channel.basic_publish(
    exchange='',  # Default exchange
    routing_key='event_queue',  # Name of the queue
    body=M,  # The message body (e.g., JSON string)
    properties=pika.BasicProperties(
        delivery_mode=2 
    )
        )


connection.close()