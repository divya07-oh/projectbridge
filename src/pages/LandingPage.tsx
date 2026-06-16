import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MOCK_PROJECTS } from "@/data/mockData"
import { ArrowRight, CheckCircle2, Star, TrendingUp, Users, Briefcase, User } from "lucide-react"

export default function LandingPage() {
  const featuredProjects = MOCK_PROJECTS.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5 text-sm">
            🚀 The #1 Platform for Student Freelancers
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
            Get Your First <span className="text-primary">Paid Project</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with startups and businesses looking for talented students. Build your portfolio, gain real-world experience, and earn money while studying.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/projects">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-lg shadow-primary/25">
                Find Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/business/create-project">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto">
                Post a Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">10,000+</h3>
              <p className="text-muted-foreground font-medium">Active Students</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">3,000+</h3>
              <p className="text-muted-foreground font-medium">Projects Posted</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">₹25L+</h3>
              <p className="text-muted-foreground font-medium">Money Earned</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">4.9/5</h3>
              <p className="text-muted-foreground font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How ProjectNest Works</h2>
            <p className="text-lg text-muted-foreground">Four simple steps to jumpstart your freelance career.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10 -translate-y-1/2" />
            
            {[
              { title: "Create Profile", icon: User, desc: "Showcase your skills, portfolio, and education." },
              { title: "Apply Projects", icon: Briefcase, desc: "Browse and apply to projects that match your skills." },
              { title: "Get Hired", icon: CheckCircle2, desc: "Interview with clients and get the project awarded." },
              { title: "Earn Money", icon: TrendingUp, desc: "Deliver high-quality work and get paid securely." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-background">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-sm border border-primary/20">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-4 bg-muted/20 border-y">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-lg text-muted-foreground">Discover the latest opportunities from top companies.</p>
            </div>
            <Link to="/projects">
              <Button variant="ghost" className="font-medium">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <Card key={project.id} className="hover:shadow-lg transition-all hover:border-primary/50 flex flex-col group cursor-pointer" onClick={() => window.location.href=`/projects/${project.id}`}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-background">{project.category}</Badge>
                    <span className="font-bold text-lg text-primary">{project.budget}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                  <CardDescription>{project.company} • {project.duration}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.slice(0, 3).map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-muted/50">
                  <Button className="w-full" variant="secondary">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Success Stories</h2>
            <p className="text-lg text-muted-foreground">Hear from students who kickstarted their careers here.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Priya Sharma", role: "UI/UX Designer", text: "ProjectNest helped me land my first client. I've now completed 5 projects and built a solid portfolio before graduating!" },
              { name: "Rahul Verma", role: "Frontend Developer", text: "The businesses here understand we are students. It's the perfect environment to learn, make mistakes, and grow professionally." },
              { name: "Sneha Reddy", role: "Content Writer", text: "I easily found remote writing gigs that fit perfectly around my college schedule. The payment process is super smooth." }
            ].map((testimonial, i) => (
              <Card key={i} className="bg-muted/10 border-none shadow-md">
                <CardHeader>
                  <div className="flex gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <CardDescription className="text-base text-foreground italic">
                    "{testimonial.text}"
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}