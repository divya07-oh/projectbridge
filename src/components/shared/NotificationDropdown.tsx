import { useAppContext } from "@/context/AppContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Bell, Check, CheckCircle2, MessageSquare, AlertCircle, Eye, FileText, Calendar } from "lucide-react"

export default function NotificationDropdown() {
  const { notifications, setNotifications } = useAppContext()

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('application')) return <FileText className="h-4 w-4 text-blue-500" />
    if (title.toLowerCase().includes('message')) return <MessageSquare className="h-4 w-4 text-emerald-500" />
    if (title.toLowerCase().includes('viewed')) return <Eye className="h-4 w-4 text-purple-500" />
    if (title.toLowerCase().includes('project')) return <Calendar className="h-4 w-4 text-amber-500" />
    return <AlertCircle className="h-4 w-4 text-primary" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2.5 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground ring-2 ring-background">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-2">
          <DropdownMenuLabel className="p-0 font-bold">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-primary" onClick={handleMarkAllRead}>
              <Check className="mr-1 h-3 w-3" /> Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notif) => (
              <DropdownMenuItem 
                key={notif.id} 
                className={`flex flex-col items-start gap-1 p-4 cursor-pointer ${notif.read ? 'opacity-60' : 'bg-muted/30'}`}
                onClick={() => handleMarkAsRead(notif.id)}
              >
                <div className="flex w-full justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getIcon(notif.title)}
                    <span className={`text-sm ${notif.read ? 'font-medium' : 'font-bold'}`}>{notif.title}</span>
                  </div>
                  {!notif.read && <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground pl-6 line-clamp-2">{notif.message}</p>
                <span className="text-[10px] text-muted-foreground pl-6 mt-1">{notif.time}</span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
