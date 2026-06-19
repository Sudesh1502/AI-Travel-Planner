"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  addActivity,
  getRequirements,
  getTripById,
  regenerateDay,
  deleteActivity,
} from "@/services/trip.service.js";
import { useParams, useRouter } from "next/navigation";
import FullScreenLoader from "@/loaders/FullScreenLoader";
import Modal from "@/components/Modal";
import DayLoader from "@/loaders/DayLoader";
import ActivityModal from "@/components/ActivityModal";
import DeleteActivityModal from "@/components/DeleteActivityModal";
import toast from "react-hot-toast";
import ActivityImage from "@/components/ActivityImage";
import { formatTripDates } from "@/utils/dateFormatter";
import { hasTimeConflict } from "@/utils/timeOverlap";
import { RegenerateDayModal } from "@/components/RegenerateDayModal";

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dayLoading, setDayLoading] = useState(false);
  const [regenrateModal, setRegenrateModal] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [numberOfActivities, setNumberOfActivities] = useState(1);
  const [activities, setActivities] = useState([]);
  const [dayDescription, setDayDescription] = useState("");
  const [activityModal, setActivityModal] = useState(false);
  const [deleteActivityModal, setDeleteActivityModal] = useState(false);
  const [activityToDeleteId, setActivityToDeleteId] = useState(null);
  const [activityTitle, setActivityTitle] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [activityDescription, setActivityDescription] = useState("");

  const handleDayClick = (dayIndex, event) => {
    setCurrentDay(dayIndex);
    setActivities(trip?.itinerary[dayIndex - 1]?.activities);
    event.target.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);

        const tripData = await getTripById(params.id);

        setTrip(tripData.data);
        if (tripData.data?.itinerary) {
          setCurrentDay(1);
          setActivities(tripData.data.itinerary[0]?.activities || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTrip();
    }
  }, [params.id]);

  useEffect(() => {}, [trip]);

  const handleRegenerate = async () => {
    setDayLoading(true);

    setRegenrateModal(false);
    try {
      if (!dayDescription.trim()) {
        toast.error("Please describe the schedule or vibe for the day.");
        return;
      }
      if (dayDescription.length > 300) {
        toast.error("Please keep your description under 300 characters.");
        return;
      }
      const requirements = getRequirements(numberOfActivities, dayDescription);
      const result = await regenerateDay(params.id, currentDay, requirements);

      setTrip(result.data);

      // Update activities for the currently selected day to show the new data!
      if (result.data?.itinerary) {
        setActivities(result.data.itinerary[currentDay - 1]?.activities || []);
      }

      toast.success(`Day ${currentDay} regenerated!`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to regenerate day.");
    } finally {
      setDayLoading(false);
    }
  };
  const handleAddActivity = async (timeString) => {
    setDayLoading(true);
    setActivityModal(false);

    try {
      if (!activityDescription || !timeString || !activityTitle) {
        toast.error("All fields are required!");
        setActivityTitle("");
        setActivityDescription("");
        setActivityTime("");
        return;
      }
      if (activityDescription.length > 350) {
        toast.error("Description must be 350 characters or fewer.");
        setActivityTitle("");
        setActivityDescription("");
        setActivityTime("");
        return;
      }

      const dayObject = trip.itinerary.find(
        (day) => day.dayNumber === currentDay,
      );
      const existingActivities = dayObject ? dayObject.activities : [];
      const conflictFound = hasTimeConflict(timeString, existingActivities);
      if (conflictFound) {
        toast.error("Warning: This time overlaps with an existing activity!");
        return;
      }

      const payload = {
        title: activityTitle,
        description: activityDescription,
        recommendedTime: timeString,
      };

      const result = await addActivity(params.id, currentDay, payload);

      setTrip(result.data);
      if (result.data?.itinerary) {
        setActivities(result.data.itinerary[currentDay - 1]?.activities || []);

        setActivityTitle("");
        setActivityDescription("");
        setActivityTime("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDayLoading(false);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    const idToDelete = activityId || activityToDeleteId;
    setDeleteActivityModal(false);
    setDayLoading(true);
    try {
      const result = await deleteActivity(params.id, currentDay, idToDelete);

      setTrip(result.data);
      if (result.data?.itinerary) {
        setActivities(result.data.itinerary[currentDay - 1]?.activities || []);
      }
      setActivityTitle("");
    } catch (error) {
      console.error(error);
    } finally {
      setDayLoading(false);
      setActivityToDeleteId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {deleteActivityModal && (
        <DeleteActivityModal
          handleDeleteActivity={handleDeleteActivity}
          setDeleteActivityModal={setDeleteActivityModal}
          activityTitle={activityTitle}
        />
      )}
      {activityModal && (
        <ActivityModal
          activityTitle={activityTitle}
          activityTime={activityTime}
          activityDescription={activityDescription}
          setActivityModal={setActivityModal}
          setActivityTitle={setActivityTitle}
          setActivityDescription={setActivityDescription}
          setActivityTime={setActivityTime}
          handleAddActivity={handleAddActivity}
        />
      )}
      {regenrateModal && (
        <RegenerateDayModal
        currentDay={currentDay}
          handleRegenerate={handleRegenerate}
          setRegenrateModal={setRegenrateModal}
          setDayDescription={setDayDescription}
          setNumberOfActivities={setNumberOfActivities}
          numberOfActivities={numberOfActivities}
        />
      )}
      {loading && <FullScreenLoader />}
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
            <Link
              href="/dashboard/my-trips"
              className="hover:text-gray-900 transition-colors"
            >
              Trips
            </Link>
            <span>›</span>
            <span className="text-gray-900">
              {trip?.sourceLocation + "->" + trip?.destination}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {trip?.destination}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatTripDates(trip?.tripDate, trip?.numberOfDays)}
          </div>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column (Sidebar) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          {/* Budget Summary Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900">Budget Summary</h3>
              <span className="text-2xl font-bold text-blue-600">
                ${trip?.budgetEstimate?.total}
              </span>
            </div>

            <div className="space-y-4">
              {/* Accommodation */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                  <span>Accommodation</span>
                  <span>${trip?.budgetEstimate?.accommodation}</span>
                </div>

                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${
                        (trip?.budgetEstimate?.accommodation /
                          trip?.budgetEstimate?.total) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Food */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                  <span>Food & Dining</span>
                  <span>${trip?.budgetEstimate?.food}</span>
                </div>

                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{
                      width: `${
                        (trip?.budgetEstimate?.food /
                          trip?.budgetEstimate?.total) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Activities */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                  <span>Activities</span>
                  <span>${trip?.budgetEstimate?.activities}</span>
                </div>

                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${
                        (trip?.budgetEstimate?.activities /
                          trip?.budgetEstimate?.total) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Transport */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                  <span>Transportation & Travel</span>
                  <span>
                    $
                    {trip?.budgetEstimate?.localTransport +
                      trip?.budgetEstimate?.sourceToDestination}
                  </span>
                </div>

                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{
                      width: `${
                        ((trip?.budgetEstimate?.localTransport +
                          trip?.budgetEstimate?.sourceToDestination) /
                          trip?.budgetEstimate?.total) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stay Options */}
          <div>
            <div className="flex justify-between items-center mb-3 px-1">
              <h3 className="font-bold text-gray-900">Stays Options</h3>
            </div>
            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-scroll pr-2 pb-4 thin-scrollbar">
              {/* Hotel 1 */}

              {trip?.hotelSuggestions?.map((hotel) => (
                <div
                  className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex items-stretch h-[110px] shrink-0"
                  key={hotel.name + Date.now()}
                >
                  <div className="w-[120px] shrink-0 bg-gray-200">
                    <ActivityImage
                      keyword=""
                      fallbackTitle={`${hotel.name} hotel ${trip?.destination}`}
                    />
                  </div>
                  <div className="p-3 flex flex-col justify-center flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-gray-900 line-clamp-1">
                        {hotel.name}
                      </h4>
                      <span className="text-xs font-bold text-blue-600 flex items-center gap-0.5">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>{" "}
                        {hotel.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      {hotel.hotelType}
                    </p>
                    <p className="text-sm font-bold text-blue-600 mt-auto">
                      ${hotel.approximateCostPerNight}{" "}
                      <span className="text-xs text-gray-400 font-medium">
                        / night
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Itinerary) */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Days Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar scroll-smooth">
            {Array.from({ length: trip?.numberOfDays || 0 }).map((_, index) => {
              const day = index + 1; // Array is 0-indexed, so we add 1
              return (
                <button
                  key={day}
                  onClick={(e) => handleDayClick(day, e)}
                  className={`font-semibold text-sm py-2 px-5 rounded-full shrink-0 transition-colors ${
                    currentDay === day
                      ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/30"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Day {day}
                </button>
              );
            })}
          </div>

          {/* Section Title */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                {currentDay}
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                City Landmarks & Vistas
              </h2>
            </div>
            <button
              className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:text-blue-700"
              onClick={(e) => {
                e.preventDefault();
                setRegenrateModal(true);
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Regenerate Day
            </button>
          </div>

          {/* Itinerary Cards */}
          <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 pb-4 thin-scrollbar">
            {dayLoading ? (
              <DayLoader />
            ) : activities?.length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:border-blue-200 hover:bg-gray-50/50">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Relax and Unwind at Your Hotel
                </h3>
                <p className="text-sm text-gray-500 max-w-md leading-relaxed mb-4">
                  Take a break from sightseeing and enjoy a peaceful afternoon
                  at your hotel. Relax in your room, read a book, enjoy the
                  hotel amenities, sip your favorite beverage, or simply rest
                  and recharge. This downtime helps you recover your energy and
                  prepare for the next day's adventures.
                </p>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                  As per your preference
                </span>
              </div>
            ) : (
              activities?.map((activity) => (
                <div
                  className="group relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col md:flex-row gap-5 transition-all hover:shadow-md hover:border-blue-100"
                  key={activity?.activityId}
                >
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-sm font-bold text-blue-600 flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {activity?.recommendedTime}
                      </div>

                      {/* Delete Icon */}
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg -mt-1 -mr-1"
                        onClick={(e) => {
                          e.preventDefault();
                          setActivityTitle(activity?.title);
                          setActivityToDeleteId(activity?.activityId);
                          setDeleteActivityModal(true);
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {activity?.description}
                    </p>
                  </div>
                  <div className="w-full md:w-28 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-200">
                    <ActivityImage
                      keyword={activity.imageSearchKeyword}
                      fallbackTitle={activity.title}
                    />
                  </div>
                </div>
              ))
            )}

            {/* Add Activity Button */}
            <button
              className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-gray-500 font-semibold hover:bg-gray-50 hover:text-gray-900 transition-colors flex flex-col items-center justify-center gap-2 mt-2"
              onClick={(e) => {
                e.preventDefault();
                setActivityModal(true);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Another Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
