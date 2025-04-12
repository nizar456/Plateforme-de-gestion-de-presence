import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Key,
  Eye,
  EyeOff
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { professorService } from "../../services/api";
import AddProfessorModal from "../../components/professor/AddProfessorModal";
import EditProfessorModal from "../../components/professor/EditProfessorModal";
import ChangePasswordModal from "../../components/student/ChangePasswordModal";

function ProfessorsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [professors, setProfessors] = useState([]);
  const [allProfessors, setAllProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProfessors, setTotalProfessors] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedProfessorId, setSelectedProfessorId] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const professorsPerPage = 5;

  const fetchProfessors = async () => {
    try {
      setLoading(true);
      const response = await professorService.getAllProfessors();
      setAllProfessors(response);
      setError(null);
    } catch (err) {
      console.error("Error fetching professors:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
  
      if (err.response?.status === 403) {
        if (!localStorage.getItem("token")) {
          setError("Vous n'êtes pas connecté. Redirection vers la page de connexion...");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError("Accès refusé: Vous n'avez pas les permissions nécessaires.");
        }
      } else {
        setError("Une erreur est survenue lors du chargement des professeurs.");
      }
      setAllProfessors([]);
    } finally {
      setLoading(false);
    }
  };
  const refreshProfessors = async () => {
    try {
      const response = await professorService.getAllProfessors();
      setAllStudents(response);
    } catch (err) {
      console.error("Error refreshing Professors:", err);
    }
  };
  
  useEffect(() => {
    fetchProfessors();
  }, [navigate]);

  useEffect(() => {
    if (allProfessors.length === 0) return;

    let filteredProfessors = [...allProfessors];

    if (searchTerm) {
      filteredProfessors = filteredProfessors.filter(
        (professor) =>
          professor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          professor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          professor.id?.toString().includes(searchTerm)
      );
    }

    filteredProfessors.sort((a, b) => {
      if (!a[sortConfig.key]) return 1;
      if (!b[sortConfig.key]) return -1;

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    const totalItems = filteredProfessors.length;
    const totalPages = Math.ceil(totalItems / professorsPerPage);
    const startIndex = (currentPage - 1) * professorsPerPage;
    const paginatedProfessors = filteredProfessors.slice(
      startIndex,
      startIndex + professorsPerPage
    );

    setProfessors(paginatedProfessors);
    setTotalPages(totalPages);
    setTotalProfessors(totalItems);
  }, [allProfessors, currentPage, sortConfig, searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProfessors(professors.map((professor) => professor.id));
    } else {
      setSelectedProfessors([]);
    }
  };

  const handleSelectProfessor = (e, professorId) => {
    if (e.target.checked) {
      setSelectedProfessors([...selectedProfessors, professorId]);
    } else {
      setSelectedProfessors(selectedProfessors.filter((id) => id !== professorId));
    }
  };

  const handleDeleteProfessor = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce professeur ?")) {
      try {
        await professorService.deleteProfessor(id);
        const updatedProfessors = allProfessors.filter(
          (professor) => professor.id !== id
        );
        setAllProfessors(updatedProfessors);

        if (professors.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (err) {
        console.error("Error deleting professor:", err);
        setError(
          err.response?.status === 403
            ? "Accès refusé: Vous n'avez pas les permissions nécessaires."
            : "Une erreur est survenue lors de la suppression du professeur."
        );
      }
    }
  };

  const handleAddProfessor = async (professorData) => {
    setIsLoading(true);
    try {
      const newProfessor = await professorService.createProfessor({
        ...professorData,
        status: "Actif",
      });
      setAllProfessors([...allProfessors, newProfessor]);
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to add professor: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProfessor = async (id) => {
    try {
      const professor = await professorService.getById(id);
      setEditingProfessor(professor);
      setEditModalOpen(true);
    } catch (error) {
      console.error("Erreur lors de la récupération du professeur :", error);
    }
  };

  const handleUpdateProfessor = async (formData) => {
    try {
      setEditLoading(true);
      await professorService.update(editingProfessor.id, formData);
      setEditModalOpen(false);
      setEditingProfessor(null);
      fetchProfessors();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    } finally {
      setEditLoading(false);
    }
  };

  const handlePasswordChange = async (professorId, newPassword) => {
    setPasswordLoading(true);
    try {
      await professorService.changeProfessorPassword(professorId, newPassword);
      await fetchProfessors();
      return true;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    } finally {
      setPasswordLoading(false);
    }
  };

  const openPasswordModal = (professorId) => {
    setSelectedProfessorId(professorId);
    setIsPasswordModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestion des Professeurs
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Une liste de tous les professeurs de l'université
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleOpenModal}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un professeur
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Rechercher un professeur..."
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

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 px-4 py-3 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            className="bg-white dark:bg-gray-800 shadow-md rounded-2xl mb-6 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 w-12 text-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={
                          selectedProfessors.length === professors.length &&
                          professors.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th
                      onClick={() => requestSort("nom")}
                      className="px-4 py-3 cursor-pointer text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        Nom
                        {sortConfig.key === "nom" && (
                          <span className="ml-1">
                            {sortConfig.direction === "ascending" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => requestSort("prenom")}
                      className="px-4 py-3 cursor-pointer text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        Prénom
                        {sortConfig.key === "prenom" && (
                          <span className="ml-1">
                            {sortConfig.direction === "ascending" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => requestSort("email")}
                      className="px-4 py-3 cursor-pointer text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        Email
                        {sortConfig.key === "email" && (
                          <span className="ml-1">
                            {sortConfig.direction === "ascending" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Mot de passe
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  {professors.length > 0 ? (
                    professors.map((professor) => (
                      <tr
                        key={professor.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-4 py-4 text-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedProfessors.includes(professor.id)}
                            onChange={(e) => handleSelectProfessor(e, professor.id)}
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {professor.nom || "Non spécifié"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {professor.prenom || "Non spécifié"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {professor.email || "Non spécifié"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {professor.username || "Non spécifié"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                          <span>
                            {visiblePasswords[professor.id]
                              ? professor.decryptedPassword
                              : "•".repeat(professor.decryptedPassword?.length || 8)}
                          </span>
                          {professor.decryptedPassword && (
                            <button
                              onClick={() => togglePasswordVisibility(professor.id)}
                              className="focus:outline-none"
                            >
                              {visiblePasswords[professor.id] ? (
                                <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              )}
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                              onClick={() => handleEditProfessor(professor.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1"
                              onClick={() => openPasswordModal(professor.id)}
                            >
                              <Key className="h-4 w-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1"
                              onClick={() => handleDeleteProfessor(professor.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        {allProfessors.length === 0
                          ? "Aucun professeur disponible"
                          : "Aucun professeur trouvé avec ces critères"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {!loading && totalProfessors > 0 && (
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
                  Affichage de{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * professorsPerPage + 1}
                  </span>{" "}
                  à{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * professorsPerPage, totalProfessors)}
                  </span>{" "}
                  sur <span className="font-medium">{totalProfessors}</span>{" "}
                  professeurs
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

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium ${
                          currentPage === page
                            ? "z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-600 text-blue-600 dark:text-blue-200"
                            : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

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
        )}

        <AddProfessorModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddProfessor}
          isLoading={isLoading}
          initialForm={{ nom: "", prenom: "" }}
        />
        
        <EditProfessorModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          professor={editingProfessor}
          onSubmit={handleUpdateProfessor}
          isLoading={editLoading}
        />
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          studentId={selectedProfessorId}
          isLoading={passwordLoading}
          setIsLoading={setPasswordLoading}
          onSuccess={refreshProfessors} // Pass the refresh function
        />
      </div>
    </AdminLayout>
  );
}

export default ProfessorsPage;