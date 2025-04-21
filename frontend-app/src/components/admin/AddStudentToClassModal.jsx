"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { classeService } from "../../services/api";

const AddStudentToClassModal = ({ isOpen, onClose, classId, onStudentAdded }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && classId) {
      classeService.getEtudiantsSansClasse(classId).then(setStudents);
    }
  }, [isOpen, classId]);

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      for (const studentId of selectedStudents) {
        // Send the classId and studentId as data in the POST request
        await classeService.affecterEtudiant(classId, studentId);
      }
      onStudentAdded(); // Call the callback to refresh the classes table
      onClose();
    } catch (err) {
      console.error("Erreur lors de l'affectation :", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(4px)" }}
    >
      <motion.div
        className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl max-w-lg w-full p-6 dark:bg-gray-800/95 relative"
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Ajouter des étudiants à la classe
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {students.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-300">Aucun étudiant sans classe trouvé.</p>
        ) : (
          <form className="space-y-3">
            <div className="max-h-60 overflow-y-auto space-y-2">
              {students.map((student) => (
                <label key={student.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleCheckboxChange(student.id)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {student.nomComplet} {student.email ? `- ${student.email}` : ''}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                disabled={isLoading || selectedStudents.length === 0}
              >
                {isLoading ? "Ajout..." : "Ajouter à la classe"}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default AddStudentToClassModal;
