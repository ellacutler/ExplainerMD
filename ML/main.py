import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, request, jsonify
import spacy
import visionAPI as vision
import NERpipeline as NLP

app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
    'projectId': 'explainermd-cc5aa',
})


@app.route('/ner', methods=['POST'])
def ner():
    try:
        # Get input image from request
        img = "test/labelExampleCVS.png"

        # Convert img to text:
        text = vision.argparse()

        # Convert text to entities:
        doc = NLP.entities(text)

    except Exception as e:
        print(str(e))
        return 'Internal server error', 500