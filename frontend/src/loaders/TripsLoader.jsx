export default function TripsLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <h3 className="text-lg font-bold text-gray-900">Loading your trips</h3>
      <p className="text-sm text-gray-500 font-medium mt-1">
        Please wait while we fetch your travel plans.
      </p>
    </div>
  );
}
