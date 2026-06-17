"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addTrip } from "@/services/trip.service";
import FullScreenLoader from "@/loaders/FullScreenLoader";

const INTERESTS = [
  "Adventure",
  "Nature",
  "Beaches",
  "Mountains",
  "Food",
  "Nightlife",
  "Shopping",
  "Photography",
  "Culture",
  "History",
  "Wildlife",
  "Relaxation",
  "Road Trips",
  "Festivals",
  "Sports",
];

function getInterestIcon(name) {
  switch (name) {
    case "Culture":
    case "History":
      return (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
          />
        </svg>
      );
    case "Food":
      return (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
          />
        </svg>
      );
    case "Nature":
    case "Mountains":
    case "Beaches":
      return (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      );
    case "Nightlife":
    case "Festivals":
      return (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      );
    case "Adventure":
    case "Sports":
      return (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      );
    default:
      return (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      );
  }
}

export default function NewTripPage() {
  const router = useRouter();
  const [sourceLocation, setSourceLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [userPreferences, setUserPreferences] = useState("");
  const [budget, setBudget] = useState("medium");
  const [travelType, setTravelType] = useState("solo");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [groupSize, setGroupSize] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetValues = () => {
    setSourceLocation("");
      setDestination("");
      setUserPreferences("");
      setBudget("medium");
      setTravelType("solo");
      setNumberOfDays(1);
      setGroupSize(1);
      setSelectedInterests([]);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (!sourceLocation || !destination || selectedInterests.length === 0) {
        alert("All field are required!");
        return;
      }
      const payload = {
        sourceLocation,
        destination,
        travelType,
        interests: selectedInterests,
        numberOfDays,
        groupSize,
        budgetType: budget,
        userPreferences,
      };
      setLoading(true);
      const trip = await addTrip(payload);
      console.log(trip);
      setLoading(false);
      resetValues();
      router.push("/dashboard/my-trips");
    } catch (error) {
      console.log(error.message);
      alert("Please try after sometime!");
      resetValues();
    }
  };
  return (
    <div className="w-full min-h-screen bg-[#f8faff] py-12 px-4 sm:px-6 lg:px-8">
      {loading && <FullScreenLoader />}
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Plan Your Adventure
        </h1>
        <p className="text-gray-500 font-medium">
          Tell us where you want to go, and our AI will craft the perfect
          itinerary.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
        <form className="space-y-10" onSubmit={handleSubmit}>
          {/* 1. Basic Information */}
          <div>
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h2 className="text-gray-900 font-semibold">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Departure City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="sourceLocation"
                    onChange={(e)=>{
                      setSourceLocation(e.target.value);
                    }}
                    value={sourceLocation}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="e.g. London, UK"
                  />
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="destination"
                    onChange={(e)=>{
                      setDestination(e.target.value);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    value={destination}
                    placeholder="e.g. Tokyo, Japan"
                  />
                </div>
              </div>

              {/* Number of Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Days
                </label>
                <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2.5">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={(e) => {
                      if (numberOfDays > 1) {
                        setNumberOfDays((prev) => prev - 1);
                      }
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
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span
                    className="font-semibold text-gray-900"
                    name="numberOfDays"
                  >
                    {numberOfDays}
                  </span>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={(e) => {
                      if (numberOfDays < 30) {
                        setNumberOfDays((prev) => prev + 1);
                      }
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Group Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Size
                </label>
                <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2.5">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      if (groupSize > 1) {
                        setGroupSize((prev) => prev - 1);
                      }
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
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span
                    className="font-semibold text-gray-900"
                    name="groupSize"
                  >
                    {groupSize}
                  </span>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      if (groupSize < 20) {
                        setGroupSize((prev) => prev + 1);
                      }
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Travel Preferences */}
          <div>
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <h2 className="text-gray-900 font-semibold">
                Travel Preferences
              </h2>
            </div>

            <div className="space-y-6">
              {/* Budget Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Budget Type
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${budget === "low" ? "border-2 border-blue-600 bg-blue-50/50" : "border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"}`}
                    onClick={() => setBudget("low")}
                  >
                    <svg className={`w-6 h-6 ${budget === "low" ? "text-blue-600" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className={`text-sm font-semibold ${budget === "low" ? "text-blue-600" : "text-gray-700"}`}>Budget</span>
                  </div>
                  <div
                    className={`rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${budget === "medium" ? "border-2 border-blue-600 bg-blue-50/50" : "border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"}`}
                    onClick={() => setBudget("medium")}
                  >
                    <svg className={`w-6 h-6 ${budget === "medium" ? "text-blue-600" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    <span className={`text-sm font-semibold ${budget === "medium" ? "text-blue-600" : "text-gray-700"}`}>Standard</span>
                  </div>
                  <div
                    className={`rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${budget === "high" ? "border-2 border-blue-600 bg-blue-50/50" : "border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"}`}
                    onClick={() => setBudget("high")}
                  >
                    <svg className={`w-6 h-6 ${budget === "high" ? "text-blue-600" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    <span className={`text-sm font-semibold ${budget === "high" ? "text-blue-600" : "text-gray-700"}`}>Luxury</span>
                  </div>
                </div>
              </div>

              {/* Travel Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Travel Type
                </label>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${travelType === "solo" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"}`}
                    name="travelType"
                    onClick={() => setTravelType("solo")}
                  >
                    Solo
                  </button>
                  <button
                    type="button"
                    className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${travelType === "group" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"}`}
                    name="travelType"
                    onClick={() => setTravelType("group")}
                  >
                    Group
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Interests */}
          <div>
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <h2 className="text-gray-900 font-semibold">Interests</h2>
            </div>

            <div className="mb-4">
              <select
                className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && !selectedInterests.includes(val)) {
                    setSelectedInterests([...selectedInterests, val]);
                  }
                  e.target.value = ""; // reset dropdown
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Select an interest...
                </option>
                {INTERESTS.filter((i) => !selectedInterests.includes(i)).map(
                  (interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ),
                )}
              </select>
            </div>

            {selectedInterests.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {selectedInterests.map((interest) => (
                  <div
                    key={interest}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 bg-white shadow-sm"
                  >
                    {getInterestIcon(interest)}
                    {interest}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedInterests(
                          selectedInterests.filter((i) => i !== interest),
                        )
                      }
                      className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. Additional Preferences */}
          <div>
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-gray-900 font-semibold">
                Additional Preferences
              </h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anything else our AI should know?
              </label>
              <textarea
                rows="4"
                className="w-full p-4 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder="e.g. 'I want the cheapest trip possible', 'Avoid crowded places', 'Include vegan-friendly spots only'..."
                name="userPreferences"
                onChange={(e)=>{
                  setUserPreferences(e.target.value);
                }}
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-sm"
            >
              Generate My Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
