import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <Card className="border rounded-xl overflow-hidden shadow-md p-0">
            <CardHeader className="border-b p-4 bg-secondary">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-32 rounded" />
                        <Skeleton className="h-6 w-24 rounded" />
                    </div>
                    <Skeleton className="h-5 w-28" />
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-4 p-4 border-b">
                        <Skeleton className="w-20 h-20 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                    </div>
                ))}
            </CardContent>

            <div className="border-t p-4 space-y-3">
                <Skeleton className="h-6 w-2/3" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                </div>
            </div>
        </Card>
    );
}
