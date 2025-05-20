"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import ProductImageModal from "./product-image-modal";
import ProductImage from "./product-image";

export default function ProductCarousel({ images }: { images: string[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleThumbClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="w-full max-w-xl">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index} className="px-2">
              <Card className="p-0 ">
                <CardContent className="relative p-0 aspect-video sm:min-h-84 flex items-center justify-center overflow-hidden">
                  <ProductImage
                    filename={img}
                    style={{ objectFit: "cover" }}
                    className="rounded-lg "
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-16 bg-transparent rounded-none flex items-center justify-center text-4xl font-bold text-gray-800" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-16 bg-transparent rounded-none flex items-center justify-center text-4xl font-bold text-gray-800" />
      </Carousel>

      <div className="mt-4 hidden sm:flex items-center gap-2">
        <div className="flex-1">
          <Carousel>
            <CarouselContent className="flex">
              {images.slice(0, 3).map((img, index) => (
                <CarouselItem
                  key={index}
                  className={cn(
                    "basis-1/3 cursor-pointer px-2",
                    current === index + 1 ? "opacity-100" : "opacity-50"
                  )}
                  onClick={() => handleThumbClick(index)}
                >
                  <Card className="p-0">
                    <CardContent className="relative aspect-square sm:h-24">
                      <ProductImage
                        filename={img}
                        style={{ objectFit: "cover" }}
                        className="rounded-lg border-2 border-green-600"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <ProductImageModal
          images={images}
          trigger={
            <button className="flex items-center gap-1 px-3 py-1 border border-green-600 text-green-600 rounded-md text-sm bg-transparent hover:bg-green-600 hover:text-white transition-colors">
              Lihat semua <span className="text-base">→</span>
            </button>
          }
        />
      </div>
    </div>
  );
}
