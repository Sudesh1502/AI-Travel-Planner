import OpenAI from "openai";
import buildPrompt from "../utils/prompt.js";
import ApiError from "../utils/apiError.js";
import crypto from 'crypto'

export const createClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

export const generateTripPlan = async (tripData) => {
  try {
    
    const prompt = buildPrompt(tripData);

    const content = await getAiService(prompt);
    if (!content) {
      throw new ApiError(500, "Failed to generate trip plan.");
    }

    const tripPlan = JSON.parse(content);
    tripPlan?.itinerary?.forEach((day) => {
      day?.activities?.forEach((activity) => {
        activity.activityId = crypto.randomUUID();
      });
    });

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


export const getAiService = async(prompt) =>{

  const client = createClient();
  
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

    return content;
} 