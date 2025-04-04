import { Routes, Route } from "react-router-dom"
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/academique" element={<AcademicPage />} />
      <Route path="/vie-etudiante" element={<CampusLifePage />} />
      <Route path="/admissions" element={<AdmissionsPage />} />
      <Route path="/a-propos" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/connexion" element={<LoginPage />} />
      <Route path="/inscription" element={<SignUpPage />} />

      {/* Routes d'administration */}
      <Route path="/admin/dashboard" element={<DashboardPage />} />
      <Route path="/admin/students" element={<StudentsPage />} />
      <Route path="/admin/courses" element={<CoursesPage />} />
      <Route path="/admin/settings" element={<SettingsPage />} />
    </Routes>
  )
}

export default App

