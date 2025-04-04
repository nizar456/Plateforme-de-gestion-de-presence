"use client"
import { motion } from "framer-motion"
import EnsaPhoto from "../../assets/image.png";

function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Notre Histoire & Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Fondée en 1885, notre université possède une riche histoire d'excellence académique et d'innovation.
              Depuis plus d'un siècle, nous nous engageons à offrir une expérience éducative transformatrice qui prépare
              les étudiants à apporter des contributions significatives à la société.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Notre mission est de cultiver une communauté diverse et inclusive d'universitaires, de leaders et
              d'innovateurs, et de générer des connaissances qui transforment notre compréhension du monde et améliorent
              les vies.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Fondée", value: "1885" },
                { label: "Étudiants", value: "25,000+" },
                { label: "Professeurs", value: "1,500+" },
                { label: "Anciens Élèves", value: "300,000+" },
              ].map((stat, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden h-[400px]"
          >
            <img src={EnsaPhoto} alt="Campus universitaire" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

