import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./hooks/useAuth"
import ProtectedRoute from "./components/auth/ProtectedRoute"

import LandingPage from "./pages/LandingPage"
import AcademicPage from "./pages/AcademicPage"
import CampusLifePage from "./pages/CampusLifePage"
import AdmissionsPage from "./pages/AdmissionsPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import DashboardPage from "./pages/admin/DashboardPage"
import StudentsPage from "./pages/admin/StudentsPage"
import CoursesPage from "./pages/admin/CoursesPage"
import SettingsPage from "./pages/admin/SettingsPage"
import AdminsPage from "./pages/admin/AdminsPage"
import ProfessorsPage from "./pages/admin/ProfessorsPage"


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/academique" element={<AcademicPage />} />
        <Route path="/vie-etudiante" element={<CampusLifePage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/inscription" element={<SignUpPage />} />
        {/* <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}

        {/* Routes d'administration */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <StudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <CoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/admins"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/professors"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <ProfessorsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App

