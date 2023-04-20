import spacy

model = spacy.load("./ML/model_short/model_custom")

text1 = "Bob should take 5 pills of Vitamin C every evening"
text2 = "Clopidogrel 75MG TABLET. Take 1 tablet by mouth every day. He has stage 4 cancer"
doc = model(text2)
for ent in doc.ents:
  print(ent.text,ent.label_)