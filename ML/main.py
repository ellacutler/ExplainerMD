import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, request, jsonify
import spacy
import json
import visionAPI as vision
import NER as NLP
from flask_cors import CORS

import requests
import io
from PIL import Image

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response
# # Initialize Firebase Admin SDK
# cred = credentials.ApplicationDefault()
# firebase_admin.initialize_app(cred, {
#     'projectId': 'explainermd-cc5aa',
# })


@app.route('/ner', methods=['POST'])
def ner():
    try:
        # Get input image binary file data from request
        file = request.get_data()     
        # Convert that to text
        text = vision.detect_text_in_image_binary(file)
        # Convert text to entities:
        doc = NLP.entities(text)
        # Convert to JSON:
        doc_dict = {}
        for ent in doc.ents:
            doc_dict[ent.label_] = ent.text
            # THIS IS SORT OF AN ISSUE WITH THE MODEL, IT CAN FIND MULTIPLE OF THE SAME THING!
            print("this label "+str(ent.label_)+" got this text "+str(ent.text))
    
        return json.dumps(doc_dict)

    except Exception as e:
        print(str(e))
        print("rip")
        return json.dumps({'Internal server error': 500})
    
@app.route('/ner', methods=['GET'])
def ner_get():
    return 'get works'