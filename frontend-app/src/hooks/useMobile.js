"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}

export function useSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkIfSmallScreen = () => {
      setIsSmallScreen(window.innerWidth < 640)
    }

    // Initial check
    checkIfSmallScreen()

    // Add event listener
    window.addEventListener("resize", checkIfSmallScreen)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfSmallScreen)
    }
  }, [])

  return isSmallScreen
}

