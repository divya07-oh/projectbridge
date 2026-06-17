import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, DollarSign, Tag, X, CheckCircle2, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

export default function CreateProjectPage() {
  const { projects, setProjects, currentUser } = useAppContext()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: "",
    budget: "",
    duration: "",
    category: "",
    description: "",
    skillInput: "",
    skills: [] as string[]
  })

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && formData.skillInput.trim()) {
      e.preventDefault()
      if (!formData.skills.includes(formData.skillInput.trim())) {
        setFormData({
          ...formData,
          skills: [...formData.skills, formData.skillInput.trim()],
          skillInput: ""
        })
      }
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    })
  }

  const handleClear = () => {
    setFormData({
      title: "",
      budget: "",
      duration: "",
      category: "",
      description: "",
      skillInput: "",
      skills: []
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.budget || !formData.duration || !formData.category || !formData.description) {
      toast.error("Please fill all required fields")
      return
    }

    const newProject = {
      id: `p${Date.now()}`,
      title: formData.title,
      budget: `₹${formData.budget}`,
      duration: `${formData.duration} Days`,
      category: formData.category,
      skills: formData.skills,
      deadline: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0], // 14 days from now
      company: currentUser?.name || "Unknown Company",
      remote: true,
      description: formData.description,
      deliverables: ["Project Files", "Documentation"],
      aboutClient: currentUser?.bio || "A growing business on ProjectNest.",
      applicants: 0
    }

    setProjects([...projects, newProject])
    toast.success("Project posted successfully!")
    navigate('/business')
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <Link to="/business" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Post a New Project</h1>
        <p className="text-muted-foreground">Fill out the details below to hire a student for your project.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardContent className="p-6 space-y-8">
                {/* Basic Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2 border-b pb-2">
                    <Briefcase className="h-5 w-5 text-primary" /> Basic Details
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title <span className="text-destructive">*</span></Label>
                    <Input 
                      id="title" 
                      placeholder="e.g. Build a landing page for my bakery" 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                      <Input 
                        id="category" 
                        placeholder="e.g. Web Development" 
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Scope & Budget */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2 border-b pb-2">
                    <DollarSign className="h-5 w-5 text-emerald-500" /> Scope & Budget
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget (₹) <span className="text-destructive">*</span></Label>
                      <Input 
                        id="budget" 
                        type="number"
                        placeholder="e.g. 5000" 
                        value={formData.budget}
                        onChange={e => setFormData({...formData, budget: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Expected Duration (Days) <span className="text-destructive">*</span></Label>
                      <Input 
                        id="duration" 
                        type="number"
                        placeholder="e.g. 14" 
                        value={formData.duration}
                        onChange={e => setFormData({...formData, duration: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2 border-b pb-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-500" /> Requirements
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description <span className="text-destructive">*</span></Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe the project, what you need, and any specific deliverables..."
                      className="min-h-[150px]"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills</Label>
                    <Input 
                      id="skills" 
                      placeholder="Type a skill and press Enter (e.g. React, Photoshop)" 
                      value={formData.skillInput}
                      onChange={e => setFormData({...formData, skillInput: e.target.value})}
                      onKeyDown={handleAddSkill}
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="pl-3 pr-2 py-1.5 flex items-center gap-1">
                          {skill}
                          <button type="button" onClick={() => removeSkill(skill)} className="text-muted-foreground hover:text-foreground">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <Button type="submit" className="flex-1">Post Project</Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={handleClear}>Clear Form</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Live Preview Sidebar */}
        <div className="hidden lg:block space-y-6">
          <div className="sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-muted-foreground flex items-center gap-2">
              <Tag className="h-5 w-5" /> Live Preview
            </h3>
            <Card className="shadow-lg border-primary/20">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 shadow-none">
                    {formData.category || "Category"}
                  </Badge>
                  <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-200">
                    Remote
                  </Badge>
                </div>
                <CardTitle className="line-clamp-2 text-xl">{formData.title || "Your Project Title"}</CardTitle>
                <CardDescription className="text-primary font-medium mt-1">{currentUser?.name || "Your Company Name"}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {formData.description || "The project description will appear here. Write a detailed description to attract the best students."}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {formData.skills.length > 0 ? (
                    formData.skills.slice(0, 3).map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs font-normal bg-muted">{skill}</Badge>
                    ))
                  ) : (
                    <>
                      <Badge variant="secondary" className="text-xs font-normal bg-muted">Skill 1</Badge>
                      <Badge variant="secondary" className="text-xs font-normal bg-muted">Skill 2</Badge>
                    </>
                  )}
                  {formData.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs font-normal bg-muted">+{formData.skills.length - 3}</Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Budget</p>
                    <p className="font-semibold text-sm flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-emerald-500" /> 
                      {formData.budget ? `₹${formData.budget}` : "₹0"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="font-semibold text-sm flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-blue-500" /> 
                      {formData.duration ? `${formData.duration} Days` : "0 Days"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 p-4 bg-muted/40 rounded-lg text-sm text-muted-foreground border">
              <strong className="text-foreground block mb-1">Tips for a good listing:</strong>
              <ul className="list-disc list-inside space-y-1">
                <li>Be specific about the outcome.</li>
                <li>Set a realistic budget for students.</li>
                <li>List exact skills needed.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}