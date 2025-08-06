"use client";

import { FiShare2 } from "react-icons/fi";
// Change the import to 'react-toastify'
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useTheme } from "next-themes"


export function ShareButton() {
      const { setTheme, resolvedTheme } = useTheme()
    
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // This usage is similar, but it's now calling the correct library
    toast.success("Profile link copied!");
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <button
        onClick={handleShare}
        className="p-2.5 bg-white/30 dark:bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-800 dark:text-gray-100 hover:bg-white/50 dark:hover:bg-gray-700/60 transition-colors duration-200"
        aria-label="Share Profile"
      >
        <FiShare2 className="w-5 h-5" />
      </button>
    </div>
  );
}
