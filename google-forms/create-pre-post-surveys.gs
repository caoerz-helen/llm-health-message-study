/**
 * Creates both the pre-survey and post-survey forms for the
 * LLM Health Message Study and logs their URLs.
 */
function createPrePostSurveys() {
  var preForm = createPreSurveyForm_();
  var postForm = createPostSurveyForm_();

  Logger.log("=== Forms Created Successfully ===");
  logFormUrls_("Pre-Survey", preForm);
  logFormUrls_("Post-Survey", postForm);
}

/**
 * Helper for adding 1–5 scale questions.
 */
function addScaleQuestion_(form, title, leftLabel, rightLabel) {
  form
    .addScaleItem()
    .setTitle(title)
    .setBounds(1, 5)
    .setLabels(leftLabel, rightLabel)
    .setRequired(true);
}

function createPreSurveyForm_() {
  var form = FormApp.create("LLM Health Message Study - Pre-Survey");

  form.setDescription(
    "This survey collects baseline information before the intervention for a study about personalized health messages and exercise behavior. Please answer based on your current habits and experiences."
  );

  // Consent checkbox
  var consentItem = form.addCheckboxItem();
  consentItem
    .setTitle("Consent")
    .setHelpText("Please check the box to confirm informed consent.")
    .setChoices([
      consentItem.createChoice("I consent to participate in this study.")
    ])
    .setRequired(true);

  form
    .addTextItem()
    .setTitle("Participant ID")
    .setHelpText("Please create a simple ID you can remember. You will use the same ID in the post-survey.")
    .setRequired(true);

  form
    .addTextItem()
    .setTitle("Email")
    .setValidation(
      FormApp.createTextValidation().requireTextIsEmail().build()
    )
    .setRequired(true);

  // SMS opt-in question with branching
  var smsOptIn = form.addMultipleChoiceItem();
  smsOptIn
    .setTitle("Do you agree to receive exercise reminder SMS messages for this study?")
    .setHelpText("If you choose yes, you may be asked to provide a phone number for study-related reminders.")
    .setRequired(true);

  var smsSection = form
    .addPageBreakItem()
    .setTitle("SMS Reminder Details");

  form
    .addTextItem()
    .setTitle("Phone number for SMS reminders")
    .setHelpText("Only provide this if you agreed to receive SMS reminders. Please include your area code.")
    .setRequired(false);

  var continueSection = form
    .addPageBreakItem()
    .setTitle("Baseline Health and Exercise");

  smsOptIn.setChoices([
    smsOptIn.createChoice("Yes", smsSection),
    smsOptIn.createChoice("No", continueSection)
  ]);

  form
    .addMultipleChoiceItem()
    .setTitle("How many times did you go to the gym in the past 7 days?")
    .setChoiceValues(["0", "1", "2", "3", "4", "5 or more"])
    .setRequired(true);

  addScaleQuestion_(
    form,
    "How motivated do you currently feel to exercise regularly?",
    "Very low",
    "Very high"
  );

  form
    .addMultipleChoiceItem()
    .setTitle("What is your primary exercise or health goal right now?")
    .setChoiceValues([
      "Build strength",
      "Improve endurance",
      "Improve general health",
      "Reduce stress",
      "Improve energy or productivity",
      "Improve appearance or body confidence",
      "Other"
    ])
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle("What is your biggest barrier to exercising regularly?")
    .setHelpText("For example: time, tiredness, stress, motivation, confidence, schedule, weather, or not knowing what to do.")
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle("When is it usually easiest for you to exercise?")
    .setChoiceValues([
      "Early morning",
      "Late morning",
      "Afternoon",
      "Evening",
      "Late night",
      "Weekends",
      "No preference / it depends"
    ])
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle("On average, how many hours of sleep did you get per night this past week?")
    .setChoiceValues([
      "Less than 5 hours",
      "5–6 hours",
      "6–7 hours",
      "7–8 hours",
      "More than 8 hours"
    ])
    .setRequired(true);

  addScaleQuestion_(
    form,
    "How would you rate your sleep quality this past week?",
    "Very poor",
    "Very good"
  );

  addScaleQuestion_(
    form,
    "How stressed have you felt this past week?",
    "Very low",
    "Very high"
  );

  form
    .addMultipleChoiceItem()
    .setTitle("How often did you eat fruits or vegetables this past week?")
    .setChoiceValues([
      "Rarely or never",
      "A few times this week",
      "About once per day",
      "Multiple times per day"
    ])
    .setRequired(true);

  addScaleQuestion_(
    form,
    "How much do you trust AI-generated health or wellness messages?",
    "Do not trust at all",
    "Trust a lot"
  );

  form
    .addParagraphTextItem()
    .setTitle("Is there anything else you want the AI coach to know before generating a message for you?")
    .setHelpText("Optional. For example: your schedule, preferred tone, what kind of encouragement helps you, or anything you want to avoid.")
    .setRequired(false);

  return form;
}

function createPostSurveyForm_() {
  var form = FormApp.create("LLM Health Message Study - Post-Survey");

  form.setDescription(
    "This follow-up survey asks about your experience during the study period and your response to the health message intervention."
  );

  form
    .addTextItem()
    .setTitle("Participant ID")
    .setHelpText("Please use the same ID you used in the pre-survey.")
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle("How many times did you go to the gym during the study period?")
    .setChoiceValues(["0", "1", "2", "3", "4", "5 or more"])
    .setRequired(true);

  addScaleQuestion_(
    form,
    "How motivated did you feel to exercise during the study period?",
    "Very low",
    "Very high"
  );

  addScaleQuestion_(
    form,
    "How relevant did the message feel to your personal goals or barriers?",
    "Not relevant at all",
    "Very relevant"
  );

  addScaleQuestion_(
    form,
    "How trustworthy did the message feel?",
    "Not trustworthy at all",
    "Very trustworthy"
  );

  addScaleQuestion_(
    form,
    "After receiving the message, how confident did you feel about your ability to exercise regularly?",
    "Not confident at all",
    "Very confident"
  );

  addScaleQuestion_(
    form,
    "How likely are you to continue exercising regularly after this study?",
    "Very unlikely",
    "Very likely"
  );

  addScaleQuestion_(
    form,
    "The message felt supportive.",
    "Strongly disagree",
    "Strongly agree"
  );

  addScaleQuestion_(
    form,
    "The message felt annoying, pressuring, or uncomfortable.",
    "Strongly disagree",
    "Strongly agree"
  );

  form
    .addMultipleChoiceItem()
    .setTitle("Would you want to keep receiving this type of health reminder in the future?")
    .setChoiceValues(["Yes", "Maybe", "No"])
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle("What did you like or dislike about the message?")
    .setRequired(false);

  form
    .addParagraphTextItem()
    .setTitle("Any other feedback about your study experience?")
    .setRequired(false);

  return form;
}

function logFormUrls_(label, form) {
  Logger.log(label + " Edit URL: " + form.getEditUrl());
  Logger.log(label + " Published URL: " + form.getPublishedUrl());
}