# LLM Health Message Study

This repository supports a research project testing whether LLM-generated personalized health messages can improve healthy behavior, especially exercise motivation and gym attendance.

## Study Design

The study uses a randomized experiment with three conditions:

1. Personalized LLM-generated SMS or AI Coach message
2. Generic health reminder
3. Control group

Participants complete a pre-survey about their health habits, goals, barriers, and motivation. The personalized condition receives an LLM-generated supportive message based on their responses. Outcomes are measured through a post-survey and, if available, anonymized gym attendance data.

## Repository Structure

- `qualtrics/`: Qualtrics survey flow notes and JavaScript for the AI Coach message
- `backend/`: Backend API for safely calling the LLM
- `google-forms/`: Optional Google Apps Script for creating surveys
- `sms/`: SMS message templates and possible automation scripts
- `analysis/`: Analysis plan and future data analysis code
- `docs/`: Proposal drafts, consent language, and method notes
- `data/`: Local data folder, not tracked by Git
- `participant_data/`: Local participant data folder, not tracked by Git

## Privacy Notes

Do not commit API keys, participant names, phone numbers, survey responses, gym attendance records, or other identifiable data.