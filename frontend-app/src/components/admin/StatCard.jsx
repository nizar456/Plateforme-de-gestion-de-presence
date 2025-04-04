import { ArrowUp, ArrowDown } from "lucide-react"

function StatCard({ title, value, change, trend, icon }) {
  return (
    <div className="bg-card text-card-foreground overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="rounded-md bg-primary/10 p-3">{icon}</div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-muted-foreground truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-muted px-5 py-3">
        <div className="text-sm">
          <div className="flex items-center">
            {trend === "up" ? (
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`font-medium ${
                trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {change}
            </span>
            <span className="ml-2 text-muted-foreground">depuis le mois dernier</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatCard

