import express from "express";
import {
  addActivityController,
  createTripController,
  deleteTripController,
  generateTripController,
  getTripController,
  getTripsController,
  removeActivityController,
  regenerateDayController,
  getActivityImageController,
} from "../controllers/trip.controller.js";
import protect from "../middleware/auth.middleware.js";

const tripRouter = express.Router();

tripRouter.use(protect);

tripRouter.post("/", createTripController);
tripRouter.get("/", getTripsController);
tripRouter.post("/:tripId/days/:dayNumber/regenerate-day", regenerateDayController);
tripRouter.post("/generate", generateTripController);
tripRouter.patch("/:tripId/days/:dayNumber/add-activity", addActivityController);
tripRouter.get("/activity/image", getActivityImageController);
tripRouter.patch("/:tripId/days/:dayNumber/remove-activity/:activityId", removeActivityController);
tripRouter.get("/:tripId", getTripController);
tripRouter.delete("/:tripId", deleteTripController);

export default tripRouter;
