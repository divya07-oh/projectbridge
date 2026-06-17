import { Link } from "react-router-dom"
import { MOCK_USER, MOCK_PROJECTS, MOCK_NOTIFICATIONS } from "@/data/mockData"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Wallet, 
  FileText, 
  Activity, 
  Star, 
  Clock, 
  Bell, 
  ArrowRight,
  TrendingUp
} from "lucide-react"

export default function StudentDashboard() {
  const { stats } = MOCK_USER
  const recommendedProjects = MOCK_PROJECTS.slice(0, 3)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {MOCK_USER.name.split(' ')[0]} 👋</h1>
          <p className="text-muted-foreground mt-1">Here is what's happening with your freelance projects today.</p>
        </div>
        <Link to="/projects">
          <Button>Find New Projects</Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completion}%</div>
            <Progress value={stats.completion} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(stats?.totalEarnings || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applied</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.appliedProjects || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">3 pending reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeProjects || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">2 due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rating}/5.0</div>
            <p className="text-xs text-muted-foreground mt-1">Based on {MOCK_USER.projectsCompleted} reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recommended Projects */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recommended Projects</CardTitle>
              <CardDescription>Based on your skills and past work.</CardDescription>
            </div>
            <Link to="/projects">
              <Button variant="ghost" size="sm">View All <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendedProjects.map(project => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <Link to={`/projects/${project.id}`} className="font-semibold hover:underline">
                    {project.title}
                  </Link>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{project.company}</span>
                    <span className="mx-2">•</span>
                    <span>{project.duration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{project.budget}</div>
                  <Badge variant="secondary" className="mt-1 font-normal">{project.category}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Column: Activity & Deadlines */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Restaurant Website Homepage</p>
                    <p className="text-sm text-muted-foreground">Spice Villa</p>
                  </div>
                  <Badge variant="destructive">Tomorrow</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Logo Drafts</p>
                    <p className="text-sm text-muted-foreground">TechNova</p>
                  </div>
                  <Badge variant="outline">In 3 days</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_NOTIFICATIONS.map(notification => (
                  <div key={notification.id} className="flex gap-4">
                    <div className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${notification.read ? 'bg-muted' : 'bg-primary'}`} />
                    <div className="space-y-1">
                      <p className={`text-sm leading-none ${notification.read ? 'text-muted-foreground' : 'font-medium'}`}>
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}