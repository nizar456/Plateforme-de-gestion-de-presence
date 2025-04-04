"use client"

import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export default function AboutPage() {
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
                À Propos de l'ENSA Khouribga
              </motion.h1>
              <motion.p
                className="text-xl max-w-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Découvrez notre école d'ingénieurs, notre histoire, notre mission et notre vision pour l'avenir.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Section Présentation */}
        <section id="presentation" className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Présentation de l'ENSA Khouribga
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  L'École Nationale des Sciences Appliquées de Khouribga (ENSAK) est un établissement public
                  d'enseignement supérieur relevant de l'Université Sultan Moulay Slimane. Créée en 2007, l'ENSAK a pour
                  mission principale de former des ingénieurs d'état polyvalents, hautement qualifiés et immédiatement
                  opérationnels dans différentes disciplines.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Notre école offre une formation d'excellence basée sur un système pédagogique innovant et un
                  encadrement de qualité. Nous préparons nos étudiants à devenir des acteurs clés du développement
                  économique et technologique du Maroc et à relever les défis de demain.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  L'ENSAK se distingue par son ouverture sur le monde socio-économique, ses partenariats nationaux et
                  internationaux, et son engagement dans la recherche scientifique et l'innovation.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-1 min-w-[150px]">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Fondée en</p>
                    <p className="text-xl font-bold">2007</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-1 min-w-[150px]">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Étudiants</p>
                    <p className="text-xl font-bold">1,200+</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-1 min-w-[150px]">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Filières</p>
                    <p className="text-xl font-bold">6</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-1 min-w-[150px]">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Enseignants</p>
                    <p className="text-xl font-bold">80+</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
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
            </div>
          </div>
        </section>

        {/* Section Mot du Directeur */}
        <section id="mot-directeur" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <div className="rounded-lg overflow-hidden mb-6">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Directeur de l'ENSA Khouribga"
                    className="w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pr. Mohammed ALAOUI</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">Directeur de l'ENSA Khouribga</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Mot du Directeur</h2>
                <div className="text-gray-600 dark:text-gray-400 space-y-4">
                  <p>Chers visiteurs, chers étudiants, chers partenaires,</p>
                  <p>
                    C'est avec un grand plaisir que je vous souhaite la bienvenue sur le site web de l'École Nationale
                    des Sciences Appliquées de Khouribga (ENSAK). Notre école, créée en 2007, s'est rapidement imposée
                    comme un établissement d'excellence dans la formation d'ingénieurs hautement qualifiés.
                  </p>
                  <p>
                    À l'ENSAK, nous nous engageons à offrir une formation de qualité, adaptée aux besoins du marché du
                    travail et aux défis technologiques actuels. Notre approche pédagogique combine l'excellence
                    académique, l'innovation et l'ouverture sur le monde professionnel.
                  </p>
                  <p>
                    Nous préparons nos étudiants à devenir des ingénieurs polyvalents, dotés de solides compétences
                    techniques et managériales, capables de s'adapter à un environnement en constante évolution et de
                    contribuer activement au développement économique et social de notre pays.
                  </p>
                  <p>
                    Notre école se distingue également par son engagement dans la recherche scientifique et
                    l'innovation, ainsi que par ses nombreux partenariats avec des entreprises et des institutions
                    académiques nationales et internationales.
                  </p>
                  <p>
                    Je vous invite à découvrir notre école, nos formations, nos activités de recherche et nos différents
                    projets à travers ce site web.
                  </p>
                  <p className="font-medium">
                    Pr. Mohammed ALAOUI
                    <br />
                    Directeur de l'ENSA Khouribga
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Historique */}
        <section id="historique" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">Notre Histoire</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Découvrez les étapes clés du développement de l'ENSA Khouribga depuis sa création.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Ligne verticale */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200 dark:bg-blue-900"></div>

                {/* Étapes */}
                <div className="space-y-12">
                  {[
                    {
                      year: "2007",
                      title: "Création de l'ENSAK",
                      description:
                        "Création de l'École Nationale des Sciences Appliquées de Khouribga par décret ministériel.",
                    },
                    {
                      year: "2010",
                      title: "Première promotion d'ingénieurs",
                      description: "Sortie de la première promotion d'ingénieurs de l'ENSAK.",
                    },
                    {
                      year: "2013",
                      title: "Expansion des filières",
                      description: "Ouverture de nouvelles filières d'ingénierie pour répondre aux besoins du marché.",
                    },
                    {
                      year: "2016",
                      title: "Développement de la recherche",
                      description: "Création de laboratoires de recherche et renforcement des activités scientifiques.",
                    },
                    {
                      year: "2019",
                      title: "Partenariats internationaux",
                      description:
                        "Signature de conventions avec des universités et écoles d'ingénieurs internationales.",
                    },
                    {
                      year: "2023",
                      title: "Nouveau campus",
                      description:
                        "Inauguration du nouveau campus avec des infrastructures modernes et des équipements de pointe.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                    >
                      <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold shadow-lg">
                          {item.year}
                        </div>
                      </div>
                      <div className="w-1/2"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Organisation */}
        <section id="organisation" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">Organisation</h2>
              <p className="text-gray-600 dark:text-gray-400">
                L'ENSA Khouribga est structurée autour de différentes entités administratives et pédagogiques qui
                travaillent en synergie pour assurer le bon fonctionnement de l'école.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Direction",
                  description:
                    "Assure la gestion administrative et pédagogique de l'école et veille à l'application de sa stratégie de développement.",
                  members: [
                    "Directeur",
                    "Secrétaire Général",
                    "Service des Affaires Administratives",
                    "Service des Affaires Financières",
                  ],
                },
                {
                  title: "Département Pédagogique",
                  description:
                    "Coordonne les activités d'enseignement et veille à la qualité de la formation dispensée aux étudiants.",
                  members: [
                    "Directeur des Études",
                    "Coordinateurs de Filières",
                    "Service de Scolarité",
                    "Service des Stages",
                  ],
                },
                {
                  title: "Département Recherche",
                  description:
                    "Supervise les activités de recherche et développe des partenariats avec le monde socio-économique.",
                  members: ["Directeur de la Recherche", "Responsables des Laboratoires", "Comité Scientifique"],
                },
                {
                  title: "Conseil d'Établissement",
                  description:
                    "Organe délibératif qui définit la politique de l'école en matière de formation, de recherche et de coopération.",
                  members: [
                    "Directeur (Président)",
                    "Représentants des Enseignants",
                    "Représentants des Étudiants",
                    "Partenaires Externes",
                  ],
                },
                {
                  title: "Départements Académiques",
                  description: "Structures regroupant les enseignants-chercheurs par domaine disciplinaire.",
                  members: [
                    "Informatique",
                    "Génie Électrique",
                    "Génie Civil",
                    "Génie Industriel",
                    "Mathématiques et Modélisation",
                  ],
                },
                {
                  title: "Services aux Étudiants",
                  description: "Accompagne les étudiants dans leur parcours académique et leur vie quotidienne.",
                  members: [
                    "Bureau des Étudiants",
                    "Service Social",
                    "Service Médical",
                    "Activités Culturelles et Sportives",
                  ],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Composition:</h4>
                  <ul className="space-y-1">
                    {item.members.map((member, idx) => (
                      <li key={idx} className="flex items-center text-gray-600 dark:text-gray-400">
                        <ChevronRight className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Partenaires */}
        <section id="partenaires" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">Nos Partenaires</h2>
              <p className="text-gray-600 dark:text-gray-400">
                L'ENSA Khouribga a développé un réseau de partenariats avec des entreprises, des institutions
                académiques et des organismes publics, tant au niveau national qu'international.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {Array.from({ length: 12 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-center h-24"
                >
                  <img
                    src={`/placeholder.svg?height=60&width=120&text=Partenaire ${index + 1}`}
                    alt={`Partenaire ${index + 1}`}
                    className="max-h-16 max-w-full"
                  />
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

