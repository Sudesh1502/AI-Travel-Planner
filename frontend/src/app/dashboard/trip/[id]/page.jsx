import Link from "next/link";
import Image from "next/image";

export default function TripDetailsPage({ params }) {
  // Static content for demonstration based on the UI design
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
            <Link href="/dashboard/my-trips" className="hover:text-gray-900 transition-colors">Trips</Link>
            <span>›</span>
            <span className="text-gray-900">Paris, France</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Paris Getaway</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Oct 12 — Oct 19, 2024 (7 Days)
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg flex items-center gap-2 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          Mark as Complete
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
              <span className="text-2xl font-bold text-blue-600">$2,400</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                  <span>Accommodation</span>
                  <span>$1,200</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                  <span>Food & Dining</span>
                  <span>$800</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                  <span>Transportation</span>
                  <span>$400</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '17%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stay Options */}
          <div>
            <div className="flex justify-between items-center mb-3 px-1">
              <h3 className="font-bold text-gray-900">Stays Options</h3>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Manage</button>
            </div>
            <div className="flex flex-col gap-3">
              
              {/* Hotel 1 */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex items-stretch h-[110px]">
                <div className="w-[120px] shrink-0 bg-gray-200">
                  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80" alt="Hotel Plaza" className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex flex-col justify-center flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-gray-900 line-clamp-1">Hôtel Plaza Athénée</h4>
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-0.5"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> 4.8</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">8th Arrondissement, Paris</p>
                  <p className="text-sm font-bold text-blue-600 mt-auto">$450 <span className="text-xs text-gray-400 font-medium">/ night</span></p>
                </div>
              </div>

              {/* Hotel 2 */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex items-stretch h-[110px]">
                <div className="w-[120px] shrink-0 bg-gray-200">
                  <img src="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=500&q=80" alt="Hotel des Arts" className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex flex-col justify-center flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-gray-900 line-clamp-1">Hotel des Arts</h4>
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-0.5"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> 4.5</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">Montmartre</p>
                  <p className="text-sm font-bold text-blue-600 mt-auto">$220 <span className="text-xs text-gray-400 font-medium">/ night</span></p>
                </div>
              </div>

              {/* Hotel 3 */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex items-stretch h-[110px]">
                <div className="w-[120px] shrink-0 bg-blue-50 flex items-center justify-center text-blue-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                </div>
                <div className="p-3 flex flex-col justify-center flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-gray-900 line-clamp-1">Le Meurice</h4>
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-0.5"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> 4.9</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">1st Arrondissement</p>
                  <p className="text-sm font-bold text-blue-600 mt-auto">$880 <span className="text-xs text-gray-400 font-medium">/ night</span></p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column (Itinerary) */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          {/* Days Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
            <button className="bg-blue-600 text-white font-bold text-sm py-2 px-5 rounded-full shrink-0 shadow-sm shadow-blue-500/30">Day 1</button>
            <button className="bg-gray-100 text-gray-600 font-semibold text-sm py-2 px-5 rounded-full shrink-0 hover:bg-gray-200 transition-colors">Day 2</button>
            <button className="bg-gray-100 text-gray-600 font-semibold text-sm py-2 px-5 rounded-full shrink-0 hover:bg-gray-200 transition-colors">Day 3</button>
            <button className="bg-gray-100 text-gray-600 font-semibold text-sm py-2 px-5 rounded-full shrink-0 hover:bg-gray-200 transition-colors">Day 4</button>
            <button className="bg-gray-100 text-gray-600 font-semibold text-sm py-2 px-5 rounded-full shrink-0 hover:bg-gray-200 transition-colors">Day 5</button>
            <button className="bg-gray-100 text-gray-600 font-semibold text-sm py-2 px-5 rounded-full shrink-0 hover:bg-gray-200 transition-colors">Day 6</button>
            <button className="bg-gray-100 text-gray-600 font-semibold text-sm py-2 px-5 rounded-full shrink-0 hover:bg-gray-200 transition-colors">Day 7</button>
          </div>

          {/* Section Title */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">01</div>
              <h2 className="text-lg font-bold text-gray-900">City Landmarks & Vistas</h2>
            </div>
            <button className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:text-blue-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Regenerate Day
            </button>
          </div>

          {/* Itinerary Cards */}
          <div className="flex flex-col gap-4">
            
            {/* Activity 1 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col md:flex-row gap-5">
              <div className="flex-grow flex flex-col">
                <div className="text-sm font-bold text-blue-600 flex items-center gap-1.5 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  09:00 AM
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Eiffel Tower Summit</h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Pre-booked skip-the-line access to the third level for panoramic views of the city as it wakes up. Highly recommended to arrive 15 mins early.
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase">Iconic</span>
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase">2 Hours</span>
                </div>
              </div>
              <div className="w-full md:w-48 h-36 shrink-0 rounded-xl overflow-hidden bg-gray-200">
                <img src="https://images.unsplash.com/photo-1543305113-82b47ebc71dd?w=500&q=80" alt="Eiffel Tower" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Activity 2 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col md:flex-row gap-5">
              <div className="flex-grow flex flex-col">
                <div className="text-sm font-bold text-blue-600 flex items-center gap-1.5 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  12:00 PM
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Seine River Lunch Cruise</h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Gourmet 3-course French meal served while gliding past the Musee d'Orsay and Notre Dame Cathedral. Enjoy live piano music on board.
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase">Dining</span>
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase">Relaxing</span>
                </div>
              </div>
              <div className="w-full md:w-48 h-36 shrink-0 rounded-xl overflow-hidden bg-gray-200">
                <img src="https://images.unsplash.com/photo-1583037189850-1921be2327f6?w=500&q=80" alt="Seine River" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Add Activity Button */}
            <button className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-gray-500 font-semibold hover:bg-gray-50 hover:text-gray-900 transition-colors flex flex-col items-center justify-center gap-2 mt-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add Another Activity
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
