"use client";
import { registerUser } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState("");
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    if (formData.name.length < 3) {
      setError("Name must be at least 3 characters long.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Password Dosen't match!");
        return;
      }
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      router.push("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left Pane */}
        <div className="hidden md:flex w-full md:w-[45%] relative bg-slate-900 overflow-hidden flex-col justify-center p-8 lg:p-16">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
            alt="Mountain Landscape"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-8 lg:p-10 rounded-2xl w-full max-w-md mx-auto md:ml-auto md:mr-10 text-white shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Plan your next <br /> adventure with <br /> precision.
            </h2>
            <p className="text-sm text-gray-200 mb-8 leading-relaxed">
              Join thousands of travelers using NextJourney to organize
              itineraries, track budgets, and discover hidden gems through
              intelligent AI synthesis.
            </p>

            <ul className="space-y-4">
              
              <li className="flex items-center gap-3 text-sm font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-300"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  <path d="M5 3v4" />
                  <path d="M19 17v4" />
                  <path d="M3 5h4" />
                  <path d="M17 19h4" />
                </svg>
                AI-Powered Itineraries
              </li>
            </ul>
          </div>
        </div>

        {/* Right Pane */}
        <div className="w-full md:w-[55%] flex flex-col items-center p-8 py-6 bg-white overflow-y-auto">
          <div className="w-full max-w-[440px] flex flex-col my-auto">
            <div className="flex items-center justify-center mb-6">
              <img
                src="/logo.png"
                alt="Next Journey"
                className="max-w-[250px] h-auto"
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create your account
            </h1>
            <p className="text-gray-500 text-sm mb-5">
              Begin your curated travel experience today.
            </p>
             {error && (
              <p className="text-red-500 text-sm font-medium mb-4">
                {error}
              </p>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1 font-medium">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#2563eb] hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Create Account
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
