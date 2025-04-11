"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { classeService } from "../../services/api";
import AddClassModal from "../../components/admin/AddClassModal";
import EditClassModal from "../../components/admin/EditClassModal";

function ClassesPage() {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "nom",
    direction: "ascending",
  });
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [newClassForm, setNewClassForm] = useState({
    nom: "",
    niveau: "PREMIERE_ANNEE",
  });

  // Fetch classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoading(true);
        const classesData = await classeService.getAllClasses();
        setClasses(classesData);
      } catch (err) {
        setError("Failed to fetch classes");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // Map backend data to match frontend structure
  const mappedClasses = classes.map((classe) => ({
    id: classe.id,
    name: classe.nom,
    level: classe.niveau,
    students: classe.etudiants ? classe.etudiants.length : 0,
    status: "En cours",
  }));

  // Filter classes based on search term
  const filteredClasses = mappedClasses.filter(
    (classe) =>
      classe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classe.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classe.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort classes
  const sortedClasses = [...filteredClasses].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const classesPerPage = 5;
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = sortedClasses.slice(indexOfFirstClass, indexOfLastClass);
  const totalPages = Math.ceil(sortedClasses.length / classesPerPage);

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Handle selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedClasses(currentClasses.map((classe) => classe.id));
    } else {
      setSelectedClasses([]);
    }
  };

  const handleSelectClass = (e, classId) => {
    if (e.target.checked) {
      setSelectedClasses([...selectedClasses, classId]);
    } else {
      setSelectedClasses(selectedClasses.filter((id) => id !== classId));
    }
  };

  // Handle delete class
  const handleDeleteClass = async (classId) => {
    try {
      await classeService.deleteClasse(classId);
      setClasses(classes.filter((classe) => classe.id !== classId));
    } catch (err) {
      setError("Failed to delete class");
      console.error(err);
    }
  };

  // Handle add student to class
  const handleAddStudent = async (classId) => {
    try {
      const studentData = {};
      await classeService.affecterEtudiant({ classId, ...studentData });
      const updatedClasses = await classeService.getAllClasses();
      setClasses(updatedClasses);
    } catch (err) {
      setError("Failed to add student to class");
      console.error(err);
    }
  };

  // Handle view students
  const handleViewStudents = (classId) => {
    console.log(`View students in class ${classId}`);
  };

  // Handle edit class
  const handleEditClass = (classe) => {
    setCurrentClass(classe);
    setIsEditModalOpen(true);
  };

  // Handle form submission for new class
  const handleAddClassSubmit = async (formData) => {
    try {
      setIsLoading(true);
      await classeService.createClasse(formData);
      const updatedClasses = await classeService.getAllClasses();
      setClasses(updatedClasses);
      setIsAddClassModalOpen(false);
      setNewClassForm({
        nom: "",
        niveau: "PREMIERE_ANNEE",
      });
    } catch (err) {
      setError("Failed to create class");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle update class
  const handleUpdateClass = async (formData) => {
    try {
      setIsLoading(true);
      await classeService.updateClasse(currentClass.id, formData);
      const updatedClasses = await classeService.getAllClasses();
      setClasses(updatedClasses);
      setIsEditModalOpen(false);
      setCurrentClass(null);
    } catch (err) {
      setError("Failed to update class");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="px-4 py-6 sm:px-6 lg:px-8 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <AdminLayout>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestion des Classes
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Une liste de toutes les classes de l'université
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              onClick={() => setIsAddClassModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une classe
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Rechercher une classe..."
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

        {/* Classes Table */}
        <motion.div
          className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden rounded-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                        checked={
                          selectedClasses.length === currentClasses.length &&
                          currentClasses.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center">
                      Nom du Classe
                      {sortConfig.key === "name" && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => requestSort("level")}
                  >
                    <div className="flex items-center">
                      Niveau
                      {sortConfig.key === "level" && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => requestSort("students")}
                  >
                    <div className="flex items-center">
                      Étudiants
                      {sortConfig.key === "students" && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentClasses.map((classe, index) => (
                  <tr
                    key={classe.id}
                    className={`${
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-700"
                    } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                          checked={selectedClasses.includes(classe.id)}
                          onChange={(e) => handleSelectClass(e, classe.id)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {classe.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {classe.level
                          .replace("_", " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {classe.students} étudiants
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => handleViewStudents(classe.id)}
                          className="p-1.5 rounded-full text-blue-600 hover:text-white hover:bg-blue-600 dark:text-blue-400 dark:hover:bg-blue-600 transition-colors"
                          title="Voir les étudiants"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleAddStudent(classe.id)}
                          className="p-1.5 rounded-full text-green-600 hover:text-white hover:bg-green-600 dark:text-green-400 dark:hover:bg-green-600 transition-colors"
                          title="Ajouter étudiant"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditClass(classe)}
                          className="p-1.5 rounded-full text-blue-600 hover:text-white hover:bg-blue-600 dark:text-blue-400 dark:hover:bg-blue-600 transition-colors"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClass(classe.id)}
                          className="p-1.5 rounded-full text-red-600 hover:text-white hover:bg-red-600 dark:text-red-400 dark:hover:bg-red-600 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
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
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
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
                Affichage de{" "}
                <span className="font-medium">{indexOfFirstClass + 1}</span> à{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastClass, sortedClasses.length)}
                </span>{" "}
                sur <span className="font-medium">{sortedClasses.length}</span>{" "}
                classes
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
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
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
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

        {/* Render the modals */}
        <AddClassModal
          isOpen={isAddClassModalOpen}
          onClose={() => setIsAddClassModalOpen(false)}
          onSubmit={handleAddClassSubmit}
          isLoading={isLoading}
          initialForm={newClassForm}
        />

        {isEditModalOpen && (
          <EditClassModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateClass}
            isLoading={isLoading}
            classe={currentClass}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default ClassesPage;