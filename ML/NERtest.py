import spacy

model = spacy.load("./ML/model_short/model_custom")

text1 = "Bob should take 5 pills of Vitamin C every evening"
text2 = "Clopidogrel 75MG TABLET. Take 1 tablet by mouth every day. He has stage 4 cancer"
doc = model(text2)
for ent in doc.ents:
  print(ent.text,ent.label_)

''' Best custom model '''
custom_ner = spacy.load("ML/model_short/model-best", disable=["parser"])

''' Pre-trained bc5cdr model '''
bc5cdr_ner = spacy.load("en_ner_bc5cdr_md")


''' Pipe bc5cdr model on top of custom '''
custom_ner.add_pipe("ner", name="bc5cdr", source=bc5cdr_ner)