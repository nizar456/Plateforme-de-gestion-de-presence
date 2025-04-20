"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { classeService } from "../../services/api";

const ClassStudentsModal = ({ isOpen, onClose, classe }) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!isOpen || !classe?.id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const studentsData = await classeService.getEtudiantsParClasse(classe.id);
        
        // Handle different possible response formats
        const studentsList = Array.isArray(studentsData) 
          ? studentsData 
          : studentsData?.etudiants || [];
        
        setStudents(studentsList);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [isOpen, classe]);

  if (!isOpen || !classe) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50 backdrop-blur-sm">
      <motion.div
        className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl max-w-2xl w-full p-6 dark:bg-gray-800/95 relative"
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Étudiants de la classe: {classe.name}
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

        {error ? (
          <div className="p-3 bg-red-50 text-red-600 rounded-md dark:bg-red-900/30 dark:text-red-300">
            {error}
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : students.length > 0 ? (
          <div className="max-h-96 overflow-y-auto space-y-2">
            {students.map((student) => (
              <div
                key={student.id}
                className="p-3 border rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
              >
                {/* More robust property access with fallbacks */}
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {student.nomComplet}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {student.email || 'Email non disponible'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ID: {student.id || 'N/A'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300 p-3 bg-gray-100 rounded-md dark:bg-gray-700">
            Aucun étudiant inscrit dans cette classe.
          </p>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ClassStudentsModal;
