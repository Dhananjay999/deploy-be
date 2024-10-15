from flask import Flask,render_template, jsonify, request

app = Flask(__name__)
apiEndPoint = 'abc'
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
@app.route('/get/'+apiEndPoint, methods=['GET'])
def metaTags():
    meta_tags = {
        "title": "Home Page",
        "description": "This is the home page of my Flask app",
        "keywords": "Flask, Python, Web Development",
    }
    return render_template('index.html', meta_tags=meta_tags)

@app.route('/get/'+apiEndPoint+'2', methods=['GET'])
def metaTags2():
    meta_tags = {
        "title": "Home Page",
        "description": "This is the home page of my Flask app",
        "keywords": "Flask, Python, Web Development",
    }
    return render_template('index2.html', meta_tags=meta_tags)
@app.route('/get/'+apiEndPoint+'3', methods=['GET'])
def metaTags3():
    meta_tags = {
        "title": "Home Page",
        "description": "This is the home page of my Flask app",
        "keywords": "Flask, Python, Web Development",
    }
    return render_template('index3.html', meta_tags=meta_tags)
@app.route('/get/'+apiEndPoint+'4', methods=['GET'])
def metaTags4():
    meta_tags = {
        "title": "Home Page",
        "description": "This is the home page of my Flask app",
        "keywords": "Flask, Python, Web Development",
    }
    return render_template('index4.html', meta_tags=meta_tags)
@app.route('/get/'+apiEndPoint+'5', methods=['GET'])
def metaTags5():
    meta_tags = {
        "title": "Home Page",
        "description": "This is the home page of my Flask app",
        "keywords": "Flask, Python, Web Development",
    }
    return render_template('index5.html', meta_tags=meta_tags)
# API route to handle POST requests
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
