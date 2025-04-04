"use client"

import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Académique", href: "/academique" },
    { name: "Vie Étudiante", href: "/vie-etudiante" },
    { name: "Admissions", href: "/admissions" },
    { name: "À Propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar links={navLinks} />

      <main className="pt-20">
        {/* Remplacer la bannière simplifiée par une bannière animée avec un dégradé */}
        {/* Remplacer par */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 text-white py-20">
          {/* Éléments d'animation en arrière-plan */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 2 }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 300 + 50,
                    height: Math.random() * 300 + 50,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, x: -20 }}
                  animate={{
                    scale: [0, 1, 0.8],
                    x: [0, 20, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: i * 0.8,
                  }}
                />
              ))}
            </motion.div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Contactez-Nous
              </motion.h1>
              <motion.p
                className="text-xl max-w-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Vous avez des questions sur l'ENSA Khouribga ? Nous sommes là pour vous répondre et vous accompagner
                dans vos démarches.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Contenu principal */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Informations de contact */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Nos Coordonnées</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  N'hésitez pas à nous contacter par téléphone, email ou en personne. Notre équipe est à votre
                  disposition pour répondre à toutes vos questions.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
                        <MapPin className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Adresse</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        École Nationale des Sciences Appliquées
                        <br />
                        Bd Béni Amir, BP 77
                        <br />
                        Khouribga, 25000
                        <br />
                        Maroc
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
                        <Phone className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Téléphone</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Standard: +212 5XX XX XX XX
                        <br />
                        Scolarité: +212 5XX XX XX XX
                        <br />
                        Admissions: +212 5XX XX XX XX
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
                        <Mail className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Information générale: info@ensak.ac.ma
                        <br />
                        Admissions: admissions@ensak.ac.ma
                        <br />
                        Relations entreprises: entreprises@ensak.ac.ma
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
                        <Clock className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Horaires d'ouverture</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Lundi - Vendredi: 8h30 - 16h30
                        <br />
                        Samedi: 9h00 - 12h00
                        <br />
                        Fermé le dimanche et jours fériés
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Suivez-nous</h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901
 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="sr-only">YouTube</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Formulaire de contact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Envoyez-nous un message</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nom
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Sujet
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    >
                      <option>Informations générales</option>
                      <option>Admissions</option>
                      <option>Programmes académiques</option>
                      <option>Stages et emplois</option>
                      <option>Partenariats</option>
                      <option>Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="privacy" className="text-gray-600 dark:text-gray-400">
                        J'accepte que mes données soient traitées conformément à la politique de confidentialité
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Envoyer le message
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Carte */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Comment nous trouver</h2>
              <p className="text-gray-600 dark:text-gray-400">
                L'ENSA Khouribga est facilement accessible depuis le centre-ville et les principales voies de
                communication.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <div className="h-[400px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Carte interactive de l'ENSA Khouribga
                    <br />
                    (Emplacement de la carte)
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl mx-auto mt-8"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Accès</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">En voiture</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    L'ENSA Khouribga est située à proximité de la route nationale N11. Un parking gratuit est disponible
                    sur le campus pour les visiteurs.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">En transport en commun</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Plusieurs lignes de bus desservent l'école. Arrêtez-vous à la station "ENSA" ou "Université" et
                    marchez 5 minutes jusqu'à l'entrée principale.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Questions Fréquentes</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Retrouvez les réponses aux questions les plus fréquemment posées.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {[
                  {
                    question: "Quels sont les horaires d'ouverture du service des admissions ?",
                    reponse:
                      "Le service des admissions est ouvert du lundi au vendredi de 8h30 à 16h30 et le samedi de 9h00 à 12h00.",
                  },
                  {
                    question: "Comment puis-je obtenir des informations sur les programmes d'études ?",
                    reponse:
                      "Vous pouvez consulter notre site web, nous contacter par email à info@ensak.ac.ma ou vous rendre directement au service de scolarité pendant les heures d'ouverture.",
                  },
                  {
                    question: "Est-il possible de visiter le campus avant de postuler ?",
                    reponse:
                      "Oui, nous organisons régulièrement des journées portes ouvertes. Vous pouvez également demander une visite guidée en contactant notre service d'accueil.",
                  },
                  {
                    question: "Comment puis-je contacter un professeur spécifique ?",
                    reponse:
                      "Vous pouvez contacter les professeurs par email. Les adresses email sont disponibles sur notre site web dans la section 'Corps professoral'.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                  >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.question}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.reponse}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer links={navLinks} />
    </div>
  )
}

