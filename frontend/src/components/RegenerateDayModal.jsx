import Modal from "./Modal";

export function RegenerateDayModal({currentDay, setRegenrateModal, setDayDescription, setNumberOfActivities, numberOfActivities, handleRegenerate}){
    return (
       <Modal>
          {/* Modal Container */}
          <div className="bg-white rounded-2xl w-full max-w-[420px] shadow-2xl flex flex-col overflow-hidden">
            {/* 1. Header Section */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">
                Regenerate Day {currentDay}
              </h2>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setRegenrateModal(false);
                  setDayDescription("");
                  setNumberOfActivities(1);
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
            <div className="p-6 flex flex-col gap-6">
              {/* Number of Activities */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  No. of Activities you want to do
                </label>
                {/* Stepper Input */}
                <div className="flex items-center w-32 h-10 border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    className="flex-1 h-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors font-bold text-xl"
                    onClick={() => {
                      if (numberOfActivities > 1) {
                        setNumberOfActivities((prev) => prev - 1);
                      }
                    }}
                  >
                    −
                  </button>
                  <div className="flex-1 h-full flex items-center justify-center border-x border-gray-200 font-bold text-gray-900 text-sm">
                    {numberOfActivities}
                  </div>
                  <button
                    type="button"
                    className="flex-1 h-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors font-bold text-xl"
                    onClick={() => {
                      if (numberOfActivities < 15) {
                        setNumberOfActivities((prev) => prev + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Description / Vibe */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Describe the day schedule or Vibe
                </label>
                <textarea
                  rows="4"
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none placeholder-gray-400"
                  placeholder="e.g., relaxed morning, energetic evening"
                  name="userPreferences"
                  onChange={(e) => {
                    setDayDescription(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>

            {/* 3. Footer Section with Buttons */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-center sm:justify-end gap-3 bg-gray-50/50">
              <button
                onClick={() => {
                  setRegenrateModal(false);
                  setDayDescription("");
                  setNumberOfActivities(1);
                }}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleRegenerate();
                }}
                className="px-6 py-2.5 bg-[#0044CC] hover:bg-blue-800 text-white rounded-lg text-sm font-bold shadow-sm transition-colors"
              >
                Regenerate Day
              </button>
            </div>
          </div>
        </Modal> 
    )
}