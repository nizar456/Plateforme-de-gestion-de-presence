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
import { adminService } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import EditAdminModal from "../../components/admin/EditAdminModal";
import AddAdminModal from "../../components/admin/AddAdminModal"; // Import the AddAdminModal

function AdminsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [admins, setAdmins] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for AddAdminModal
  const [isLoading, setIsLoading] = useState(false);

  const adminsPerPage = 5;

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllAdmins();
      setAllAdmins(response);
      setError(null);
    } catch (err) {
      console.error("Error fetching admins:", err);
      if (err.response?.status === 403) {
        if (!localStorage.getItem("token")) {
          setError("You are not logged in. Redirecting to login page...");
          setTimeout(() => navigate("/connexion"), 2000);
        } else {
          setError("Access denied: You don't have the required permissions.");
        }
      } else {
        setError("An error occurred while loading admins.");
      }
      setAllAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [navigate]);

  useEffect(() => {
    if (allAdmins.length === 0) return;

    let filteredAdmins = [...allAdmins];

    if (searchTerm) {
      filteredAdmins = filteredAdmins.filter(
        (admin) =>
          admin.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filteredAdmins.sort((a, b) => {
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

    const totalItems = filteredAdmins.length;
    const totalPages = Math.ceil(totalItems / adminsPerPage);
    const startIndex = (currentPage - 1) * adminsPerPage;
    const paginatedAdmins = filteredAdmins.slice(
      startIndex,
      startIndex + adminsPerPage
    );

    setAdmins(paginatedAdmins);
    setTotalPages(totalPages);
    setTotalAdmins(totalItems);
  }, [allAdmins, currentPage, sortConfig, searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAdmins(admins.map((admin) => admin.id));
    } else {
      setSelectedAdmins([]);
    }
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAdmin = (e, adminId) => {
    if (e.target.checked) {
      setSelectedAdmins([...selectedAdmins, adminId]);
    } else {
      setSelectedAdmins(selectedAdmins.filter((id) => id !== adminId));
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        await adminService.deleteAdmin(id);
        const updatedAdmins = allAdmins.filter((admin) => admin.id !== id);
        setAllAdmins(updatedAdmins);
        if (admins.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (err) {
        console.error("Error deleting admin:", err);
        setError(
          err.response?.status === 403
            ? "Access denied: You don't have the required permissions."
            : "An error occurred while deleting the admin."
        );
      }
    }
  };

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleUpdate = async (updatedAdmin) => {
    if (!selectedAdmin) return;
    setIsLoading(true);
    try {
      const response = await adminService.updateAdmin(
        selectedAdmin.id,
        updatedAdmin
      );
      const updatedAdmins = allAdmins.map((admin) =>
        admin.id === selectedAdmin.id ? { ...admin, ...updatedAdmin } : admin
      );
      setAllAdmins(updatedAdmins);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update admin:", error);
      setError("Failed to update admin. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAdmin = async (newAdmin) => {
    setIsLoading(true);
    try {
      const response = await adminService.createAdmin(newAdmin);
      // Refresh the admin list
      await fetchAdmins();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to add admin:", error);
      setError("Failed to add admin. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Administrators Management
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              A list of all university administrators
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleAddClick}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Administrator
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
          /* Admins table */
          <motion.div
            className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={
                          selectedAdmins.length === admins.length &&
                          admins.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Prénom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Mot de passe
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {admins.length > 0 ? (
                    admins.map((admin) => (
                      <tr
                        key={admin.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedAdmins.includes(admin.id)}
                            onChange={(e) => handleSelectAdmin(e, admin.id)}
                          />
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-white">
                          {admin.nom || "Non spécifié"}
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-white">
                          {admin.prenom || "Non spécifié"}
                        </td>
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                          {admin.email || "Non spécifié"}
                        </td>
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                          {admin.username || "Non spécifié"}
                        </td>
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                          <span>
                            {visiblePasswords[admin.id]
                              ? admin.decryptedPassword
                              : "•".repeat(
                                  admin.decryptedPassword?.length || 8
                                )}
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(admin.id)}
                            className="focus:outline-none"
                          >
                            {visiblePasswords[admin.id] ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEditClick(admin)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAdmin(admin.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
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
                        {allAdmins.length === 0
                          ? "Aucun administrateur disponible"
                          : "Aucun administrateur trouvé avec ces critères"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && totalAdmins > 0 && (
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
                Previous
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
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * adminsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * adminsPerPage, totalAdmins)}
                  </span>{" "}
                  of <span className="font-medium">{totalAdmins}</span>{" "}
                  administrators
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
                    <span className="sr-only">Previous</span>
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
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
        <EditAdminModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdate}
          isLoading={isLoading}
          admin={selectedAdmin}
        />
        {/* Add Admin Modal */}
        <AddAdminModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddAdmin}
          isLoading={isLoading}
        />
      </div>
    </AdminLayout>
  );
}

export default AdminsPage;
