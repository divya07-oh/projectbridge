import { useAppContext } from "@/context/AppContext"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bell, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import EmptyState from "@/components/shared/EmptyState"
import { toast } from "sonner"

export default function NotificationsPage() {
  const { notifications, setNotifications } = useAppContext()

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
  }

  const handleMarkRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  if (!notifications || notifications.length === 0) {
    return (
      <EmptyState 
        icon={Bell} 
        title="No notifications yet" 
        description="When businesses view your applications or message you, you'll see them here."
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated on your applications and messages.</p>
        </div>
        <Button variant="outline" onClick={handleMarkAllRead}>
          <CheckCircle className="h-4 w-4 mr-2" /> Mark all read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`transition-colors ${notification.read ? 'bg-muted/30' : 'border-l-4 border-l-primary shadow-sm'}`}>
            <CardContent className="p-6 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h4 className={`font-semibold ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {notification.title}
                </h4>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <span className="text-xs text-muted-foreground block mt-2">{notification.time}</span>
              </div>
              {!notification.read && (
                <Button variant="ghost" size="sm" onClick={() => handleMarkRead(notification.id)}>
                  Mark Read
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
