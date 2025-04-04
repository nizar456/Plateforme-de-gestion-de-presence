"use client"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone } from "lucide-react"

function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Contactez-Nous
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Vous avez des questions ? Nous sommes là pour vous aider. Contactez-nous par l'un des canaux ci-dessous.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: <MapPin className="h-8 w-8 text-blue-700" />,
              title: "Visitez-Nous",
              details: "123 Avenue de l'Université\nVille, 75000\nFrance",
            },
            {
              icon: <Mail className="h-8 w-8 text-blue-700" />,
              title: "Écrivez-Nous",
              details: "admissions@universite.fr\ninfo@universite.fr\nsupport@universite.fr",
            },
            {
              icon: <Phone className="h-8 w-8 text-blue-700" />,
              title: "Appelez-Nous",
              details: "Admissions: 01 23 45 67 89\nServices Étudiants: 01 23 45 67 90\nAccueil: 01 23 45 67 91",
            },
          ].map((contact, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="flex justify-center mb-4">{contact.icon}</div>
              <h3 className="text-xl font-bold mb-4">{contact.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{contact.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact

