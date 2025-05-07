import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Check, X, FileText, ChevronLeft, AlertCircle } from "lucide-react"
import ProfessorLayout from "../../components/professor/ProfessorLayout"
import { moduleService } from "../../services/api"

function ProfessorAttendance() {
  const navigate = useNavigate()
  const { moduleId, attendanceId } = useParams() // Added attendanceId for edit mode
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [moduleInfo, setModuleInfo] = useState(null)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [duration, setDuration] = useState(2)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch module info
        const modules = await moduleService.getModulesEnseignes();
        const currentModule = modules.find(m => m.id === moduleId);
        setModuleInfo(currentModule);
        
        if (attendanceId) {
          setIsEditMode(true);
          // Fetch existing attendance data
          const existingAttendance = await moduleService.getDetailsFeuillePresence(moduleId, attendanceId);
          console.log("Existing attendance:", existingAttendance);
          
          // Set date and duration
          setDate(existingAttendance.dateSeance?.split('T')[0] || new Date().toISOString().split('T')[0]);
          setDuration(existingAttendance.dureeHeures || 2);
          
          // Fetch students
          const studentsResponse = await moduleService.getEtudiantsPourFeuille(moduleId);
          const studentsData = studentsResponse.data || studentsResponse.etudiants || studentsResponse;
          
          if (!Array.isArray(studentsData)) {
            throw new Error("Invalid students data format");
          }
          
          // Safely handle absentsIds (default to empty array if undefined)
          const absentsIds = existingAttendance.absentsIds || [];
          
          const studentsWithAttendance = studentsData.map(student => ({
            ...student,
            present: !absentsIds.includes(student.id)
          }));
          
          setStudents(studentsWithAttendance);
        } else {
          // Create mode - original implementation
          const response = await moduleService.getEtudiantsPourFeuille(moduleId);
          const studentsData = response.data || response.etudiants || response;
          
          if (!Array.isArray(studentsData)) {
            throw new Error("Invalid students data format");
          }
          
          setStudents(studentsData.map(student => ({
            ...student,
            present: true
          })));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Une erreur s'est produite lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [moduleId, attendanceId]);

  const toggleAttendance = (studentId) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, present: !student.present } 
        : student
    ))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const attendanceData = {
        dateSeance: new Date(date),
        dureeHeures: duration,
        absentsIds: students
          .filter(student => !student.present)
          .map(student => student.id)
      }
      
      if (isEditMode) {
        // Update existing attendance
        await moduleService.modifierFeuillePresence(moduleId,attendanceId, attendanceData)
        alert("Feuille de présence mise à jour avec succès!")
      } else {
        // Create new attendance
        await moduleService.creerFeuillePresence(moduleId, attendanceData)
        alert("Feuille de présence enregistrée avec succès!")
      }
      
      navigate("/professor/modules")
    } catch (err) {
      console.error("Error submitting attendance:", err)
      setError("Une erreur s'est produite lors de l'enregistrement.")
      alert("Erreur lors de l'enregistrement de la feuille de présence")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <ProfessorLayout>
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
        </div>
      </ProfessorLayout>
    )
  }

  if (error) {
    return (
      <ProfessorLayout>
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      </ProfessorLayout>
    )
  }

  return (
    <ProfessorLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/professor/modules')}
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Retour aux modules
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {isEditMode ? "Modifier la feuille de présence" : "Nouvelle feuille de présence"}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {moduleInfo?.titre} - {moduleInfo?.classe?.nom}
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Durée (heures)
                </label>
                <input
                  type="number"
                  id="duration"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={duration}
                  onChange={(e) => setDuration(parseFloat(e.target.value))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Liste des étudiants
              </h3>
            </div>
            
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {students.length > 0 ? (
                students.map((student) => (
                  <li key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="min-w-0 flex-1 flex items-center">
                          <div className="min-w-0 flex-1 px-4">
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                              {student.nom} {student.prenom}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleAttendance(student.id)}
                        className={`ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          student.present
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {student.present ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Présent
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 mr-1" />
                            Absent
                          </>
                        )}
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Aucun étudiant trouvé pour ce module
                  </p>
                </div>
              )}
            </ul>
            
            {students.length > 0 && (
              <div className="px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    isEditMode ? 'Mise à jour...' : 'Enregistrement...'
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      {isEditMode ? 'Mettre à jour' : 'Enregistrer'} la feuille de présence
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProfessorLayout>
  )
}

export default ProfessorAttendance