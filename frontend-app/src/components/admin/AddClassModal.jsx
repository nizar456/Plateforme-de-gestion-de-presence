"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const AddClassModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading,
  initialForm = { nom: "", niveau: "PREMIERE_ANNEE" }
}) => {
  const [form, setForm] = useState(initialForm);
  
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

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
            Ajouter une nouvelle classe
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
            <label htmlFor="class-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom de la classe
            </label>
            <input
              type="text"
              id="class-name"
              name="nom"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={form.nom}
              onChange={handleChange}
              autoComplete="off"
              spellCheck="false"
              autoCorrect="off"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="class-level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Niveau de la classe
            </label>
            <select
              id="class-level"
              name="niveau"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={form.niveau}
              onChange={handleChange}
              required
            >
              <option value="PREMIERE_ANNEE">Première Année</option>
              <option value="DEUXIEME_ANNEE">Deuxième Année</option>
              <option value="TROISIEME_ANNEE">Troisième Année</option>
              <option value="QUATRIEME_ANNEE">Quatrième Année</option>
              <option value="CINQUIEME_ANNEE">Cinquième Année</option>
            </select>
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
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création...
                </>
              ) : 'Créer la classe'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddClassModal;