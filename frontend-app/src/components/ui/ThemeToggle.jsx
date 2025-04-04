"use client"
import { useTheme } from "../../context/ThemeContext"
import { Sun, Moon } from "lucide-react"

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}

export default ThemeToggle

