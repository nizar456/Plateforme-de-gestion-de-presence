"use client"

import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { motion } from "framer-motion"
import { Users, Award, BookOpen, Coffee, Briefcase, Heart, MapPin, Calendar, ChevronRight } from "lucide-react"

export default function CampusLifePage() {
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
                Vie Étudiante
              </motion.h1>
              <motion.p
                className="text-xl max-w-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Découvrez la richesse de la vie étudiante à l'ENSA Khouribga, un environnement dynamique propice à
                l'épanouissement personnel et professionnel.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Section Clubs & Associations */}
        <section id="clubs" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Clubs & Associations Étudiantes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                L'ENSA Khouribga encourage vivement l'engagement associatif des étudiants à travers de nombreux clubs et
                associations qui enrichissent la vie sur le campus.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Club Informatique",
                  icon: <Users className="h-10 w-10 text-blue-600" />,
                  description:
                    "Développement de compétences en programmation, organisation de hackathons et de formations en technologies de pointe.",
                  activities: [
                    "Hackathons",
                    "Formations techniques",
                    "Compétitions de programmation",
                    "Conférences tech",
                  ],
                },
                {
                  name: "Club Robotique",
                  icon: <Award className="h-10 w-10 text-purple-600" />,
                  description:
                    "Conception et réalisation de projets robotiques, participation à des compétitions nationales et internationales.",
                  activities: ["Ateliers de robotique", "Compétitions", "Projets innovants", "Démonstrations"],
                },
                {
                  name: "Club Entrepreneuriat",
                  icon: <Briefcase className="h-10 w-10 text-green-600" />,
                  description:
                    "Développement de l'esprit entrepreneurial, accompagnement de projets innovants et organisation d'événements business.",
                  activities: ["Startup weekends", "Mentorat", "Business plan competitions", "Networking"],
                },
                {
                  name: "Club Culturel",
                  icon: <BookOpen className="h-10 w-10 text-red-600" />,
                  description:
                    "Promotion de la culture à travers diverses activités artistiques, littéraires et créatives.",
                  activities: ["Théâtre", "Musique", "Poésie", "Expositions artistiques"],
                },
                {
                  name: "Club Sportif",
                  icon: <Heart className="h-10 w-10 text-amber-600" />,
                  description:
                    "Organisation d'activités sportives variées et participation aux compétitions universitaires.",
                  activities: ["Football", "Basketball", "Volleyball", "Athlétisme", "Échecs"],
                },
                {
                  name: "Club Social",
                  icon: <Coffee className="h-10 w-10 text-teal-600" />,
                  description:
                    "Actions sociales et humanitaires, sensibilisation aux enjeux sociétaux et environnementaux.",
                  activities: [
                    "Campagnes de don",
                    "Actions environnementales",
                    "Visites d'orphelinats",
                    "Sensibilisation",
                  ],
                },
              ].map((club, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">{club.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{club.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{club.description}</p>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Activités principales :
                  </h4>
                  <ul className="space-y-1">
                    {club.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <ChevronRight className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center"
                    >
                      Rejoindre le club <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Campus & Infrastructures */}
        <section id="campus" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Campus & Infrastructures
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                L'ENSA Khouribga dispose d'un campus moderne offrant un cadre d'études optimal et des infrastructures de
                qualité pour accompagner les étudiants dans leur parcours.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-lg overflow-hidden h-[400px]"
              >
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Campus ENSA Khouribga"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Un Campus Moderne et Accueillant
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Situé dans un cadre verdoyant, le campus de l'ENSA Khouribga s'étend sur plusieurs hectares et offre
                  un environnement propice aux études et à l'épanouissement personnel.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Localisation stratégique</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Situé à proximité du centre-ville de Khouribga, le campus est facilement accessible par les
                        transports en commun.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Espaces verts</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Le campus dispose de nombreux espaces verts aménagés pour la détente et les activités de plein
                        air.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Sécurité</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Le campus est sécurisé 24h/24 et 7j/7 pour garantir la sécurité des étudiants et du personnel.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Espaces d'Enseignement",
                  description:
                    "Des salles de cours modernes, amphithéâtres équipés de matériel audiovisuel et laboratoires spécialisés pour les travaux pratiques.",
                  features: ["Amphithéâtres", "Salles de cours", "Laboratoires spécialisés", "Salles informatiques"],
                },
                {
                  title: "Bibliothèque",
                  description:
                    "Une bibliothèque riche de milliers d'ouvrages, revues scientifiques et ressources numériques, avec des espaces de travail individuels et en groupe.",
                  features: [
                    "Plus de 10,000 ouvrages",
                    "Abonnements électroniques",
                    "Espaces de travail",
                    "Catalogue en ligne",
                  ],
                },
                {
                  title: "Résidence Universitaire",
                  description:
                    "Des logements étudiants confortables à proximité du campus, offrant un cadre de vie agréable et propice aux études.",
                  features: [
                    "Chambres individuelles et doubles",
                    "Espaces communs",
                    "Connexion internet",
                    "Service de restauration",
                  ],
                },
                {
                  title: "Installations Sportives",
                  description:
                    "Des infrastructures sportives variées permettant la pratique de nombreux sports individuels et collectifs.",
                  features: [
                    "Terrain de football",
                    "Terrain de basketball",
                    "Salle de fitness",
                    "Terrain de volleyball",
                  ],
                },
                {
                  title: "Espaces de Restauration",
                  description:
                    "Un restaurant universitaire proposant des repas équilibrés à prix abordables, ainsi que des cafétérias pour les pauses.",
                  features: ["Restaurant universitaire", "Cafétérias", "Espaces de détente", "Menus variés"],
                },
                {
                  title: "Centre d'Innovation",
                  description:
                    "Un espace dédié à l'innovation et à l'entrepreneuriat, équipé pour accompagner les projets des étudiants.",
                  features: ["Fab Lab", "Espaces de coworking", "Salles de réunion", "Équipements spécialisés"],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                >
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                  <ul className="space-y-1">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <ChevronRight className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Événements */}
        <section id="evenements" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Événements & Activités
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tout au long de l'année, l'ENSA Khouribga organise et accueille de nombreux événements académiques,
                culturels et sportifs qui enrichissent la vie étudiante.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Événements académiques"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Événements Académiques</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Des conférences, séminaires et ateliers animés par des experts et professionnels pour enrichir la
                    formation des étudiants.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Conférences thématiques",
                      "Séminaires scientifiques",
                      "Journées portes ouvertes",
                      "Forums entreprises",
                      "Compétitions académiques",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Événements culturels"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Événements Culturels & Sportifs
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Des activités culturelles et sportives variées pour favoriser l'épanouissement personnel et
                    renforcer l'esprit de communauté.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Festival culturel annuel",
                      "Tournois sportifs inter-écoles",
                      "Soirées artistiques",
                      "Journées thématiques",
                      "Excursions et voyages culturels",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Événements à Venir</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Forum Entreprises 2024",
                    date: "15-16 Octobre 2024",
                    description: "Rencontrez les recruteurs et découvrez les opportunités de stage et d'emploi.",
                  },
                  {
                    title: "Hackathon Innovation",
                    date: "5-7 Novembre 2024",
                    description: "48 heures pour développer des solutions innovantes aux défis proposés.",
                  },
                  {
                    title: "Semaine Culturelle",
                    date: "20-25 Novembre 2024",
                    description: "Une semaine d'activités culturelles, artistiques et créatives.",
                  },
                  {
                    title: "Tournoi Sportif Inter-écoles",
                    date: "10-12 Décembre 2024",
                    description: "Compétitions sportives entre les différentes écoles d'ingénieurs.",
                  },
                ].map((event, index) => (
                  <div key={index} className="flex items-start p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-750">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">{event.date}</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  Voir tous les événements <ChevronRight className="ml-1 h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Services aux Étudiants */}
        <section id="services" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Services aux Étudiants
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                L'ENSA Khouribga propose divers services pour accompagner les étudiants tout au long de leur parcours
                académique et faciliter leur vie quotidienne.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Service de Scolarité",
                  description:
                    "Gestion des inscriptions, des emplois du temps, des examens et de toutes les démarches administratives liées à la scolarité.",
                  contact: "scolarite@ensak.ac.ma | Tél: +212 5XX XX XX XX",
                },
                {
                  title: "Service Social",
                  description:
                    "Accompagnement des étudiants dans leurs démarches sociales, aide à la recherche de logement et information sur les bourses d'études.",
                  contact: "social@ensak.ac.ma | Tél: +212 5XX XX XX XX",
                },
                {
                  title: "Service Médical",
                  description:
                    "Consultations médicales, premiers soins, actions de prévention et de sensibilisation sur les questions de santé.",
                  contact: "medical@ensak.ac.ma | Tél: +212 5XX XX XX XX",
                },
                {
                  title: "Service des Stages",
                  description:
                    "Aide à la recherche de stages, mise en relation avec les entreprises partenaires et suivi des conventions de stage.",
                  contact: "stages@ensak.ac.ma | Tél: +212 5XX XX XX XX",
                },
                {
                  title: "Service Informatique",
                  description:
                    "Gestion des ressources informatiques, assistance technique, accès aux logiciels spécialisés et à internet.",
                  contact: "informatique@ensak.ac.ma | Tél: +212 5XX XX XX XX",
                },
                {
                  title: "Bureau des Relations Internationales",
                  description:
                    "Gestion des programmes d'échange, des partenariats internationaux et des mobilités étudiantes.",
                  contact: "international@ensak.ac.ma | Tél: +212 5XX XX XX XX",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                >
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-blue-600 dark:text-blue-400">{service.contact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Témoignages */}
        <section id="temoignages" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Témoignages d'Étudiants
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Découvrez ce que nos étudiants et diplômés disent de leur expérience à l'ENSA Khouribga.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Fatima Zahra",
                  promotion: "Promotion 2022 - Génie Informatique",
                  photo: "/placeholder.svg?height=100&width=100",
                  testimonial:
                    "L'ENSA Khouribga m'a offert bien plus qu'une formation académique. J'y ai développé des compétences techniques solides, mais aussi des soft skills essentiels pour ma carrière. L'ambiance sur le campus et l'engagement des enseignants ont fait de ces années une expérience inoubliable.",
                },
                {
                  name: "Mohammed",
                  promotion: "Promotion 2023 - Génie des Données",
                  photo: "/placeholder.svg?height=100&width=100",
                  testimonial:
                    "Ce qui m'a le plus marqué à l'ENSA Khouribga, c'est l'équilibre entre théorie et pratique. Les projets concrets, les stages en entreprise et les compétitions auxquelles j'ai participé m'ont permis de me démarquer sur le marché du travail dès l'obtention de mon diplôme.",
                },
                {
                  name: "Yasmine",
                  promotion: "Promotion 2021 - Génie Électrique",
                  photo: "/placeholder.svg?height=100&width=100",
                  testimonial:
                    "Mon parcours à l'ENSA Khouribga a été transformateur. Au-delà des connaissances techniques, j'ai appris à travailler en équipe, à gérer des projets et à m'adapter à différents environnements. La vie associative très riche m'a également permis de développer mon leadership.",
                },
                {
                  name: "Ahmed",
                  promotion: "Promotion 2020 - Génie Industriel",
                  photo: "/placeholder.svg?height=100&width=100",
                  testimonial:
                    "L'ENSA Khouribga se distingue par la qualité de son corps professoral et par son ouverture sur le monde professionnel. Les nombreuses interventions d'experts et les visites d'entreprises m'ont permis de construire un réseau professionnel solide avant même la fin de mes études.",
                },
                {
                  name: "Salma",
                  promotion: "Étudiante en 3ème année - Génie Civil",
                  photo: "/placeholder.svg?height=100&width=100",
                  testimonial:
                    "Ce que j'apprécie le plus à l'ENSA Khouribga, c'est l'esprit de communauté. Les étudiants s'entraident, les professeurs sont disponibles et à l'écoute, et l'administration fait tout pour faciliter notre parcours. Je me sens vraiment soutenue dans mes études.",
                },
                {
                  name: "Karim",
                  promotion: "Étudiant en 4ème année - Génie Réseaux",
                  photo: "/placeholder.svg?height=100&width=100",
                  testimonial:
                    "Grâce aux clubs et associations de l'ENSA Khouribga, j'ai pu développer des projets passionnants en parallèle de mes études. Ces expériences extra-académiques sont tout aussi formatrices et m'ont permis de découvrir ma véritable passion pour la cybersécurité.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.photo || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{testimonial.promotion}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.testimonial}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer links={navLinks} />
    </div>
  )
}

