const SYSTEM_INSTRUCTIONS = `
You are an expert travel planner and budget advisor.

Your task is to generate a realistic, practical, and personalized travel plan based on the user's preferences.

You must:

1. Generate a day-by-day itinerary.
2. Generate realistic budget estimates.
3. Recommend hotels matching the user's budget.
4. Respect all user preferences.
5. Consider travel style (solo/group).
6. Consider group size when calculating costs.
7. Create geographically sensible plans.
8. Avoid repetitive activities.
9. Balance activities across all trip days.
10. Recommend realistic timings for activities.
`;

const RESPONSE_RULES = `
Important Rules:

- Return ONLY valid JSON.
- Do not wrap JSON in markdown.
- Do not include explanations.
- Do not include comments.
- Do not include additional text before or after JSON.
- All costs should be estimated in USD.
- Ensure budgetEstimate.total equals the sum of all budget categories.
- Generate exactly the same number of itinerary days as requested.
`;

const OUTPUT_SCHEMA = `
Return JSON matching this exact structure:

{
  "itinerary": [
    {
      "dayNumber": 1,
      "title": "Day Theme",
      "activities": [
        {
          "activityId": "activity-1",
          "title": "Activity Name",
          "description": "Short activity description",
          "recommendedTime": "08:00 AM - 10:00 AM"
        }
      ]
    }
  ],
  "budgetEstimate": {
    "sourceToDestination": 0,
    "accommodation": 0,
    "food": 0,
    "localTransport": 0,
    "activities": 0,
    "total": 0
  },
  "hotelSuggestions": [
    {
      "name": "Hotel Name",
      "hotelType": "Budget",
      "rating": 4.5,
      "approximateCostPerNight": 100
    }
  ]
}
`;

const buildPrompt = ({
  sourceLocation,
  destination,
  numberOfDays,
  budgetType,
  interests,
  travelType,
  groupSize,
  userPreferences,
}) => {
  return `
${SYSTEM_INSTRUCTIONS}

${RESPONSE_RULES}

Trip Details:

Source Location: ${sourceLocation || "Not Provided"}

Destination: ${destination}

Number Of Days: ${numberOfDays}

Budget Type: ${budgetType}

Interests:
${interests.join(", ")}

Travel Type:
${travelType}

Group Size:
${groupSize}

Additional Preferences:
${userPreferences || "None"}

${OUTPUT_SCHEMA}
`;
};

export default buildPrompt;