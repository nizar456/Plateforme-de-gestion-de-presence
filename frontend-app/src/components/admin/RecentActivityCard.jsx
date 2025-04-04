import { Activity, User, BookOpen, FileText, MessageSquare } from "lucide-react"

function RecentActivityCard() {
  const activities = [
    {
      id: 1,
      type: "user",
      title: "Nouvel étudiant inscrit",
      description: "Sophie Martin s'est inscrite à l'université",
      time: "Il y a 10 minutes",
      icon: <User className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 2,
      type: "course",
      title: "Nouveau cours ajouté",
      description: "Le cours 'Introduction à l'Intelligence Artificielle' a été ajouté",
      time: "Il y a 1 heure",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
    },
    {
      id: 3,
      type: "document",
      title: "Document mis à jour",
      description: "Le programme de cours 2024-2025 a été mis à jour",
      time: "Il y a 3 heures",
      icon: <FileText className="h-5 w-5 text-green-500" />,
    },
    {
      id: 4,
      type: "message",
      title: "Nouveau message",
      description: "Vous avez reçu un message du Dr. Bernard",
      time: "Il y a 5 heures",
      icon: <MessageSquare className="h-5 w-5 text-yellow-500" />,
    },
  ]

  return (
    <div className="bg-card text-card-foreground shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Activités Récentes</h3>
          <Activity className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      <div className="px-6 py-5">
        <ul className="divide-y divide-border">
          {activities.map((activity) => (
            <li key={activity.id} className="py-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-block h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {activity.icon}
                  </span>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-3 bg-muted text-right">
        <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
          Voir toutes les activités
        </a>
      </div>
    </div>
  )
}

export default RecentActivityCard

