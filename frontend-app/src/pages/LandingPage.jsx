"use client"

import { useRef } from "react"
import Navbar from "../components/layout/Navbar"
import Hero from "../components/sections/Hero"
import AcademicPrograms from "../components/sections/AcademicPrograms"
import CampusLife from "../components/sections/CampusLife"
import Admissions from "../components/sections/Admissions"
import About from "../components/sections/About"
import Contact from "../components/sections/Contact"
import Footer from "../components/layout/Footer"

export default function LandingPage() {
  const mainRef = useRef(null)

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Académique", href: "/academique" },
    { name: "Vie Étudiante", href: "/vie-etudiante" },
    { name: "Admissions", href: "/admissions" },
    { name: "À Propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar links={navLinks} />
      <Hero />

      <main ref={mainRef}>
        <AcademicPrograms />
        <CampusLife />
        <Admissions />
        <About />
        <Contact />
      </main>

      <Footer links={navLinks} />
    </div>
  )
}

