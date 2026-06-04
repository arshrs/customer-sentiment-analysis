const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/predict", (req, res) => {

    const text = req.body.text;

    if (!text) {
        return res.json({ sentiment: "No input provided" });
    }

    const pythonPath = path.join(__dirname, "../ml-model/predict.py");

    const pythonProcess = spawn("py", [pythonPath, text]);

    let result = "";

    pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
    });

    pythonProcess.on("close", () => {

        try {
            const parsed = JSON.parse(result);
            res.json(parsed);
        }
        catch {
            res.json({ sentiment: "Error processing request" });
        }

    });

});

app.listen(5000, () => {
    console.log("Sentiment backend running on port 5000");
});