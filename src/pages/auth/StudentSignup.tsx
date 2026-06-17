import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAppContext, type User } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Briefcase } from "lucide-react"

export default function StudentSignup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { users, setUsers, setCurrentUser } = useAppContext()
  const navigate = useNavigate()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (users.find(u => u.email === email)) {
      toast.error("User with this email already exists")
      return
    }

    const newUser: User = {
      id: `u${Date.now()}`,
      type: 'student',
      name,
      email,
      password,
      stats: { completion: 10, totalEarnings: 0, appliedProjects: 0, activeProjects: 0, rating: 0 },
      projectsCompleted: 0,
      achievements: [],
      skills: [],
      portfolio: []
    }

    setUsers([...users, newUser])
    setCurrentUser(newUser)
    toast.success("Account created successfully!")
    navigate('/student/dashboard')
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link to="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 font-bold text-xl text-primary">
        <Briefcase className="h-6 w-6" />
        ProjectNest
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Sign up as a student to start finding freelance projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground">
            <div>
              Looking to post a project?{" "}
              <Link to="/signup/business" className="text-primary hover:underline font-medium">Sign up as Business</Link>
            </div>
            <div>
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
