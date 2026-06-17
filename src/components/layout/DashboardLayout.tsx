import { Outlet, Link, useLocation, useNavigate, Navigate } from "react-router-dom"
import { 
  Briefcase, 
  LayoutDashboard, 
  FolderGit2, 
  FileText, 
  MessageSquare, 
  User as UserIcon, 
  Wallet, 
  Settings,
  Bell,
  LogOut,
  Star,
  PlusCircle,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppContext } from "@/context/AppContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import NotificationDropdown from "@/components/shared/NotificationDropdown"

export default function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useAppContext()
  const isBusiness = currentUser?.type === 'business'

  const studentLinks = [
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Find Work", href: "/student/find-work", icon: FolderGit2 },
    { name: "Applications", href: "/student/applications", icon: FileText },
    { name: "Messages", href: "/student/messages", icon: MessageSquare },
    { name: "Profile", href: "/student/profile", icon: UserIcon },
    { name: "Earnings", href: "/student/earnings", icon: Wallet },
    { name: "Notifications", href: "/student/notifications", icon: Bell },
  ]

  const businessLinks = [
    { name: "Dashboard", href: "/business", icon: LayoutDashboard },
    { name: "Post Project", href: "/business/create-project", icon: PlusCircle },
    { name: "Active Projects", href: "/business/active", icon: FolderGit2 },
    { name: "Applicants", href: "/business/applicants", icon: Users },
    { name: "Payments", href: "/business/payments", icon: Wallet },
    { name: "Messages", href: "/business/messages", icon: MessageSquare },
    { name: "Profile", href: "/business/profile", icon: UserIcon },
  ]

  const links = isBusiness ? businessLinks : studentLinks

  const handleLogout = () => {
    setCurrentUser(null)
    toast.success("Logged out successfully")
    navigate("/")
  }

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex font-sans bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Briefcase className="h-6 w-6" />
            ProjectNest
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <link.icon className="h-5 w-5" />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.name}`} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium truncate">{currentUser.name}</span>
              <span className="text-xs text-muted-foreground truncate">{isBusiness ? 'Business Account' : 'Student'}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b bg-background flex items-center justify-end px-6 gap-4 sticky top-0 z-10">
          <NotificationDropdown />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.name}`} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={isBusiness ? "/business/profile" : "/student/profile"}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

