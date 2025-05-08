import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ChevronLeft,
  Users,
  Calendar,
  Clock,
  FileText,
  Check,
  X,
  Eye,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";
import ProfessorLayout from "../../components/professor/ProfessorLayout";
import { moduleService } from "../../services/api";

function ProfessorAttendanceDetails() {
  const { moduleId, attendanceId } = useParams();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJustification, setSelectedJustification] = useState(null);
  const [showJustificationModal, setShowJustificationModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [documentUrl, setDocumentUrl] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [attendanceDetails, studentsRes] = await Promise.all([
          moduleService.getDetailsFeuillePresence(moduleId, attendanceId),
          moduleService.getEtudiantsPourFeuille(moduleId),
        ]);

        const studentsData =
          studentsRes.data || studentsRes.etudiants || studentsRes;
        const absencesMap = new Map();
        attendanceDetails.absences?.forEach((a) =>
          absencesMap.set(a.etudiantId, a)
        );

        const fullList = studentsData.map((student) => {
          const absence = absencesMap.get(student.id);
          return {
            ...student,
            isAbsent: !!absence,
            justification: absence || null,
          };
        });

        setAttendance(attendanceDetails);
        setStudents(fullList);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des détails.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [moduleId, attendanceId]);

  console.log(students);
  console.log(attendance);

  const handleViewJustification = (justification) => {
    setSelectedJustification(justification);
    if (justification.justificationDocumentPath) {
      // Construct the full URL to the document
      const fullUrl = `${process.env.REACT_APP_API_BASE_URL || ""}${
        justification.justificationDocumentPath
      }`;
      setDocumentUrl(fullUrl);
    } else {
      setDocumentUrl(null);
    }
    setShowJustificationModal(true);
  };

  const handleProcessJustification = async (status) => {
    try {
      setProcessing(true);
      await moduleService.updateStatutJustification(
        moduleId,
        attendanceId,
        selectedJustification.id,
        { status }
      );

      // Refresh the data
      const [attendanceDetails] = await Promise.all([
        moduleService.getDetailsFeuillePresence(moduleId, attendanceId),
      ]);

      const absencesMap = new Map();
      attendanceDetails.absences?.forEach((a) =>
        absencesMap.set(a.etudiantId, a)
      );

      setStudents((prevStudents) =>
        prevStudents.map((student) => {
          const absence = absencesMap.get(student.id);
          return {
            ...student,
            isAbsent: !!absence,
            justification: absence || null,
          };
        })
      );

      setShowJustificationModal(false);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour du statut.");
    } finally {
      setProcessing(false);
    }
  };

  const getFileType = (url) => {
    if (!url) return null;
    const extension = url.split(".").pop().toLowerCase();
    if (["pdf"].includes(extension)) return "pdf";
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) return "image";
    return "other";
  };

  const renderDocumentPreview = () => {
    if (!documentUrl) return null;

    const fileType = getFileType(documentUrl);

    return (
      <div className="mt-4 border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-gray-700">Document justificatif</h4>
          <a
            href={documentUrl}
            download
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <Download className="w-4 h-4 mr-1" />
            Télécharger
          </a>
        </div>

        <div className="mt-2">
          {fileType === "pdf" ? (
            <iframe
              src={documentUrl}
              className="w-full h-64 border border-gray-200 rounded"
              title="Document justificatif"
            />
          ) : fileType === "image" ? (
            <img
              src={documentUrl}
              alt="Document justificatif"
              className="max-w-full max-h-64 mx-auto border border-gray-200 rounded"
            />
          ) : (
            <div className="p-4 bg-gray-100 rounded text-center">
              <FileText className="w-8 h-8 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Aperçu non disponible. Veuillez télécharger le document.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <ProfessorLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        </div>
      </ProfessorLayout>
    );
  }

  if (error) {
    return (
      <ProfessorLayout>
        <div className="max-w-4xl mx-auto p-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center">
            <AlertCircle className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      </ProfessorLayout>
    );
  }

  // Format date
  const formattedDate = attendance.dateSeance
    ? new Date(attendance.dateSeance).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Date inconnue";

  return (
    <ProfessorLayout>
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span>Retour</span>
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Détails de la séance</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Durée</p>
                <p className="font-medium">
                  {attendance.dureeHeures} heure
                  {attendance.dureeHeures > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-500" />
              Liste des étudiants
            </h2>

            <div className="text-sm text-gray-500">
              {students.filter((s) => !s.isAbsent).length} présents /{" "}
              {students.length} inscrits
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">
                    Nom
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">
                    Email
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">
                    Statut
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">
                    Justification
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900/10"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium">
                        {student.nom} {student.prenom}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="py-3 px-4">
                      {student.isAbsent ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                          <X className="w-3 h-3 mr-1" />
                          Absent
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          <Check className="w-3 h-3 mr-1" />
                          Présent
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {student.isAbsent && (
                        <>
                          {student.justification?.justifie === true ? (
                            <span className="text-green-600 dark:text-green-400">
                              Acceptée
                            </span>
                          ) : student.justification?.justificationStatut ===
                            "EN_ATTENTE" ? (
                            <span className="text-yellow-600 dark:text-yellow-400">
                              En attente
                            </span>
                          ) : (
                            <span className="text-red-600 dark:text-red-400">
                              Non justifiée
                            </span>
                          )}
                        </>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {student.isAbsent &&
                        student.justification?.justificationStatut ===
                          "EN_ATTENTE" && (
                          <button
                            onClick={() =>
                              handleViewJustification(student.justification)
                            }
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Voir la justification"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Justification Details Modal */}
        {showJustificationModal && (
          <div className="fixed z-20 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
              {/* Transparent backdrop with blur effect */}
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"></div>

              {/* Modal Container with Animation */}
              <div
                className="relative w-full max-w-2xl mx-auto animate-fadeIn"
                style={{ animation: "fadeIn 0.3s ease-out" }}
              >
                {/* Modal Content */}
                <div className="relative bg-white/95 dark:bg-gray-800/95 rounded-xl overflow-hidden shadow-lg backdrop-blur-md transform transition-all border border-white/20 dark:border-gray-700/30">
                  {/* Top Curve Decoration */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"></div>

                  {/* Header */}
                  <div className="px-6 pt-6 pb-4">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                      Détails de la justification
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="px-6 pb-6 space-y-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                        Étudiant
                      </label>
                      <p className="text-base text-gray-900 dark:text-gray-100 py-1 px-1">
                        {selectedJustification?.etudiantNom}{" "}
                        {selectedJustification?.etudiantPrenom}
                      </p>
                      <div className="h-px w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 mt-2"></div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                        Justification
                      </label>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                        <p className="text-base text-gray-800 dark:text-gray-200 whitespace-pre-line">
                          {selectedJustification?.justificationText ||
                            "Aucune justification fournie"}
                        </p>
                      </div>
                    </div>

                    <div className="group">{renderDocumentPreview()}</div>
                  </div>

                  {/* Actions Footer */}
                  <div className="px-6 py-4 bg-gray-50/80 dark:bg-gray-800/80 sm:flex sm:flex-row-reverse gap-3 border-t border-gray-100 dark:border-gray-700/50">
                    <button
                      type="button"
                      onClick={() => handleProcessJustification("ACCEPTEE")}
                      disabled={processing}
                      className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 ml-3 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {processing ? "Traitement..." : "Accepter"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleProcessJustification("REFUSEE")}
                      disabled={processing}
                      className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      {processing ? "Traitement..." : "Refuser"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowJustificationModal(false)}
                      disabled={processing}
                      className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center items-center rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm px-5 py-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:ml-3 text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed"
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
    </ProfessorLayout>
  );
}

export default ProfessorAttendanceDetails;
