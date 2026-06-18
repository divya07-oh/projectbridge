import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MOCK_PROJECTS } from "@/data/mockData"
import { ArrowRight, CheckCircle2, Star, TrendingUp, Users, Briefcase, User, ChevronLeft, ChevronRight } from "lucide-react"

export default function LandingPage() {
  const featuredProjects = MOCK_PROJECTS.slice(0, 6);

  const successStories = [
    { name: "Priya Sharma", college: "Delhi University", skill: "UI/UX Designer", completed: 15, earned: "₹45,000", text: "ProjectNest helped me land my first client. I've now completed multiple projects and built a solid portfolio before graduating!" },
    { name: "Rahul Verma", college: "IIT Bombay", skill: "Frontend Developer", completed: 8, earned: "₹60,000", text: "The businesses here understand we are students. It's the perfect environment to learn, make mistakes, and grow professionally." },
    { name: "Sneha Reddy", college: "Christ University", skill: "Content Writer", completed: 12, earned: "₹25,000", text: "I easily found remote writing gigs that fit perfectly around my college schedule. The payment process is super smooth." },
    { name: "Aditya Singh", college: "NIT Surathkal", skill: "Backend Developer", completed: 5, earned: "₹80,000", text: "Got to work on real scalable systems. The experience I gained here helped me crack my full-time placement interviews easily." },
    { name: "Meera Patel", college: "NID Ahmedabad", skill: "Graphic Designer", completed: 22, earned: "₹55,000", text: "From logos to full brand identities, I found diverse clients. It gave me the creative freedom and financial independence I needed." },
    { name: "Karan Gupta", college: "VIT Vellore", skill: "Data Analyst", completed: 7, earned: "₹35,000", text: "Helped startups make sense of their data. The platform's interface is seamless, and I love the direct communication with founders." }
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [successStories.length, isHovering]);

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
      <section id="how-it-works" className="py-24 px-4 bg-background overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">How ProjectBridge Works</h2>
            <p className="text-lg text-muted-foreground">Four simple steps to jumpstart your freelance career.</p>
          </div>
          
          <div className="relative mb-12">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 -z-10" />
            
            <div className="grid md:grid-cols-4 gap-8 md:gap-6 relative">
              {[
                { title: "Create Student Profile", icon: User, step: "1" },
                { title: "Browse Projects", icon: Briefcase, step: "2" },
                { title: "Apply & Connect", icon: CheckCircle2, step: "3" },
                { title: "Complete Work & Earn", icon: TrendingUp, step: "4" }
              ].map((step, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col items-center text-center group cursor-pointer transition-all duration-300 ${activeStep === i ? 'scale-105' : 'hover:scale-105 opacity-70 hover:opacity-100'}`}
                  onClick={() => setActiveStep(i)}
                >
                  <div className="relative mb-6">
                    <div className={`h-24 w-24 rounded-full bg-background border-4 flex items-center justify-center shadow-sm transition-all duration-300 relative z-10 ${activeStep === i ? 'border-primary shadow-primary/20 -translate-y-2' : 'border-muted/50'}`}>
                      <step.icon className={`h-10 w-10 transition-colors duration-300 ${activeStep === i ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className={`absolute -top-3 -right-3 h-8 w-8 rounded-full font-bold flex items-center justify-center text-sm shadow-md transition-all duration-300 z-20 ${activeStep === i ? 'bg-primary text-primary-foreground scale-110' : 'bg-muted text-muted-foreground'}`}>
                      {step.step}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${activeStep === i ? 'text-primary' : ''}`}>{step.title}</h3>
                </div>
              ))}
            </div>
          </div>
          
          {/* Active Step Details */}
          <div className="max-w-2xl mx-auto bg-muted/20 p-8 rounded-2xl border text-center animate-in fade-in zoom-in duration-500 shadow-sm" key={activeStep}>
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Step {activeStep + 1}: {[
                "Create Student Profile",
                "Browse Projects",
                "Apply & Connect",
                "Complete Work & Earn"
              ][activeStep]}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {[
                "Students create a profile, add skills, upload portfolio projects and showcase their abilities.",
                "Students explore available projects posted by businesses and startups.",
                "Students apply to projects and communicate directly with businesses.",
                "Students complete projects, build experience and earn money."
              ][activeStep]}
            </p>
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
      <section id="success-stories" className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Success Stories</h2>
            <p className="text-lg text-muted-foreground">Hear from students who kickstarted their careers here.</p>
          </div>

          <div 
            className="relative max-w-4xl mx-auto overflow-hidden rounded-2xl bg-muted/10 p-6 md:p-12 shadow-inner border group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <button 
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 shadow-md border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-background"
              onClick={() => setCurrentTestimonial(prev => prev === 0 ? successStories.length - 1 : prev - 1)}
              aria-label="Previous story"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 shadow-md border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-background"
              onClick={() => setCurrentTestimonial(prev => (prev + 1) % successStories.length)}
              aria-label="Next story"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {successStories.map((testimonial, i) => (
                <div key={i} className="min-w-full px-4 flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full border-4 border-background shadow-lg overflow-hidden bg-primary/20 flex items-center justify-center text-4xl font-bold text-primary">
                    {testimonial.name[0]}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1 text-amber-500 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                    </div>
                    <blockquote className="text-xl md:text-2xl text-foreground font-medium italic mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                      <div>
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-primary font-medium">{testimonial.skill}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.college}</p>
                      </div>
                      <div className="flex gap-4 justify-center md:justify-end text-sm">
                        <div className="bg-background rounded-lg p-3 border shadow-sm text-center">
                          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Completed</p>
                          <p className="font-bold">{testimonial.completed} Projects</p>
                        </div>
                        <div className="bg-background rounded-lg p-3 border shadow-sm text-center">
                          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Earned</p>
                          <p className="font-bold text-emerald-600">{testimonial.earned}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {successStories.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-8 bg-primary' : 'w-2.5 bg-primary/20 hover:bg-primary/40'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}