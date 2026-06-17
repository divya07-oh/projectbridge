import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'profile' | 'form'
  count?: number
}

export default function LoadingSkeleton({ type = 'card', count = 3 }: LoadingSkeletonProps) {
  const renderCardSkeleton = () => (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <Skeleton className="h-6 w-3/4 mb-4" />
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="px-6 py-4 bg-muted/20 border-t flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )

  const renderListSkeleton = () => (
    <div className="flex items-center space-x-4 p-4 border-b">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  )

  const renderProfileSkeleton = () => (
    <div className="space-y-6">
      <Card>
        <div className="h-32 bg-muted relative" />
        <CardContent className="p-6 pt-0 relative sm:flex sm:items-end sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-6 -mt-12 sm:-mt-16 items-center sm:items-end">
            <Skeleton className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-background" />
            <div className="space-y-2 pb-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="mt-6 sm:mt-0 flex gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </Card>
          <Card className="p-6 space-y-4">
            <Skeleton className="h-6 w-48" />
            {renderListSkeleton()}
            {renderListSkeleton()}
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )

  if (type === 'profile') return renderProfileSkeleton()

  return (
    <div className={type === 'card' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          {type === 'card' && renderCardSkeleton()}
          {type === 'list' && renderListSkeleton()}
        </div>
      ))}
    </div>
  )
}
