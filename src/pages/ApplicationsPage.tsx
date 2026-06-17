import { useState, useEffect } from "react"
import { useAppContext } from "@/context/AppContext"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ExternalLink, CheckCircle, Clock, XCircle, FileText } from "lucide-react"
import LoadingSkeleton from "@/components/shared/LoadingSkeleton"
import EmptyState from "@/components/shared/EmptyState"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ApplicationsPage() {
  const { applications, projects } = useAppContext()
  const [filter, setFilter] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">Accepted</Badge>
      case 'Rejected':
        return <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20">Rejected</Badge>
      case 'Shortlisted':
        return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">Shortlisted</Badge>
      case 'Pending':
      default:
        return <Badge variant="secondary" className="bg-muted text-muted-foreground">Pending</Badge>
    }
  }

  const safeApps = applications || []
  const filteredApps = safeApps.filter(app => {
    if (filter === "All") return true;
    if (filter === "Active") return ['Pending', 'Shortlisted'].includes(app.status);
    return app.status === filter;
  })

  const stats = {
    total: safeApps.length,
    pending: safeApps.filter(a => a.status === 'Pending' || a.status === 'Shortlisted').length,
    accepted: safeApps.filter(a => a.status === 'Accepted').length,
    rejected: safeApps.filter(a => a.status === 'Rejected').length,
  }

  const openProjectDetails = (projectTitle: string) => {
    const project = projects.find(p => p.title === projectTitle)
    if (project) {
      setSelectedProject(project)
    } else {
      toast.error("Project details not found.")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <LoadingSkeleton type="card" count={4} />
        <LoadingSkeleton type="list" count={5} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Applications Dashboard</h1>
        <p className="text-muted-foreground mt-1">Track the status of your project proposals.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applied</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending/Active</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.accepted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b pb-4 overflow-x-auto">
        {['All', 'Active', 'Accepted', 'Rejected'].map(tab => (
          <Button 
            key={tab} 
            variant={filter === tab ? "default" : "ghost"} 
            className="rounded-full px-6"
            onClick={() => setFilter(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Table */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          {filteredApps.length === 0 ? (
            <EmptyState 
              icon={FileText} 
              title="No applications found" 
              description={`You have no ${filter !== 'All' ? filter.toLowerCase() : ''} applications.`}
              actionLabel="Find Work"
              actionHref="/student/find-work"
            />
          ) : (
            <div className="rounded-md border border-muted/50 overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApps.map((app) => (
                    <TableRow key={app.id} className="hover:bg-muted/10">
                      <TableCell className="font-medium text-primary">
                        <button onClick={() => openProjectDetails(app.projectTitle)} className="hover:underline text-left">
                          {app.projectTitle}
                        </button>
                      </TableCell>
                      <TableCell>{app.company}</TableCell>
                      <TableCell className="text-muted-foreground">{app.appliedOn}</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openProjectDetails(app.projectTitle)}>
                          <ExternalLink className="h-4 w-4 mr-2" /> Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-primary font-medium">{selectedProject?.company}</DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm bg-muted/20 p-4 rounded-lg">
                <div>
                  <span className="text-muted-foreground block mb-1">Budget</span>
                  <span className="font-medium">{selectedProject.budget}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Duration</span>
                  <span className="font-medium">{selectedProject.duration}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Deadline</span>
                  <span className="font-medium">{selectedProject.deadline}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Location</span>
                  <span className="font-medium">{selectedProject.remote ? 'Remote' : 'On-site'}</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.description}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Skills Required</h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedProject.skills || []).map((skill: string) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}