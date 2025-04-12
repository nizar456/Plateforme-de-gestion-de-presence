"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Award, BookOpen, ChevronDown, ChevronUp, Download, BarChart2 } from "lucide-react"
import StudentLayout from "../../components/student/StudentLayout"

function StudentGradesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("Tous")
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "descending" })
  const [expandedCourse, setExpandedCourse] = useState(null)

  // Sample data for grades
  const grades = [
    {
      courseId: 1,
      courseCode: "MATH301",
      courseName: "Mathématiques Avancées",
      semester: "Semestre 5",
      professor: "Dr. Martin",
      finalGrade: "16/20",
      letterGrade: "A",
      credits: 6,
      status: "Validé",
      assessments: [
        { id: 1, title: "Examen Partiel", weight: "30%", grade: "15/20", date: "15 Mars 2024" },
        { id: 2, title: "Travaux Pratiques", weight: "20%", grade: "17/20", date: "10 Avril 2024" },
        { id: 3, title: "Examen Final", weight: "50%", grade: "16/20", date: "20 Mai 2024" },
      ],
    },
    {
      courseId: 2,
      courseCode: "INFO302",
      courseName: "Programmation Orientée Objet",
      semester: "Semestre 5",
      professor: "Dr. Dubois",
      finalGrade: "18/20",
      letterGrade: "A+",
      credits: 5,
      status: "Validé",
      assessments: [
        { id: 1, title: "TP 1", weight: "15%", grade: "18/20", date: "5 Mars 2024" },
        { id: 2, title: "TP 2", weight: "15%", grade: "19/20", date: "2 Avril 2024" },
        { id: 3, title: "Projet", weight: "30%", grade: "17/20", date: "25 Avril 2024" },
        { id: 4, title: "Examen Final", weight: "40%", grade: "18/20", date: "15 Mai 2024" },
      ],
    },
    {
      courseId: 3,
      courseCode: "INFO303",
      courseName: "Bases de Données",
      semester: "Semestre 5",
      professor: "Dr. Bernard",
      finalGrade: "14/20",
      letterGrade: "B+",
      credits: 5,
      status: "Validé",
      assessments: [
        { id: 1, title: "TP 1", weight: "20%", grade: "13/20", date: "10 Mars 2024" },
        { id: 2, title: "TP 2", weight: "20%", grade: "15/20", date: "5 Avril 2024" },
        { id: 3, title: "Examen Final", weight: "60%", grade: "14/20", date: "18 Mai 2024" },
      ],
    },
    {
      courseId: 4,
      courseCode: "PHYS201",
      courseName: "Physique",
      semester: "Semestre 5",
      professor: "Dr. Leroy",
      finalGrade: "15/20",
      letterGrade: "B+",
      credits: 4,
      status: "Validé",
      assessments: [
        { id: 1, title: "Devoir 1", weight: "10%", grade: "16/20", date: "8 Mars 2024" },
        { id: 2, title: "Devoir 2", weight: "10%", grade: "14/20", date: "29 Mars 2024" },
        { id: 3, title: "Examen Partiel", weight: "30%", grade: "15/20", date: "12 Avril 2024" },
        { id: 4, title: "Examen Final", weight: "50%", grade: "15/20", date: "22 Mai 2024" },
      ],
    },
    {
      courseId: 5,
      courseCode: "LANG101",
      courseName: "Anglais Technique",
      semester: "Semestre 5",
      professor: "Dr. Smith",
      finalGrade: "17/20",
      letterGrade: "A",
      credits: 3,
      status: "Validé",
      assessments: [
        { id: 1, title: "Présentation Orale", weight: "30%", grade: "18/20", date: "20 Mars 2024" },
        { id: 2, title: "Essai Technique", weight: "30%", grade: "16/20", date: "15 Avril 2024" },
        { id: 3, title: "Examen Final", weight: "40%", grade: "17/20", date: "10 Mai 2024" },
      ],
    },
    {
      courseId: 6,
      courseCode: "ECON101",
      courseName: "Introduction à l'Économie",
      semester: "Semestre 4",
      professor: "Dr. Petit",
      finalGrade: "13/20",
      letterGrade: "B",
      credits: 3,
      status: "Validé",
      assessments: [
        { id: 1, title: "Devoir 1", weight: "20%", grade: "12/20", date: "10 Novembre 2023" },
        { id: 2, title: "Devoir 2", weight: "20%", grade: "14/20", date: "5 Décembre 2023" },
        { id: 3, title: "Examen Final", weight: "60%", grade: "13/20", date: "15 Janvier 2024" },
      ],
    },
    {
      courseId: 7,
      courseCode: "MATH201",
      courseName: "Algèbre Linéaire",
      semester: "Semestre 4",
      professor: "Dr. Moreau",
      finalGrade: "15/20",
      letterGrade: "B+",
      credits: 5,
      status: "Validé",
      assessments: [
        { id: 1, title: "Examen Partiel", weight: "40%", grade: "14/20", date: "20 Novembre 2023" },
        { id: 2, title: "Examen Final", weight: "60%", grade: "16/20", date: "10 Janvier 2024" },
      ],
    },
  ]

  // Calculate GPA and total credits
  const calculateGPA = () => {
    const gradePoints = {
      "A+": 4.3,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0.0,
    }

    let totalPoints = 0
    let totalCredits = 0

    grades.forEach((course) => {
      totalPoints += gradePoints[course.letterGrade] * course.credits
      totalCredits += course.credits
    })

    return {
      gpa: (totalPoints / totalCredits).toFixed(2),
      totalCredits,
    }
  }

  const { gpa, totalCredits } = calculateGPA()

  // Filter grades based on search term and filters
  const filteredGrades = grades.filter((grade) => {
    const matchesSearch =
      grade.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.professor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSemester = selectedSemester === "Tous" || grade.semester === selectedSemester

    return matchesSearch && matchesSemester
  })

  // Sort grades
  const sortedGrades = [...filteredGrades].sort((a, b) => {
    if (sortConfig.key === "date") {
      // Sort by semester (most recent first for descending)
      const semesterA = Number.parseInt(a.semester.split(" ")[1])
      const semesterB = Number.parseInt(b.semester.split(" ")[1])

      return sortConfig.direction === "ascending" ? semesterA - semesterB : semesterB - semesterA
    } else if (sortConfig.key === "grade") {
      // Sort by grade
      const gradeA = Number.parseInt(a.finalGrade.split("/")[0])
      const gradeB = Number.parseInt(b.finalGrade.split("/")[0])

      return sortConfig.direction === "ascending" ? gradeA - gradeB : gradeB - gradeA
    } else {
      // Sort by course name
      return sortConfig.direction === "ascending"
        ? a.courseName.localeCompare(b.courseName)
        : b.courseName.localeCompare(a.courseName)
    }
  })

  // Toggle course expansion
  const toggleCourseExpansion = (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null)
    } else {
      setExpandedCourse(courseId)
    }
  }

  // Handle sort
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Get unique semesters for filters
  const semesters = ["Tous", ...new Set(grades.map((grade) => grade.semester))]

  return (
    <StudentLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mes Notes</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Consultez vos notes et suivez votre progression académique.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {/* Résumé des notes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-md p-3">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Moyenne Générale</h3>
                  <div className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{gpa}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 rounded-md p-3">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Crédits Validés</h3>
                  <div className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{totalCredits}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 rounded-md p-3">
                  <BarChart2 className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Cours Validés</h3>
                  <div className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{grades.length}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filtres et recherche */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Rechercher un cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  {semesters.map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </button>
            </div>
          </div>

          {/* Tableau des notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6"
          >
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center">
                      Cours
                      {sortConfig.key === "name" && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("date")}
                  >
                    <div className="flex items-center">
                      Semestre
                      {sortConfig.key === "date" && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Professeur
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("grade")}
                  >
                    <div className="flex items-center">
                      Note
                      {sortConfig.key === "grade" && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Crédits
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Statut
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Détails
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedGrades.length > 0 ? (
                  sortedGrades.map((grade) => (
                    <React.Fragment key={grade.courseId}>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {grade.courseCode}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{grade.courseName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{grade.semester}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{grade.professor}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{grade.finalGrade}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{grade.letterGrade}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {grade.credits}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {grade.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => toggleCourseExpansion(grade.courseId)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {expandedCourse === grade.courseId ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedCourse === grade.courseId && (
                        <tr className="bg-gray-50 dark:bg-gray-750">
                          <td colSpan="7" className="px-6 py-4">
                            <div className="text-sm text-gray-900 dark:text-white font-medium mb-2">
                              Détail des évaluations
                            </div>
                            <ul className="space-y-2">
                              {grade.assessments.map((assessment) => (
                                <li key={assessment.id} className="flex justify-between">
                                  <span>
                                    {assessment.title} ({assessment.weight})
                                  </span>
                                  <span>
                                    {assessment.grade} - {assessment.date}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      Aucune note trouvée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </StudentLayout>
  )
}

export default StudentGradesPage
