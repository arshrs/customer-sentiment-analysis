import pandas as pd
import pickle
import re
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# preprocess function
def preprocess(text):
    text = text.lower()
    text = re.sub(r'<.*?>', '', text)  # remove html tags
    text = re.sub(r'[^a-zA-Z0-9 ]', '', text)
    return text

# file path
base_path = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(base_path, "IMDB Dataset.csv")

# load dataset
df = pd.read_csv(data_path, encoding="utf-8")

# preprocess
df["review"] = df["review"].apply(preprocess)

X_text = df["review"]
y = df["sentiment"]

# vectorize
vectorizer = TfidfVectorizer(max_features=5000)
X = vectorizer.fit_transform(X_text)

# train model
model = LogisticRegression()
model.fit(X, y)

# save files
pickle.dump(model, open(os.path.join(base_path, "model.pkl"), "wb"))
pickle.dump(vectorizer, open(os.path.join(base_path, "vectorizer.pkl"), "wb"))

print("✅ IMDB Sentiment model trained successfully")