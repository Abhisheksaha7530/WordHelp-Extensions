const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Groq } = require("groq-sdk");

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize GROQ client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("✅ GROQ AI Server is live!");
});

// POST endpoint to improve sentence
app.post("/improve", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required." });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Correct and improve this sentence. Return only the improved sentence: "${text}"`,
        },
      ],
      model: "llama3-8b-8192", // You can change to other models like 'mixtral-8x7b-32768'
    });

    const improved = chatCompletion.choices[0].message.content.trim();
    res.json({ improved });
  } catch (error) {
    console.error("GROQ API error:", error);
    res.status(500).json({
      error: "GROQ server error",
      details: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ WordHelp GROQ backend running at http://localhost:${PORT}`);
});
