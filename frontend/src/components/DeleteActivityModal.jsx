"use client";
import Modal from "./Modal";

export default function DeleteActivityModal({
  activityTitle,
  setDeleteActivityModal,
  handleDeleteActivity,
}) {
  return (
    <Modal>
      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl flex flex-col overflow-hidden">
        
        {/* 1. Header Section */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-red-50/30">
          <div className="flex items-center gap-2 text-red-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <h2 className="text-lg font-bold">Delete Activity</h2>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setDeleteActivityModal(false);
            }}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 2. Body Section */}
        <div className="p-6">
          <p className="text-gray-700 text-[15px] leading-relaxed">
            Are you sure you want to delete this activity{" "}
            <span className="font-bold text-gray-900">"{activityTitle}"</span>?
          </p>
          <p className="text-xs font-medium text-gray-400 mt-2">
            This action cannot be undone.
          </p>
        </div>

        {/* 3. Footer Section */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-center sm:justify-end gap-3 bg-gray-50/50">
          <button
            onClick={() => setDeleteActivityModal(false)}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDeleteActivity();
            }}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
          >
            Yes, Delete
          </button>
        </div>
        
      </div>
    </Modal>
  );
}