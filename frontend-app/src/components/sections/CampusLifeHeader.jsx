"use client"
import { motion } from "framer-motion"

function CampusLifeHeader() {
  return (
    <section className="relative py-20 md:py-28 bg-blue-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Vie Étudiante</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explorez la vie dynamique sur notre campus et découvrez les nombreuses opportunités qui vous attendent en
            dehors de la salle de classe.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CampusLifeHeader

