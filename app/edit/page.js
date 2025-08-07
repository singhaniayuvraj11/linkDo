// app/edit/page.js

import React, { Suspense } from "react";
import EditForm from "./EditForm";

// This is a loading fallback UI. You can customize it as you like.
// It will be shown while the EditForm component is loading.
const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl space-y-4">
        <svg
          className="animate-spin h-10 w-10 text-purple-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <div className="text-lg font-semibold text-gray-700">Loading Editor...</div>
      </div>
    </div>
  );
};

const UpdatePage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <EditForm />
    </Suspense>
  );
};

export default UpdatePage;