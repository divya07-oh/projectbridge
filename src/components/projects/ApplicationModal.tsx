import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
  company: string
  onSubmit: (data: { proposal: string; estimatedDuration: string; budget: number }) => void
}

export default function ApplicationModal({ isOpen, onClose, projectTitle, company, onSubmit }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    proposal: "",
    estimatedDuration: "",
    budget: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.proposal.length < 10) {
      toast.error("Proposal must be at least 10 characters long")
      return
    }
    if (!formData.estimatedDuration) {
      toast.error("Please provide an estimated duration")
      return
    }
    if (!formData.budget || isNaN(Number(formData.budget))) {
      toast.error("Please provide a valid numeric budget")
      return
    }

    onSubmit({
      proposal: formData.proposal,
      estimatedDuration: formData.estimatedDuration,
      budget: Number(formData.budget)
    })
    
    // Reset form after submit
    setFormData({ proposal: "", estimatedDuration: "", budget: "" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Apply to {projectTitle}</DialogTitle>
            <DialogDescription>
              Submit your proposal to {company}. Ensure your proposal highlights why you're a good fit.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="proposal">Cover Letter / Proposal <span className="text-destructive">*</span></Label>
              <Textarea 
                id="proposal" 
                placeholder="Explain why you are the best fit for this project..." 
                className="min-h-[120px]"
                value={formData.proposal}
                onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Proposed Budget (₹) <span className="text-destructive">*</span></Label>
                <Input 
                  id="budget" 
                  type="number"
                  placeholder="e.g. 5000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Estimated Duration <span className="text-destructive">*</span></Label>
                <Input 
                  id="duration" 
                  placeholder="e.g. 14 Days"
                  value={formData.estimatedDuration}
                  onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
