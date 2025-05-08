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
import ChangePasswordPage from "./pages/ChangePasswordPage"
import UnauthorizedPage from "./pages/UnauthorizedPage"

// Admin pages
import DashboardPage from "./pages/admin/DashboardPage"
import StudentsPage from "./pages/admin/StudentsPage"
import ClassesPage from "./pages/admin/ClassesPage"
import SettingsPage from "./pages/admin/SettingsPage"
import AdminsPage from "./pages/admin/AdminsPage"
import ProfessorsPage from "./pages/admin/ProfessorsPage"
import ModulePage from "./pages/admin/ModulePage"

// Professor pages (placeholders - you'll need to create these)
import ProfessorDashboardPage from "./pages/professor/ProfessorDashboardPage"
import ProfessorModulesPage from "./pages/professor/ProfessorModulesPage";
import ProfessorAttendancePage from './pages/professor/ProfessorAttendancePage'
import ProfessorStudentsPage from "./pages/professor/ProfessorStudentsPage"
import ProfessorAttendanceDetails from "./pages/professor/ProfessorAttendanceDetails"
import ProfessorAttendanceHistoryPage from "./pages/professor/ProfessorAttendanceHistoryPage"

// Student pages (placeholders - you'll need to create these)
import StudentDashboardPage from "./pages/student/StudentDashboardPage"
import StudentMesAbsencesPage from "./pages/student/StudentMesAbsencesPage"
// import StudentGradesPage from "./pages/student/StudentGradesPage"

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
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

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
          path="/admin/classes"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <ClassesPage />
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
        <Route
          path="/admin/module"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <ModulePage />
            </ProtectedRoute>
          }
        />

        {/* Routes pour les professeurs */}
        <Route
          path="/professor/dashboard"
          element={
            <ProtectedRoute requiredRole="PROFESSOR">
              <ProfessorDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor/modules"
          element={
            <ProtectedRoute requiredRole="PROFESSOR">
              <ProfessorModulesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor/modules/:moduleId/attendance"
          element={
            <ProtectedRoute requiredRole="PROFESSOR">
              <ProfessorAttendancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor/attendance/:moduleId/:attendanceId/details"
          element={
            <ProtectedRoute requiredRole="PROFESSOR">
              <ProfessorAttendanceDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor/modules/:moduleId/attendance/:attendanceId/edit"
          element={
            <ProtectedRoute requiredRole="PROFESSOR">
              <ProfessorAttendancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor/modules/:moduleId/attendance-history"
          element={
            <ProtectedRoute requiredRole="PROFESSOR">
              <ProfessorAttendanceHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor/students"
          element={
            <ProtectedRoute requiredRole="PROFESSOR">
              <ProfessorStudentsPage />
            </ProtectedRoute>
          }
        />
        {/* Add more professor routes as needed */}

        {/* Routes pour les étudiants */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute requiredRole="STUDENT">
              <StudentDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/abscences"
          element={
            <ProtectedRoute requiredRole="STUDENT">
              <StudentMesAbsencesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App

