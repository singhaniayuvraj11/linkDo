"use client";

import { FiShare2 } from "react-icons/fi";
// Change the import to 'react-toastify'
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useTheme } from "next-themes";
import Link from "next/link";

export function HomeButton() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="absolute top-4 left-4 z-10">
      <Link href="/">
        <button className="p-2.5 bg-white/30 dark:bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-800 dark:text-gray-100 hover:bg-white/50 dark:hover:bg-gray-700/60 transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9.75L12 3l9 6.75M4.5 10.5v9.75h15v-9.75"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
}
