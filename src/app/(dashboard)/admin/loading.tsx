
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export default function Loading() {
  return (
    <div className={cn("flex flex-col gap-4 p-6")}>
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/3" /> 
        <Skeleton className="h-4 w-1/2" /> 
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}
