import axios from "axios"

// Create axios instance with base URL
const API_BASE_URL = "http://localhost:8082/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for adding the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/connexion"
    }
    return Promise.reject(error)
  },
)

// Authentication Service
const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post("/auth/login", { username, password })
      if (response.data.token) {
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token)
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            role: response.data.role,
            fullName: response.data.fullName,
            requiresPasswordChange: response.data.requiresPasswordChange,
          }),
        )
      }
      return response.data
    } catch (error) {
      if (
        error.response &&
        error.response.status === 403 &&
        error.response.data.status === "PASSWORD_CHANGE_REQUIRED"
      ) {
        // Handle password change required
        localStorage.setItem("tempToken", error.response.data.tempToken)
        return {
          status: "PASSWORD_CHANGE_REQUIRED",
          message: error.response.data.message,
          tempToken: error.response.data.tempToken,
        }
      }
      throw error
    }
  },

  register: async (userData) => {
    const response = await api.post("/auth/register", userData)
    return response.data
  },

  changePassword: async (oldPassword, newPassword) => {
    const token = localStorage.getItem("token") || localStorage.getItem("tempToken")
    if (!token) {
      throw new Error("No authentication token found")
    }

    try {
      const response = await api.post(
        "/auth/change-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      // If this was a temp token, remove it and redirect to login
      if (localStorage.getItem("tempToken")) {
        localStorage.removeItem("tempToken")
        return { success: true, message: "Password changed successfully. Please login with your new password." }
      }

      return response.data
    } catch (error) {
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("tempToken")
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      return JSON.parse(userStr)
    }
    return null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token")
  },

  getToken: () => {
    return localStorage.getItem("token")
  },

  hasRole: (requiredRole) => {
    const user = authService.getCurrentUser()
    return user && user.role === requiredRole
  },
}

// User Service
const userService = {
  getUserProfile: async () => {
    const response = await api.get("/users/profile")
    return response.data
  },

  updateUserProfile: async (userData) => {
    const response = await api.put("/users/profile", userData)
    return response.data
  },

  getAllUsers: async (page = 0, size = 10, sort = "id,asc", search = "") => {
    const response = await api.get("/users", {
      params: { page, size, sort, search },
    })
    return response.data
  },

  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  createUser: async (userData) => {
    const response = await api.post("/users", userData)
    return response.data
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },
}

// Student Service
const studentService = {
  getAllStudents: async (page = 0, size = 10, sort = "id,asc", search = "") => {
    const response = await api.get("/students", {
      params: { page, size, sort, search },
    })
    return response.data
  },

  getStudentById: async (id) => {
    const response = await api.get(`/students/${id}`)
    return response.data
  },

  createStudent: async (studentData) => {
    const response = await api.post("/students", studentData)
    return response.data
  },

  updateStudent: async (id, studentData) => {
    const response = await api.put(`/students/${id}`, studentData)
    return response.data
  },

  deleteStudent: async (id) => {
    const response = await api.delete(`/students/${id}`)
    return response.data
  },
}

// Professor Service
const professorService = {
  getAllProfessors: async (page = 0, size = 10, sort = "id,asc", search = "") => {
    const response = await api.get("/professors", {
      params: { page, size, sort, search },
    })
    return response.data
  },

  getProfessorById: async (id) => {
    const response = await api.get(`/professors/${id}`)
    return response.data
  },

  createProfessor: async (professorData) => {
    const response = await api.post("/professors", professorData)
    return response.data
  },

  updateProfessor: async (id, professorData) => {
    const response = await api.put(`/professors/${id}`, professorData)
    return response.data
  },

  deleteProfessor: async (id) => {
    const response = await api.delete(`/professors/${id}`)
    return response.data
  },
}

// Course Service
const courseService = {
  getAllCourses: async (page = 0, size = 10, sort = "id,asc", search = "") => {
    const response = await api.get("/courses", {
      params: { page, size, sort, search },
    })
    return response.data
  },

  getCourseById: async (id) => {
    const response = await api.get(`/courses/${id}`)
    return response.data
  },

  createCourse: async (courseData) => {
    const response = await api.post("/courses", courseData)
    return response.data
  },

  updateCourse: async (id, courseData) => {
    const response = await api.put(`/courses/${id}`, courseData)
    return response.data
  },

  deleteCourse: async (id) => {
    const response = await api.delete(`/courses/${id}`)
    return response.data
  },
}

// Dashboard Service
const dashboardService = {
  getStatistics: async () => {
    const response = await api.get("/dashboard/statistics")
    return response.data
  },

  getRecentActivities: async () => {
    const response = await api.get("/dashboard/activities")
    return response.data
  },

  getUpcomingEvents: async () => {
    const response = await api.get("/dashboard/events")
    return response.data
  },
}

export { api, authService, userService, studentService, professorService, courseService, dashboardService }

