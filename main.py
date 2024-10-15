from flask import Flask,render_template, jsonify, request

app = Flask(__name__)

# Basic route
@app.route('/')
def home():
    return "Welcome to the Python Backend!"

# API route with JSON response
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'message': 'Hello, this is a basic API response!',
        'status': 200
    }
    return jsonify(data)
@app.route('/get/metatags', methods=['GET'])
def metaTags():
    meta_tags = {
        "title": "Home Page",
        "description": "This is the home page of my Flask app",
        "keywords": "Flask, Python, Web Development",
    }
    return render_template('index.html', meta_tags=meta_tags)

@app.route('/get/metatags2', methods=['GET'])
def metaTags2():
    meta_tags = {
        "title": "Home Page",
        "description": "This is the home page of my Flask app",
        "keywords": "Flask, Python, Web Development",
    }
    return render_template('index2.html', meta_tags=meta_tags)
# API route to handle POST requests
@app.route('/api/post', methods=['POST'])
def post_data():
    content = request.json
    data = request.json
    return jsonify({
        'received_data': content,
        'status': 'Success'
    })

if __name__ == '__main__':
    app.run(debug=True)
