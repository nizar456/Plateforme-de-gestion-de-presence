"use client"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ChevronRight, BookOpen, Building, Users } from "lucide-react"

const generateParticles = (count) => {
  return Array.from({ length: count }).map((_, index) => ({
    id: index,
    x: Math.random() * 100, // Random position in % (left)
    y: Math.random() * 100, // Random position in % (top)
    size: Math.random() * 6 + 4, // Size between 4px and 10px
    speed: Math.random() * 2 + 0.5, // Speed of movement
    direction: Math.random() > 0.5 ? 1 : -1, // Direction (left or right)
    delay: Math.random() * 3, // Delay before starting the animation
  }))
}

const particles = generateParticles(50) // Adjust number of particles here

function AcademicPrograms() {
  return (
    <section id="academics" className="relative py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Floating Particles Animation */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-[#003C78] rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, particle.direction * 100, 0], // Move left to right
              y: [0, particle.direction * 50, 0],  // Move up and down
            }}
            transition={{
              duration: particle.speed,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Excellence Académique
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez notre large gamme de programmes de premier et deuxième cycle conçus pour vous préparer au succès
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            {
              title: "Arts & Sciences Humaines",
              icon: <BookOpen className="h-10 w-10 text-[#003C78]" />,
              description:
                "Explorez la littérature, la philosophie, l'histoire et les arts créatifs pour développer la pensée critique et la compréhension culturelle.",
            },
            {
              title: "Sciences & Technologies",
              icon: <Building className="h-10 w-10 text-[#003C78]" />,
              description:
                "Engagez-vous dans la recherche et l'innovation de pointe dans des domaines allant de la physique à l'informatique.",
            },
            {
              title: "Commerce & Économie",
              icon: <Users className="h-10 w-10 text-[#003C78]" />,
              description:
                "Développez les compétences et les connaissances nécessaires pour prospérer sur le marché mondial et stimuler la croissance économique.",
            },
          ].map((program, index) => (
            <motion.div
              key={program.title}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="mb-4">{program.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-[#003C78]">{program.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{program.description}</p>
              <Link to="/academique" className="inline-flex items-center text-[#003C78] hover:text-[#002856] font-medium">
                En savoir plus <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AcademicPrograms
