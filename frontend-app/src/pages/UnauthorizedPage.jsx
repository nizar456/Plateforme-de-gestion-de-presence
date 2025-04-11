"use client"

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowLeft } from "lucide-react"

function UnauthorizedPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-3">
            <AlertTriangle className="h-12 w-12 text-yellow-600 dark:text-yellow-500" />
          </div>
        </motion.div>
        <motion.h2
          className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Accès non autorisé
        </motion.h2>
        <motion.p
          className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </motion.p>
      </div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur système ou retourner à la
              page d'accueil.
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </button>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Retour à la page précédente
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UnauthorizedPage

