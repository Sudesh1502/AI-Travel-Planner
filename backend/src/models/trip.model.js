import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    activityId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    recommendedTime: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);
const budgetEstimateSchema = new mongoose.Schema(
  {
    sourceToDestination: {
      type: Number,
      default: 0,
    },

    accommodation: {
      type: Number,
      default: 0,
    },

    food: {
      type: Number,
      default: 0,
    },

    localTransport: {
      type: Number,
      default: 0,
    },

    activities: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);
const daySchema = new mongoose.Schema(
  {
    dayNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    title: {
      type: String,
      trim: true,
    },

    activities: {
      type: [activitySchema],
      default: [],
    },
  },
  { _id: false }
);

const hotelSuggestionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    hotelType: {
      type: String,
      trim: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
    },

    approximateCostPerNight: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sourceLocation: {
      type: String,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    numberOfDays: {
      type: Number,
      required: true,
      min: 1,
    },

    budgetType: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },

    interests: [
      {
        type: String,
        trim: true,
      },
    ],

    travelType: {
      type: String,
      enum: ["solo", "group"],
      default: "solo",
    },

    groupSize: {
      type: Number,
      default: 1,
      min: 1,
    },

    userPreferences: {
      type: String,
      maxlength: 5000,
      default: "",
    },

    itinerary: [daySchema],

    budgetEstimate: {
      type: budgetEstimateSchema,
      default: () => ({}),
    },

    hotelSuggestions: {
      type: [hotelSuggestionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;