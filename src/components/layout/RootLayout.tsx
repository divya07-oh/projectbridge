import { Outlet, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
            <Briefcase className="h-6 w-6" />
            ProjectNest
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/projects" className="hover:text-foreground transition-colors">Find Projects</Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Student Portal</Link>
            <Link to="/business" className="hover:text-foreground transition-colors">Business Portal</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="hidden md:inline-flex">Log in</Button>
            </Link>
            <Link to="/projects">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-12 bg-muted/40">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-lg text-primary">
            <Briefcase className="h-5 w-5" />
            ProjectNest
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-foreground">About</Link>
            <Link to="#" className="hover:text-foreground">Contact</Link>
            <Link to="#" className="hover:text-foreground">Privacy</Link>
            <Link to="#" className="hover:text-foreground">Terms</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProjectNest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
