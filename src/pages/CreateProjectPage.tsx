import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { MapPin, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function CreateProjectPage() {
  const [title, setTitle] = useState("Example Project Title")
  const [budget, setBudget] = useState("₹5,000")
  const [category, setCategory] = useState("Web Development")
  const [duration, setDuration] = useState("2 Weeks")

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <Link to="/business" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Post a New Project</h1>
        <p className="text-muted-foreground">Fill out the details to find the perfect student freelancer for your task.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
              <CardDescription>Provide the core information about your project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title <span className="text-destructive">*</span></Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Build a landing page for my startup" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Writing">Writing</SelectItem>
                      <SelectItem value="Video Editing">Video Editing</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (Fixed Price) <span className="text-destructive">*</span></Label>
                  <Input 
                    id="budget" 
                    placeholder="e.g. ₹5,000" 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description <span className="text-destructive">*</span></Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the problem you are trying to solve, what you need the student to do, and any specific requirements." 
                  className="min-h-[150px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements & Deliverables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <Input id="skills" placeholder="e.g. React, Figma, Copywriting (Comma separated)" />
                <p className="text-xs text-muted-foreground">Press enter or comma to add a skill.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Estimated Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Less than 1 week">Less than 1 week</SelectItem>
                      <SelectItem value="1 Week">1 Week</SelectItem>
                      <SelectItem value="2 Weeks">2 Weeks</SelectItem>
                      <SelectItem value="1 Month">1 Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input type="date" id="deadline" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliverables">Deliverables</Label>
                <Textarea 
                  id="deliverables" 
                  placeholder="List exactly what the student needs to deliver (e.g. 1 Figma file, source code on GitHub, etc.)" 
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4 border-t pt-6 bg-muted/20">
              <Button variant="ghost">Save Draft</Button>
              <Button className="px-8 shadow-md" onClick={() => alert("Mock Project Posted!")}>Post Project</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Live Preview Sidebar */}
        <div className="space-y-6">
          <div className="sticky top-24">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              Preview
            </h3>
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-primary/5">{category}</Badge>
                  <span className="font-bold text-primary">{budget || "₹0"}</span>
                </div>
                <CardTitle className="line-clamp-2">{title || "Untitled Project"}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  Your Company 
                  <span className="flex items-center text-xs ml-2"><MapPin className="h-3 w-3 mr-1"/> Remote</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  Project description will appear here based on your input. Make it clear and exciting!
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs font-normal">Skill 1</Badge>
                  <Badge variant="secondary" className="text-xs font-normal">Skill 2</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <span className="text-xs text-muted-foreground">{duration}</span>
                <Button size="sm" disabled>Apply Now</Button>
              </CardFooter>
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