require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const requiredFields = [
  "sleep_hours",
  "sleep_quality",
  "exercise_days",
  "fruitveg",
  "stress",
  "goal",
  "barrier",
  "preferred_workout_time",
  "user_free_text"
];

function buildPrompt(data) {
  return `
Participant profile:
- Sleep hours: ${data.sleep_hours}
- Sleep quality: ${data.sleep_quality}
- Exercise days/week: ${data.exercise_days}
- Fruit/vegetable intake: ${data.fruitveg}
- Stress level: ${data.stress}
- Main goal: ${data.goal}
- Biggest barrier: ${data.barrier}
- Preferred workout time: ${data.preferred_workout_time}
- Extra notes: ${data.user_free_text}

Write one personalized encouragement message for this college student.

Requirements:
- Max 90 words
- Tone: supportive, warm, non-judgmental, not guilt-based
- No diagnosis
- No medical advice
- No extreme exercise or diet advice
- Keep it practical and motivating
`.trim();
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/generate-message", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "Server misconfiguration: OPENAI_API_KEY is not set."
      });
    }

    const missing = requiredFields.filter((field) => !(field in req.body));
    if (missing.length > 0) {
      return res.status(400).json({
        error: "Missing required fields.",
        missing
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = buildPrompt(req.body);

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You generate short, safe, encouraging behavior-change messages for a research study."
        },
        { role: "user", content: prompt }
      ]
    });

    let llmReply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "You are making progress one step at a time. A short workout at your preferred time can help build momentum this week.";

    // Defensive guard: enforce 90-word max if the model response is longer.
    const words = llmReply.split(/\s+/).filter(Boolean);
    if (words.length > 90) {
      llmReply = words.slice(0, 90).join(" ");
    }

    return res.json({ llm_reply: llmReply });
  } catch (error) {
    console.error("Error in /generate-message:", {
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type,
      responseData: error.response?.data,
      stack: error.stack
    });
    return res.status(500).json({
      error: "Failed to generate message."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
