/*
  Qualtrics "Add JavaScript" code for the AI Coach question.

  IMPORTANT:
  1) Replace YOUR-BACKEND-URL below with your deployed backend URL.
  2) Do NOT put OpenAI API keys in this file.
  3) This script reads existing Embedded Data fields and writes llm_reply.
*/

Qualtrics.SurveyEngine.addOnload(function () {
  var q = this;
  var questionContainer = q.getQuestionTextContainer();

  // Replace with your deployed URL, for example:
  // https://llm-health-message-backend.onrender.com
  var BACKEND_BASE_URL = "https://llm-health-message-study.onrender.com";
  var ENDPOINT = BACKEND_BASE_URL + "/generate-message";

  var fallbackMessage =
    "You are making progress one step at a time. A small, realistic workout this week is a strong next step.";

  // Show loading text while the backend request runs.
  var statusEl = document.createElement("div");
  statusEl.id = "ai-coach-status";
  statusEl.style.marginTop = "12px";
  statusEl.innerText = "Generating your personalized message...";
  questionContainer.appendChild(statusEl);

  function getED(name) {
    return "${e://Field/" + name + "}";
  }

  var payload = {
    sleep_hours: getED("sleep_hours"),
    sleep_quality: getED("sleep_quality"),
    exercise_days: getED("exercise_days"),
    fruitveg: getED("fruitveg"),
    stress: getED("stress"),
    goal: getED("goal"),
    barrier: getED("barrier"),
    preferred_workout_time: getED("preferred_workout_time"),
    user_free_text: getED("user_free_text")
  };

  function saveAndDisplay(message) {
    // Save to Embedded Data so it can be reused in later questions or exports.
    Qualtrics.SurveyEngine.setEmbeddedData("llm_reply", message);
    statusEl.innerText = message;
  }

  fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Backend returned non-200 response.");
      }
      return response.json();
    })
    .then(function (data) {
      var message = (data && data.llm_reply) ? data.llm_reply : fallbackMessage;
      saveAndDisplay(message);
    })
    .catch(function (error) {
      console.error("Failed to fetch LLM reply:", error);
      saveAndDisplay(fallbackMessage);
    });
});
