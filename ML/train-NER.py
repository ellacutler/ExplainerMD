import spacy
from spacy.tokens import DocBin
from tqdm import tqdm
import json

''' Initialize Spacy NLP model '''
nlp = spacy.blank("en")
db = DocBin()

f = open('training_data.json')
train = json.load(f)

for text, annot in tqdm(train['annotations']):
    doc = nlp.make_doc(text)
    ents = []
    for start, end, label in annot['entities']:
        span = doc.char_span(start, end, label=label, alignment_mode="contract")
        if span is None:
            print("Skipping entity")
        else:
            ents.append(span)
    doc.ents = ents
    db.add(doc)

db.to_disk('./training_data.spacy')