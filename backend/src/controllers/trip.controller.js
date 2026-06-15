import { createTrip, getUserTrips, getTripById, deleteTrip } from "../services/trip.service.js";
export const createTripController = async(req, res, next) => {
    try {
        const trip = await createTrip({
            ...req.body,
            userId:req.user._id,
        });

        return res.status(201).json({success:true, message:"Trip Created Successfully.", data:trip});

    } catch (error) {
        next(error);
    }
}
export const getTripsController = async(req, res, next) => {
    try {
        const userId = req.user._id;
        const trips = await getUserTrips({userId})

        return res.status(200).json({success:true, message:"Trips fetched Successfully.", data:trips});

    } catch (error) {
        next(error);
    }
}
export const getTripController = async(req, res, next) => {
    try {
        const tripId = req.params.tripId;
        const userId = req.user._id;
        const trip = await getTripById({tripId, userId});

        return res.status(200).json({success:true, message:"Trip fetched Successfully.", data:trip});

    } catch (error) {
        next(error);
    }
}
export const deleteTripController = async(req, res, next) => {
    try {
        const tripId = req.params.tripId;
        const userId = req.user._id;
        const trip = await deleteTrip({tripId, userId});

        return res.status(200).json({success:true, message:"Trip deleted Successfully.", data:trip});
        
    } catch (error) {
        next(error);
    }
}
