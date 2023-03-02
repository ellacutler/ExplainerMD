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

''' Get best model'''
custom_ner = spacy.load("./model-best")

bc5cdr_ner = spacy.load("en_ner_bc5cdr_md")
text = "Northwestern M Medicine NMG Pharmacy Rx #: 7001996 Ryan Newkirk Take 1 tablet by mouth 2 days. penicillin VK 500 Generic for: VEETID Lori A. Schwarcz, MD NDC: 57237-041-99 RISING PHARM Exp: 7/31/2023 CAUTION Federal law prohibits the transfer of this drug to any pes"

bc5cdr_ner.add_pipe("ner", name="custom", source=custom_ner)
doc = bc5cdr_ner(text)
for ent in doc.ents:
  print(ent.text,ent.label_)
