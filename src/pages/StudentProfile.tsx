import { useState, useRef } from "react"
import { useAppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, MapPin, Briefcase, Link as LinkIcon, Camera, Edit2, Save, X, Globe, User } from "lucide-react"
import { toast } from "sonner"

export default function StudentProfile() {
  const { currentUser, setCurrentUser } = useAppContext()
  const [isEditing, setIsEditing] = useState(false)
  
  const coverInputRef = useRef<HTMLInputElement>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'avatar') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setCurrentUser({
          ...currentUser!,
          [type === 'cover' ? 'coverImage' : 'avatar']: base64String
        })
        toast.success(`${type === 'cover' ? 'Cover' : 'Profile'} image updated!`)
      }
      reader.readAsDataURL(file)
    }
  }
  
  // Form State
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    bio: currentUser?.bio || "",
    college: currentUser?.college || "",
    skills: currentUser?.skills ? currentUser.skills.join(", ") : "",
    github: currentUser?.portfolio?.find(p => p.title === "GitHub")?.link || "",
    linkedin: currentUser?.portfolio?.find(p => p.title === "LinkedIn")?.link || "",
    website: currentUser?.portfolio?.find(p => p.title === "Website")?.link || "",
  })

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const handleSave = () => {
    const updatedSkills = formData.skills.split(",").map(s => s.trim()).filter(s => s !== "")
    const updatedPortfolio = []
    if (formData.github) updatedPortfolio.push({ title: "GitHub", link: formData.github })
    if (formData.linkedin) updatedPortfolio.push({ title: "LinkedIn", link: formData.linkedin })
    if (formData.website) updatedPortfolio.push({ title: "Website", link: formData.website })

    setCurrentUser({
      ...currentUser,
      name: formData.name,
      bio: formData.bio,
      college: formData.college,
      skills: updatedSkills,
      portfolio: updatedPortfolio
    })
    setIsEditing(false)
    toast.success("Profile saved successfully!")
  }

  const handleCancel = () => {
    setFormData({
      name: currentUser.name || "",
      bio: currentUser.bio || "",
      college: currentUser.college || "",
      skills: currentUser.skills ? currentUser.skills.join(", ") : "",
      github: currentUser?.portfolio?.find(p => p.title === "GitHub")?.link || "",
      linkedin: currentUser?.portfolio?.find(p => p.title === "LinkedIn")?.link || "",
      website: currentUser?.portfolio?.find(p => p.title === "Website")?.link || "",
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Hidden File Inputs */}
      <input 
        type="file" 
        accept="image/jpeg, image/png, image/webp" 
        hidden 
        ref={coverInputRef} 
        onChange={(e) => handleImageUpload(e, 'cover')} 
      />
      <input 
        type="file" 
        accept="image/jpeg, image/png, image/webp" 
        hidden 
        ref={profileInputRef} 
        onChange={(e) => handleImageUpload(e, 'avatar')} 
      />

      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div 
          className="h-32 bg-gradient-to-r from-primary/80 to-primary/40 relative bg-cover bg-center"
          style={currentUser.coverImage ? { backgroundImage: `url(${currentUser.coverImage})` } : {}}
        >
          {isEditing && (
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute top-4 right-4"
              onClick={() => coverInputRef.current?.click()}
            >
              <Camera className="h-4 w-4 mr-2" /> Change Cover
            </Button>
          )}
        </div>
        <CardContent className="p-6 pt-0 relative sm:flex sm:items-end sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-6 -mt-12 sm:-mt-16 items-center sm:items-end text-center sm:text-left">
            <div className="relative">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background shadow-lg bg-background">
                <AvatarImage src={currentUser.avatar || ''} className="object-cover" />
                <AvatarFallback className="bg-muted">
                  <User className="h-12 w-12 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button 
                  className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-colors"
                  onClick={() => profileInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="pb-2">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                {isEditing ? (
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="font-bold text-xl sm:text-3xl max-w-[250px] h-10"
                  />
                ) : (
                  <h1 className="font-bold text-2xl sm:text-3xl">{currentUser.name}</h1>
                )}
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">Student</Badge>
              </div>
              
              {isEditing ? (
                <Input 
                  value={formData.college} 
                  onChange={(e) => setFormData({...formData, college: e.target.value})}
                  className="mt-2 max-w-[300px] h-8 text-sm"
                  placeholder="University / College"
                />
              ) : (
                <p className="text-muted-foreground mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <MapPin className="h-4 w-4" /> {currentUser.college || "Add your college"}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 sm:mt-0 flex gap-3 justify-center">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" /> Save Profile
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column (Main Info) */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea 
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="min-h-[120px]"
                  placeholder="Tell clients about yourself..."
                />
              ) : (
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {currentUser.bio || "No bio added yet."}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio & Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>GitHub URL</Label>
                    <Input 
                      value={formData.github}
                      onChange={(e) => setFormData({...formData, github: e.target.value})}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn URL</Label>
                    <Input 
                      value={formData.linkedin}
                      onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Personal Website</Label>
                    <Input 
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentUser.portfolio && currentUser.portfolio.length > 0 ? (
                    currentUser.portfolio.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {item.title === 'GitHub' && <Globe className="h-4 w-4 text-muted-foreground" />}
                        {item.title === 'LinkedIn' && <Globe className="h-4 w-4 text-muted-foreground" />}
                        {item.title === 'Website' && <LinkIcon className="h-4 w-4 text-muted-foreground" />}
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline font-medium">
                          {item.title}: {item.link}
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No portfolio items added yet.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Sidebar Stats/Skills) */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Projects Completed</span>
                <span className="font-bold">{currentUser.projectsCompleted || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Total Earnings</span>
                <span className="font-bold">₹{currentUser.stats?.rating ? 45000 : 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Rating</span>
                <span className="font-bold flex items-center">
                  {currentUser.stats?.rating || 0} <Globe className="h-3 w-3 text-amber-500 ml-1" />
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-2">
                  <Label>Skills (comma separated)</Label>
                  <Textarea 
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    placeholder="React, TypeScript, UI Design..."
                    className="min-h-[100px]"
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {currentUser.skills && currentUser.skills.length > 0 ? (
                    currentUser.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-muted hover:bg-muted/80">{skill}</Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No skills added yet.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}