"use client"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";

function MobileNav({ links, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handlePostulerClick = () => {
    navigate("/connexion")
    onClose()
  }

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-white dark:bg-gray-950 pt-16 px-4 pb-4 overflow-y-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`text-lg font-medium py-3 border-b border-gray-100 dark:border-gray-800 flex items-center transition-colors ${
              location.pathname === link.href ? "text-[rgb(0,73,150)]" : "text-gray-700 hover:text-[rgb(0,73,150)] dark:text-gray-300 dark:hover:text-[rgb(0,73,150)]"
            }`}
            onClick={onClose}
          >
            {link.name}
          </Link>
        ))}
        <button
          className="mt-6 w-full bg-[rgb(0,73,150)] hover:bg-[rgb(0,60,120)] text-white font-medium py-3 px-4 rounded-md transition-colors"
          onClick={handlePostulerClick}
        >
          Postuler
        </button>
      </nav>
    </motion.div>
  )
}

export default MobileNav
