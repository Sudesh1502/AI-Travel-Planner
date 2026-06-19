"use client";
import { useAuth } from "@/context/AuthContext";
import { getAllTrips } from "@/services/trip.service.js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalTrips, setTotalTrips] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const data = await getAllTrips();

      const tripsArray = Array.isArray(data) ? data : data?.data || [];

      setTrips(tripsArray);
      setTotalTrips(tripsArray.length);

      const calculatedBudget = tripsArray.reduce((sum, trip) => {
        const tripCost = Number(trip?.budgetEstimate?.total) || 0;
        return sum + tripCost;
      }, 0);

      setTotalBudget(calculatedBudget);

      const calculatedDays = tripsArray.reduce((sum, trip) => {
        const days = Number(trip?.numberOfDays) || 0;
        return sum + days;
      }, 0);
      setTotalDays(calculatedDays);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
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
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold-300 text-gray-900 mb-1">
          Welcome, {user?.name || "Traveler"}! Ready to explore new
          destinations?
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Your next adventure is waiting to be planned.
        </p>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
            <img
              src="/destination.jpg"
              alt="Total Trips"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
              Total Trips
            </p>
            <p className="text-xl font-bold text-gray-900">
              {totalTrips} Destinations
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
            <img
              src="/plan.jpg"
              alt="Planned Days"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
              Planned Days
            </p>
            <p className="text-xl font-bold text-gray-900">{totalDays} Days</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center shrink-0">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
              Total Budget
            </p>
            <p className="text-xl font-bold text-gray-900">${totalBudget}</p>
          </div>
        </div>
      </section>

      {/* Recent Trips */}
      <section>
        <div className="trip-head flex flex-row justify-between intems-center pr-2">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recents</h2>

          <Link
            href="/dashboard/my-trips"
            className="text-blue-500 hover:text-blue-400 cursor-pointer"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trip Card 1 */}
          {trips.slice(0, 2).map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative group"
            >
              <div className="h-40 w-full bg-gray-200 relative">
                <img
                  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"
                  alt="Kyoto"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-[10px] font-bold text-blue-600 tracking-wider">
              {getBudgetType(trip.budgetType)}
            </div>
                
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {trip?.destination}
                  </h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-6">
                  <div className="flex items-center gap-1">
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
                    7 Days
                  </div>
                  <div className="flex items-center gap-1">
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    {trip.budgetType}
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <Link
                    href={`/dashboard/trip/${trip._id}`}
                    className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:text-blue-700 transition-colors"
                  >
                    View Plan{" "}
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* New Trip Card */}
          <Link href="/dashboard/new-trip" className="">
            <div className="border-2 border-dashed border-gray-400 rounded-2xl flex flex-col items-center justify-center p-8 bg-white hover:bg-gray-100 transition-colors cursor-pointer min-h-[300px]">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 mb-4 shadow-sm">
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
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                Plan something new
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                Start your adventure today.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-blue-600 rounded-2xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg shadow-blue-500/20 my-4">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready for a new adventure?
          </h2>
          <p className="text-blue-100 font-medium leading-relaxed">
            Let our AI help you craft the perfect 10-day itinerary for your next
            dream destination. Based on your preferences, we suggest hidden gems
            you'll love.
          </p>
        </div>
        <Link
          href="/dashboard/new-trip"
          className="bg-white text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm shrink-0"
        >
          Explore Destinations
        </Link>
      </section>
    </div>
  );
}
