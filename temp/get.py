import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', 5672, '/', pika.PlainCredentials('guest', 'guest')))
channel = connection.channel()

channel.queue_declare(queue='event_queue')

def callback(ch, method, properties, body):
    print(f"Received: {body.decode()}")

channel.basic_consume(queue='event_queue_2', on_message_callback=callback)

print("Waiting for messages. To exit press Ctrl+C")
channel.start_consuming()
