"use client"
import { motion } from "framer-motion"
import { Users, BookOpen, Calendar, TrendingUp, BarChart2, DollarSign } from "lucide-react"
import AdminLayout from "../../components/admin/AdminLayout"
import StatCard from "../../components/admin/StatCard"
import LineChart from "../../components/admin/LineChart"
import BarChart from "../../components/admin/BarChart"
import RecentActivityCard from "../../components/admin/RecentActivityCard"
import UpcomingEventsCard from "../../components/admin/UpcomingEventsCard"

function DashboardPage() {
  // Données pour les statistiques
  const stats = [
    {
      title: "Étudiants Inscrits",
      value: "24,532",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Cours Actifs",
      value: "1,245",
      change: "+5%",
      trend: "up",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: "Événements à Venir",
      value: "42",
      change: "+8%",
      trend: "up",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      title: "Revenus (Mois)",
      value: "€1.2M",
      change: "+15%",
      trend: "up",
      icon: <DollarSign className="h-6 w-6" />,
    },
  ]

  // Données pour les graphiques
  const enrollmentData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "Inscriptions 2024",
        data: [1200, 1900, 2100, 2400, 2800, 3200, 3000, 3500, 4200, 4500, 4800, 5100],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
      {
        label: "Inscriptions 2023",
        data: [1000, 1500, 1800, 2100, 2500, 2800, 2600, 3000, 3800, 4000, 4300, 4600],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.4,
      },
    ],
  }

  const departmentData = {
    labels: ["Sciences", "Lettres", "Droit", "Médecine", "Économie", "Ingénierie"],
    datasets: [
      {
        label: "Étudiants par Département",
        data: [4500, 3200, 2800, 3800, 3000, 4200],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)",
        ],
      },
    ],
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de Bord</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Vue d'ensemble des statistiques et activités de l'université
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <StatCard
                title={stat.title}
                value={stat.value}
                change={stat.change}
                trend={stat.trend}
                icon={stat.icon}
              />
            </motion.div>
          ))}
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Tendance des Inscriptions</h2>
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <div className="h-80">
              <LineChart data={enrollmentData} />
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Étudiants par Département</h2>
              <BarChart2 className="h-5 w-5 text-purple-500" />
            </div>
            <div className="h-80">
              <BarChart data={departmentData} />
            </div>
          </motion.div>
        </div>

        {/* Activités récentes et événements à venir */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <RecentActivityCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <UpcomingEventsCard />
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default DashboardPage

