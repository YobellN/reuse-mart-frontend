"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const banner = [
  {
    title: "Reuse Mart Banner 1",
    icon: "/banner/banner1.png",
  },
  {
    title: "Reuse Mart Banner 2",
    icon: "/banner/banner2.png",
  },
  {
    title: "Reuse Mart Banner 3",
    icon: "/banner/banner3.png",
  },
  {
    title: "Reuse Mart Banner 4",
    icon: "/banner/banner4.png",
  },
];

export default function HomeCarousel() {
  return (
    <div className="my-6 shadow-xl/20">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {banner.map((banner) => (
            <CarouselItem
              key={banner.title}
              className="w-full h-36 md:h-72 relative"
            >
              <Image
                src={banner.icon}
                alt={banner.title}
                fill
                className="object-cover rounded-2xl px-1"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
