"use client"

import { useState, useEffect, useContext, createContext } from "react"
import { authService } from "../services/api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Add the updateUser function
  const updateUser = (updatedUserData) => {
    try {
      // Update in local state
      setUser(prev => ({ ...prev, ...updatedUserData }))
      
      // Update in localStorage if persisting there
      const currentUser = authService.getCurrentUser()
      const mergedUser = { ...currentUser, ...updatedUserData }
      localStorage.setItem("user", JSON.stringify(mergedUser))
      
      return mergedUser
    } catch (err) {
      console.error("Failed to update user:", err)
      throw err
    }
  }

  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = authService.getCurrentUser()
        setUser(currentUser || null)
      } catch (err) {
        console.error("Error initializing auth:", err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (username, password) => {
    setLoading(true)
    setError(null)

    try {
      const response = await authService.login(username, password)

      if (response.token) {
        const userData = authService.getCurrentUser()
        if (!userData?.role) {
          throw new Error("No role found in user data.")
        }

        setUser(userData)
        return { success: true, role: userData.role }
      }

      if (response.status === "PASSWORD_CHANGE_REQUIRED") {
        return {
          requiresPasswordChange: true,
          message: response.message,
          tempToken: response.tempToken,
        }
      }

      const fallbackError = "Unexpected login response"
      setError(fallbackError)
      return { success: false, error: fallbackError }

    } catch (err) {
      console.error("Login error:", err)
      const errorMessage = err.response?.data?.message || "An error occurred during login"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.register(userData)
      return { success: true, data: response }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred during registration"
      console.error("Registration error:", err)
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.changePassword(currentPassword, newPassword)

      if (response.success && response.message) {
        if (user?.requiresPasswordChange) {
          const updatedUser = { ...user, requiresPasswordChange: false }
          localStorage.setItem("user", JSON.stringify(updatedUser))
          setUser(updatedUser)
        }
        return { success: true, message: response.message }
      }

      return { success: false, error: "Failed to change password" }

    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred while changing password"
      console.error("Password change error:", err)
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Check if user has a specific role
  const hasRole = (role) => user?.role === role

  // Optional helper roles
  const isAdmin = user?.role === "ADMIN"
  const isProfessor = user?.role === "PROFESSOR"
  const isStudent = user?.role === "STUDENT"

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    changePassword,
    updateUser, // Added this function
    isAuthenticated: !!user,
    hasRole,
    isAdmin,
    isProfessor,
    isStudent,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}