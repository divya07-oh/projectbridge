import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  actionHref,
  onAction 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center border rounded-xl bg-background shadow-sm p-8">
      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Icon className="h-8 w-8 text-primary opacity-80" />
      </div>
      <h3 className="text-2xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-8 max-w-md">{description}</p>
      
      {actionLabel && (
        actionHref ? (
          <Button asChild className="px-8 shadow-md hover:shadow-lg transition-shadow">
            <a href={actionHref}>{actionLabel}</a>
          </Button>
        ) : onAction ? (
          <Button onClick={onAction} className="px-8 shadow-md hover:shadow-lg transition-shadow">
            {actionLabel}
          </Button>
        ) : null
      )}
    </div>
  )
}
