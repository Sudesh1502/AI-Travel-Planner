import {
  createTrip,
  getUserTrips,
  getTripById,
  deleteTrip,
  generateTrip,
  addActivity,
  removeActivity,
  regenerateDay,
} from "../services/trip.service.js";

//create trip without ai response===========================================

export const createTripController = async (req, res, next) => {
  try {
    const trip = await createTrip({
      ...req.body,
      userId: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Trip Created Successfully.",
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

//generate trip=========================================================

export const generateTripController = async (req, res) => {
  const trip = await generateTrip(req.body, req.user._id);

  res.status(200).json({
    success: true,
    message: "Trip generated successfully.",
    data: trip,
  });
};

// get trips==============================================================

export const getTripsController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const trips = await getUserTrips({ userId });

    return res.status(200).json({
      success: true,
      message: "Trips fetched Successfully.",
      data: trips,
    });
  } catch (error) {
    next(error);
  }
};

// get trip by id==========================================================

export const getTripController = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;
    const userId = req.user._id;
    const trip = await getTripById({ tripId, userId });

    return res.status(200).json({
      success: true,
      message: "Trip fetched Successfully.",
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

// delete trip===============================================================

export const deleteTripController = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;
    const userId = req.user._id;
    const trip = await deleteTrip({ tripId, userId });

    return res.status(200).json({
      success: true,
      message: "Trip deleted Successfully.",
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

// add activity===============================================================

export const addActivityController = async (req, res, next) => {
  try {
    const { tripId, dayNumber } = req.params;
    const userId = req.user._id;
    const activityData = req.body;
    const trip = await addActivity({ userId, tripId, dayNumber, activityData });

    return res.status(200).json({
      success: true,
      message: "Activity Added Successfully.",
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

// remove activity==============================================================

export const removeActivityController = async (req, res, next) => {
  try {
    const { tripId, dayNumber, activityId } = req.params;
    const userId = req.user._id;
    const trip = await removeActivity({
      userId,
      tripId,
      dayNumber,
      activityId,
    });

    return res.status(200).json({
      success: true,
      message: "Activity removed Successfully.",
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

// regenerate the existing day=====================================================

export const regenerateDayController = async (req, res, next) => {
  try {
    const { tripId, dayNumber } = req.params;
    const requirements = req.body.requirements;
    const userId = req.user._id;
    const trip = await regenerateDay(userId, tripId, dayNumber, requirements);

    return res
      .status(200)
      .json({ success: true, message: "Day Regenerated.", data: trip });
  } catch (error) {
    next(error);
  }
};
