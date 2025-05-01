import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div>
      <div className="my-6 bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto scroll-smooth 2xl:justify-evenly 2xl:overflow-x-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="shrink-0 max-w-[102px] flex justify-center snap-start mb-2"
            >
              <Card className="w-full h-40 flex flex-col items-center justify-center hover:shadow-md hover:border-2 hover:border-green-500 cursor-pointer transition-all duration-300 ease-in-out py-0 rounded-lg bg-white">
                <CardContent className="flex flex-col items-center align-top pt-2 h-full">
                  <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="my-6 bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="grid gap-2 md:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="shrink-0 max-w-[102px] flex justify-center snap-start mb-2"
            >
              <Card className="w-full h-40 flex flex-col items-center justify-center hover:shadow-md hover:border-2 hover:border-green-500 cursor-pointer transition-all duration-300 ease-in-out py-0 rounded-lg bg-white">
                <CardContent className="flex flex-col items-center align-top pt-2 h-full">
                  <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="my-6 bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="grid gap-2 md:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="shrink-0 max-w-[102px] flex justify-center snap-start mb-2"
            >
              <Card className="w-full h-40 flex flex-col items-center justify-center hover:shadow-md hover:border-2 hover:border-green-500 cursor-pointer transition-all duration-300 ease-in-out py-0 rounded-lg bg-white">
                <CardContent className="flex flex-col items-center align-top pt-2 h-full">
                  <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
