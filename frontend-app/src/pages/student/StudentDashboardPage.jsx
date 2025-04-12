"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  TrendingUp,
  Bell,
  CheckCircle,
  AlertCircle,
  Award,
  BarChart2,
  ChevronRight,
  Star,
  Users,
  MessageSquare,
} from "lucide-react"
import StudentLayout from "../../components/student/StudentLayout"

function StudentDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Sample data for the dashboard
  const stats = [
    {
      title: "Cours Actifs",
      value: "5",
      icon: <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      change: "+1 ce semestre",
      trend: "up",
    },
    {
      title: "Moyenne Générale",
      value: "16.8/20",
      icon: <Award className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      change: "+0.5 pts",
      trend: "up",
    },
    {
      title: "Devoirs à Rendre",
      value: "3",
      icon: <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      change: "Cette semaine",
      trend: "neutral",
    },
    {
      title: "Présence",
      value: "95%",
      icon: <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      change: "+2% ce mois",
      trend: "up",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Examen de Mathématiques",
      course: "Mathématiques Avancées",
      date: "15 Juin 2024",
      time: "10:00 - 12:00",
      location: "Salle A-101",
      priority: "high",
    },
    {
      id: 2,
      title: "Rendu de Projet",
      course: "Développement Web",
      date: "18 Juin 2024",
      time: "23:59",
      location: "En ligne",
      priority: "medium",
    },
    {
      id: 3,
      title: "Présentation de Groupe",
      course: "Communication Professionnelle",
      date: "20 Juin 2024",
      time: "14:00 - 16:00",
      location: "Amphithéâtre B",
      priority: "medium",
    },
    {
      id: 4,
      title: "Quiz en ligne",
      course: "Intelligence Artificielle",
      date: "22 Juin 2024",
      time: "18:00 - 19:00",
      location: "En ligne",
      priority: "low",
    },
  ]

  const recentGrades = [
    {
      id: 1,
      course: "Développement Web",
      assignment: "Projet Frontend",
      grade: "18/20",
      date: "Il y a 2 jours",
      feedback: "Excellent travail, interface utilisateur très intuitive.",
    },
    {
      id: 2,
      course: "Intelligence Artificielle",
      assignment: "Quiz sur les réseaux de neurones",
      grade: "15/20",
      date: "Il y a 5 jours",
      feedback: "Bonne compréhension des concepts fondamentaux.",
    },
    {
      id: 3,
      course: "Mathématiques Avancées",
      assignment: "Devoir sur les équations différentielles",
      grade: "17/20",
      date: "Il y a 1 semaine",
      feedback: "Très bonnes solutions, quelques erreurs mineures.",
    },
  ]

  const courses = [
    {
      id: 1,
      name: "Développement Web",
      professor: "Dr. Martin",
      progress: 75,
      nextClass: "Mercredi, 14:00",
      color: "blue",
    },
    {
      id: 2,
      name: "Intelligence Artificielle",
      professor: "Dr. Dubois",
      progress: 60,
      nextClass: "Jeudi, 10:00",
      color: "purple",
    },
    {
      id: 3,
      name: "Mathématiques Avancées",
      professor: "Dr. Bernard",
      progress: 85,
      nextClass: "Lundi, 08:00",
      color: "emerald",
    },
    {
      id: 4,
      name: "Communication Professionnelle",
      professor: "Dr. Petit",
      progress: 50,
      nextClass: "Vendredi, 16:00",
      color: "amber",
    },
    {
      id: 5,
      name: "Bases de Données",
      professor: "Dr. Leroy",
      progress: 70,
      nextClass: "Mardi, 13:00",
      color: "rose",
    },
  ]

  const announcements = [
    {
      id: 1,
      title: "Fermeture de la bibliothèque",
      content: "La bibliothèque sera fermée pour maintenance le 25 juin.",
      date: "Il y a 1 jour",
      type: "info",
    },
    {
      id: 2,
      title: "Modification du calendrier d'examens",
      content: "Les examens de fin de semestre ont été reportés d'une semaine.",
      date: "Il y a 3 jours",
      type: "warning",
    },
    {
      id: 3,
      title: "Nouvelle ressource en ligne",
      content: "De nouvelles ressources pour le cours d'IA sont disponibles sur la plateforme.",
      date: "Il y a 5 jours",
      type: "success",
    },
  ]

  const getColorClass = (color, type) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-800 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800",
        fill: "bg-blue-600 dark:bg-blue-500",
      },
      purple: {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-800 dark:text-purple-300",
        border: "border-purple-200 dark:border-purple-800",
        fill: "bg-purple-600 dark:bg-purple-500",
      },
      emerald: {
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
        text: "text-emerald-800 dark:text-emerald-300",
        border: "border-emerald-200 dark:border-emerald-800",
        fill: "bg-emerald-600 dark:bg-emerald-500",
      },
      amber: {
        bg: "bg-amber-100 dark:bg-amber-900/30",
        text: "text-amber-800 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
        fill: "bg-amber-600 dark:bg-amber-500",
      },
      rose: {
        bg: "bg-rose-100 dark:bg-rose-900/30",
        text: "text-rose-800 dark:text-rose-300",
        border: "border-rose-200 dark:border-rose-800",
        fill: "bg-rose-600 dark:bg-rose-500",
      },
      info: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-800 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800",
        icon: <Bell className="h-5 w-5 text-blue-500" />,
      },
      warning: {
        bg: "bg-amber-100 dark:bg-amber-900/30",
        text: "text-amber-800 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
        icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      },
      success: {
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
        text: "text-emerald-800 dark:text-emerald-300",
        border: "border-emerald-200 dark:border-emerald-800",
        icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
      },
      high: {
        bg: "bg-rose-100 dark:bg-rose-900/30",
        text: "text-rose-800 dark:text-rose-300",
        border: "border-rose-200 dark:border-rose-800",
      },
      medium: {
        bg: "bg-amber-100 dark:bg-amber-900/30",
        text: "text-amber-800 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
      },
      low: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-800 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800",
      },
    }

    return colorMap[color][type]
  }

  const getPriorityLabel = (priority) => {
    const priorityMap = {
      high: "Haute",
      medium: "Moyenne",
      low: "Basse",
    }
    return priorityMap[priority]
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-rose-500 transform rotate-180" />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
        </div>
      </StudentLayout>
    )
  }

  return (
    <StudentLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de Bord</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Bienvenue, Sophie. Voici un aperçu de votre parcours académique.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    activeTab === "overview"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  Vue d'ensemble
                </button>
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "courses"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  Mes cours
                </button>
                <button
                  onClick={() => setActiveTab("calendar")}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                    activeTab === "calendar"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  Calendrier
                </button>
              </div>
            </div>
          </div>

          {/* Main content based on active tab */}
          <div className="mt-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 rounded-md p-3 bg-gray-50 dark:bg-gray-700">{stat.icon}</div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                {stat.title}
                              </dt>
                              <dd>
                                <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-2">
                        <div className="text-sm flex items-center">
                          {getTrendIcon(stat.trend)}
                          <span className="ml-1 text-gray-600 dark:text-gray-300">{stat.change}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Two-column layout for main content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left column - Course Progress */}
                  <div className="lg:col-span-2 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Progression des Cours</h2>
                          <BarChart2 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="space-y-6">
                          {courses.map((course, index) => (
                            <motion.div
                              key={course.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                              className="group"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center">
                                  <div
                                    className={`w-3 h-3 rounded-full ${getColorClass(course.color, "fill")} mr-2`}
                                  ></div>
                                  <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {course.name}
                                  </h3>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${course.progress}%` }}
                                  transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                                  className={`h-2.5 rounded-full ${getColorClass(course.color, "fill")}`}
                                ></motion.div>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500 dark:text-gray-400">Prof. {course.professor}</span>
                                <span className="text-gray-500 dark:text-gray-400">
                                  <Clock className="inline h-3 w-3 mr-1" />
                                  {course.nextClass}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-6 text-center">
                          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                            Voir tous les cours
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Recent Grades */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Notes Récentes</h2>
                          <Award className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {recentGrades.map((grade, index) => (
                          <motion.div
                            key={grade.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {grade.assignment}
                                </h3>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{grade.course}</p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{grade.feedback}</p>
                              </div>
                              <div className="ml-4 flex-shrink-0 flex flex-col items-end">
                                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">
                                  {grade.grade}
                                </span>
                                <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">{grade.date}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-750 text-right">
                        <a
                          href="#"
                          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                        >
                          Voir toutes les notes
                        </a>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right column - Upcoming Events and Announcements */}
                  <div className="space-y-6">
                    {/* Upcoming Events */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Événements à Venir</h2>
                          <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {upcomingEvents.map((event, index) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750"
                          >
                            <div className="flex items-start">
                              <div
                                className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${getColorClass(
                                  event.priority,
                                  "fill",
                                )}`}
                              ></div>
                              <div className="ml-3 flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</h3>
                                  <span
                                    className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${getColorClass(
                                      event.priority,
                                      "bg",
                                    )} ${getColorClass(event.priority, "text")}`}
                                  >
                                    {getPriorityLabel(event.priority)}
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{event.course}</p>
                                <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                                  <Calendar className="flex-shrink-0 mr-1.5 h-3 w-3" />
                                  {event.date}
                                  <span className="mx-1">•</span>
                                  <Clock className="flex-shrink-0 mr-1.5 h-3 w-3" />
                                  {event.time}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-750 text-right">
                        <a
                          href="#"
                          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                        >
                          Voir tous les événements
                        </a>
                      </div>
                    </motion.div>

                    {/* Announcements */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Annonces</h2>
                          <Bell className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {announcements.map((announcement, index) => (
                          <motion.div
                            key={announcement.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750"
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0">{getColorClass(announcement.type, "icon")}</div>
                              <div className="ml-3 flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {announcement.title}
                                  </h3>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{announcement.date}</span>
                                </div>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{announcement.content}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-750 text-right">
                        <a
                          href="#"
                          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                        >
                          Voir toutes les annonces
                        </a>
                      </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                      className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Liens Rapides</h2>
                      </div>
                      <div className="p-6 grid grid-cols-2 gap-4">
                        {[
                          { icon: <FileText className="h-5 w-5" />, label: "Emploi du temps" },
                          { icon: <Users className="h-5 w-5" />, label: "Mes groupes" },
                          { icon: <MessageSquare className="h-5 w-5" />, label: "Mes groupes" },
                          { icon: <MessageSquare className="h-5 w-5" />, label: "Messages" },
                          { icon: <Star className="h-5 w-5" />, label: "Favoris" },
                        ].map((link, index) => (
                          <motion.a
                            key={index}
                            href="#"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                            className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300"
                          >
                            <span className="flex-shrink-0 mr-3 text-gray-500 dark:text-gray-400">{link.icon}</span>
                            <span className="text-sm font-medium">{link.label}</span>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-4 ${getColorClass(
                        course.color,
                        "border",
                      )} overflow-hidden cursor-pointer`}
                      onClick={() => setSelectedCourse(course)}
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{course.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Prof. {course.professor}</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Progression</span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className={`h-2 rounded-full ${getColorClass(course.color, "fill")}`}
                          ></motion.div>
                        </div>
                        <div className="mt-4 flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Prochain cours: {course.nextClass}</span>
                        </div>
                      </div>
                      <div
                        className={`px-6 py-3 ${getColorClass(course.color, "bg")} flex justify-between items-center`}
                      >
                        <span className={`text-xs font-medium ${getColorClass(course.color, "text")}`}>
                          Voir les détails
                        </span>
                        <ChevronRight className={`h-4 w-4 ${getColorClass(course.color, "text")}`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "calendar" && (
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Calendrier des Événements</h2>
                  <div className="flex flex-col">
                    <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
                      {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                        <div
                          key={day}
                          className="bg-gray-100 dark:bg-gray-800 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-b-lg overflow-hidden">
                      {Array.from({ length: 35 }).map((_, i) => {
                        const day = i - 2 + 1 // Start from previous month's last days
                        const isCurrentMonth = day > 0 && day <= 30
                        const isToday = day === 15 // Assuming today is the 15th
                        const hasEvent = [3, 8, 15, 20, 25].includes(day)

                        return (
                          <div
                            key={i}
                            className={`min-h-[80px] p-2 ${
                              isCurrentMonth
                                ? "bg-white dark:bg-gray-800"
                                : "bg-gray-50 dark:bg-gray-750 text-gray-400 dark:text-gray-500"
                            } ${isToday ? "ring-2 ring-blue-500 ring-inset" : ""}`}
                          >
                            <div className="flex justify-between">
                              <span
                                className={`text-sm ${
                                  isToday
                                    ? "font-bold text-blue-600 dark:text-blue-400"
                                    : "font-medium text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {isCurrentMonth ? day : day <= 0 ? 31 + day : day - 30}
                              </span>
                              {hasEvent && <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>}
                            </div>
                            {hasEvent && isCurrentMonth && (
                              <div className="mt-1">
                                <div className="text-xs p-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 truncate">
                                  {day === 3 && "Rendu projet"}
                                  {day === 8 && "Quiz IA"}
                                  {day === 15 && "Examen Math"}
                                  {day === 20 && "Présentation"}
                                  {day === 25 && "Réunion groupe"}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}

export default StudentDashboardPage
