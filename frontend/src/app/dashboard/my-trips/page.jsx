import Image from "next/image";
import Link from "next/link";
export default function MyTripsPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">My Trips</h1>
        <p className="text-gray-500 text-sm font-medium">Manage your adventures and relive past memories</p>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Paris */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative group">
          <div className="h-48 w-full bg-gray-200 relative">
            <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80" alt="Paris" className="w-full h-full object-cover" />
            <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-[10px] font-bold text-blue-600 tracking-wider">
              CONFIRMED
            </div>
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Paris Getaway</h3>
            <p className="text-sm text-gray-500 font-medium mb-6">Oct 12 — Oct 19, 2024</p>
            <Link href="/dashboard/trip/paris" className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-bold py-2.5 rounded-lg transition-colors block">
              View Itinerary
            </Link>
          </div>
        </div>

        {/* Card 2: Santorini */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative group">
          <div className="h-48 w-full bg-gray-200 relative">
            <img src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80" alt="Santorini" className="w-full h-full object-cover" />
            <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-[10px] font-bold text-orange-500 tracking-wider">
              DRAFT
            </div>
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Santorini Getaway</h3>
            <p className="text-sm text-gray-500 font-medium mb-6">Dates TBD</p>
            <Link href="/dashboard/trip/santorini" className="w-full mt-auto bg-white border border-blue-600 text-blue-600 text-center hover:bg-blue-50 text-sm font-bold py-2.5 rounded-lg transition-colors block">
              Continue Planning
            </Link>
          </div>
        </div>

        {/* Card 3: Kyoto */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative group">
          <div className="h-48 w-full bg-gray-200 relative">
            <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80" alt="Kyoto" className="w-full h-full object-cover" />
            <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-[10px] font-bold text-gray-600 tracking-wider">
              COMPLETED
            </div>
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Summer in Kyoto</h3>
            <p className="text-sm text-gray-500 font-medium mb-6">July 2024</p>
            <button className="w-full mt-auto bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-bold py-2.5 rounded-lg transition-colors">
              View Memories
            </button>
          </div>
        </div>

        {/* Card 4: Plan new */}
        <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer min-h-[320px]">
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-600 mb-4 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">Plan something new</h3>
        </div>

        {/* Placeholder Card 1 */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center min-h-[320px]">
           <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>

        {/* Placeholder Card 2 */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center min-h-[320px]">
           <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
        </div>

      </section>

    </div>
  );
}
