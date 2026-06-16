import { Outlet, Link, useLocation } from "react-router-dom"
import { 
  Briefcase, 
  LayoutDashboard, 
  FolderGit2, 
  FileText, 
  MessageSquare, 
  User, 
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
import { MOCK_USER } from "@/data/mockData"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardLayout() {
  const location = useLocation()
  const isBusiness = location.pathname.startsWith('/business')

  const studentLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: FolderGit2 },
    { name: "Applications", href: "/applications", icon: FileText },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Profile", href: `/profile/me`, icon: User },
    { name: "Earnings", href: "/earnings", icon: Wallet },
    { name: "Reviews", href: "/reviews", icon: Star },
    { name: "Settings", href: "#", icon: Settings },
  ]

  const businessLinks = [
    { name: "Dashboard", href: "/business", icon: LayoutDashboard },
    { name: "Post Project", href: "/business/create-project", icon: PlusCircle },
    { name: "Active Projects", href: "#", icon: FolderGit2 },
    { name: "Applicants", href: "#", icon: Users },
    { name: "Payments", href: "#", icon: Wallet },
    { name: "Settings", href: "#", icon: Settings },
  ]

  const links = isBusiness ? businessLinks : studentLinks

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
              <AvatarImage src={MOCK_USER.avatar} />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium truncate">{MOCK_USER.name}</span>
              <span className="text-xs text-muted-foreground truncate">{isBusiness ? 'Business Account' : 'Student'}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b bg-background flex items-center justify-end px-6 gap-4 sticky top-0 z-10">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-destructive"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={MOCK_USER.avatar} />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{MOCK_USER.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    arjun@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
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
