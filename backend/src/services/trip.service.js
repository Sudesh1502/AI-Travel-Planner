import Trip from '../models/trip.model.js'
import ApiError from '../utils/apiError.js';
import { generateTripPlan } from './ai.service.js';
export const createTrip = async(tripData) =>{
    const trip = await Trip.create(tripData);
    return trip;
}
export const getUserTrips = async({userId}) =>{
    const trips = await Trip.find({userId}).sort({createdAt:-1});

    return trips;
}
export const getTripById = async({tripId, userId}) =>{
    const trip = await Trip.findOne({
        _id: tripId,
        userId,
    });

    if(!trip){
        throw new ApiError(404, "Trip Not found!");
    }

    return trip;
}
export const deleteTrip = async({tripId, userId}) =>{
    const trip = await Trip.findOneAndDelete({
        _id: tripId,
        userId,
    });

    if(!trip){
        throw new ApiError(404, "Trip Not found!");
    }

    return trip;

}

export const generateTrip = async (tripData, userId) => {
    const aiResponse = await generateTripPlan(tripData);

    const trip = await Trip.create({
        userId,
        ...tripData,
        ...aiResponse
    });
    return trip;
};