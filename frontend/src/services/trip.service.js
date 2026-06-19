import api from '../libs/axios.js'
export const addTrip = async(tripData) => {
    const response = await api.post("/api/trips/generate",tripData);
    return response.data;
}


export const getAllTrips = async () => {
  const response = await api.get("/api/trips/");
  return response.data;
};

export const getTripById = async (tripId) => {
  const response = await api.get(`/api/trips/${tripId}`);
  return response.data;
};
export const regenerateDay = async (tripId, dayNumber, requirements) => {
  const response = await api.post(`/api/trips/${tripId}/days/${dayNumber}/regenerate-day`, {requirements});
  return response.data;
};
export const addActivity = async (tripId, dayNumber, payload) => {
  const response = await api.patch(`/api/trips/${tripId}/days/${dayNumber}/add-activity`, payload);
  return response.data;
};
export const deleteActivity = async (tripId, dayNumber, activityId) => {
  const response = await api.patch(`/api/trips/${tripId}/days/${dayNumber}/remove-activity/${activityId}`);
  return response.data;
};
export const deleteTrip = async (tripId) => {
  const response = await api.delete(`/api/trips/${tripId}`);
  return response.data;
};

export const getRequirements = (numberOfActivities, dayDescription) => {
  return (`
   I want ${numberOfActivities} activities in this day

   Additionally:
  ${dayDescription}
  `)
}