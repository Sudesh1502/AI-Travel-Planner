import { randomUUID } from "crypto";
import Trip from "../models/trip.model.js";
import ApiError from "../utils/apiError.js";
import { generateTripPlan, getAiService } from "./ai.service.js";
import getDayRegeneratePrompt from "../utils/regenerateDayPrompt.js";

//create trip without ai response===========================================

export const createTrip = async (tripData) => {
  const trip = await Trip.create(tripData);
  return trip;
};

// get trips==============================================================

export const getUserTrips = async ({ userId }) => {
  const trips = await Trip.find({ userId }).sort({ createdAt: -1 });

  return trips;
};

// get trip by id==========================================================

export const getTripById = async ({ tripId, userId }) => {
  const trip = await Trip.findOne({
    _id: tripId,
    userId,
  });

  if (!trip) {
    throw new ApiError(404, "Trip Not found!");
  }

  return trip;
};

// delete trip===============================================================

export const deleteTrip = async ({ tripId, userId }) => {
  const trip = await Trip.findOneAndDelete({
    _id: tripId,
    userId,
  });

  if (!trip) {
    throw new ApiError(404, "Trip Not found!");
  }

  return trip;
};

export const getImageUrl = async (keyword) => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=1`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const data = await response.json();

    return data.photos?.[0]?.src?.large || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80";
  } catch (error) {
    console.error("Image fetch failed:", error.message);

    return "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80";
  }
};

//generate trip=========================================================

export const generateTrip = async (tripData, userId) => {
  const aiResponse = await generateTripPlan(tripData);

  if (aiResponse.error) {
    throw new ApiError(400, aiResponse.error);
  }

    aiResponse?.itinerary?.forEach((day) => {
    day?.activities?.forEach((activity) => { 
      activity.activityId = randomUUID();
    });
  });

  const coverImage = await getImageUrl(
    aiResponse.coverImageKeyword || tripData.destination,
  );

  const trip = await createTrip({
    ...tripData,

    userId,

    coverImage,

    coverImageKeyword: aiResponse.coverImageKeyword,

    itinerary: aiResponse.itinerary,

    budgetEstimate: aiResponse.budgetEstimate,

    hotelSuggestions: aiResponse.hotelSuggestions,
  });

  return trip;
};

// add activity===============================================================

export const addActivity = async ({
  userId,
  tripId,
  dayNumber,
  activityData,
}) => {
  const trip = await Trip.findOne({ _id: tripId, userId });

  if (!trip) {
    throw new ApiError(404, "Trip Not Found");
  }

  const day = trip.itinerary.find(
    (day) => Number(day.dayNumber) === Number(dayNumber),
  );

  if (!day) {
    throw new ApiError(404, "Day not found");
  }
  console.log(activityData);
  day.activities.push({
    activityId: randomUUID(),
    title: activityData.title,
    description: activityData.description,
    recommendedTime: activityData.recommendedTime,
  });

  await trip.save();

  return trip;
};

// remove activity==============================================================

export const removeActivity = async ({
  userId,
  tripId,
  dayNumber,
  activityId,
}) => {
  const trip = await Trip.findOne({ _id: tripId, userId });

  if (!trip) {
    throw new ApiError(404, "Trip Not Found");
  }

  const day = trip.itinerary.find(
    (day) => Number(day.dayNumber) === Number(dayNumber),
  );

  if (!day) {
    throw new ApiError(404, "Day not found");
  }
  day.activities = day.activities.filter(
    (activity) => activityId !== activity.activityId,
  );

  await trip.save();

  return trip;
};

// regenerate the existing day=====================================================

export const regenerateDay = async (
  userId,
  tripId,
  dayNumber,
  requirements,
) => {
  const trip = await Trip.findOne({ _id: tripId, userId });
  if (!trip) {
    throw new ApiError(404, "Trip Not Found.");
  }

  const day = trip.itinerary.find(
    (day) => Number(day.dayNumber) === Number(dayNumber),
  );

  if (!day) {
    throw new ApiError(404, "Day Not Found.");
  }
  const prompt = getDayRegeneratePrompt(day, requirements);

  const content = await getAiService(prompt);

  const regeneratedDay = JSON.parse(content);

  regeneratedDay.activities.forEach((activity) => {
    activity.activityId = randomUUID();
  });

  const dayIndex = trip.itinerary.findIndex(
    (day) => Number(day.dayNumber) === Number(dayNumber),
  );

  trip.itinerary[dayIndex] = {
    ...regeneratedDay,
    dayNumber,
  };

  await trip.save();

  return trip;
};
