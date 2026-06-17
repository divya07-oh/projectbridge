import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Briefcase } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { users, setCurrentUser } = useAppContext()
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      setCurrentUser(user)
      toast.success("Login successful!")
      navigate(user.type === 'business' ? '/business' : '/student/dashboard')
    } else {
      toast.error("Invalid email or password")
    }
  }

  // Pre-fill mock data for quick testing
  const setDemoStudent = () => {
    setEmail('student@test.com')
    setPassword('password123')
  }

  const setDemoBusiness = () => {
    setEmail('business@test.com')
    setPassword('password123')
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link to="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 font-bold text-xl text-primary">
        <Briefcase className="h-6 w-6" />
        ProjectNest
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your email to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>

            <div className="mt-6 flex flex-col gap-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Demo Accounts</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="w-full text-xs" onClick={setDemoStudent}>Student</Button>
                <Button variant="outline" className="w-full text-xs" onClick={setDemoBusiness}>Business</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground">
            <div>
              Don't have an account?{" "}
              <Link to="/signup/student" className="text-primary hover:underline font-medium">Sign up</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
