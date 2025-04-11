"use client"

import { useState, useEffect, useContext, createContext } from "react"
import { authService } from "../services/api"

// Create an auth context
const AuthContext = createContext(null)

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = authService.getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        console.error("Error initializing auth:", err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  // Login function
  const login = async (username, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.login(username, password)

      if (response.token) {
        // If login was successful and we got a token
        const userData = authService.getCurrentUser()
        setUser(userData)
        return { success: true }
      } else if (response.status === "PASSWORD_CHANGE_REQUIRED") {
        // If password change is required
        return {
          requiresPasswordChange: true,
          message: response.message,
          tempToken: response.tempToken,
        }
      } else {
        // Some other response format
        setError("Unexpected response format")
        return { success: false, error: "Unexpected response format" }
      }
    } catch (err) {
      console.error("Login error:", err)
      const errorMessage = err.response?.data?.message || "An error occurred during login"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Register function
  const register = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.register(userData)
      return { success: true, data: response }
    } catch (err) {
      console.error("Registration error:", err)
      const errorMessage = err.response?.data?.message || "An error occurred during registration"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    authService.logout()
    setUser(null)
  }

  // Change password function
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.changePassword(currentPassword, newPassword)

      // If this was a first-time password change
      if (response.success && response.message) {
        return response
      }

      // Update user state if needed
      if (user && user.requiresPasswordChange) {
        const updatedUser = {
          ...user,
          requiresPasswordChange: false,
        }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser(updatedUser)
      }

      return { success: true }
    } catch (err) {
      console.error("Password change error:", err)
      const errorMessage = err.response?.data?.message || "An error occurred while changing password"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Check if user has specific role
  const hasRole = (role) => {
    return user && user.role === role
  }

  // Auth context value
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    changePassword,
    isAuthenticated: !!user,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

