"use client"
import { motion } from "framer-motion"

function AcademicHeader() {
  return (
    <section className="relative py-20 md:py-28 bg-blue-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Programmes Académiques</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Découvrez notre large éventail de programmes conçus pour vous préparer à réussir dans un monde en constante
            évolution.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AcademicHeader

