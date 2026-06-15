import express from "express";
import {
  createTripController,
  deleteTripController,
  generateTripController,
  getTripController,
  getTripsController,
} from "../controllers/trip.controller.js";
import protect from "../middleware/auth.middleware.js";

const tripRouter = express.Router();

tripRouter.use(protect);

tripRouter.post("/", createTripController);
tripRouter.get("/", getTripsController);
tripRouter.post("/generate", generateTripController);
tripRouter.get("/:tripId", getTripController);
tripRouter.delete("/:tripId", deleteTripController);

export default tripRouter;
