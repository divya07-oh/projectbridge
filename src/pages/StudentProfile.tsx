import { MOCK_USER } from "@/data/mockData"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, GraduationCap, Link as LinkIcon, Star, Trophy, ExternalLink } from "lucide-react"

export default function StudentProfile() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className="h-32 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
        <CardContent className="px-6 sm:px-10 pb-10 relative">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16 sm:-mt-12 mb-6">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={MOCK_USER.avatar} />
              <AvatarFallback className="text-4xl">{MOCK_USER.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <h1 className="text-3xl font-bold">{MOCK_USER.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                <span className="flex items-center"><GraduationCap className="h-4 w-4 mr-1" /> {MOCK_USER.college}</span>
                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> New Delhi, India</span>
              </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
              <Button className="flex-1 sm:flex-none">Message</Button>
              <Button variant="outline" className="flex-1 sm:flex-none">Hire Me</Button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About Me</h3>
              <p className="text-muted-foreground leading-relaxed">{MOCK_USER.bio}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {MOCK_USER.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Stats & Achievements */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Projects Completed</span>
                <span className="font-bold">{MOCK_USER.projectsCompleted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Rating</span>
                <span className="font-bold flex items-center">
                  {MOCK_USER.stats.rating} <Star className="h-3 w-3 fill-amber-500 text-amber-500 ml-1" />
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_USER.achievements.map((achievement, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{achievement}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Portfolio */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Portfolio</CardTitle>
              <Button variant="ghost" size="sm"><LinkIcon className="h-4 w-4 mr-2" /> Add Project</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {MOCK_USER.portfolio.map((item, i) => (
                <div key={i} className="group relative border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center overflow-hidden relative">
                     {/* Placeholder for portfolio image */}
                     <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                     <span className="font-semibold text-muted-foreground mix-blend-overlay">Project Preview</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{item.title}</h4>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                      <a href={item.link} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}