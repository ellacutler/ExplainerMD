import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, request, jsonify, redirect, send_from_directory, render_template, url_for
from flask_cors import CORS
import spacy
import json
import visionAPI as vision
import NER as NLP
from flask_cors import CORS

import os
import openai
import requests
import io
from PIL import Image

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
os.environ["OPENAI_API_KEY"] = "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"
openai.api_key = os.getenv("OPENAI_API_KEY")
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
        text = vision.detect_text_in_image_binary(file)
        doc = NLP.entities(text)
        # Convert to JSON:
        doc_dict = {}
        for ent in doc.ents:
            doc_dict[ent.label_] = ent.text
            # THIS IS SORT OF AN ISSUE WITH THE MODEL, IT CAN FIND MULTIPLE OF THE SAME THING!
            print("this label "+str(ent.label_)+" got this text "+str(ent.text))
        print("final dict:")
        print(json.dumps(doc_dict))
        return json.dumps(doc_dict)

    except Exception as e:
        print(str(e))
        print("rip")
        return json.dumps({'Internal server error': 500})
    
@app.route('/ner', methods=['GET'])
def ner_get():
    return 'get works'
    

global history
history = [{"role": "system", "content": f"You are a health assistant"},
           {"role": "user", "content": f"You are a health assistant. Given the symptoms that the user describes, come up with possible medical conditions and what type of doctor can address it."},]

@app.route("/", methods=("GET", "POST"))
def index():

    # Get text inputted by user
    if request.method == "POST":
        text = "bla bla bla"
        history.append({"role":"user", "content":text})   # append user's message to conversation history

        response = openai.ChatCompletion.create(          # generate GPT's response
            model="gpt-3.5-turbo",
            messages=history
        )
        response_text = response['choices'][0]['message']['content']

        history.append({"role":"assistant", "content":response_text}) # append GPT's response to conversation history
        return response_text
