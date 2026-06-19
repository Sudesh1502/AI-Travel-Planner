"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center">
        {/* HERO SECTION */}
        <section className="w-full relative flex flex-col items-center justify-center pt-24 pb-32 px-4 sm:px-6 lg:px-8 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-indigo-50/50 to-white overflow-hidden">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
            AI-Powered Travel Planning
          </div>

          <h1 className="max-w-4xl text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Plan your dream trip in<br />seconds, not hours.
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-medium">
            <span className="text-blue-500">NextJourney</span> uses advanced intelligence to craft personalized itineraries based on
            your budget, interests, and style. Forget the spreadsheets.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 z-10">
            <Link
              href="/dashboard/new-trip"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-base font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Start Planning Free
            </Link>
          </div>

          {/* MOCKUP UI */}
          <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative z-10 transform translate-y-8">
            {/* Window Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Paris: 7-Day Art & Pastry Tour</div>
              <div className="flex items-center gap-3 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
            </div>
            {/* Mockup Body */}
            <div className="flex h-[400px]">
              {/* Sidebar */}
              <div className="w-64 border-r border-gray-100 p-4 hidden md:block text-left">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Itinerary</h3>
                <div className="flex flex-col gap-2">
                  <div className="bg-blue-50 text-blue-700 text-sm font-bold p-3 rounded-lg">Day 1: Arrival & Marais</div>
                  <div className="text-gray-500 text-sm font-semibold p-3 hover:bg-gray-50 rounded-lg cursor-pointer">Day 2: Louvre & Seine</div>
                  <div className="text-gray-500 text-sm font-semibold p-3 hover:bg-gray-50 rounded-lg cursor-pointer">Day 3: Montmartre Magic</div>
                  <div className="text-gray-500 text-sm font-semibold p-3 hover:bg-gray-50 rounded-lg cursor-pointer">Day 4: Versailles Escape</div>
                </div>
              </div>
              {/* Main Content */}
              <div className="flex-1 p-6 lg:p-8 bg-gray-50/50 text-left overflow-hidden relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Day 2: The Heart of Art</h2>
                    <p className="text-sm text-gray-500 font-medium mt-1">Tuesday, Oct 14th</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">Art</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">Dining</span>
                  </div>
                </div>
                {/* Activity 1 */}
                <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 flex gap-5 mb-4">
                  <div className="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80" alt="Louvre" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900">Louvre Museum VIP Tour</h4>
                      <span className="text-xs font-bold text-gray-400">09:00 AM</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">Experience the masterpieces with skip-the-line access and a private guide specializing in the Renaissance period.</p>
                  </div>
                </div>
                {/* Activity 2 */}
                <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 flex gap-5">
                  <div className="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80" alt="Restaurant" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900">Lunch at Le Comptoir</h4>
                      <span className="text-xs font-bold text-gray-400">12:30 PM</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">AI Suggestion: Highly rated for their seasonal beef bourguignon and central location near your next stop.</p>
                  </div>
                </div>
                {/* Fade Out Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        

        {/* FEATURES SECTION */}
        <section className="w-full py-24 bg-gray-50 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Smarter planning for smarter travelers</h2>
              <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">Our AI engine handles the logistics, so you can focus on the memories.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">AI Itinerary</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">Smart scheduling that adapts to your pace. No more rushing through museums or getting stuck in traffic.</p>
              </div>
              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Budget Estimation</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">Real-time cost breakdowns for flights, hotels, and activities. Know exactly what you'll spend before you go.</p>
              </div>
              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Hotel Recommendations</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">Hand-picked stays based on your aesthetic and proximity to your planned itinerary activities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="w-full py-24 bg-white px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Three steps to your perfect getaway</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-0.5 bg-gray-100 -z-10"></div>
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-600 text-white font-bold text-xl rounded-full flex items-center justify-center mb-6 shadow-md border-4 border-white">1</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Choose Destination</h3>
                <p className="text-sm text-gray-500 font-medium">Input any city, country, or even a vague region you've been dreaming about.</p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-600 text-white font-bold text-xl rounded-full flex items-center justify-center mb-6 shadow-md border-4 border-white">2</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Customize Interests</h3>
                <p className="text-sm text-gray-500 font-medium">Tell us if you're a foodie, history buff, or thrill-seeker. We tailor every detail.</p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-600 text-white font-bold text-xl rounded-full flex items-center justify-center mb-6 shadow-md border-4 border-white">3</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Get Your Plan</h3>
                <p className="text-sm text-gray-500 font-medium">Receive a fully interactive itinerary ready for booking and sharing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="w-full py-16 px-4 bg-white mb-8">
          <div className="max-w-5xl mx-auto bg-[#1A2535] rounded-[2rem] overflow-hidden relative shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            
            <div className="relative p-12 md:p-20 flex flex-col items-center text-center z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Ready to explore?</h2>
              <p className="text-lg text-blue-100/70 font-medium max-w-2xl mb-10">
                Join 50,000+ travelers planning their next adventure with AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/dashboard/new-trip"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white text-base font-bold py-3.5 px-8 rounded-xl transition-all shadow-md"
                >
                  Plan Your First Trip
                </Link>
                
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
