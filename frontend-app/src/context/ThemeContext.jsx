"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Vérifier si un thème est déjà stocké dans localStorage
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      // Si aucun thème n'est sauvegardé, utiliser la préférence du système
      if (!savedTheme) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      }
      return savedTheme
    }
    return "light"
  })

  // Appliquer le thème au document
  useEffect(() => {
    const root = window.document.documentElement

    // Supprimer la classe précédente
    root.classList.remove("dark", "light")

    // Ajouter la nouvelle classe
    root.classList.add(theme)

    // Sauvegarder dans localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Fonction pour définir un thème spécifique
  const setThemeMode = (mode) => {
    if (mode === "dark" || mode === "light") {
      setTheme(mode)
    }
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme, setThemeMode }}>{children}</ThemeContext.Provider>
}

// Hook personnalisé pour utiliser le contexte de thème
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme doit être utilisé à l'intérieur d'un ThemeProvider")
  }
  return context
}

