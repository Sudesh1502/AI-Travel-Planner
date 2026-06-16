const getDayRegeneratePrompt = (day, requirements) => {
  return `
You are an expert travel planner.

The user is NOT satisfied with the current itinerary for this day.

Current Day:
${JSON.stringify(day, null, 2)}

User Requirements:
${requirements}

Instructions:

- The user wants an alternative plan for this day.
- Do NOT simply rephrase or slightly modify the existing activities.
- Suggest different attractions, experiences, restaurants, landmarks, or activities whenever possible.
- Follow the user's requirements carefully.
- Keep the itinerary realistic for a single day.
- Ensure activities are logically ordered throughout the day.
- Keep the same dayNumber.
- Provide meaningful descriptions.
- Provide recommendedTime for each activity.
- Do not include activityId fields.
- Return ONLY valid JSON.
- Do not return markdown.
- Do not return explanations.

Return the response in this format:

{
  "dayNumber": ${day.dayNumber},
  "activities": [
    {
      "title": "string",
      "description": "string",
      "recommendedTime": "string"
    }
  ]
}
`;
};

export default getDayRegeneratePrompt;