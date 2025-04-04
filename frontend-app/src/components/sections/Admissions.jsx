"use client"
import { motion } from "framer-motion"

const generateStars = (count) => {
  return Array.from({ length: count }).map((_, index) => ({
    id: index,
    x: Math.random() * 100, // Random horizontal position
    y: Math.random() * 100, // Random vertical position
    size: Math.random() * 4 + 2, // Random size between 2px and 6px
    duration: Math.random() * 4 + 3, // Duration between 3s and 7s
    delay: Math.random() * 2, // Random delay for staggered effect
  }))
}

const stars = generateStars(25) // Number of stars

function Admissions() {
  return (
    <section id="admissions" className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-gray-900">
      {/* Animated Floating Stars */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full shadow-lg"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: 0.8,
            }}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0.2, 1, 0] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              repeatType: "loop",
              delay: star.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Rejoignez Notre Communauté
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Prêt à commencer votre parcours ? Découvrez notre processus d'admission, nos options d'aide financière et
            nos prochaines échéances.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { label: "Date Limite de Candidature", value: "15 janvier 2026" },
              { label: "Taux d'Acceptation", value: "18%" },
              { label: "Aide Financière", value: "85% des étudiants" },
            ].map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="bg-[#003C78] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors">
              Postuler Maintenant
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Admissions
