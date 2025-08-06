"use client"

import { useTheme } from "next-themes"
import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from "react"

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    // Render a placeholder or null to avoid layout shift
    return <div className="w-10 h-10" />;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-16 right-4 z-10 p-2.5 bg-white/30 dark:bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-800 dark:text-gray-100 hover:bg-white/50 dark:hover:bg-gray-700/60 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
    </button>
  )
}