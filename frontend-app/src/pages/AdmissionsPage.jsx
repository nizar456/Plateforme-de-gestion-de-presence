"use client"

import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { motion } from "framer-motion"
import { Calendar, FileText, CheckCircle, AlertCircle, HelpCircle, ChevronRight, Download } from "lucide-react"

export default function AdmissionsPage() {
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
                Admissions
              </motion.h1>
              <motion.p
                className="text-xl max-w-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Découvrez comment rejoindre l'ENSA Khouribga et entamer votre parcours vers une carrière d'ingénieur.
              </motion.p>
            </motion.div>
          </div>
        </div>
     
        {/* Section Conditions d'Admission */}
        <section id="conditions" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Conditions d'Admission
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                L'admission à l'ENSA Khouribga se fait principalement via le Concours National Commun (CNC) pour les
                classes préparatoires, et sur concours propre à l'école pour les autres candidats.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Admission en 1ère année du Cycle Préparatoire
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  L'admission en première année du cycle préparatoire intégré est ouverte aux bacheliers des séries
                  scientifiques et techniques.
                </p>
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Conditions requises :</h4>
                  <ul className="space-y-2">
                    {[
                      "Être titulaire d'un baccalauréat scientifique ou technique de l'année en cours",
                      "Avoir moins de 21 ans au 31 décembre de l'année en cours",
                      "Avoir d'excellentes notes en mathématiques, physique-chimie et sciences de l'ingénieur",
                      "Réussir le concours d'admission basé sur l'étude de dossier et/ou test écrit",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    Séries de baccalauréat acceptées :
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Sciences Mathématiques A",
                      "Sciences Mathématiques B",
                      "Sciences Physiques",
                      "Sciences de la Vie et de la Terre",
                      "Sciences et Technologies Électriques",
                      "Sciences et Technologies Mécaniques",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded text-sm text-gray-700 dark:text-gray-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Admission en 1ère année du Cycle Ingénieur
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  L'admission en première année du cycle ingénieur se fait principalement via le Concours National
                  Commun (CNC) pour les étudiants des classes préparatoires.
                </p>
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Voies d'admission :</h4>
                  <ul className="space-y-4">
                    <li className="space-y-2">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Via le CNC :</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 ml-7">
                        Pour les étudiants des classes préparatoires aux grandes écoles (CPGE), l'admission se fait via
                        le Concours National Commun.
                      </p>
                    </li>
                    <li className="space-y-2">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Passerelles :</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 ml-7">
                        Pour les titulaires d'un DEUG, DUT, BTS ou Licence dans les domaines scientifiques et
                        techniques, sur concours propre à l'école.
                      </p>
                    </li>
                    <li className="space-y-2">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          Cycle préparatoire intégré :
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 ml-7">
                        Les étudiants ayant validé le cycle préparatoire intégré de l'ENSA Khouribga accèdent
                        directement au cycle ingénieur.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      L'admission définitive est conditionnée par la validation des prérequis académiques et la réussite
                      aux épreuves du concours.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Procédure */}
        <section id="procedure" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Procédure d'Admission
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                La procédure d'admission varie selon le niveau d'entrée et le profil du candidat. Voici les étapes à
                suivre pour chaque type d'admission.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Ligne verticale */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900"></div>

                {/* Étapes */}
                <div className="space-y-8">
                  {[
                    {
                      title: "Préinscription en ligne",
                      description:
                        "Remplir le formulaire de préinscription sur la plateforme dédiée et télécharger les documents requis.",
                      note: "Respectez les délais de préinscription indiqués dans le calendrier d'admission.",
                    },
                    {
                      title: "Étude de dossier",
                      description:
                        "Les dossiers des candidats sont évalués selon des critères académiques (notes, classement, etc.).",
                      note: "Seuls les candidats présélectionnés seront convoqués aux étapes suivantes.",
                    },
                    {
                      title: "Concours écrit (pour certaines admissions)",
                      description:
                        "Les candidats présélectionnés passent des épreuves écrites dans les matières scientifiques fondamentales.",
                      note: "Les épreuves portent généralement sur les mathématiques, la physique et les sciences de l'ingénieur.",
                    },
                    {
                      title: "Entretien oral (pour certaines admissions)",
                      description:
                        "Un entretien avec un jury pour évaluer la motivation, le projet professionnel et les soft skills du candidat.",
                      note: "Préparez-vous à présenter votre parcours, vos motivations et votre projet professionnel.",
                    },
                    {
                      title: "Résultats d'admission",
                      description:
                        "Publication des résultats d'admission sur le site web de l'école et notification des candidats admis.",
                      note: "Les candidats admis doivent confirmer leur inscription dans les délais impartis.",
                    },
                    {
                      title: "Inscription définitive",
                      description:
                        "Les candidats admis doivent compléter leur dossier d'inscription et s'acquitter des frais d'inscription.",
                      note: "Tout dossier incomplet ou hors délai entraînera l'annulation de l'admission.",
                    },
                  ].map((etape, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative flex"
                    >
                      <div className="absolute left-8 top-0 -ml-4 mt-1 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="ml-16">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{etape.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{etape.description}</p>
                        <div className="mt-2 flex items-start bg-blue-50 dark:bg-blue-900/30 p-2 rounded-md">
                          <AlertCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-blue-700 dark:text-blue-300 text-sm">{etape.note}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Documents requis pour l'inscription
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">Formulaire d'inscription dûment rempli</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">Copie légalisée du baccalauréat</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Relevés de notes des deux années du baccalauréat
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">Copie de la carte d'identité nationale</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">Photos d'identité récentes</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">Certificat médical</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">Reçu des frais d'inscription</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">Dossier de bourse (si applicable)</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    <Download className="h-5 w-5 mr-2" />
                    Télécharger le formulaire d'inscription
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Concours National */}
        <section id="concours" className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Concours National Commun (CNC)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Le Concours National Commun (CNC) est le principal mode d'accès aux écoles d'ingénieurs marocaines
                  pour les étudiants des classes préparatoires aux grandes écoles (CPGE).
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  L'ENSA Khouribga participe au CNC et recrute des étudiants dans différentes filières selon les places
                  disponibles et le classement des candidats.
                </p>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Informations importantes sur le CNC :
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Le CNC est organisé chaque année au niveau national",
                      "Les épreuves portent sur les matières étudiées en classes préparatoires",
                      "L'admission se fait selon le classement et les choix des candidats",
                      "Les candidats doivent s'inscrire sur la plateforme du CNC",
                      "Les résultats sont publiés sur le site du CNC",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <a
                    href="https://www.cnc.ac.ma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Visiter le site officiel du CNC <ChevronRight className="ml-1 h-5 w-5" />
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
                  alt="Concours National Commun"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Calendrier */}
        <section id="calendrier" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Calendrier d'Admission 2024-2025
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Consultez les dates importantes du processus d'admission pour l'année académique 2024-2025.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    {
                      periode: "15 Mai - 15 Juin 2024",
                      evenement: "Préinscription en ligne",
                      description:
                        "Ouverture de la plateforme de préinscription pour les candidats au cycle préparatoire.",
                    },
                    {
                      periode: "20 - 30 Juin 2024",
                      evenement: "Étude des dossiers",
                      description:
                        "Évaluation des dossiers de candidature et sélection des candidats pour les épreuves écrites.",
                    },
                    {
                      periode: "5 - 6 Juillet 2024",
                      evenement: "Épreuves écrites",
                      description: "Concours écrit pour les candidats présélectionnés au cycle préparatoire.",
                    },
                    {
                      periode: "10 - 15 Juillet 2024",
                      evenement: "Entretiens oraux",
                      description: "Entretiens pour les candidats ayant réussi les épreuves écrites.",
                    },
                    {
                      periode: "20 Juillet 2024",
                      evenement: "Publication des résultats",
                      description: "Annonce des résultats d'admission sur le site web de l'école.",
                    },
                    {
                      periode: "25 - 31 Juillet 2024",
                      evenement: "Confirmation d'inscription",
                      description: "Période de confirmation d'inscription pour les candidats admis.",
                    },
                    {
                      periode: "1 - 10 Septembre 2024",
                      evenement: "Inscriptions définitives",
                      description: "Finalisation des inscriptions et dépôt des dossiers complets.",
                    },
                    {
                      periode: "15 Septembre 2024",
                      evenement: "Rentrée académique",
                      description: "Début des cours pour l'année académique 2024-2025.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex flex-col md:flex-row p-4 md:p-6 hover:bg-gray-50 dark:hover:bg-gray-750"
                    >
                      <div className="flex items-start md:w-1/3 mb-2 md:mb-0">
                        <Calendar className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-blue-600 dark:text-blue-400">{item.periode}</span>
                      </div>
                      <div className="md:w-2/3 md:pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{item.evenement}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Note : Ce calendrier est susceptible de modifications. Veuillez consulter régulièrement le site web de
                  l'école pour les mises à jour.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section FAQ */}
        <section id="faq" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Questions Fréquentes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Retrouvez les réponses aux questions les plus fréquemment posées concernant les admissions à l'ENSA
                Khouribga.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    question: "Quelles sont les filières disponibles à l'ENSA Khouribga ?",
                    reponse:
                      "L'ENSA Khouribga propose plusieurs filières d'ingénierie : Génie Informatique, Génie des Données, Génie Réseaux et Systèmes, Génie Électrique, Génie Industriel et Génie Civil.",
                  },
                  {
                    question: "Puis-je m'inscrire si je n'ai pas un baccalauréat marocain ?",
                    reponse:
                      "Oui, les candidats titulaires d'un baccalauréat étranger reconnu équivalent au baccalauréat marocain peuvent postuler. Ils doivent fournir l'attestation d'équivalence délivrée par le Ministère de l'Éducation Nationale.",
                  },
                  {
                    question: "Y a-t-il des frais d'inscription pour le concours d'admission ?",
                    reponse:
                      "Oui, des frais d'inscription au concours sont à régler lors de la préinscription. Ces frais ne sont pas remboursables, quelle que soit l'issue du concours.",
                  },
                  {
                    question: "Comment se fait le choix de la filière ?",
                    reponse:
                      "Pour le cycle préparatoire, le choix de la filière se fait à la fin de la deuxième année. Pour les admissions directes en cycle ingénieur, le choix se fait lors de l'inscription en fonction des places disponibles et du classement au concours.",
                  },
                  {
                    question: "Est-il possible de changer de filière en cours de formation ?",
                    reponse:
                      "Le changement de filière est possible sous certaines conditions : places disponibles, résultats académiques satisfaisants et avis favorable du conseil pédagogique. La demande doit être faite au début de l'année académique.",
                  },
                  {
                    question: "L'école propose-t-elle des bourses d'études ?",
                    reponse:
                      "L'ENSA Khouribga ne délivre pas directement de bourses, mais les étudiants peuvent bénéficier des bourses de l'enseignement supérieur octroyées par l'Office National des Œuvres Universitaires, Sociales et Culturelles (ONOUSC).",
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
                    <div className="flex items-start">
                      <HelpCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.question}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{item.reponse}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Vous avez d'autres questions ? N'hésitez pas à nous contacter.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Contactez-nous
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer links={navLinks} />
    </div>
  )
}

