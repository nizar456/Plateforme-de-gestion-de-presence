"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading, hasRole } = useAuth()
  const location = useLocation()

  if (loading) {
    // You could render a loading spinner here
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      </div>
    )
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/connexion" state={{ from: location }} replace />
  }

  // If user needs to change password, redirect to change password page
  if (user.requiresPasswordChange) {
    return <Navigate to="/change-password" state={{ from: location }} replace />
  }

  // If role is required and user doesn't have it, redirect to unauthorized
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />
  }

  // If all checks pass, render the protected component
  return children
}

export default ProtectedRoute

