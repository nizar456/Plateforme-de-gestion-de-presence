"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { classeService, professorService } from "../../services/api";

export default function AddModuleModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading,
  initialForm = { 
    titre: "", 
    description: "", 
    classeId: "", 
    professeurId: "" 
  }
}) {
  const [formData, setFormData] = useState(initialForm);
  const [classes, setClasses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchInitialData();
    }
  }, [isOpen]);

  const fetchInitialData = async () => {
    try {
      setIsLoadingData(true);
      const [classesData, professorsData] = await Promise.all([
        classeService.getAllClasses(),
        professorService.getAllProfessors()
      ]);
      setClasses(classesData);
      setProfessors(professorsData);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <motion.div 
        className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl max-w-md w-full p-6 dark:bg-gray-800/95 relative"
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Ajouter un nouveau module
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            type="button"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="module-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Titre
            </label>
            <input
              type="text"
              id="module-title"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              autoComplete="off"
              spellCheck="false"
              autoCorrect="off"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="module-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="module-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows={3}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="class-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Classe
            </label>
            {isLoadingData ? (
              <div className="animate-pulse h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            ) : (
              <select
                id="class-id"
                name="classeId"
                value={formData.classeId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              >
                <option value="">Sélectionner une classe</option>
                {classes.map((classe) => (
                  <option key={classe.id} value={classe.id}>
                    {classe.nom}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="professor-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Professeur
            </label>
            {isLoadingData ? (
              <div className="animate-pulse h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            ) : (
              <select
                id="professor-id"
                name="professeurId"
                value={formData.professeurId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              >
                <option value="">Sélectionner un professeur</option>
                {professors.map((professor) => (
                  <option key={professor.id} value={professor.id}>
                    {professor.prenom} {professor.nom}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading || isLoadingData}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enregistrement...
                </>
              ) : 'Enregistrer'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}