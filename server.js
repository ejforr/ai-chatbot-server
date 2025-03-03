const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            max_tokens: 100
        });
        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: "Error generating response" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));


