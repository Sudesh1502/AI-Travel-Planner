export const generateTripPlan = async (tripData) => {
  return {
    itinerary: [
      {
        dayNumber: 1,
        title: "Arrival Day",
        activities: [
          {
            activityId: "act_001",
            title: "Check In Hotel",
            description: "Relax after arrival",
            recommendedTime: "2:00 PM",
          },
        ],
      },
    ],

    budgetEstimate: {
      sourceToDestination: 5000,
      accommodation: 10000,
      food: 5000,
      localTransport: 2000,
      activities: 3000,
      total: 25000,
    },

    hotelSuggestions: [
      {
        name: "Demo Hotel",
        hotelType: "Budget",
        rating: 4.2,
        location: "City Center",
        approximateCostPerNight: 2500,
      },
    ],
  };
};
