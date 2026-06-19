"use client";
import { useState, useEffect } from "react";

const loadingMessages = [
  "Analyzing your travel preferences...",
  "Finding the best hidden gems...",
  "Scouting top-rated hotels...",
  "Crafting your day-by-day itinerary...",
  "Finalizing budget estimates...",
  "Almost there! Packing your bags..."
];

export default function MultiStepLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => {
        
        if (prevIndex === loadingMessages.length - 1) return prevIndex;
        return prevIndex + 1;
      });
    }, 4500);

    
    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-2xl max-w-sm w-full mx-4 border border-gray-100">
        
       
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
        
        
        <p className="text-lg font-bold text-gray-900 text-center animate-pulse">
          {loadingMessages[messageIndex]}
        </p>
        
        <p className="text-xs text-gray-400 mt-3 text-center">
          Our AI is working hard, this might take up to 20 seconds.
        </p>
      </div>
    </div>
  );
}