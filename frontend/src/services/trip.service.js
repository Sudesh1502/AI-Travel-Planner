import api from '../libs/axios.js'
export const addTrip = async(tripData) => {
    const response = await api.post("/api/trips/generate",tripData);
    return response.data;
}


export const getAllTrips = async () => {
  const response = await api.get("/trips");
  return response.data;
};