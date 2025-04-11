"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, BookOpen, Calendar, FileText, Bell, Clock } from "lucide-react"
import ProfessorLayout from "../../components/professor/ProfessorLayout"

function ProfessorDashboardPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Sample data for the dashboard
  const stats = [
    {
      title: "Cours Actifs",
      value: "4",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Étudiants",
      value: "120",
      icon: <Users className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Devoirs à Noter",
      value: "15",
      icon: <FileText className="h-6 w-6 text-amber-600" />,
    },
    {
      title: "Heures de Cours",
      value: "12",
      icon: <Clock className="h-6 w-6 text-purple-600" />,
    },
  ]

  const upcomingClasses = [
    {
      id: 1,
      title: "Introduction à l'Informatique",
      time: "Aujourd'hui, 14:00 - 16:00",
      location: "Salle A-101",
      students: 35,
    },
    {
      id: 2,
      title: "Structures de Données",
      time: "Demain, 10:00 - 12:00",
      location: "Salle B-205",
      students: 28,
    },
    {
      id: 3,
      title: "Intelligence Artificielle",
      time: "Mercredi, 15:00 - 17:00",
      location: "Laboratoire C-310",
      students: 22,
    },
  ]

  const recentSubmissions = [
    {
      id: 1,
      title: "Projet Final - Bases de Données",
      student: "Sophie Martin",
      date: "Il y a 2 heures",
      status: "Non noté",
    },
    {
      id: 2,
      title: "Devoir 3 - Algorithmes",
      student: "Thomas Bernard",
      date: "Il y a 1 jour",
      status: "Non noté",
    },
    {
      id: 3,
      title: "Quiz - Programmation Orientée Objet",
      student: "Emma Dubois",
      date: "Il y a 2 jours",
      status: "Noté",
    },
  ]

  return (
    <ProfessorLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Tableau de Bord</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Bienvenue, Dr. Robert Martin. Voici un aperçu de vos activités.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Statistiques */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">{stat.icon}</div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.title}</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900 dark:text-white">{stat.value}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contenu principal */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Cours à venir */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 shadow rounded-lg"
            >
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Cours à Venir</h2>
                  <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingClasses.map((course) => (
                  <li key={course.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{course.title}</p>
                        <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          <p className="truncate">{course.time}</p>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Bell className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          <p className="truncate">{course.location}</p>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {course.students} étudiants
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-6 py-3 bg-gray-50 dark:bg-gray-750 text-right">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  Voir l'emploi du temps complet
                </a>
              </div>
            </motion.div>

            {/* Devoirs récents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow rounded-lg"
            >
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Devoirs Récents</h2>
                  <FileText className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentSubmissions.map((submission) => (
                  <li key={submission.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{submission.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{submission.student}</p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{submission.date}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            submission.status === "Noté"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {submission.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-6 py-3 bg-gray-50 dark:bg-gray-750 text-right">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  Voir tous les devoirs
                </a>
              </div>
            </motion.div>
          </div>

          {/* Activités récentes */}
          <div className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 shadow rounded-lg"
            >
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Activités Récentes</h2>
                </div>
              </div>
              <div className="px-6 py-5">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {[
                      {
                        id: 1,
                        content: "Vous avez noté le devoir de Jean Dupont",
                        timestamp: "Il y a 2 heures",
                        icon: <FileText className="h-5 w-5 text-blue-500" />,
                      },
                      {
                        id: 2,
                        content: "Vous avez ajouté un nouveau document au cours d'Intelligence Artificielle",
                        timestamp: "Hier à 15:32",
                        icon: <FileText className="h-5 w-5 text-green-500" />,
                      },
                      {
                        id: 3,
                        content: "Réunion de département programmée pour le 15 juin",
                        timestamp: "Il y a 2 jours",
                        icon: <Calendar className="h-5 w-5 text-purple-500" />,
                      },
                    ].map((item, itemIdx) => (
                      <li key={item.id}>
                        <div className="relative pb-8">
                          {itemIdx !== 2 ? (
                            <span
                              className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex items-start space-x-3">
                            <div className="relative">
                              <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                                {item.icon}
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm text-gray-900 dark:text-white">{item.content}</div>
                                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{item.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 text-center">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Voir toutes les activités
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ProfessorLayout>
  )
}

export default ProfessorDashboardPage

