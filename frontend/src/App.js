
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {

    if (!text.trim()) return;

    setLoading(true);

    try {

      const res = await axios.post("http://localhost:5000/predict", {
        text: text
      });

      setSentiment(res.data.sentiment);

    } catch {

      setSentiment("Error analyzing sentiment");

    }

    setLoading(false);

  };

  const getSentimentClass = () => {

    if (!sentiment) return "";

    if (sentiment.toLowerCase() === "positive")
      return "positive";

    if (sentiment.toLowerCase() === "negative")
      return "negative";

    return "neutral";
  };

  return (

    <div className="app">

      <div className="container">

        <h1>Customer Sentiment Analysis</h1>

        <textarea
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="Enter customer review here..."
        />

        <button onClick={analyzeSentiment}>
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        {sentiment && (

          <div className={`result ${getSentimentClass()}`}>

            <h2>Result</h2>

            <p>{sentiment.toUpperCase()}</p>

          </div>

        )}

      </div>

    </div>

  );

}

export default App;

