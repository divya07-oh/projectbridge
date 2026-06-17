import { useState, useEffect } from "react"
import { useAppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Clock, DollarSign, Bookmark, BookmarkCheck } from "lucide-react"
import { toast } from "sonner"
import LoadingSkeleton from "@/components/shared/LoadingSkeleton"
import EmptyState from "@/components/shared/EmptyState"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FindWorkPage() {
  const { projects, applications, setApplications } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [savedProjects, setSavedProjects] = useState<string[]>([])

  // Simulate network loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const safeProjects = projects || []
  const filteredProjects = safeProjects.filter(p => {
    const titleMatch = p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const companyMatch = p.company?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const skillsMatch = (p.skills || []).some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSearch = titleMatch || companyMatch || skillsMatch;
    const matchesCategory = categoryFilter === "all" || p.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  })

  const handleApply = (project: any) => {
    const hasApplied = applications.some(a => a.projectTitle === project.title)
    if (hasApplied) {
      toast.error("You have already applied to this project!")
      return
    }

    setApplications([
      ...applications,
      {
        id: `app${Date.now()}`,
        projectTitle: project.title,
        company: project.company,
        status: 'Pending',
        appliedOn: new Date().toISOString().split('T')[0]
      }
    ])
    toast.success("Application submitted successfully!")
  }

  const toggleSave = (id: string) => {
    if (savedProjects.includes(id)) {
      setSavedProjects(savedProjects.filter(pId => pId !== id))
      toast.info("Project removed from saved.")
    } else {
      setSavedProjects([...savedProjects, id])
      toast.success("Project saved for later!")
    }
  }

  const categories = ["all", ...new Set(safeProjects.map(p => p.category || 'Other'))]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-full max-w-xl bg-muted rounded animate-pulse" />
        <LoadingSkeleton type="card" count={6} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find Work</h1>
          <p className="text-muted-foreground mt-1">Browse and apply to real-world projects matching your skills.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="border-none shadow-sm bg-muted/30">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by title, company, or skill..." 
              className="pl-9 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[200px] bg-background">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Results */}
      {filteredProjects.length === 0 ? (
        <EmptyState 
          icon={Search} 
          title="No projects found" 
          description="We couldn't find any projects matching your search criteria. Try adjusting your filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm("")
            setCategoryFilter("all")
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="flex flex-col hover:border-primary/50 transition-colors shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">{project.category}</Badge>
                  <button onClick={() => toggleSave(project.id)} className="text-muted-foreground hover:text-primary transition-colors">
                    {savedProjects.includes(project.id) ? (
                      <BookmarkCheck className="h-5 w-5 text-primary fill-primary/20" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <CardTitle className="line-clamp-2 text-xl">{project.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-primary font-medium">
                  {project.company}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {project.budget}</div>
                  <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {project.duration}</div>
                  <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {project.remote ? 'Remote' : 'On-site'}</div>
                </div>
                
                <p className="text-sm line-clamp-3 text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {(project.skills || []).slice(0, 3).map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs bg-muted/50 border-none">{skill}</Badge>
                  ))}
                  {(project.skills || []).length > 3 && (
                    <Badge variant="outline" className="text-xs bg-muted/50 border-none">+{(project.skills || []).length - 3}</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 bg-muted/10 gap-3">
                <Button variant="outline" className="flex-1">View Details</Button>
                <Button className="flex-1" onClick={() => handleApply(project)}>Apply Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
