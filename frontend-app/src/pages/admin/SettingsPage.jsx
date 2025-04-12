"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, User, Mail, Lock, Globe, Bell, Shield } from "lucide-react"
import AdminLayout from "../../components/admin/AdminLayout"
import {useAuth} from "../../hooks/useAuth"

function SettingsPage() {
  const { user, updateUser } = useAuth() // Get current user from auth context
  const [activeTab, setActiveTab] = useState("profile")
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
  })

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Get current user data on component mount
  useEffect(() => {
    const loadUserData = () => {
      const getCurrentUser = () => {
        const userStr = localStorage.getItem("user")
        return userStr ? JSON.parse(userStr) : null
      }
      
      const currentUser = getCurrentUser()
      if (currentUser) {
        // Split fullName into firstName and lastName
        const nameParts = currentUser.fullName ? currentUser.fullName.split(' ') : ['', '']
        const firstName = nameParts[0] || ""
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ""
        
        setProfileForm({
          firstName,
          lastName,
          email: currentUser.email || "",
          title: currentUser.role || "Administrateur", // Using role as title
          bio: currentUser.bio || "",
          avatar: currentUser.avatar || "",
        })
        
        // Set notification settings if they exist in user data
        if (currentUser.notificationSettings) {
          setNotificationSettings(currentUser.notificationSettings)
        }
      }
      setIsLoading(false)
    }
  
    loadUserData()
  }, [])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSecurityChange = (e) => {
    const { name, value } = e.target
    setSecurityForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    
    try {
      if (!user?.id) throw new Error("User not authenticated")
      
      // Prepare data for API
      const userData = {
        fullName: `${profileForm.firstName} ${profileForm.lastName}`.trim(),
        email: profileForm.email,
        role: profileForm.title,
      }

      const updatedUser = await adminUserService.updateUser(user.id, userData)
      updateUser(updatedUser) // Update user in auth context
      setSuccess("Profile updated successfully!")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile")
      console.error(err)
    }
  }

  const handleSecuritySubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    
    try {
      if (!user?.id) throw new Error("User not authenticated")
      
      if (securityForm.newPassword !== securityForm.confirmPassword) {
        throw new Error("New passwords don't match")
      }

      if (securityForm.newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters")
      }

      await adminUserService.adminChangePassword(
        user.id, 
        securityForm.newPassword
      )
      
      setSuccess("Password updated successfully!")
      setSecurityForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update password")
      console.error(err)
    }
  }

  const tabs = [
    { id: "profile", label: "Profil", icon: <User className="h-5 w-5" /> },
    { id: "security", label: "Sécurité", icon: <Lock className="h-5 w-5" /> },
  ]

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gérez vos préférences et paramètres de compte
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="sm:flex sm:divide-x sm:divide-gray-200 dark:sm:divide-gray-700">
            {/* Sidebar navigation */}
            <aside className="py-6 sm:w-64 sm:flex-shrink-0 border-b border-gray-200 dark:border-gray-700 sm:border-b-0">
              <div className="px-4 sm:px-6 mb-6 flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {profileForm.firstName} {profileForm.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {profileForm.title}
                  </p>
                </div>
              </div>
              
              <nav className="px-4 sm:px-6 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setError("")
                      setSuccess("")
                    }}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                      activeTab === tab.id
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`mr-3 ${
                        activeTab === tab.id
                          ? "text-blue-500 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                      }`}
                    >
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Informations du Profil
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Ces informations seront affichées publiquement.
                      </p>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Prénom
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              value={profileForm.firstName}
                              onChange={handleProfileChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Nom
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              value={profileForm.lastName}
                              onChange={handleProfileChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Adresse Email
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={profileForm.email}
                              onChange={handleProfileChange}
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Titre
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="title"
                              id="title"
                              value={profileForm.title}
                              onChange={handleProfileChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            // Reset form to original values
                            const nameParts = user.fullName.split(' ')
                            setProfileForm({
                              firstName: nameParts[0],
                              lastName: nameParts.slice(1).join(' '),
                              email: user.email,
                              title: user.role,
                            })
                            setError("")
                            setSuccess("")
                          }}
                          className="bg-white dark:bg-gray-800 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Enregistrer
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Sécurité du Compte
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Mettez à jour votre mot de passe.
                      </p>
                    </div>

                    <form onSubmit={handleSecuritySubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Nouveau mot de passe
                          </label>
                          <div className="mt-1">
                            <input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              autoComplete="new-password"
                              required
                              value={securityForm.newPassword}
                              onChange={handleSecurityChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
                            />
                          </div>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Le mot de passe doit contenir au moins 8 caractères.
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Confirmer le nouveau mot de passe
                          </label>
                          <div className="mt-1">
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              autoComplete="new-password"
                              required
                              value={securityForm.confirmPassword}
                              onChange={handleSecurityChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setSecurityForm({
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            })
                            setError("")
                            setSuccess("")
                          }}
                          className="bg-white dark:bg-gray-800 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Mettre à jour le mot de passe
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default SettingsPage