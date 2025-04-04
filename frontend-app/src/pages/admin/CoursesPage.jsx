"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Plus, Edit, Trash2, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import AdminLayout from "../../components/admin/AdminLayout"

function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCourses, setSelectedCourses] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" })

  // Données fictives des cours
  const coursesData = [
    {
      id: "CS101",
      name: "Introduction à l'Informatique",
      department: "Sciences",
      professor: "Dr. Martin",
      students: 120,
      status: "En cours",
    },
    {
      id: "LIT205",
      name: "Littérature Française",
      department: "Lettres",
      professor: "Dr. Dubois",
      students: 85,
      status: "En cours",
    },
    {
      id: "LAW110",
      name: "Introduction au Droit",
      department: "Droit",
      professor: "Dr. Leroy",
      students: 150,
      status: "En cours",
    },
    {
      id: "MED301",
      name: "Anatomie Humaine",
      department: "Médecine",
      professor: "Dr. Bernard",
      students: 60,
      status: "En cours",
    },
    {
      id: "ECO202",
      name: "Macroéconomie",
      department: "Économie",
      professor: "Dr. Petit",
      students: 95,
      status: "Terminé",
    },
    {
      id: "ENG150",
      name: "Mécanique des Fluides",
      department: "Ingénierie",
      professor: "Dr. Moreau",
      students: 70,
      status: "En cours",
    },
    {
      id: "CS205",
      name: "Structures de Données",
      department: "Sciences",
      professor: "Dr. Richard",
      students: 80,
      status: "En cours",
    },
    {
      id: "LIT310",
      name: "Poésie Moderne",
      department: "Lettres",
      professor: "Dr. Simon",
      students: 45,
      status: "Terminé",
    },
    {
      id: "LAW220",
      name: "Droit Constitutionnel",
      department: "Droit",
      professor: "Dr. Fournier",
      students: 110,
      status: "En cours",
    },
    {
      id: "MED405",
      name: "Neurologie",
      department: "Médecine",
      professor: "Dr. Roux",
      students: 40,
      status: "En cours",
    },
  ]

  // Filtrer les cours en fonction du terme de recherche
  const filteredCourses = coursesData.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Trier les cours
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  // Pagination
  const coursesPerPage = 5
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage)

  // Gérer le tri
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Gérer la sélection des cours
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCourses(currentCourses.map((course) => course.id))
    } else {
      setSelectedCourses([])
    }
  }

  const handleSelectCourse = (e, courseId) => {
    if (e.target.checked) {
      setSelectedCourses([...selectedCourses, courseId])
    } else {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId))
    }
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Cours</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Une liste de tous les cours proposés par l'université
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un cours
            </button>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
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
          <div className="flex space-x-2">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </button>
          </div>
        </div>

        {/* Tableau des cours */}
        <motion.div
          className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedCourses.length === currentCourses.length && currentCourses.length > 0}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("id")}
                  >
                    <div className="flex items-center">
                      Code
                      {sortConfig.key === "id" && (
                        <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center">
                      Nom du Cours
                      {sortConfig.key === "name" && (
                        <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("department")}
                  >
                    <div className="flex items-center">
                      Département
                      {sortConfig.key === "department" && (
                        <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("professor")}
                  >
                    <div className="flex items-center">
                      Professeur
                      {sortConfig.key === "professor" && (
                        <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("students")}
                  >
                    <div className="flex items-center">
                      Étudiants
                      {sortConfig.key === "students" && (
                        <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("status")}
                  >
                    <div className="flex items-center">
                      Statut
                      {sortConfig.key === "status" && (
                        <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedCourses.includes(course.id)}
                          onChange={(e) => handleSelectCourse(e, course.id)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {course.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{course.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{course.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{course.professor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {course.students}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          course.status === "En cours"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800"
                  : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Précédent
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800"
                  : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Affichage de <span className="font-medium">{indexOfFirstCourse + 1}</span> à{" "}
                <span className="font-medium">{Math.min(indexOfLastCourse, sortedCourses.length)}</span> sur{" "}
                <span className="font-medium">{sortedCourses.length}</span> cours
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 text-sm font-medium ${
                    currentPage === 1
                      ? "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800"
                      : "text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="sr-only">Précédent</span>
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Pages */}
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium ${
                      currentPage === i + 1
                        ? "z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-600 text-blue-600 dark:text-blue-200"
                        : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-700 text-sm font-medium ${
                    currentPage === totalPages
                      ? "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800"
                      : "text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="sr-only">Suivant</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default CoursesPage

