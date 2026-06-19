"use client";
import { useState } from "react";
import Modal from "./Modal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function LogoutModal({ setLogoutModal }) {
  const router = useRouter();

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      return;
    } catch (error) {
      toast.error(
          error.response?.data?.message || "Failed to logout."
        );
    }
  };
  return (
    <Modal>
      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-[420px] shadow-2xl flex flex-col overflow-hidden">
        {/* 1. Header Section */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-red-50/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Sign Out</h2>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setLogoutModal(false);
            }}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 2. Body Section */}
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            Are you sure you want to sign out of your account? You will need to
            sign back in to plan new trips or manage your current itineraries.
          </p>
        </div>

        {/* 3. Footer Section with Buttons */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-center sm:justify-end gap-3 bg-gray-50/50">
          <button
            onClick={(e) => {
              e.preventDefault();
              setLogoutModal(false);
            }}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleLogout();
              setLogoutModal(false);
            }}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold shadow-sm transition-colors"
          >
            Yes, Sign out
          </button>
        </div>
      </div>
    </Modal>
  );
}
