"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeTerms: false,
  })

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Académique", href: "/academique" },
    { name: "Vie Étudiante", href: "/vie-etudiante" },
    { name: "Admissions", href: "/admissions" },
    { name: "À Propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Ici vous ajouteriez la logique d'inscription
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Vérification de la force du mot de passe
  const passwordStrength = () => {
    const { password } = formData
    if (!password) return { strength: 0, text: "" }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    let text = ""
    if (strength === 1) text = "Faible"
    else if (strength === 2) text = "Moyen"
    else if (strength === 3) text = "Bon"
    else if (strength === 4) text = "Fort"

    return { strength, text }
  }

  const { strength, text } = passwordStrength()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar links={navLinks} />

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Créer un compte</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Rejoignez notre communauté universitaire</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Prénom
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Jean"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Nom
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="jean.dupont@exemple.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-gray-600 dark:text-gray-400">Force du mot de passe: {text}</p>
                        <p
                          className="text-xs font-medium"
                          style={{ color: strength >= 3 ? "#10B981" : strength === 2 ? "#F59E0B" : "#EF4444" }}
                        >
                          {strength >= 3 ? "Sécurisé" : "Non sécurisé"}
                        </p>
                      </div>
                      <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${(strength / 4) * 100}%`,
                            backgroundColor: strength >= 3 ? "#10B981" : strength === 2 ? "#F59E0B" : "#EF4444",
                          }}
                        ></div>
                      </div>

                      <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
                        <li className="text-xs flex items-center">
                          <CheckCircle
                            className={`h-3 w-3 mr-1 ${formData.password.length >= 8 ? "text-green-500" : "text-gray-400"}`}
                          />
                          <span
                            className={
                              formData.password.length >= 8
                                ? "text-gray-700 dark:text-gray-300"
                                : "text-gray-500 dark:text-gray-500"
                            }
                          >
                            8 caractères minimum
                          </span>
                        </li>
                        <li className="text-xs flex items-center">
                          <CheckCircle
                            className={`h-3 w-3 mr-1 ${/[A-Z]/.test(formData.password) ? "text-green-500" : "text-gray-400"}`}
                          />
                          <span
                            className={
                              /[A-Z]/.test(formData.password)
                                ? "text-gray-700 dark:text-gray-300"
                                : "text-gray-500 dark:text-gray-500"
                            }
                          >
                            Une majuscule
                          </span>
                        </li>
                        <li className="text-xs flex items-center">
                          <CheckCircle
                            className={`h-3 w-3 mr-1 ${/[0-9]/.test(formData.password) ? "text-green-500" : "text-gray-400"}`}
                          />
                          <span
                            className={
                              /[0-9]/.test(formData.password)
                                ? "text-gray-700 dark:text-gray-300"
                                : "text-gray-500 dark:text-gray-500"
                            }
                          >
                            Un chiffre
                          </span>
                        </li>
                        <li className="text-xs flex items-center">
                          <CheckCircle
                            className={`h-3 w-3 mr-1 ${/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500" : "text-gray-400"}`}
                          />
                          <span
                            className={
                              /[^A-Za-z0-9]/.test(formData.password)
                                ? "text-gray-700 dark:text-gray-300"
                                : "text-gray-500 dark:text-gray-500"
                            }
                          >
                            Un caractère spécial
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    J'accepte les{" "}
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                      conditions d'utilisation
                    </a>{" "}
                    et la{" "}
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                      politique de confidentialité
                    </a>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Créer un compte
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                      Ou s'inscrire avec
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="px-8 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                Vous avez déjà un compte ?{" "}
                <Link
                  to="/connexion"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 inline-flex items-center"
                >
                  Se connecter <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer links={navLinks} />
    </div>
  )
}

export default SignUpPage

