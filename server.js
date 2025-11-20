const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are Sporti-fy AI assistant. Be helpful and friendly." },
                { role: "user", content: userMessage }
            ]
        });

        res.json({
            reply: response.choices[0].message.content
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI request failed" });
    }

});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
