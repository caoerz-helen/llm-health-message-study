# Qualtrics Survey Flow Notes (AI Coach Prototype)

This guide explains how to wire your Qualtrics survey to the backend and display/save the generated message.

## 1) Create Embedded Data fields

In **Survey Flow**, add an **Embedded Data** element near the top and create these fields:

- `sleep_hours`
- `sleep_quality`
- `exercise_days`
- `fruitveg`
- `stress`
- `goal`
- `barrier`
- `preferred_workout_time`
- `user_free_text`
- `llm_reply` (leave blank initially)

These names should match your question recodes or piped values exactly.

## 2) Collect participant responses first

Place your pre-message questions in an earlier block so values are available before the AI Coach question:

- Sleep hours/quality
- Exercise days
- Fruit/vegetable intake
- Stress
- Goal
- Barrier
- Preferred workout time
- Free text context

Map each question answer into the corresponding Embedded Data field.

## 3) Place the AI Coach block after input questions

- Create a block with one descriptive question (for example: "Your personalized message").
- Open that question and choose **Add JavaScript**.
- Paste code from `qualtrics/ai-coach-question-js.js`.
- Replace `https://YOUR-BACKEND-URL` with your real backend URL.

When this question loads, it calls your backend and:
- shows "Generating your personalized message..."
- displays the returned message
- saves it to `llm_reply` Embedded Data

## 4) Display the message later (optional)

In a later question, use piped text:

`Your AI Coach message: ${e://Field/llm_reply}`

You can also export `llm_reply` in Qualtrics response data.

## 5) Test with fake responses first

Before live participants:

1. In preview/test responses, enter simple fake values (for example, stress=4, goal="consistency").
2. Verify the AI Coach question displays a generated message.
3. Submit a test response.
4. Check recorded response data and confirm `llm_reply` is saved.
5. Temporarily break backend URL to verify fallback message behavior.

## 6) Troubleshooting checklist

- If no message appears:
  - Open browser dev tools and check console/network errors.
  - Confirm backend URL is correct and publicly reachable.
  - Confirm backend CORS is enabled.
- If `${e://Field/...}` appears literally:
  - Embedded Data names likely do not match exactly.
- If backend errors:
  - Confirm server has `OPENAI_API_KEY` set in environment variables.
