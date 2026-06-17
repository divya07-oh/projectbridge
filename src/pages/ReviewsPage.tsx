import { MOCK_REVIEWS, MOCK_USER } from "@/data/mockData"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star, Trophy, Clock, CheckCircle2, ThumbsUp } from "lucide-react"

export default function ReviewsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Reputation & Reviews</h1>
        <p className="text-muted-foreground">Manage your public reputation and read client feedback.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column: Stats & Badges */}
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Overall Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold text-primary">{MOCK_USER.stats.rating}</div>
                <div className="space-y-1">
                  <div className="flex gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-5 w-5 ${star <= Math.floor(MOCK_USER.stats.rating) ? 'fill-current' : 'fill-muted text-muted'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Based on {MOCK_USER.projectsCompleted} reviews</p>
                </div>
              </div>

              <Separator className="bg-primary/10" />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Completion Rate</span>
                  <span className="font-bold">100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2"><Clock className="h-4 w-4 text-blue-500" /> Response Rate</span>
                  <span className="font-bold">&lt; 1 hour</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2"><ThumbsUp className="h-4 w-4 text-indigo-500" /> Rehire Rate</span>
                  <span className="font-bold">40%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Earned Badges</CardTitle>
              <CardDescription>Badges shown on your public profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_USER.achievements.map((achievement, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{achievement}</h4>
                    <p className="text-xs text-muted-foreground">Awarded by ProjectNest</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Reviews List */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">Client Feedback ({MOCK_REVIEWS.length})</h3>
          
          <div className="space-y-4">
            {MOCK_REVIEWS.map((review: any) => (
              <Card key={review.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${review.id}`} />
                        <AvatarFallback>{review.client.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold leading-none">{review.client}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Project Client</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-1 text-amber-500 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-4 w-4 ${star <= Math.floor(review.rating) ? 'fill-current' : 'fill-muted text-muted'}`} />
                    ))}
                    <span className="text-sm font-bold text-foreground ml-2">{review.rating}</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{review.text}"
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-muted/50 flex items-center gap-2">
                    <Badge variant="secondary" className="font-normal text-xs bg-muted/50">Verified Project</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}