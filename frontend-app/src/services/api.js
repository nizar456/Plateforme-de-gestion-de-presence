import axios from "axios";

const API_BASE_URL = "http://localhost:8082/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/connexion";
    }
    return Promise.reject(error);
  }
);

const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            role: response.data.role,
            fullName: response.data.fullName,
            requiresPasswordChange: response.data.requiresPasswordChange,
          })
        );
      }
      return response.data;
    } catch (error) {
      if (
        error.response?.status === 403 &&
        error.response.data.status === "PASSWORD_CHANGE_REQUIRED"
      ) {
        localStorage.setItem("tempToken", error.response.data.tempToken);
        return {
          status: "PASSWORD_CHANGE_REQUIRED",
          message: error.response.data.message,
          tempToken: error.response.data.tempToken,
        };
      }
      throw error;
    }
  },

  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const originalToken = localStorage.getItem("token");
    const tempToken = localStorage.getItem("tempToken");

    if (!originalToken && !tempToken) {
      throw new Error("No authentication token found");
    }

    try {
      if (tempToken) {
        localStorage.setItem("token", tempToken);
      }

      const response = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (tempToken) {
        localStorage.removeItem("tempToken");
        originalToken
          ? localStorage.setItem("token", originalToken)
          : localStorage.removeItem("token");
      }

      return {
        success: true,
        message: response.data.message || "Password changed successfully",
      };
    } catch (error) {
      if (tempToken) {
        localStorage.removeItem("tempToken");
        originalToken
          ? localStorage.setItem("token", originalToken)
          : localStorage.removeItem("token");
      }
      throw error;
    }
  },

  logout: async () => {
    try {
      // Call the backend logout endpoint
      await api.post("/auth/logout");
      
      // Clear local storage regardless of backend response
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tempToken");
      
      return { success: true, message: "Logged out successfully" };
    } catch (error) {
      // Even if the backend logout fails, clear client-side tokens
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tempToken");
      
      console.error("Logout error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Logout completed client-side but server logout failed" 
      };
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => !!localStorage.getItem("token"),

  getToken: () => localStorage.getItem("token"),

  hasRole: (requiredRole) => {
    const user = authService.getCurrentUser();
    return user?.role === requiredRole;
  },
};
// ... (keep all the imports and axios configuration above the same)

const adminUserService = {
  // General user endpoints
  getAllUsers: async () => (await api.get("/admin/users")).data,
  getUserById: async (id) => (await api.get(`/admin/users/${id}`)).data,
  createUser: async (userData) => (await api.post("/admin/users", userData)).data,
  updateUser: async (id, userData) => (await api.put(`/admin/users/${id}`, userData)).data,
  deleteUser: async (id) => (await api.delete(`/admin/users/${id}`)).data,
  adminChangePassword: async (id, newPassword) => 
    (await api.put(`/admin/users/${id}/change-password`, { newPassword })).data,
  
  // Role-specific endpoints
  createUserByRole: async (role, userData) => 
    (await api.post(`/admin/${role}`, userData)).data,
  getUsersByRole: async (role) => 
    (await api.get(`/admin/${role}`)).data,
};

// Student Service with both old and new method names
const studentService = {
  getAll: async () => adminUserService.getUsersByRole("student"),
  getById: async (id) => adminUserService.getUserById(id),
  create: async (studentData) => adminUserService.createUserByRole("student", studentData),
  update: async (id, studentData) => adminUserService.updateUser(id, studentData),
  changePassword: async (id, newPassword) => adminUserService.adminChangePassword(id, newPassword),

  // Old method names
  getAllStudents: async () => adminUserService.getUsersByRole("student"),
  getStudentById: async (id) => adminUserService.getUserById(id),
  createStudent: async (studentData) => adminUserService.createUserByRole("student", studentData),
  updateStudent: async (id, studentData) => adminUserService.updateUser(id, studentData),
  deleteStudent: async (id) => adminUserService.deleteUser(id),

  // Alias for compatibility
  addStudent: async (studentData) => adminUserService.createUserByRole("student", studentData),
};


// Professor Service with both old and new method names
const professorService = {
  // New method names
  getAll: async () => adminUserService.getUsersByRole("professor"),
  getById: async (id) => adminUserService.getUserById(id),
  create: async (professorData) => adminUserService.createUserByRole("professor", professorData),
  update: async (id, professorData) => adminUserService.updateUser(id, professorData),
  changePassword: async (id, newPassword) => adminUserService.adminChangePassword(id, newPassword),
  
  // Old method names (for backward compatibility)
  getAllProfessors: async () => adminUserService.getUsersByRole("professor"),
  getProfessorById: async (id) => adminUserService.getUserById(id),
  createProfessor: async (professorData) => adminUserService.createUserByRole("professor", professorData),
  updateProfessor: async (id, professorData) => adminUserService.updateUser(id, professorData),
  deleteProfessor: async (id) => adminUserService.deleteUser(id),
};

// Admin Service with both old and new method names
const adminService = {
  // New method names
  getAll: async () => adminUserService.getUsersByRole("admin"),
  getById: async (id) => adminUserService.getUserById(id),
  create: async (adminData) => adminUserService.createUserByRole("admin", adminData),
  update: async (id, adminData) => adminUserService.updateUser(id, adminData),
  changePassword: async (id, newPassword) => adminUserService.adminChangePassword(id, newPassword),
  
  // Old method names (for backward compatibility)
  getAllAdmins: async () => adminUserService.getUsersByRole("admin"),
  getAdminById: async (id) => adminUserService.getUserById(id),
  createAdmin: async (adminData) => adminUserService.createUserByRole("admin", adminData),
  updateAdmin: async (id, adminData) => adminUserService.updateUser(id, adminData),
  deleteAdmin: async (id) => adminUserService.deleteUser(id),
};

// Classe Service (keeping original method names)
const classeService = {
  getAllClasses: async () => (await api.get("/admin/classes")).data,
  getClasseById: async (id) => (await api.get(`/admin/classes/${id}`)).data,
  createClasse: async (classeData) => (await api.post("/admin/classes", classeData)).data,
  updateClasse: async (id, classeData) => (await api.put(`/admin/classes/${id}`, classeData)).data,
  deleteClasse: async (id) => (await api.delete(`/admin/classes/${id}`)).data,
  affecterEtudiant: async (data) => (await api.post(`/admin/classes/affecter-etudiant`, data)).data,
};

// Dashboard Service (keeping original method names)
const dashboardService = {
  getStatistics: async () => (await api.get("/dashboard/statistics")).data,
  getRecentActivities: async () => (await api.get("/dashboard/activities")).data,
  getUpcomingEvents: async () => (await api.get("/dashboard/events")).data,
};


const moduleService = {
  // Admin Module Functions
  getAllModules: async () => {
    try {
      const response = await api.get("/admin/modules");
      return response.data;
    } catch (error) {
      console.error('Error fetching modules:', error);
      throw error;
    }
  },

  createModule: async (request) => {
    try {
      const response = await api.post("/admin/create-module", request);
      return response.data;
    } catch (error) {
      console.error('Error creating module:', error);
      throw error;
    }
  },

  getModuleCreationData: async () => {
    try {
      const response = await api.get("/admin/create-module");
      return response.data;
    } catch (error) {
      console.error('Error getting module creation data:', error);
      throw error;
    }
  },

  getModuleById: async (id) => {
    try {
      const response = await api.get(`/admin/modules/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching module by ID:', error);
      throw error;
    }
  },

  updateModule: async (id, request) => {
    try {
      const response = await api.put(`/admin/modules/${id}/edit-data`, request);
      return response.data;
    } catch (error) {
      console.error('Error updating module:', error);
      throw error;
    }
  },

  getModuleEditData: async (id) => {
    try {
      const response = await api.get(`/admin/modules/${id}/edit-data`);
      return response.data;
    } catch (error) {
      console.error('Error getting module edit data:', error);
      throw error;
    }
  },

  deleteModule: async (id) => {
    try {
      const response = await api.delete(`/admin/modules/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting module:', error);
      throw error;
    }
  },

  // Professor Module Functions
  getModulesEnseignes: async () => {
    try {
      const response = await api.get("/professor/modules");
      return response.data;
    } catch (error) {
      console.error('Error fetching professor modules:', error);
      throw error;
    }
  },

  getEtudiantsPourFeuille: async (moduleId) => {
    try {
      const response = await api.get(`/professor/modules/${moduleId}/feuille-presence`);
      return response.data;
    } catch (error) {
      console.error('Error getting students for attendance sheet:', error);
      throw error;
    }
  },

  creerFeuillePresence: async (moduleId, request) => {
    try {
      const response = await api.post(`/professor/modules/${moduleId}/feuille-presence`, request);
      return response.data;
    } catch (error) {
      console.error('Error creating attendance sheet:', error);
      throw error;
    }
  },

  getFeuillesPresenceParModule: async (moduleId) => {
    try {
      const response = await api.get(`/professor/modules/${moduleId}/feuilles-presence`);
      return response.data;
    } catch (error) {
      console.error('Error getting attendance sheets by module:', error);
      throw error;
    }
  },

  getDetailsFeuillePresence: async (id) => {
    try {
      const response = await api.get(`/professor/modules/feuilles-presence/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting attendance sheet details:', error);
      throw error;
    }
  },

  modifierFeuillePresence: async (moduleId, id, request) => {
    try {
      const response = await api.put(`/professor/modules/${moduleId}/feuilles-presence/${id}`, request);
      return response.data;
    } catch (error) {
      console.error('Error updating attendance sheet:', error);
      throw error;
    }
  },

  supprimerFeuillePresence: async (moduleId, id) => {
    try {
      const response = await api.delete(`/professor/modules/${moduleId}/feuilles-presence/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting attendance sheet:', error);
      throw error;
    }
  },

  getJustificationsEnAttente: async (moduleId, id) => {
    try {
      const response = await api.get(`/professor/modules/${moduleId}/feuilles-presence/${id}/justifications`);
      return response.data;
    } catch (error) {
      console.error('Error getting pending justifications:', error);
      throw error;
    }
  },

  updateStatutJustification: async (moduleId, id, absenceId, request) => {
    try {
      const response = await api.put(
        `/professor/modules/${moduleId}/feuilles-presence/${id}/justifications/${absenceId}/statut`,
        request
      );
      return response.data;
    } catch (error) {
      console.error('Error updating justification status:', error);
      throw error;
    }
  }
};

export {
  api,
  authService,
  adminUserService,
  studentService,
  professorService,
  adminService,
  classeService,
  dashboardService,
  moduleService,
};