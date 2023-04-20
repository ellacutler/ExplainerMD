import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, request, jsonify
import spacy
import json
import visionAPI as vision
import NER as NLP

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
        img_path = "test/labelExampleCVS.png"

        # Convert img to text:
        text = vision.detect_text_in_image(img_path)

        # Convert text to entities:
        doc = NLP.entities(text)

        # Convert to JSON:
        doc_dict = {}
        for ent in doc.ents:
            doc_dict[ent.label_] = ent.text

        return json.dumps(doc_dict)

    except Exception as e:
        print(str(e))
        return 'Internal server error', 500