import { useState } from "react"
import { useAppContext } from "@/context/AppContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Check, X, Bookmark, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function BusinessApplicants() {
  const { applications, setApplications, users, currentUser } = useAppContext()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter applications intended for this business (mocking by company name)
  const businessApps = applications.filter(a => a.company === currentUser?.company || a.company === currentUser?.name)

  const handleAction = (id: string, action: 'Accepted' | 'Rejected' | 'Shortlisted' | 'Pending') => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: action } : app
    ))
    toast.success(`Applicant ${action.toLowerCase()} successfully!`)
  }

  const filteredApps = businessApps.filter(app => 
    app.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (businessApps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center border rounded-xl bg-background shadow-sm p-8">
        <h3 className="text-xl font-bold mb-2">No Applicants Yet</h3>
        <p className="text-muted-foreground">When students apply to your projects, they will appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Applicants</h1>
          <p className="text-muted-foreground">Review and manage student applications for your projects.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search applicants..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredApps.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">No applicants match your search.</div>
        ) : (
          filteredApps.map((app) => {
            // Mocking applicant student details based on index
            const studentName = `Student ${app.id.replace('a', '')}`
            return (
              <Card key={app.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    
                    <div className="flex gap-4 items-start">
                      <Avatar className="h-16 w-16 border">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${studentName}`} />
                        <AvatarFallback>{studentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{studentName}</h3>
                          <Badge variant="outline" className={
                            app.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                            app.status === 'Rejected' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                            app.status === 'Shortlisted' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                            'bg-muted'
                          }>
                            {app.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          Applied for <span className="font-semibold text-foreground">{app.projectTitle}</span> on {new Date(app.appliedOn).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> State University
                        </p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {["React", "TypeScript", "Tailwind"].map(skill => (
                            <Badge key={skill} variant="secondary" className="text-xs font-normal bg-muted/50">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[140px] justify-center">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <ExternalLink className="h-4 w-4 mr-2" /> View Profile
                      </Button>
                      
                      {app.status === 'Pending' || app.status === 'Reviewed' ? (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <Button size="sm" variant="outline" className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200" onClick={() => handleAction(app.id, 'Accepted')}>
                            <Check className="h-4 w-4 mr-1" /> Accept
                          </Button>
                          <Button size="sm" variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20" onClick={() => handleAction(app.id, 'Rejected')}>
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                          <Button size="sm" variant="outline" className="w-full col-span-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200" onClick={() => handleAction(app.id, 'Shortlisted')}>
                            <Bookmark className="h-4 w-4 mr-1" /> Shortlist
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="sm" className="w-full mt-2" onClick={() => handleAction(app.id, 'Pending')}>
                          Undo Action
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
