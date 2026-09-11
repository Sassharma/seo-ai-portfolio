require("dotenv").config();

const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "Nebula AI" });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is not configured." });
    }

    const message = String(req.body?.message || "").trim();
    if (!message) return res.status(400).json({ error: "Message is required." });

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      instructions:
        "You are Nebula AI on Sahil Sharma's SEO and digital marketing portfolio. " +
        "Give clear, practical help with SEO, technical SEO, content, keywords, analytics, " +
        "digital marketing, websites, and portfolio questions. Be concise unless asked for detail.",
      input: message
    });

    res.json({ reply: response.output_text || "I couldn't generate a response." });
  } catch (error) {
    console.error("Nebula AI error:", error);
    res.status(500).json({ error: "Nebula AI could not respond right now." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Nebula AI portfolio running on port ${PORT}`);
});
