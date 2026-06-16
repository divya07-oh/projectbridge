import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, Users, Wallet, CheckCircle2, ArrowRight } from "lucide-react"

export default function BusinessDashboard() {
  const applicants = [
    { id: "1", name: "Arjun Mehta", role: "Frontend Dev", project: "Restaurant Website", appliedOn: "Today", status: "Pending" },
    { id: "2", name: "Priya Sharma", role: "UI/UX Designer", project: "Landing Page Design", appliedOn: "Yesterday", status: "Reviewed" },
    { id: "3", name: "Rahul Verma", role: "Video Editor", project: "Instagram Reels", appliedOn: "2 days ago", status: "Accepted" },
    { id: "4", name: "Sneha Reddy", role: "Content Writer", project: "Product Descriptions", appliedOn: "3 days ago", status: "Rejected" },
  ]

  const activeProjects = [
    { id: "p1", title: "Restaurant Website", applicants: 12, daysLeft: 4 },
    { id: "p3", title: "Landing Page Design", applicants: 25, daysLeft: 2 },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Business Dashboard</h1>
          <p className="text-muted-foreground">Overview of your posted projects and hiring pipeline.</p>
        </div>
        <Link to="/business/create-project">
          <Button size="lg">Post New Project</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects Posted</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">2 currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications Received</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">148</div>
            <p className="text-xs text-muted-foreground mt-1">+12 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money Spent</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,500</div>
            <p className="text-xs text-muted-foreground mt-1">Total across all projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground mt-1">Projects successfully delivered</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Recent Applicants</CardTitle>
            <CardDescription>Review and manage incoming applications.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${applicant.id}`} />
                          <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium leading-none">{applicant.name}</p>
                          <p className="text-xs text-muted-foreground">{applicant.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{applicant.project}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{applicant.appliedOn}</TableCell>
                    <TableCell>
                      <Badge variant={applicant.status === 'Accepted' ? 'default' : applicant.status === 'Rejected' ? 'destructive' : 'secondary'}>
                        {applicant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Review Profile</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Currently accepting applicants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeProjects.map(project => (
              <div key={project.id} className="p-4 border rounded-lg bg-muted/20 space-y-3">
                <h4 className="font-semibold line-clamp-1">{project.title}</h4>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{project.applicants} applicants</span>
                  <span>{project.daysLeft} days left</span>
                </div>
                <Button variant="secondary" className="w-full h-8" size="sm">Manage Project</Button>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}