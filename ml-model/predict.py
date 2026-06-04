import sys
import pickle
import re
import json
import os
import io

# Fix encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def preprocess(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9 ]', '', text)
    return text

base_path = os.path.dirname(os.path.abspath(__file__))

model = pickle.load(open(os.path.join(base_path, "model.pkl"), "rb"))
vectorizer = pickle.load(open(os.path.join(base_path, "vectorizer.pkl"), "rb"))

user_input = preprocess(sys.argv[1])

vector = vectorizer.transform([user_input])

prediction = model.predict(vector)[0]

print(json.dumps({
    "sentiment": prediction
}, ensure_ascii=False))