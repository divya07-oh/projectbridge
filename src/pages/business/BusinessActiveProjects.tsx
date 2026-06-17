import { useAppContext } from "@/context/AppContext"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle2, Edit2, ExternalLink } from "lucide-react"
import { toast } from "sonner"

export default function BusinessActiveProjects() {
  const { projects, setProjects, currentUser } = useAppContext()

  // Find projects posted by the current business
  const businessProjects = projects.filter(p => p.company === currentUser?.company || p.company === currentUser?.name)

  const handleMarkComplete = (projectId: string) => {
    // In a real app we'd update the project status, for now we just show a toast
    toast.success("Project marked as completed!")
  }

  if (businessProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center border rounded-xl bg-background shadow-sm p-8">
        <h3 className="text-xl font-bold mb-2">No Active Projects</h3>
        <p className="text-muted-foreground mb-6">You haven't posted any projects yet.</p>
        <Button asChild>
          <a href="/business/create-project">Post a Project</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Active Projects</h1>
        <p className="text-muted-foreground">Manage your posted projects and track their progress.</p>
      </div>

      <div className="grid gap-6">
        {businessProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 md:flex justify-between items-start gap-6 border-b">
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="bg-primary/5">{project.category}</Badge>
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-emerald-200">Active</Badge>
                    </div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Budget</p>
                      <p className="font-semibold">{project.budget}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Deadline</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(project.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Applicants</p>
                      <p className="font-semibold">{project.applicants || 0} Students</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:mt-0 flex flex-col sm:flex-row md:flex-col gap-3 min-w-[140px]">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`/projects/${project.id}`}>
                      <ExternalLink className="h-4 w-4 mr-2" /> View Details
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Edit mode coming soon!")}>
                    <Edit2 className="h-4 w-4 mr-2" /> Edit Project
                  </Button>
                  <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleMarkComplete(project.id)}>
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Mark Complete
                  </Button>
                </div>
              </div>

              {/* Progress Tracking Simulation */}
              <div className="p-6 bg-muted/20">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold">Estimated Progress</h4>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2 mb-4" />
                <p className="text-xs text-muted-foreground">Assigned to: <span className="font-medium text-foreground">Waiting for selection</span></p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
