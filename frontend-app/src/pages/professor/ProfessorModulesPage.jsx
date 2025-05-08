"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Edit,
  FileText,
  Users,
  Calendar,
  ChevronRight,
  AlertCircle,
  MapPin,
  ChevronLeft,
} from "lucide-react";
import ProfessorLayout from "../../components/professor/ProfessorLayout";
import { moduleService } from "../../services/api";

function ProfessorModulesPage() {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: "titre",
    direction: "asc",
  });

  const pageSize = 5;

  useEffect(() => {
    fetchModules();
  }, [currentPage, sortConfig]);

  const fetchModules = async () => {
    setLoading(true);
    try {
      const modulesData = await moduleService.getModulesEnseignes();
      
      // Apply client-side filtering and sorting
      let filteredModules = [...modulesData];

      // Apply search filter
      if (searchTerm) {
        filteredModules = filteredModules.filter(
          (module) =>
            module.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (module.description &&
              module.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        );
      }

      // Apply sorting
      filteredModules.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });

      // Apply pagination
      const paginatedModules = filteredModules.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
      );

      setModules(paginatedModules);
      setTotalPages(Math.ceil(filteredModules.length / pageSize));
    } catch (err) {
      console.error("Error fetching modules:", err);
      setError("Une erreur s'est produite lors du chargement des modules.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchModules();
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  return (
    <ProfessorLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Mes Modules
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gérez vos modules et suivez votre progression.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Rechercher un module..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <div className="flex space-x-2">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => requestSort("titre")}
              >
                <Filter className="h-4 w-4 mr-2" />
                {sortConfig.key === "titre" &&
                  (sortConfig.direction === "asc" ? "A-Z" : "Z-A")}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 px-4 py-3 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Loading state */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              {/* Module list */}
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {modules.length > 0 ? (
                  modules.map((module) => (
                    <motion.li
                      key={module.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-750"
                    >
                      <div className="px-6 py-5 flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-medium text-blue-600 dark:text-blue-400 truncate">
                              {module.titre}
                            </p>
                            {module.classe?.nom && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {module.classe.nom} - {module.classe.niveau}
                              </span>
                            )}
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                {module.description}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                              <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                              {module.classe.etudiantIds?.length || 0} étudiants
                            </div>
                          </div>
                        </div>
                        <div className="ml-6 flex-shrink-0 flex items-center space-x-4">
                          <button className="p-1 rounded-full text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() =>
                              navigate(
                                `/professor/modules/${module.id}/attendance`
                              )
                            }
                            className="p-1 rounded-full text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <FileText className="h-5 w-5" />
                          </button>
                          <button className="p-1 rounded-full text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <Users className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() =>
                              navigate(
                                `/professor/modules/${module.id}/attendance-history`
                              )
                            }
                            className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Aucun module trouvé
                    </p>
                  </div>
                )}
              </ul>

              {/* Pagination */}
              {modules.length > 0 && (
                <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(0, currentPage - 1))
                      }
                      disabled={currentPage === 0}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                        currentPage === 0
                          ? "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800"
                          : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      Précédent
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage(
                          Math.min(totalPages - 1, currentPage + 1)
                        )
                      }
                      disabled={currentPage === totalPages - 1}
                      className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                        currentPage === totalPages - 1
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
                        <span className="font-medium">
                          {currentPage * pageSize + 1}
                        </span>{" "}
                        à{" "}
                        <span className="font-medium">
                          {Math.min(
                            (currentPage + 1) * pageSize,
                            modules.length
                          )}
                        </span>{" "}
                        sur{" "}
                        <span className="font-medium">{modules.length}</span>{" "}
                        modules
                      </p>
                    </div>
                    <div>
                      <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                      >
                        <button
                          onClick={() =>
                            setCurrentPage(Math.max(0, currentPage - 1))
                          }
                          disabled={currentPage === 0}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                            currentPage === 0
                              ? "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800"
                              : "text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          <span className="sr-only">Précédent</span>
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                              currentPage === i
                                ? "z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-600 text-blue-600 dark:text-blue-200"
                                : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages - 1, currentPage + 1)
                            )
                          }
                          disabled={currentPage === totalPages - 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                            currentPage === totalPages - 1
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
              )}
            </div>
          )}
        </div>
      </div>
    </ProfessorLayout>
  );
}

export default ProfessorModulesPage;
