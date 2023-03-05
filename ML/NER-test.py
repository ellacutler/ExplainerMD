import spacy

model = spacy.load("./ML/model_short/model_custom")

text = "Bob should take 5 pills of Vitamin C every evening"
doc = model(text)
for ent in doc.ents:
  print(ent.text,ent.label_)