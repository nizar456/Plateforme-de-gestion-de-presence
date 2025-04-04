import { Calendar, Clock, MapPin, Users } from "lucide-react"

function UpcomingEventsCard() {
  const events = [
    {
      id: 1,
      title: "Réunion du Conseil d'Administration",
      date: "15 Juin 2024",
      time: "10:00 - 12:00",
      location: "Salle du Conseil, Bâtiment A",
      attendees: 12,
    },
    {
      id: 2,
      title: "Journée Portes Ouvertes",
      date: "20 Juin 2024",
      time: "09:00 - 17:00",
      location: "Campus Principal",
      attendees: 500,
    },
    {
      id: 3,
      title: "Conférence sur l'Intelligence Artificielle",
      date: "25 Juin 2024",
      time: "14:00 - 16:30",
      location: "Amphithéâtre B",
      attendees: 200,
    },
  ]

  return (
    <div className="bg-card text-card-foreground shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Événements à Venir</h3>
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      <div className="px-6 py-5">
        <ul className="divide-y divide-border">
          {events.map((event) => (
            <li key={event.id} className="py-4">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{event.title}</h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    <Users className="mr-1 h-3 w-3" />
                    {event.attendees}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  {event.date}
                </div>
                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  {event.time}
                </div>
                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  {event.location}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-3 bg-muted text-right">
        <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
          Voir tous les événements
        </a>
      </div>
    </div>
  )
}

export default UpcomingEventsCard

