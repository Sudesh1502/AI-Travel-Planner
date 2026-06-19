"use client";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function CityAutocomplete({ value, onChange, placeholder }) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when the user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //500ms delay so we don't spam the API
  useEffect(() => {
    const fetchCities = async () => {
      // Don't search if it's too short, or if they already clicked a final result
      if (query.length < 2 || query === value) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      try {
        // OpenStreetMap API
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&featuretype=city&limit=5`);
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        toast.error("Failed to fetch cities.");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchCities();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, value]);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      
      {/* Input Field */}
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          
          onChange(""); 
        }}
        onFocus={() => { if (results.length > 0) setIsOpen(true) }}
      />
      
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute right-3 top-3 text-gray-400">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {results.map((place) => (
            <li
              key={place.place_id}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b border-gray-50 last:border-0"
              onClick={() => {
               
                const displayName = place.display_name;
                setQuery(displayName); 
                onChange(displayName); 
                setIsOpen(false);
              }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}