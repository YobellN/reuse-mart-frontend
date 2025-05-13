"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import ProductImageModal from "./product-image-modal"; // pastikan ini ada
import ProductImage from "./product-image";

type Props = {
  images: string[];
};

export default function ProductCarouselApi({ images }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  console.log("=================================");
  console.log(images);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleThumbClick = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
  };

  return (
    <div className="w-full max-w-xl">
      {/* Main Carousel */}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index} className="px-2">
              <Card>
                <CardContent className="p-0 aspect-video flex items-center justify-center overflow-hidden">
                  {/* <Image
                    src={`/storage/foto-produk/${img}`}
                    alt={`Gambar Produk ${index + 1}`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full rounded-xl"
                  /> */}
                  <ProductImage
                    filename={`$img`}
                    style={{ objectFit: "cover" }}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-16 bg-transparent text-4xl text-gray-800" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-16 bg-transparent text-4xl text-gray-800" />
      </Carousel>

      {/* Thumbnail & Modal */}
      <div className="mt-4 hidden sm:flex items-center gap-2">
        <div className="flex gap-2 overflow-x-auto max-w-md">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleThumbClick(index)}
              className={cn(
                "border rounded-xl overflow-hidden transition-opacity",
                current === index
                  ? "opacity-100 border-green-600"
                  : "opacity-50 border-gray-300"
              )}
            >
              <Image
                src={`/storage/foto-produk/${img}`}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="object-cover w-16 h-16"
              />
            </button>
          ))}
        </div>

        <ProductImageModal
          images={images.map((img) => `/storage/foto-produk/${img}`)}
          trigger={
            <button className="ml-4 px-3 py-1 border border-green-600 text-green-600 rounded-md text-sm hover:bg-green-600 hover:text-white transition">
              Lihat semua →
            </button>
          }
        />
      </div>
    </div>
  );
}
