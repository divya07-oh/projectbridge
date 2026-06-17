import { Outlet, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"
import { useAppContext } from "@/context/AppContext"

export default function RootLayout() {
  const { currentUser } = useAppContext()

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="h-16 border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Briefcase className="h-6 w-6" />
            ProjectNest
          </Link>
          
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Find Work
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
              How it works
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Success Stories
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <Button asChild>
                <Link to={currentUser.type === 'business' ? '/business' : '/student/dashboard'}>
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup/business">Post a Project</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-muted py-12 border-t">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              ProjectNest
            </h3>
            <p className="text-sm text-muted-foreground">Connecting talented students with startups for real-world projects.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/projects" className="hover:text-primary">Find Projects</Link></li>
              <li><Link to="/signup/student" className="hover:text-primary">Create Profile</Link></li>
              <li><Link to="#" className="hover:text-primary">Success Stories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Businesses</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/signup/business" className="hover:text-primary">Post a Project</Link></li>
              <li><Link to="#" className="hover:text-primary">Pricing</Link></li>
              <li><Link to="#" className="hover:text-primary">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-primary">About Us</Link></li>
              <li><Link to="#" className="hover:text-primary">Contact</Link></li>
              <li><Link to="#" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
