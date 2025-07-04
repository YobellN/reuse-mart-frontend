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
import ProductImage from "./product-image";

export default function DetailProductImage({ images }: { images: string[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full pb-6">
      <div className="relative w-full md:w-2/3">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((filename, index) => (
              <CarouselItem key={index} className="px-4">
                <Card className="p-0 ">
                  <CardContent className="relative p-0 aspect-video sm:aspect-3/2  flex items-center justify-center overflow-hidden">
                    <ProductImage
                      filename={filename}
                      style={{ objectFit: "contain" }}
                      className="rounded-lg "
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow text-2xl text-gray-800 hover:bg-gray-100" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow text-2xl text-gray-800 hover:bg-gray-100" />
        </Carousel>
      </div>

      <div className="w-full md:w-64">
        <p className="text-sm font-semibold mb-2">Gambar Produk</p>
        <div className="grid grid-cols-3 gap-2">
          {images.map((filename, index) => (
            <button
              key={index}
              onClick={() => handleThumbClick(index)}
              className={cn(
                "border-2 rounded-md overflow-hidden aspect-square w-full hover:border-green-500",
                current === index
                  ? "border-green-500 ring-2 ring-green-400"
                  : "border-gray-200"
              )}
            >
              <div className="relative w-full h-full">
                <ProductImage
                  filename={filename}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
