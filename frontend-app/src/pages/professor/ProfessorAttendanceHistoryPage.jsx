import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronLeft,
  Edit,
  Download,
  Calendar,
  FileText,
  Eye,
} from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer"; // Add this import
import ProfessorLayout from "../../components/professor/ProfessorLayout";
import { moduleService } from "../../services/api";
import AttendancePDF from "./AttendancePDF";

function ProfessorAttendanceHistory() {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moduleInfo, setModuleInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch module info
        const modules = await moduleService.getModulesEnseignes();
        const currentModule = modules.find((m) => m.id === moduleId);
        setModuleInfo(currentModule);

        // Fetch attendance history
        const history = await moduleService.getFeuillesPresenceParModule(
          moduleId
        );
        setAttendanceHistory(history);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Une erreur s'est produite lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [moduleId]);

  const handleEdit = (attendanceId) => {
    navigate(`/professor/modules/${moduleId}/attendance/${attendanceId}/edit`);
  };

  if (loading) {
    return (
      <ProfessorLayout>
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
        </div>
      </ProfessorLayout>
    );
  }

  if (error) {
    return (
      <ProfessorLayout>
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 px-4 py-3 rounded-md flex items-start">
          <span>{error}</span>
        </div>
      </ProfessorLayout>
    );
  }

  return (
    <ProfessorLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(`/professor/modules/`)}
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Retour au module
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Historique des présences
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {moduleInfo?.titre} - {moduleInfo?.classe?.nom}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Séances enregistrées
              </h3>
            </div>

            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {attendanceHistory.length > 0 ? (
                attendanceHistory.map((attendance) => (
                  <li
                    key={attendance.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-750"
                  >
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Séance du{" "}
                            {new Date(
                              attendance.dateSeance
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Durée: {attendance.dureeHeures} heures | Absents:{" "}
                            {attendance.absences?.length || 0}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Link
                          to={`/professor/attendance/${moduleId}/${attendance.id}/details`}
                          className="p-2 rounded-full text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleEdit(attendance.id)}
                          className="p-2 rounded-full text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <PDFDownloadLink
                          document={
                            <AttendancePDF
                              moduleInfo={moduleInfo}
                              date={attendance.dateSeance}
                              students={attendance.etudiantId || []} // Fallback to empty array
                            />
                          }
                          fileName={`presence_${moduleInfo?.titre}_${attendance.dateSeance}.pdf`}
                        >
                          {({ loading }) => (
                            <button
                              className="p-2 rounded-full text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              disabled={loading}
                            >
                              <Download className="h-5 w-5" />
                            </button>
                          )}
                        </PDFDownloadLink>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Aucune séance enregistrée pour ce module
                  </p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </ProfessorLayout>
  );
}

export default ProfessorAttendanceHistory;
