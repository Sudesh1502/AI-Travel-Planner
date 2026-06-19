"use client";
import { useAuth } from "@/context/AuthContext.jsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }


    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    //clearing prev states
    setError(""); 

    try {
      await login(formData.email, formData.password);
      router.push("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-[440px] bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
        <div className="flex flex-col items-center justify-center mb-8 gap-3">
          <img
            src="/logo.png"
            alt="Next Journey"
            className="max-w-[250px] h-auto"
          />
          <p className="text-gray-400 font-medium">
            The Intelligent way to see the world.
          </p>

          {error && (
              <p className="text-red-500 text-sm font-medium mb-4">
                {error}
              </p>
            )}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1 font-medium">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 mt-2 bg-[#2563eb] hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}
