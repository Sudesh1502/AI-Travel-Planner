"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteTrip, getAllTrips } from "@/services/trip.service";
import TripsLoader from "@/loaders/TripsLoader";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { formatTripDates } from "@/utils/dateFormatter";
import DeleteTripModal from "@/components/DeleteTripModal";
import { useRouter } from "next/navigation";
export default function MyTripsPage() {

  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTripModal, setDeleteTripModal] = useState(false);
  const [tripToDeleteId, setTripToDeleteId] = useState(null);
  const [tripToDeleteDestination, setTripToDeleteDestination] = useState(null);
  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const data = await getAllTrips();
      setTrips(data);
    } catch (error) {
      toast.error("Failed to load your trips.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrip = async () => {
    try {
      setDeleteTripModal(false);
      setLoading(true);
      await deleteTrip(tripToDeleteId);
      await loadTrips();
      toast.success("Trip deleted successfully");
    } catch (error) {
      toast.error("Failed to Delete Trip, Try Again.");
    } finally {
      setLoading(false);
      setTripToDeleteId(null);
    }
  };

  const getBudgetType = (budget) => {
    if(budget === "low"){
      return "Budget";
    }else if(budget === "medium"){
      return "Standard";
    }else{
      return "Luxury";
    }
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {deleteTripModal && (
        <DeleteTripModal
          setDeleteTripModal={setDeleteTripModal}
          handleDeleteTrip={handleDeleteTrip}
          tripToDeleteDestination={tripToDeleteDestination}
        />
      )}
      {loading && <TripsLoader />}
      {/* Header */}
      <section>
        <div className="flex justify-between">
          <div className="metaData">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">My Trips</h1>
            <p className="text-gray-500 text-sm font-medium">
              Manage your adventures and relive past memories
            </p>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2.5 rounded-lg flex items-center transition-colors self-center"
            onClick={() => router.back()}
          >
            Back
          </button>
        </div>
      </section>

      {/* Grid or Empty State */}
      {!loading && (!trips.data || trips.data.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-24 text-center mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Oops! Your dream trip has yet to come.
          </h2>
          <p className="text-gray-500 mb-8 max-w-md">
            You haven't planned any trips yet. Start your next big adventure by
            generating a personalized itinerary with our AI.
          </p>
          <Link
            href="/dashboard/new-trip"
            className="bg-blue-600 hover:bg-blue-700 text-white text-base font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
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
                strokeWidth="2.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Plan your first trip
          </Link>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.data?.map((trip) => (
            <div
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative group"
              key={trip._id}
            >
              <div className="h-48 w-full bg-gray-200 relative">
                <img
                  src={trip?.coverImage || "/images/default-travel.jpg"}
                  alt={trip?.destination}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-[10px] font-bold text-blue-600 tracking-wider">
              {getBudgetType(trip.budgetType)}
            </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {trip.destination}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium mb-6">
                      {formatTripDates(trip.tripDate, trip.numberOfDays)}
                    </p>
                  </div>
                  <button
                    className="transition-opacity duration-300 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg -mt-1 -mr-1 transition-colors self-start"
                    onClick={(e) => {
                      e.preventDefault();
                      setTripToDeleteId(trip._id);
                      setTripToDeleteDestination(trip.destination);
                      setDeleteTripModal(true);
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

                <Link
                  href={`/dashboard/trip/${trip._id}`}
                  className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-bold py-2.5 rounded-lg transition-colors block"
                >
                  View Itinerary
                </Link>
              </div>
            </div>
          ))}

          {/* Card 4: Plan new */}
          <Link href="/dashboard/new-trip" className="">
            <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer min-h-[320px]">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                Plan something new
              </h3>
            </div>
          </Link>
        </section>
      )}
    </div>
  );
}
