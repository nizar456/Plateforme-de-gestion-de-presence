"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, User, Mail, Lock, Globe, Bell, Shield } from "lucide-react"
import AdminLayout from "../../components/admin/AdminLayout"

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileForm, setProfileForm] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@universite.fr",
    title: "Administrateur",
    bio: "Administrateur système de l'Université de France avec plus de 10 ans d'expérience dans la gestion des systèmes d'information universitaires.",
  })

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newsUpdates: true,
    accountActivity: true,
    marketingEmails: false,
  })

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

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    // Logique pour sauvegarder les modifications du profil
    console.log("Profile form submitted:", profileForm)
    // Afficher une notification de succès
  }

  const handleSecuritySubmit = (e) => {
    e.preventDefault()
    // Logique pour changer le mot de passe
    console.log("Security form submitted:", securityForm)
    // Réinitialiser le formulaire après soumission
    setSecurityForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    // Afficher une notification de succès
  }

  const handleNotificationSubmit = (e) => {
    e.preventDefault()
    // Logique pour sauvegarder les paramètres de notification
    console.log("Notification settings submitted:", notificationSettings)
    // Afficher une notification de succès
  }

  const tabs = [
    { id: "profile", label: "Profil", icon: <User className="h-5 w-5" /> },
    { id: "security", label: "Sécurité", icon: <Lock className="h-5 w-5" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-5 w-5" /> },
    { id: "appearance", label: "Apparence", icon: <Globe className="h-5 w-5" /> },
    { id: "privacy", label: "Confidentialité", icon: <Shield className="h-5 w-5" /> },
  ]

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Gérez vos préférences et paramètres de compte</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="sm:flex sm:divide-x sm:divide-gray-200 dark:sm:divide-gray-700">
            {/* Sidebar de navigation */}
            <aside className="py-6 sm:w-64 sm:flex-shrink-0 border-b border-gray-200 dark:border-gray-700 sm:border-b-0">
              <nav className="px-4 sm:px-6 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
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

            {/* Contenu principal */}
            <div className="flex-1 p-6">
              {/* Onglet Profil */}
              {activeTab === "profile" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Informations du Profil
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Ces informations seront affichées publiquement, alors soyez prudent avec ce que vous partagez.
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
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Bio
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="bio"
                              name="bio"
                              rows="3"
                              value={profileForm.bio}
                              onChange={handleProfileChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
                            ></textarea>
                          </div>
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Brève description de votre profil. Les URLs sont mises en lien automatiquement.
                          </p>
                        </div>

                        <div className="sm:col-span-6">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Photo de profil
                          </label>
                          <div className="mt-2 flex items-center">
                            <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                              <svg
                                className="h-full w-full text-gray-300 dark:text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </span>
                            <button
                              type="button"
                              className="ml-5 bg-white dark:bg-gray-800 py-2 px-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Changer
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
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

              {/* Onglet Sécurité */}
              {activeTab === "security" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Sécurité du Compte
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Mettez à jour votre mot de passe et gérez les paramètres de sécurité de votre compte.
                      </p>
                    </div>

                    <form onSubmit={handleSecuritySubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Mot de passe actuel
                          </label>
                          <div className="mt-1">
                            <input
                              id="currentPassword"
                              name="currentPassword"
                              type="password"
                              autoComplete="current-password"
                              required
                              value={securityForm.currentPassword}
                              onChange={handleSecurityChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
                            />
                          </div>
                        </div>

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

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">
                        Authentification à deux facteurs
                      </h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Ajoutez une couche de sécurité supplémentaire à votre compte.
                      </p>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Configurer l'authentification à deux facteurs
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Onglet Notifications */}
              {activeTab === "notifications" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Préférences de Notification
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Gérez comment et quand vous recevez des notifications.
                      </p>
                    </div>

                    <form onSubmit={handleNotificationSubmit} className="space-y-6">
                      <fieldset>
                        <legend className="text-base font-medium text-gray-900 dark:text-white">Par Email</legend>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="emailNotifications"
                                name="emailNotifications"
                                type="checkbox"
                                checked={notificationSettings.emailNotifications}
                                onChange={handleNotificationChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="emailNotifications"
                                className="font-medium text-gray-700 dark:text-gray-300"
                              >
                                Notifications par email
                              </label>
                              <p className="text-gray-500 dark:text-gray-400">Recevez des notifications par email.</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="newsUpdates"
                                name="newsUpdates"
                                type="checkbox"
                                checked={notificationSettings.newsUpdates}
                                onChange={handleNotificationChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="newsUpdates" className="font-medium text-gray-700 dark:text-gray-300">
                                Actualités et mises à jour
                              </label>
                              <p className="text-gray-500 dark:text-gray-400">
                                Recevez des mises à jour sur les nouvelles fonctionnalités et améliorations.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="marketingEmails"
                                name="marketingEmails"
                                type="checkbox"
                                checked={notificationSettings.marketingEmails}
                                onChange={handleNotificationChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="marketingEmails" className="font-medium text-gray-700 dark:text-gray-300">
                                Emails marketing
                              </label>
                              <p className="text-gray-500 dark:text-gray-400">
                                Recevez des emails sur les nouveaux services et offres.
                              </p>
                            </div>
                          </div>
                        </div>
                      </fieldset>

                      <fieldset>
                        <legend className="text-base font-medium text-gray-900 dark:text-white">Par SMS</legend>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="smsNotifications"
                                name="smsNotifications"
                                type="checkbox"
                                checked={notificationSettings.smsNotifications}
                                onChange={handleNotificationChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="smsNotifications"
                                className="font-medium text-gray-700 dark:text-gray-300"
                              >
                                Notifications par SMS
                              </label>
                              <p className="text-gray-500 dark:text-gray-400">Recevez des notifications par SMS.</p>
                            </div>
                          </div>
                        </div>
                      </fieldset>

                      <fieldset>
                        <legend className="text-base font-medium text-gray-900 dark:text-white">
                          Activité du Compte
                        </legend>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="accountActivity"
                                name="accountActivity"
                                type="checkbox"
                                checked={notificationSettings.accountActivity}
                                onChange={handleNotificationChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="accountActivity" className="font-medium text-gray-700 dark:text-gray-300">
                                Activité du compte
                              </label>
                              <p className="text-gray-500 dark:text-gray-400">
                                Recevez des notifications sur l'activité de votre compte.
                              </p>
                            </div>
                          </div>
                        </div>
                      </fieldset>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="bg-white dark:bg-gray-800 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Onglet Apparence */}
              {activeTab === "appearance" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Apparence</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Personnalisez l'apparence de l'interface utilisateur.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-md font-medium text-gray-900 dark:text-white">Thème</h4>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center">
                            <input
                              id="theme-light"
                              name="theme"
                              type="radio"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                              defaultChecked
                            />
                            <label
                              htmlFor="theme-light"
                              className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Clair
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="theme-dark"
                              name="theme"
                              type="radio"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                            <label
                              htmlFor="theme-dark"
                              className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Sombre
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="theme-system"
                              name="theme"
                              type="radio"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                            <label
                              htmlFor="theme-system"
                              className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Système
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-md font-medium text-gray-900 dark:text-white">Densité d'affichage</h4>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center">
                            <input
                              id="density-comfortable"
                              name="density"
                              type="radio"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                              defaultChecked
                            />
                            <label
                              htmlFor="density-comfortable"
                              className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Confortable
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="density-compact"
                              name="density"
                              type="radio"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                            <label
                              htmlFor="density-compact"
                              className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Compact
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-white dark:bg-gray-800 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Onglet Confidentialité */}
              {activeTab === "privacy" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Confidentialité</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Gérez vos paramètres de confidentialité et de partage de données.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="privacy-profile"
                            name="privacy-profile"
                            type="checkbox"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="privacy-profile" className="font-medium text-gray-700 dark:text-gray-300">
                            Profil public
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Votre profil peut être vu par tous les utilisateurs.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="privacy-activity"
                            name="privacy-activity"
                            type="checkbox"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="privacy-activity" className="font-medium text-gray-700 dark:text-gray-300">
                            Activité visible
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Votre activité peut être vue par les autres utilisateurs.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="privacy-data"
                            name="privacy-data"
                            type="checkbox"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="privacy-data" className="font-medium text-gray-700 dark:text-gray-300">
                            Partage de données
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Autoriser le partage de vos données avec des services tiers.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">Suppression de compte</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Une fois que vous supprimez votre compte, toutes vos données seront définitivement effacées.
                      </p>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-700 shadow-sm text-sm font-medium rounded-md text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Supprimer mon compte
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-white dark:bg-gray-800 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Enregistrer
                      </button>
                    </div>
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

