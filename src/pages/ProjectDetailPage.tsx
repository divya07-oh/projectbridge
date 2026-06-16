import { useParams, Link } from "react-router-dom"
import { MOCK_PROJECTS } from "@/data/mockData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  CalendarDays, 
  IndianRupee, 
  MapPin, 
  Clock, 
  Users, 
  Building 
} from "lucide-react"

export default function ProjectDetailPage() {
  const { id } = useParams()
  const project = MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0]

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link to="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge>{project.category}</Badge>
              {project.remote && <Badge variant="outline" className="text-muted-foreground"><MapPin className="h-3 w-3 mr-1" /> Remote</Badge>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
            <div className="flex items-center text-muted-foreground gap-4 text-sm">
              <span className="flex items-center"><Building className="h-4 w-4 mr-1" /> {project.company}</span>
              <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> Posted 2 days ago</span>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-bold mb-4">Project Description</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Deliverables</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {project.deliverables.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Skills Required</h2>
            <div className="flex flex-wrap gap-2">
              {project.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm font-medium">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-bold mb-4">About the Client</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.aboutClient}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="sticky top-24 border-primary/20 shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-1">{project.budget}</div>
              <p className="text-sm text-muted-foreground mb-6">Fixed Price</p>
              
              <Button className="w-full h-12 text-lg mb-3 shadow-md shadow-primary/20">Apply Now</Button>
              <div className="flex gap-3 mb-6">
                <Button variant="outline" className="flex-1"><Bookmark className="mr-2 h-4 w-4" /> Save</Button>
                <Button variant="outline" className="flex-1"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <CalendarDays className="h-4 w-4 mr-2" /> Duration
                  </div>
                  <span className="font-medium">{project.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" /> Deadline
                  </div>
                  <span className="font-medium">{new Date(project.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" /> Applicants
                  </div>
                  <span className="font-medium">{project.applicants}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}