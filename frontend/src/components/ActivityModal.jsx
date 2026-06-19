"use client";
import { useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";

export default function ActivityModal({
  activityTitle,
  activityTime,
  activityDescription,
  setActivityModal,
  setActivityTitle,
  setActivityDescription,
  setActivityTime,
  handleAddActivity,
}) {
  // these are created to avoid invalid time inputs from user end.
  // Start Time States
  const [startHr, setStartHr] = useState("07");
  const [startMin, setStartMin] = useState("00");
  const [startAmPm, setStartAmPm] = useState("PM");
  // End Time States
  const [endHr, setEndHr] = useState("08");
  const [endMin, setEndMin] = useState("00");
  const [endAmPm, setEndAmPm] = useState("PM");
  // Helper arrays to generate the dropdown for time selection
  const hoursOptions = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );
  const minutesOptions = Array.from({ length: 12 }, (_, i) =>
    String(i * 5).padStart(2, "0"),
  );

  const validateData = () => {
    if (!activityTitle.trim()) {
      toast.error("Please enter a title for your activity.");
      return false;
    }
    if (!activityDescription.trim()) {
      toast.error("Please enter a description.");
      return false;
    }
    return true;
  };

  return (
    <Modal>
      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-[420px] shadow-2xl flex flex-col overflow-hidden">
        {/* 1. Header Section */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Add Activity</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              setActivityModal(false);
              setActivityTitle("");
              setActivityDescription("");
              setActivityTime("");
            }}
            className="text-gray-400 hover:text-gray-700 transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 2. Body Section */}
        <div className="p-6 flex flex-col gap-5">
          {/* Title Input */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              Activity Title
            </label>
            <input
              type="text"
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder-gray-400"
              placeholder="e.g., Shibuya Crossing"
              value={activityTitle}
              onChange={(e) => setActivityTitle(e.target.value)}
            />
          </div>

          {/* Recommended Time Input */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              Recommended Time
            </label>

            <div className="flex items-center gap-3">
              {/* Start Time */}
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-600/20 focus-within:border-blue-600 transition-all">
                <select
                  value={startHr}
                  onChange={(e) => setStartHr(e.target.value)}
                  className="p-2.5 bg-transparent text-sm font-medium text-gray-900 outline-none appearance-none text-center cursor-pointer hover:bg-gray-50"
                >
                  {hoursOptions.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <span className="text-gray-400 font-bold">:</span>
                <select
                  value={startMin}
                  onChange={(e) => setStartMin(e.target.value)}
                  className="p-2.5 bg-transparent text-sm font-medium text-gray-900 outline-none appearance-none text-center cursor-pointer hover:bg-gray-50"
                >
                  {minutesOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={startAmPm}
                  onChange={(e) => setStartAmPm(e.target.value)}
                  className="p-2.5 bg-gray-50 text-sm font-bold text-blue-700 outline-none cursor-pointer border-l border-gray-200"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>

              <span className="text-gray-400 font-bold text-sm">to</span>

              {/* End Time */}
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-600/20 focus-within:border-blue-600 transition-all">
                <select
                  value={endHr}
                  onChange={(e) => setEndHr(e.target.value)}
                  className="p-2.5 bg-transparent text-sm font-medium text-gray-900 outline-none appearance-none text-center cursor-pointer hover:bg-gray-50"
                >
                  {hoursOptions.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <span className="text-gray-400 font-bold">:</span>
                <select
                  value={endMin}
                  onChange={(e) => setEndMin(e.target.value)}
                  className="p-2.5 bg-transparent text-sm font-medium text-gray-900 outline-none appearance-none text-center cursor-pointer hover:bg-gray-50"
                >
                  {minutesOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={endAmPm}
                  onChange={(e) => setEndAmPm(e.target.value)}
                  className="p-2.5 bg-gray-50 text-sm font-bold text-blue-700 outline-none cursor-pointer border-l border-gray-200"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description / Details */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              rows="3"
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none placeholder-gray-400"
              placeholder="e.g., Experience Tokyo's busiest pedestrian crossing..."
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* 3. Footer Section with Buttons */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-center sm:justify-end gap-3 bg-gray-50/50">
          <button
            onClick={() => {
              setActivityModal(false);
              setActivityTitle("");
              setActivityDescription("");
              setActivityTime("");
            }}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              let isValid = validateData();
              if(!isValid){
                return;
              }
              const formattedTime = `${startHr}:${startMin} ${startAmPm} - ${endHr}:${endMin} ${endAmPm}`;
              setActivityTime(formattedTime); // <-- Async!
              handleAddActivity(formattedTime);
            }}
            className="px-6 py-2.5 bg-[#0044CC] hover:bg-blue-800 text-white rounded-lg text-sm font-bold shadow-sm transition-colors"
          >
            Add Activity
          </button>
        </div>
      </div>
    </Modal>
  );
}
