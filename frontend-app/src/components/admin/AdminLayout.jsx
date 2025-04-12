"use client";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Bell,
  Search,
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  BarChart2,
  HelpCircle,
  MessageSquare,
  GraduationCap,
  Moon,
  Sun,
  UserCog,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import EnsaLogo from "../../assets/Ensa_logo.png";
import { authService } from '../../services/api';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    {
      name: "Tableau de Bord",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Étudiants",
      href: "/admin/students",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Professeurs",
      href: "/admin/professors",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      name: "Administrateurs",
      href: "/admin/admins",
      icon: <UserCog className="h-5 w-5" />,
    },    
    {
      name: "Classes",
      href: "/admin/classes",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Modules",
      href: "/admin/module",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Calendrier",
      href: "/admin/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Documents",
      href: "/admin/documents",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Rapports",
      href: "/admin/reports",
      icon: <BarChart2 className="h-5 w-5" />,
    },
  ];

  const secondaryNavigation = [
    {
      name: "Paramètres",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "Aide",
      href: "/admin/help",
      icon: <HelpCircle className="h-5 w-5" />,
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Nouvelle inscription",
      description: "Un nouvel étudiant s'est inscrit",
      time: "Il y a 5 minutes",
    },
    {
      id: 2,
      title: "Mise à jour du système",
      description: "Le système sera mis à jour ce soir",
      time: "Il y a 1 heure",
    },
    {
      id: 3,
      title: "Nouveau message",
      description: "Vous avez reçu un nouveau message",
      time: "Il y a 3 heures",
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (userMenuOpen) setUserMenuOpen(false);
  };

  const handleLogout = async () => {
    const result = await authService.logout();
    if (result.success) {
      // Redirect to login page
      navigate('/connexion');
    } else {
      // Show error message but still redirect
      alert(result.message);
      navigate('/connexion');
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">
      {/* Sidebar pour mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={toggleSidebar}
            ></motion.div>

            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3 }}
              className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={toggleSidebar}
                >
                  <span className="sr-only">Fermer le menu</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <Link to="/admin/dashboard" className="flex items-center">
                    <img
                      src={EnsaLogo} // Remplace ça par le bon chemin de ton image
                      alt="Logo Université"
                      className="h-10 w-auto" // Ajuste la taille ici si besoin
                    />
                  </Link>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        location.pathname === item.href
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span
                        className={`mr-3 ${
                          location.pathname === item.href
                            ? "text-blue-500 dark:text-blue-400"
                            : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                        }`}
                      >
                        {item.icon}
                      </span>
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <svg
                          className="h-full w-full text-gray-300 dark:text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                        Jean Dupont
                      </p>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                        Administrateur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar pour desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-border bg-card text-card-foreground">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Link to="/admin/dashboard" className="flex items-center">
                  <img
                    src={EnsaLogo} // Remplace par le bon chemin si besoin
                    alt="Admin Université"
                    className="h-15 w-auto"
                  />
                </Link>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.href
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`mr-3 ${
                        location.pathname === item.href
                          ? "text-blue-500 dark:text-blue-400"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-5 px-2 space-y-1">
                <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Support
                </h3>
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.href
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`mr-3 ${
                        location.pathname === item.href
                          ? "text-blue-500 dark:text-blue-400"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <span className="inline-block h-9 w-9 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <svg
                        className="h-full w-full text-gray-300 dark:text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Jean Dupont
                    </p>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                      Administrateur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-card text-card-foreground shadow">
          <button
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <label htmlFor="search-field" className="sr-only">
                  Rechercher
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-0 focus:border-transparent sm:text-sm bg-transparent"
                    placeholder="Rechercher"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Bouton de thème */}
              <button
                onClick={toggleTheme}
                className="p-1 rounded-full text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {theme === "dark" ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </button>

              {/* Bouton de notifications */}
              <div className="ml-3 relative">
                <button
                  onClick={toggleNotifications}
                  className="p-1 rounded-full text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Voir les notifications</span>
                  <Bell className="h-6 w-6" />
                </button>
                {/* Indicateur de notification */}
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>

                {/* Dropdown des notifications */}
                {notificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.map((notification) => (
                        <a
                          key={notification.id}
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <span className="inline-block h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300 flex items-center justify-center">
                                <Bell className="h-4 w-4" />
                              </span>
                            </div>
                            <div className="ml-3 w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {notification.description}
                              </p>
                              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                      >
                        Voir toutes les notifications
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Menu utilisateur */}
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={toggleUserMenu}
                    className="max-w-xs bg-white dark:bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span className="sr-only">Ouvrir le menu utilisateur</span>
                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <svg
                        className="h-full w-full text-gray-300 dark:text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                  </button>
                </div>

                {/* Dropdown du menu utilisateur */}
                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                      to="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center">
                        <User className="mr-3 h-4 w-4 text-gray-400" />
                        <span>Votre Profil</span>
                      </div>
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center">
                        <Settings className="mr-3 h-4 w-4 text-gray-400" />
                        <span>Paramètres</span>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center">
                        <LogOut className="mr-3 h-4 w-4 text-gray-400" />
                        <span>Se déconnecter</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
