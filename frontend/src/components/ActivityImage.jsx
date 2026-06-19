"use client";
import { useState, useEffect } from "react";
import api from "../libs/axios.js";

export default function ActivityImage({ keyword, fallbackTitle }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        setLoading(true);
        const searchPhrase = keyword || fallbackTitle;
        
        if (!searchPhrase) {
            if (isMounted) {
                setImageUrl("https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80");
                setLoading(false);
            }
            return;
        }
        
        const response = await api.get(`/api/trips/activity/image?keyword=${encodeURIComponent(searchPhrase)}`);
        
        if (isMounted) {
          setImageUrl(response.data.url);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setImageUrl("https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80");
          setLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false; // Prevents memory leaks if user closes the day quickly!
    };
  }, [keyword, fallbackTitle]);

  if (loading) {
    return (
      <div className="w-full h-full bg-gray-200 animate-pulse rounded-xl"></div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={keyword || fallbackTitle || "Activity"}
      className="w-full h-full object-cover rounded-xl shadow-sm transition-opacity duration-300"
    />
  );
}