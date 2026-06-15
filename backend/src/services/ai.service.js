import OpenAI from "openai";
import buildPrompt from "../utils/prompt.js";
import ApiError from "../utils/apiError.js";

const createClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};
export const generateTripPlan = async (tripData) => {
  try {
    const client = createClient();
    const prompt = buildPrompt(tripData);
    const completions = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.4,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: `
                        You are an expert travel planner.

                        Return only valid JSON.

                        Do not return markdown.

                        Do not return explanations.
                    `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completions.choices[0]?.message?.content;

    if (!content) {
      throw new ApiError(500, "Failed to generate trip plan.");
    }

    const tripPlan = JSON.parse(content);

    if (
      !tripPlan.itinerary ||
      !tripPlan.budgetEstimate ||
      !tripPlan.hotelSuggestions
    ) {
      throw new ApiError(500, "Invalid AI response format.");
    }

    return tripPlan;
  } catch (error) {
    console.error("OpenAI Error:", error);

    throw new ApiError(500, "Failed to generate trip plan.");
  }
};
