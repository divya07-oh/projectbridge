import { useState } from "react"
import { Link } from "react-router-dom"
import { MOCK_PROJECTS } from "@/data/mockData"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = MOCK_PROJECTS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Find Projects</h1>
          <p className="text-muted-foreground">Browse and apply to the best freelance projects for students.</p>
        </div>
        <Button>Post a Project</Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 space-y-6 flex-shrink-0">
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search projects..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="video">Video Editing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Budget</label>
              <Select defaultValue="any">
                <SelectTrigger>
                  <SelectValue placeholder="Any Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Budget</SelectItem>
                  <SelectItem value="low">Under ₹2,000</SelectItem>
                  <SelectItem value="med">₹2,000 - ₹5,000</SelectItem>
                  <SelectItem value="high">Above ₹5,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Select defaultValue="any">
                <SelectTrigger>
                  <SelectValue placeholder="Any Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Duration</SelectItem>
                  <SelectItem value="week">&lt; 1 Week</SelectItem>
                  <SelectItem value="month">1-4 Weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="flex-1 space-y-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <Card key={project.id} className="flex flex-col hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-primary/5">{project.category}</Badge>
                    <span className="font-bold text-primary">{project.budget}</span>
                  </div>
                  <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    {project.company} 
                    {project.remote && <span className="flex items-center text-xs ml-2"><MapPin className="h-3 w-3 mr-1"/> Remote</span>}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.slice(0,3).map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <span className="text-xs text-muted-foreground">{project.duration}</span>
                  <Link to={`/projects/${project.id}`}>
                    <Button size="sm">Apply Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination Mock */}
          <div className="flex justify-center mt-12 gap-2">
            <Button variant="outline" disabled>Previous</Button>
            <Button variant="outline" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}