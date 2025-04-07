"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Download, Plus, Edit, Trash2, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import AdminLayout from "../../components/admin/AdminLayout"

function AdminsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAdmins, setSelectedAdmins] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" })

  // Données fictives des administrateurs
  const adminsData = [
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@universite.fr",
      role: "Super Admin",
      department: "Direction Générale",
      joinDate: "15/09/2018",
      status: "Actif",
    },
    {
      id: 2,
      name: "Marie Laurent",
      email: "marie.laurent@universite.fr",
      role: "Admin Système",
      department: "IT",
      joinDate: "03/02/2019",
      status: "Actif",
    },
    {
      id: 3,
      name: "Philippe Martin",
      email: "philippe.martin@universite.fr",
      role: "Admin Scolarité",
      department: "Scolarité",
      joinDate: "21/06/2020",
      status: "Actif",
    },
    {
      id: 4,
      name: "Sophie Dubois",
      email: "sophie.dubois@universite.fr",
      role: "Admin Finance",
      department: "Finance",
      joinDate: "10/11/2019",
      status: "Actif",
    },
    {
      id: 5,
      name: "Thomas Bernard",
      email: "thomas.bernard@universite.fr",
      role: "Admin RH",
      department: "Ressources Humaines",
      joinDate: "05/04/2021",
      status: "Inactif",
    },
    {
      id: 6,
      name: "Claire Moreau",
      email: "claire.moreau@universite.fr",
      role: "Admin Communication",
      department: "Communication",
      joinDate: "18/08/2020",
      status: "Actif",
    },
    {
      id: 7,
      name: "Lucas Petit",
      email: "lucas.petit@universite.fr",
      role: "Admin Bibliothèque",
      department: "Bibliothèque",
      joinDate: "22/01/2022",
      status: "Actif",
    },
    {
      id: 8,
      name: "Emma Richard",
      email: "emma.richard@universite.fr",
      role: "Admin Recherche",
      department: "Recherche",
      joinDate: "14/03/2021",
      status: "Inactif",
    },
    {
      id: 9,
      name: "Antoine Simon",
      email: "antoine.simon@universite.fr",
      role: "Admin International",
      department: "Relations Internationales",
      joinDate: "09/09/2019",
      status: "Actif",
    },
    {
      id: 10,
      name: "Julie Leroy",
      email: "julie.leroy@universite.fr",
      role: "Admin Événements",
      department: "Vie Étudiante",
      joinDate: "30/05/2020",
      status: "Actif",
    },
  ]

  // Filtrer les administrateurs en fonction du terme de recherche
  const filteredAdmins = adminsData.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Trier les administrateurs
  const sortedAdmins = [...filteredAdmins].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  // Pagination
  const adminsPerPage = 5
  const indexOfLastAdmin = currentPage * adminsPerPage
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage
  const currentAdmins = sortedAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin)
  const totalPages = Math.ceil(sortedAdmins.length / adminsPerPage)

  // Gérer le tri
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Gérer la sélection des administrateurs
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAdmins(currentAdmins.map((admin) => admin.id))
    } else {
      setSelectedAdmins([])
    }
  }

  const handleSelectAdmin = (e, adminId) => {
    if (e.target.checked) {
      setSelectedAdmins([...selectedAdmins, adminId])
    } else {
      setSelectedAdmins(selectedAdmins.filter((id) => id !== adminId))
    }
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Administrateurs</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Une liste de tous les administrateurs de l'université
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un administrateur
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
              placeholder="Rechercher un administrateur..."
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
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </button>
          </div>
        </div>

        {/* Tableau des administrateurs */}
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
                        checked={selectedAdmins.length === currentAdmins.length && currentAdmins.length > 0}
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
                      ID
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
                      Nom
                      {sortConfig.key === "name" && (
                        <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("email")}
                  >
                    <div className="flex items-center">
                      Email
                      {sortConfig.key === "email" && (
                        <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("role")}
                  >
                    <div className="flex items-center">
                      Rôle
                      {sortConfig.key === "role" && (
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
                {currentAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedAdmins.includes(admin.id)}
                          onChange={(e) => handleSelectAdmin(e, admin.id)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{admin.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{admin.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{admin.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{admin.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{admin.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          admin.status === "Actif"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {admin.status}
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
                Affichage de <span className="font-medium">{indexOfFirstAdmin + 1}</span> à{" "}
                <span className="font-medium">{Math.min(indexOfLastAdmin, sortedAdmins.length)}</span> sur{" "}
                <span className="font-medium">{sortedAdmins.length}</span> administrateurs
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

export default AdminsPage

