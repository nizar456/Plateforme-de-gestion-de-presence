"use client";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import MobileNav from "./MobileNav";
import ThemeToggle from "../ui/ThemeToggle";
import EnsaLogo from "../../assets/Ensa_logo.png";

function Navbar({ links }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handlePostulerClick = () => {
    navigate("/connexion");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={EnsaLogo} alt="Ensa Khouribga" className="h-15 w-30" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-[rgb(0,73,150)]"
                    : "text-gray-700 hover:text-[rgb(0,73,150)] dark:text-gray-300 dark:hover:text-[rgb(0,73,150)]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
            <button
              className="bg-[rgb(0,73,150)] hover:bg-[rgb(0,60,120)] text-white font-medium py-2 px-4 rounded-md transition-colors"
              onClick={handlePostulerClick}
            >
              Se Connecter
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="text-gray-700 dark:text-gray-300"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && <MobileNav links={links} onClose={toggleMobileMenu} />}
    </>
  );
}

export default Navbar;
