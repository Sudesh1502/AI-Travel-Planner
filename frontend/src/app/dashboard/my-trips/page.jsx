"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllTrips } from "@/services/trip.service";
import TripsLoader from "@/loaders/TripsLoader";
import { useAuth } from "@/context/AuthContext";
export default function MyTripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const data = await getAllTrips();
      setTrips(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {loading && <TripsLoader />}
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">My Trips</h1>
        <p className="text-gray-500 text-sm font-medium">
          Manage your adventures and relive past memories
        </p>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.data?.map((trip) => (
          <div
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative group"
            key={trip._id}
          >
            <div className="h-48 w-full bg-gray-200 relative">
              <img
                src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80"
                alt="Paris"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-[10px] font-bold text-blue-600 tracking-wider">
                CONFIRMED
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {trip.destination}
              </h3>
              <p className="text-sm text-gray-500 font-medium mb-6">
                Oct 12 — Oct 19, 2024
              </p>
              <Link
                href={`/dashboard/trip/${trip._id}`}
                className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-bold py-2.5 rounded-lg transition-colors block"
              >
                View Itinerary
              </Link>
            </div>
          </div>
        ))}
        {/* Card 1: Paris */}

       
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
    </div>
  );
}
