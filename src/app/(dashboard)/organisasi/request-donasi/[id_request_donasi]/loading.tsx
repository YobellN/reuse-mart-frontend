'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <Card className="max-w-2xl mx-auto mt-10 shadow-md relative overflow-visible">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          <Skeleton className="h-6 w-40 mx-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i}>
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}

        <div>
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-9 w-[200px]" />
        </div>

        <div>
          <Skeleton className="h-4 w-40 mb-1" />
          <Skeleton className="h-9 w-[280px]" />
        </div>

        <div className="pt-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
