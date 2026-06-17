import { useState } from "react"
import { useAppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Save, Edit2, Camera, X } from "lucide-react"
import { toast } from "sonner"

export default function BusinessProfile() {
  const { currentUser, setCurrentUser } = useAppContext()
  const [isEditing, setIsEditing] = useState(false)
  
  const [formData, setFormData] = useState({
    company: currentUser?.company || "",
    bio: currentUser?.bio || "",
    email: currentUser?.email || "",
    website: "https://example.com",
    industry: "Technology",
    location: "New York, USA"
  })

  const handleSave = () => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        name: formData.company,
        company: formData.company,
        bio: formData.bio,
        email: formData.email
      })
      toast.success("Company profile updated successfully!")
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      company: currentUser?.company || "",
      bio: currentUser?.bio || "",
      email: currentUser?.email || "",
      website: "https://example.com",
      industry: "Technology",
      location: "New York, USA"
    })
    setIsEditing(false)
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Company Profile</h1>
          <p className="text-muted-foreground">Manage your business identity and public details.</p>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>This information will be displayed publicly on your project listings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${currentUser.company || currentUser.name}&background=random`} />
                <AvatarFallback>{(currentUser.company || currentUser.name).charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {isEditing && (
              <div className="flex-1 space-y-1">
                <Label>Company Logo</Label>
                <div className="flex gap-2">
                  <Input type="file" className="max-w-[250px]" />
                  <Button variant="outline">Upload</Button>
                </div>
                <p className="text-xs text-muted-foreground">Recommended: Square image, at least 256x256px.</p>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t">
            <div className="space-y-2">
              <Label>Company Name</Label>
              {isEditing ? (
                <Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
              ) : (
                <p className="font-medium text-foreground p-2 bg-muted/30 rounded-md border border-transparent">{currentUser.company || currentUser.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Contact Email</Label>
              {isEditing ? (
                <Input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              ) : (
                <p className="font-medium text-foreground p-2 bg-muted/30 rounded-md border border-transparent">{currentUser.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Website</Label>
              {isEditing ? (
                <Input value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} />
              ) : (
                <a href={formData.website} target="_blank" rel="noreferrer" className="block font-medium text-primary hover:underline p-2 bg-muted/30 rounded-md border border-transparent">
                  {formData.website}
                </a>
              )}
            </div>

            <div className="space-y-2">
              <Label>Industry</Label>
              {isEditing ? (
                <Input value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} />
              ) : (
                <p className="font-medium text-foreground p-2 bg-muted/30 rounded-md border border-transparent">{formData.industry}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Company Description</Label>
            {isEditing ? (
              <Textarea 
                value={formData.bio} 
                onChange={e => setFormData({...formData, bio: e.target.value})} 
                className="min-h-[120px]"
                placeholder="Briefly describe what your company does..."
              />
            ) : (
              <p className="text-muted-foreground leading-relaxed p-4 bg-muted/30 rounded-md whitespace-pre-wrap border border-transparent">
                {currentUser.bio || "No description provided."}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
