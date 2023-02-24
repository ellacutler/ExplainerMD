import spacy

nlp_ner = spacy.load("en_ner_bc5cdr_md")
text = "Northwestern M Medicine NMG Pharmacy Rx #: 7001996 Ryan Newkirk Take 1 tablet by mouth 2 days. penicillin VK 500 Generic for: VEETID Lori A. Schwarcz, MD NDC: 57237-041-99 RISING PHARM Exp: 7/31/2023 CAUTION Federal law prohibits the transfer of this drug to any pes"
doc = nlp_ner(text)
print(type(doc))
for ent in doc.ents:
    print(ent.text,ent.label_)
