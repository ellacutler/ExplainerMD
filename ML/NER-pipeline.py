import spacy
from spacy.tokens import DocBin
from tqdm import tqdm
import json

''' Best custom model '''
custom_ner = spacy.load("ML/model_short/model-best")

''' Pre-trained bc5cdr model '''
bc5cdr_ner = spacy.load("en_ner_bc5cdr_md")
text = "Clopidogrel 75MG TABLET. Take 1 tablet by mouth every day"

'''Pipe bc5cdr model on top of custom'''
custom_ner.add_pipe("ner", name="bc5cdr", source=bc5cdr_ner)
doc = custom_ner(text)
for ent in doc.ents:
  print(ent.text,ent.label_)

'''Saving current'''
# custom_ner.to_disk("./ML/model_short/model_custom")
