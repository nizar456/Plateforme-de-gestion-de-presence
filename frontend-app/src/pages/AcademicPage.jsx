"use client"

import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { motion } from "framer-motion"
import { BookOpen, Code, Database, Cpu, Server, Layers, ChevronRight, Download } from "lucide-react"

export default function AcademicPage() {
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
                Formation d'Ingénieurs
              </motion.h1>
              <motion.p
                className="text-xl max-w-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Découvrez nos filières d'ingénierie et notre approche pédagogique innovante pour former les ingénieurs
                de demain.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Section Cycle Préparatoire */}
        <section id="cycle-preparatoire" className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Cycle Préparatoire Intégré
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Le cycle préparatoire intégré de l'ENSA Khouribga s'étend sur deux années (4 semestres) et constitue
                  la première phase de la formation d'ingénieur. Il vise à donner aux étudiants une solide formation
                  scientifique de base.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Ce cycle permet aux étudiants d'acquérir les connaissances fondamentales en mathématiques, physique,
                  chimie, informatique et sciences de l'ingénieur, ainsi que des compétences linguistiques et
                  méthodologiques essentielles pour la suite de leur parcours.
                </p>
                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Objectifs du cycle préparatoire :
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Acquérir des connaissances scientifiques fondamentales",
                      "Développer des compétences méthodologiques et analytiques",
                      "Renforcer les capacités linguistiques (français, anglais, communication)",
                      "Initier aux sciences de l'ingénieur et à l'informatique",
                      "Préparer au choix de filière pour le cycle ingénieur",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    <Download className="h-5 w-5 mr-2" />
                    Télécharger le programme détaillé
                  </a>
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
                  alt="Étudiants en cycle préparatoire"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Cycle Ingénieur */}
        <section id="cycle-ingenieur" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-lg overflow-hidden h-[400px] order-2 lg:order-1"
              >
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Étudiants en cycle ingénieur"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Cycle Ingénieur</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Le cycle ingénieur s'étend sur trois années (6 semestres) et constitue la phase de spécialisation de
                  la formation. Il permet aux étudiants d'acquérir des compétences techniques avancées dans leur domaine
                  de spécialité.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  La formation en cycle ingénieur à l'ENSA Khouribga est caractérisée par son approche pratique, avec de
                  nombreux projets, travaux pratiques et stages en entreprise qui permettent aux étudiants de développer
                  leur savoir-faire et leur savoir-être.
                </p>
                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Caractéristiques du cycle ingénieur :
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Spécialisation progressive dans une filière d'ingénierie",
                      "Enseignements techniques avancés et travaux pratiques",
                      "Projets individuels et en équipe",
                      "Stages en entreprise (dont un stage de fin d'études de 6 mois)",
                      "Modules de management, entrepreneuriat et soft skills",
                      "Projet de fin d'études",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    <Download className="h-5 w-5 mr-2" />
                    Télécharger le règlement des études
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Filières */}
        <section id="filieres" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Nos Filières d'Ingénierie
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                L'ENSA Khouribga propose plusieurs filières d'ingénierie, conçues pour répondre aux besoins du marché du
                travail et aux défis technologiques actuels.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Génie Informatique",
                  icon: <Code className="h-10 w-10 text-blue-600" />,
                  description:
                    "Formation en développement logiciel, intelligence artificielle, big data, cloud computing et sécurité informatique.",
                  modules: [
                    "Algorithmique et Structures de Données",
                    "Développement Web et Mobile",
                    "Intelligence Artificielle",
                    "Sécurité Informatique",
                    "Cloud Computing",
                  ],
                },
                {
                  title: "Génie des Données",
                  icon: <Database className="h-10 w-10 text-purple-600" />,
                  description:
                    "Spécialisation dans l'analyse et le traitement des données massives, le machine learning et la business intelligence.",
                  modules: [
                    "Data Mining",
                    "Machine Learning",
                    "Big Data Analytics",
                    "Data Visualization",
                    "Business Intelligence",
                  ],
                },
                {
                  title: "Génie Réseaux et Systèmes",
                  icon: <Server className="h-10 w-10 text-green-600" />,
                  description:
                    "Formation en conception, déploiement et administration des infrastructures réseaux et systèmes d'information.",
                  modules: [
                    "Réseaux Informatiques",
                    "Systèmes Distribués",
                    "Virtualisation",
                    "Cybersécurité",
                    "Administration Système",
                  ],
                },
                {
                  title: "Génie Électrique",
                  icon: <Cpu className="h-10 w-10 text-red-600" />,
                  description:
                    "Spécialisation en électronique, automatique, systèmes embarqués et énergies renouvelables.",
                  modules: [
                    "Électronique Analogique et Numérique",
                    "Automatique",
                    "Systèmes Embarqués",
                    "Énergies Renouvelables",
                    "Robotique",
                  ],
                },
                {
                  title: "Génie Industriel",
                  icon: <Layers className="h-10 w-10 text-amber-600" />,
                  description:
                    "Formation en optimisation des processus industriels, logistique, qualité et management de production.",
                  modules: [
                    "Gestion de Production",
                    "Logistique et Supply Chain",
                    "Qualité et Amélioration Continue",
                    "Industrie 4.0",
                    "Management de Projets Industriels",
                  ],
                },
                {
                  title: "Génie Civil",
                  icon: <BookOpen className="h-10 w-10 text-teal-600" />,
                  description:
                    "Spécialisation en conception et réalisation d'ouvrages, structures, bâtiments et infrastructures.",
                  modules: [
                    "Résistance des Matériaux",
                    "Béton Armé",
                    "Structures Métalliques",
                    "Géotechnique",
                    "BIM et Modélisation 3D",
                  ],
                },
              ].map((filiere, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">{filiere.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{filiere.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{filiere.description}</p>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Modules principaux :</h4>
                  <ul className="space-y-1">
                    {filiere.modules.map((module, idx) => (
                      <li key={idx} className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <ChevronRight className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span>{module}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center"
                    >
                      En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Pédagogie */}
        <section id="pedagogie" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Notre Approche Pédagogique
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                L'ENSA Khouribga adopte une approche pédagogique innovante, centrée sur l'étudiant et orientée vers la
                pratique et les besoins du marché.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Apprentissage par Projets",
                  description:
                    "Les étudiants travaillent sur des projets concrets, individuels ou en équipe, qui leur permettent d'appliquer leurs connaissances théoriques et de développer leur créativité.",
                },
                {
                  title: "Pédagogie Active",
                  description:
                    "Les cours magistraux sont complétés par des travaux dirigés, des travaux pratiques et des ateliers qui favorisent l'interaction et l'engagement des étudiants.",
                },
                {
                  title: "Immersion Professionnelle",
                  description:
                    "Des stages obligatoires en entreprise, des visites industrielles et des projets en partenariat avec des entreprises permettent aux étudiants de se familiariser avec le monde professionnel.",
                },
                {
                  title: "Innovation Pédagogique",
                  description:
                    "Utilisation de méthodes pédagogiques innovantes comme la classe inversée, l'apprentissage par problèmes et l'utilisation des technologies numériques.",
                },
                {
                  title: "Développement des Soft Skills",
                  description:
                    "Des modules dédiés au développement des compétences transversales comme la communication, le travail en équipe, le leadership et la gestion de projet.",
                },
                {
                  title: "Ouverture Internationale",
                  description:
                    "Possibilités de mobilité internationale, cours dispensés en langues étrangères et projets collaboratifs avec des partenaires internationaux.",
                },
                {
                  title: "Recherche et Innovation",
                  description:
                    "Initiation à la recherche scientifique et à l'innovation, avec la possibilité de participer à des projets de recherche menés par les laboratoires de l'école.",
                },
                {
                  title: "Entrepreneuriat",
                  description:
                    "Sensibilisation à l'entrepreneuriat et accompagnement des projets innovants des étudiants, avec un incubateur dédié aux startups.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                >
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section International */}
        <section id="international" className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Dimension Internationale
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  L'ENSA Khouribga accorde une grande importance à l'ouverture internationale et offre à ses étudiants
                  diverses opportunités de mobilité et d'échanges avec des établissements partenaires à l'étranger.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Notre école a développé un réseau de partenariats avec des universités et écoles d'ingénieurs en
                  Europe, en Amérique du Nord, en Asie et en Afrique, permettant aux étudiants de bénéficier de
                  programmes d'échange, de double diplôme et de stages à l'international.
                </p>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Nos programmes internationaux :
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Programmes d'échange semestriels ou annuels",
                      "Programmes de double diplôme avec des établissements partenaires",
                      "Stages à l'international",
                      "Écoles d'été et programmes courts",
                      "Projets de recherche collaboratifs",
                      "Participation à des compétitions internationales",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    Découvrir nos partenaires internationaux <ChevronRight className="ml-1 h-5 w-5" />
                  </a>
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
                  alt="Étudiants internationaux"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer links={navLinks} />
    </div>
  )
}

