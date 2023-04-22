import spacy
from spacy.tokens import DocBin
from tqdm import tqdm
import json


'''Wrapper function to obtain entity'''
def entities(text):
  model = spacy.load("./model_short/model_custom")
  return model(text)
