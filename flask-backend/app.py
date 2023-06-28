from flask import Flask, request, send_from_directory
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
from embedding import load_recommender
from generate_respond import ask_file
app = Flask(__name__)
CORS(app)  # Enable CORS here
from flask import jsonify
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
recommender=None
@app.route('/upload', methods=['POST'])
def upload_file():
    global  recommender
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        filename = secure_filename(file.filename)
        path=os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(path)

        _,recommender=load_recommender(recommender,path+".")
        return {'message': 'File uploaded successfully', 'filename': filename}


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/message', methods=['POST'])
def message():
    data = request.get_json()
    question = data.get('message')
    if question:
        # Generate response from your ask_file function
        response = ask_file(question, recommender)
        return jsonify({'response': response})
    else:
        return jsonify({'response': 'No message received'})

