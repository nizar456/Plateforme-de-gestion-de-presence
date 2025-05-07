import React, { useState, useEffect } from "react";
import { authService, studentController } from "../../services/api";
import { format, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import StudentLayout from "../../components/student/StudentLayout";

const StudentMesAbsencesPage = () => {
  const [absences, setAbsences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState(null);
  const [justificationText, setJustificationText] = useState("");
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    refused: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchStudentAbsences = async () => {
      try {
        setLoading(true);
        const absencesData = await studentController.getMyAbsences();
        setAbsences(absencesData);

        // Calculate statistics
        const stats = {
          total: absencesData.length,
          accepted: absencesData.filter(
            (a) => a.justificationStatut === "ACCEPTEE"
          ).length,
          refused: absencesData.filter(
            (a) => a.justificationStatut === "REFUSEE"
          ).length,
          pending: absencesData.filter(
            (a) => a.justificationStatut === "EN_ATTENTE"
          ).length,
        };
        setStats(stats);
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement des absences");
        console.error("Error fetching absences:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentAbsences();
  }, []);

  const handleJustifyClick = (absence) => {
    setSelectedAbsence(absence);
    setJustificationText(absence.justificationText || "");
    setFile(null);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitJustification = async () => {
    try {
      const formData = new FormData();
      formData.append("justificationText", justificationText);
      if (file) {
        formData.append("file", file);
      }

      await studentController.addJustification(
        selectedAbsence.absenceId,
        formData
      );
      setSuccessMessage("Justification soumise avec succès!");
      setShowModal(false);

      // Refresh the absences list
      const updatedAbsences = await studentController.getMyAbsences();
      setAbsences(updatedAbsences);

      // Update stats
      const updatedStats = {
        total: updatedAbsences.length,
        accepted: updatedAbsences.filter(
          (a) => a.justificationStatut === "ACCEPTEE"
        ).length,
        refused: updatedAbsences.filter(
          (a) => a.justificationStatut === "REFUSEE"
        ).length,
        pending: updatedAbsences.filter(
          (a) => a.justificationStatut === "EN_ATTENTE"
        ).length,
      };
      setStats(updatedStats);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Erreur lors de la soumission de la justification");
      console.error("Error submitting justification:", err);
    }
  };

  const getStatusBadge = (status) => {
    let badgeClass = "";
    let text = "";

    switch (status) {
      case "ACCEPTEE":
        badgeClass = "bg-green-100 text-green-800";
        text = "Acceptée";
        break;
      case "REFUSEE":
        badgeClass = "bg-red-100 text-red-800";
        text = "Refusée";
        break;
      case "EN_ATTENTE":
        badgeClass = "bg-yellow-100 text-yellow-800";
        text = "En attente";
        break;
      default:
        badgeClass = "bg-gray-100 text-gray-800";
        text = "Non justifiée";
    }

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClass}`}
      >
        {text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";

    try {
      // Handle the WAT timezone (West Africa Time, UTC+1)
      const date = new Date(dateString.replace("WAT", "GMT+0100"));

      if (!isValid(date)) {
        // Fallback for other formats if needed
        const fallbackDate = new Date(dateString);
        return isValid(fallbackDate)
          ? format(fallbackDate, "PPPp", { locale: fr })
          : "Date invalide";
      }

      return format(date, "PPPp", { locale: fr });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Date invalide";
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="container mx-auto mt-4 p-4">
          <h2 className="text-2xl font-bold mb-4">Mes Absences</h2>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </StudentLayout>
    );
  }

  if (error) {
    return (
      <StudentLayout>
        <div className="container mx-auto mt-4 p-4">
          <h2 className="text-2xl font-bold mb-4">Mes Absences</h2>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="container mx-auto mt-4 p-4">
        <h2 className="text-2xl font-bold mb-6">Mes Absences</h2>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { title: "Total", value: stats.total, color: "text-gray-900" },
            {
              title: "Acceptées",
              value: stats.accepted,
              color: "text-green-600",
            },
            { title: "Refusées", value: stats.refused, color: "text-red-600" },
            {
              title: "En attente",
              value: stats.pending,
              color: "text-yellow-600",
            },
          ].map((stat) => (
            <div
              key={stat.title}
              className="bg-white p-4 rounded-lg shadow text-center"
            >
              <h3 className="text-lg font-medium text-gray-900">
                {stat.title}
              </h3>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
        {/* Absences Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Professeur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durée (heures)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {absences.length > 0 ? (
                absences.map((absence) => {
                  // Parse the date first for consistent handling
                  const formattedDate = formatDate(absence.dateSeance);

                  return (
                    <tr key={absence.absenceId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {absence.moduleNom || "Non spécifié"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {absence.professeurPrenom
                          ? `${absence.professeurNom} ${absence.professeurPrenom}`
                          : "Non spécifié"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formattedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {absence.dureeHeures
                          ? `${absence.dureeHeures}h`
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getStatusBadge(absence.justificationStatut)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => handleJustifyClick(absence)}
                          disabled={["ACCEPTEE", "REFUSEE"].includes(
                            absence.justificationStatut
                          )}
                          className={`px-3 py-1 text-sm rounded-md ${
                            ["ACCEPTEE", "REFUSEE"].includes(
                              absence.justificationStatut
                            )
                              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {absence.justificationText ? "Modifier" : "Justifier"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Aucune absence enregistrée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Justification Modal - Flowing Design */}
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
              {/* Transparent backdrop with blur effect */}
              <div className="fixed inset-0 backdrop-blur-sm bg-black/5 transition-opacity"></div>

              {/* Modal Container with Animation */}
              <div
                className="relative w-full max-w-lg mx-auto animate-fadeIn"
                style={{ animation: "fadeIn 0.3s ease-out" }}
              >
                {/* Modal Content */}
                <div className="relative bg-white/90 dark:bg-gray-800/90 rounded-xl overflow-hidden shadow-lg backdrop-blur-md transform transition-all border border-white/20 dark:border-gray-700/30">
                  {/* Top Curve Decoration */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>

                  {/* Header */}
                  <div className="px-6 pt-6 pb-4">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                      Justifier mon absence
                    </h3>
                  </div>

                  {/* Form Content */}
                  <div className="px-6 pb-6 space-y-5">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date de l'absence
                      </label>
                      <input
                        type="text"
                        value={
                          selectedAbsence ? selectedAbsence.dateSeance : ""
                        }
                        disabled
                        className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Module
                      </label>
                      <input
                        type="text"
                        value={selectedAbsence?.moduleNom || ""}
                        disabled
                        className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Justification <span className="text-pink-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={justificationText}
                        onChange={(e) => setJustificationText(e.target.value)}
                        required
                        className="block w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                        placeholder="Veuillez expliquer la raison de votre absence"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Preuve (optionnel)
                      </label>
                      <div className="mt-1">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                    file:text-sm file:font-medium file:bg-gradient-to-r file:from-blue-400 file:to-blue-600
                    file:text-white hover:file:opacity-90 cursor-pointer transition-all"
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                        Formats acceptés: PDF, JPG, PNG (max 5MB)
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="px-6 py-4 bg-gray-50/80 dark:bg-gray-800/80 sm:flex sm:flex-row-reverse gap-3 border-t border-gray-100 dark:border-gray-700/50">
                    <button
                      type="button"
                      onClick={handleSubmitJustification}
                      disabled={!justificationText}
                      className={`w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-white shadow-sm transition-all sm:ml-2 ${
                        justificationText
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:opacity-90"
                          : "bg-blue-400/60 dark:bg-blue-700/50 cursor-not-allowed"
                      }`}
                    >
                      Soumettre
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="mt-3 sm:mt-0 w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm transition-all"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default StudentMesAbsencesPage;
