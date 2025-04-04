"use client"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import EnsaPhoto from "../../assets/image1.png";

function CampusLife() {
  return (
    <section id="campus-life" className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Vie sur le Campus
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Vivez dans une communauté dynamique avec des possibilités infinies de croissance, de connexion et de plaisir
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden h-[400px] relative"
          >
            <img src={EnsaPhoto} alt="Activités sur le campus" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4">Activités Étudiantes</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Avec plus de 200 organisations étudiantes, des installations récréatives ultramodernes et un calendrier
              rempli d'événements, il se passe toujours quelque chose sur le campus. Des célébrations culturelles aux
              compétitions sportives, vous trouverez d'innombrables façons de poursuivre vos passions et de vous faire
              des amis pour la vie.
            </p>
            <ul className="space-y-3">
              {[
                "Clubs et organisations étudiantes",
                "Sports et loisirs",
                "Événements artistiques et culturels",
                "Opportunités de service communautaire",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                >
                  <ChevronRight className="h-5 w-5 text-blue-600 mr-2" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            <button className="mt-8 w-fit bg-[#003C78] hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Explorer la Vie Étudiante
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CampusLife

