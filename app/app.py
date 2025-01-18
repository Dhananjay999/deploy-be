from threading import Thread
from app.api.endpoints import create_app
from app.rabbitMQ.consumar import RMQConnection

def run_consumer()->None:
    """Run RabbitMQ consumer in a separate thread."""
    RMQConnection().start_consuming()

def main():
    """Initializing RabbitMQ and Flask"""
    # Initialize database
    # init_db()

    # Start RabbitMQ consumer in a background thread
    consumer_thread = Thread(target=run_consumer, daemon=True)
    consumer_thread.start()

    # # Start Flask API
    app = create_app()
    app.run(host="0.0.0.0", port=5000,debug=True)

if __name__ == "__main__":
    main()
