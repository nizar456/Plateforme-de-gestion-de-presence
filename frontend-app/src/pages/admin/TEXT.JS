"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { studentService, adminUserService } from "../../services/api";
import { Eye, EyeOff } from "lucide-react";
import AddStudentModal from "../../components/student/AddStudentModal"; // Import the standalone modal component
import EditStudentModal from "../../components/student/EditStudentModal";
import ChangePasswordModal from "../../components/student/ChangePasswordModal";

function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const studentsPerPage = 5;

  // ✅ Déplace fetchStudents ici pour le rendre accessible partout
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await studentService.getAllStudents();
      setAllStudents(response);
      setError(null);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Une erreur est survenue lors du chargement des étudiants.");
      setAllStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Appelle-le dans useEffect pour le chargement initial
  useEffect(() => {
    fetchStudents();
  }, []);

  // Apply filtering, sorting and pagination
  useEffect(() => {
    if (allStudents.length === 0) return;

    let filteredStudents = [...allStudents];

    // Apply search filter
    if (searchTerm) {
      filteredStudents = filteredStudents.filter(
        (student) =>
          student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.id?.toString().includes(searchTerm)
      );
    }

    // Apply sorting
    filteredStudents.sort((a, b) => {
      // Handle null/undefined values
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

    // Calculate pagination
    const totalItems = filteredStudents.length;
    const totalPages = Math.ceil(totalItems / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const paginatedStudents = filteredStudents.slice(
      startIndex,
      startIndex + studentsPerPage
    );

    setStudents(paginatedStudents);
    setTotalPages(totalPages);
    setTotalStudents(totalItems);
  }, [allStudents, currentPage, sortConfig, searchTerm]);

  // Handle search with debounce
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

  // Handle sorting
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

  // Handle student selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map((student) => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (e, studentId) => {
    if (e.target.checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    }
  };

  // Handle student deletion
  const handleDeleteStudent = async (id) => {
    try {
      // Using the studentService from api.js
      await studentService.deleteStudent(id);

      // Update the local state
      const updatedStudents = allStudents.filter(
        (student) => student.id !== id
      );
      setAllStudents(updatedStudents);

      // Handle pagination if we deleted the last item on the page
      if (students.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      // Show success message
      setError(null); // Clear any previous errors
      // You could add a success notification here if you have one
      // e.g., setSuccessMessage("Étudiant supprimé avec succès");
    } catch (err) {
      console.error("Error deleting student:", {
        error: err,
        response: err.response?.data,
      });

      // Handle different error cases
      if (err.response?.status === 403) {
        setError("Accès refusé : Vous n'avez pas les permissions nécessaires.");
      } else if (err.response?.status === 404) {
        setError("L'étudiant n'a pas été trouvé.");
      } else {
        setError(
          "Une erreur est survenue lors de la suppression de l'étudiant."
        );
      }

      // Optionally: Reload the students list if the deletion failed
      try {
        const refreshedStudents = await studentService.getAllStudents();
        setAllStudents(refreshedStudents);
      } catch (refreshError) {
        console.error("Failed to refresh students list:", refreshError);
      }
    }
  };
  // Updated to handle the new modal component's form structure
  const handleAddStudent = async (studentData) => {
    setIsLoading(true);
    try {
      // Construct a student object that matches the expected format
      const formattedStudentData = {
        fullName: `${studentData.prenom} ${studentData.nom}`, // Combine nom and prenom into fullName
        email: `${studentData.prenom.toLowerCase()}.${studentData.nom.toLowerCase()}@example.com`, // Generate a placeholder email    // Default status
        ...studentData, // Keep the original data too (nom, prenom, role)
      };

      const newStudent = await studentService.addStudent(formattedStudentData);
      setAllStudents([...allStudents, newStudent]);
      handleCloseModal();
    } catch (err) {
      console.error("Error adding student:", err);
      setError("Une erreur est survenue lors de l'ajout de l'étudiant.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditStudent = async (id) => {
    try {
      const student = await studentService.getById(id);
      setSelectedStudent(student);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'étudiant :", error);
    }
  };

  const handleUpdateStudent = async (updatedData) => {
    try {
      await studentService.update(selectedStudent.id, updatedData);
      await fetchStudents(); // ✅ fonctionne maintenant
      setIsEditModalOpen(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handlePasswordChange = async (studentId, newPassword) => {
    try {
      setPasswordLoading(true);
      await adminUserService.adminChangePassword(studentId, newPassword);
      await fetchStudents(); // Refresh the student list
      return true;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    } finally {
      setPasswordLoading(false);
    }
  };
  const refreshStudents = async () => {
    try {
      const response = await studentService.getAllStudents();
      setAllStudents(response);
    } catch (err) {
      console.error("Error refreshing students:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestion des Étudiants
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Une liste de tous les étudiants inscrits à l'université
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleOpenModal}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un étudiant
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
              placeholder="Rechercher un étudiant..."
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

        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 px-4 py-3 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Tableau des étudiants */
          <motion.div
            className="bg-white dark:bg-gray-800 shadow-md rounded-2xl mb-6 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                <thead className="bg-gray-100 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 w-12 text-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={
                          selectedStudents.length === students.length &&
                          students.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th
                      className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap"
                      onClick={() => requestSort("nom")}
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
                      className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap"
                      onClick={() => requestSort("prenom")}
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
                      className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap"
                      onClick={() => requestSort("email")}
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
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("username")}
                    >
                      <div className="flex items-center">
                        Username
                        {sortConfig.key === "username" && (
                          <span className="ml-1">
                            {sortConfig.direction === "ascending" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap">
                      Mot de passe
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  {students.length > 0 ? (
                    students.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedStudents.includes(student.id)}
                            onChange={(e) => handleSelectStudent(e, student.id)}
                          />
                        </td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white whitespace-nowrap">
                          {student.nom}
                        </td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white whitespace-nowrap">
                          {student.prenom}
                        </td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap max-w-xs truncate">
                          {student.email || "Non spécifié"}
                        </td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap max-w-xs truncate">
                          {student.username || "Non spécifié"}
                        </td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap flex items-center space-x-2">
                          <span>
                            {visiblePasswords[student.id]
                              ? student.decryptedPassword
                              : "•".repeat(
                                  student.decryptedPassword?.length || 8
                                )}
                          </span>
                          {student.decryptedPassword && (
                            <button
                              onClick={() =>
                                togglePasswordVisibility(student.id)
                              }
                              className="focus:outline-none"
                            >
                              {visiblePasswords[student.id] ? (
                                <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              )}
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <div className="flex justify-end space-x-2">
                            <button
                              className="text-green-600 hover:text-green-900 p-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedStudentId(student.id);
                                setIsPasswordModalOpen(true);
                              }}
                              title="Change Password"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                            </button>
                            <button
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                              onClick={() => handleEditStudent(student.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        {allStudents.length === 0
                          ? "Aucun étudiant disponible"
                          : "Aucun étudiant trouvé avec ces critères"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && totalStudents > 0 && (
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
                  <span className="font-medium">
                    {(currentPage - 1) * studentsPerPage + 1}
                  </span>{" "}
                  à{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * studentsPerPage, totalStudents)}
                  </span>{" "}
                  sur <span className="font-medium">{totalStudents}</span>{" "}
                  étudiants
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
        )}

        {/* Using the standalone AddStudentModal component instead */}
        <AddStudentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddStudent}
          isLoading={isLoading}
          initialForm={{ nom: "", prenom: "" }}
        />
        <EditStudentModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateStudent}
          isLoading={false} // tu peux le gérer si tu veux spinner
          student={selectedStudent}
        />
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          studentId={selectedStudentId}
          isLoading={passwordLoading}
          setIsLoading={setPasswordLoading}
          onSuccess={refreshStudents} // Pass the refresh function
        />
      </div>
    </AdminLayout>
  );
}

export default StudentsPage;
