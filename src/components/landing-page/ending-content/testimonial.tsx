"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Alicia Putri",
    designation: "Marketing Specialist",
    company: "EcoMarket",
    testimonial:
      "Platform ini sangat membantu saya untuk belanja barang preloved dengan bijak. Selain hemat, saya juga merasa ikut menjaga lingkungan.",
    avatar:
      "https://images.unsplash.com/photo-1647857341173-ba5b94fb4094?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Bayu Pratama",
    designation: "Product Manager",
    company: "InnovateX",
    testimonial:
      "Saya coba titip beberapa barang yang sudah tidak terpakai, dan semuanya laku dalam waktu singkat. Prosesnya praktis, transparan, dan sangat efisien!",
    avatar:
      "https://images.unsplash.com/photo-1540541382853-9d06e3479235?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Clara Rahma",
    designation: "Community Volunteer",
    company: "SocialCare",
    testimonial:
      "Program donasi dari ReuseMart sangat membantu masyarakat sekitar. Saya suka bagaimana semuanya tercatat dan dilaporkan dengan jelas.",
    avatar:
      "https://images.unsplash.com/photo-1598094574448-07849bfa445d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Yosef Kogeya",
    designation: "Fotografer",
    company: "DesignPro",
    testimonial:
      "Tampilan aplikasinya simpel dan bersih, membuat pengalaman transaksi jauh lebih menyenangkan. Saya suka fitur rating dan tracking barangnya.",
    avatar:
      "https://images.unsplash.com/photo-1671895317509-9fc2d4cbf3b4?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const TestimonialPage = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="bg-green-50">
      <div className=" h-16 bg-white rounded-t-full" />
      <div className="min-h-[calc(100vh-18rem)] md:min-h-screen w-full flex justify-center items-start bg-white">
        <div className="w-5/6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-green-800 mt-8 mb-16">
            Testimonials
          </h2>

          <div className="container w-full lg:max-w-screen-lg xl:max-w-screen mx-auto">
            <Carousel setApi={setApi}>
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id}>
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn("h-3.5 w-3.5 rounded-full border-2", {
                    "bg-primary border-primary": current === index + 1,
                  })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) => (
  <div className="mb-8 rounded-xl py-8 px-6 ms-2 me-6 sm:py-6 bg-gradient-to-br from-white via-green-100 to-white border border-green-300 shadow-md">
    <div className="flex items-center justify-between gap-20">
      <div className="hidden lg:block relative shrink-0 aspect-[3/4] max-w-[18rem] w-full">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          fill
          className="object-cover rounded-xl"
        />

        <div className="absolute top-1/4 right-[-1.5rem] h-12 w-12 bg-primary rounded-full flex items-center justify-center shadow-md">
          <svg
            width="102"
            height="102"
            viewBox="0 0 102 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path
              d="M26.0063 19.8917C30.0826 19.8625 33.7081 20.9066 36.8826 23.024C40.057 25.1414 42.5746 28.0279 44.4353 31.6835C46.2959 35.339 47.2423 39.4088 47.2744 43.8927C47.327 51.2301 44.9837 58.4318 40.2444 65.4978C35.4039 72.6664 28.5671 78.5755 19.734 83.2249L2.54766 74.1759C8.33598 71.2808 13.2548 67.9334 17.3041 64.1335C21.2515 60.3344 23.9203 55.8821 25.3105 50.7765C20.5179 50.4031 16.6348 48.9532 13.6612 46.4267C10.5864 44.0028 9.03329 40.5999 9.00188 36.2178C8.97047 31.8358 10.5227 28.0029 13.6584 24.7192C16.693 21.5381 20.809 19.9289 26.0063 19.8917ZM77.0623 19.5257C81.1387 19.4965 84.7641 20.5406 87.9386 22.6581C91.1131 24.7755 93.6306 27.662 95.4913 31.3175C97.3519 34.9731 98.2983 39.0428 98.3304 43.5268C98.383 50.8642 96.0397 58.0659 91.3004 65.1319C86.4599 72.3005 79.6231 78.2095 70.79 82.859L53.6037 73.8099C59.392 70.9149 64.3108 67.5674 68.3601 63.7676C72.3075 59.9685 74.9763 55.5161 76.3665 50.4105C71.5739 50.0372 67.6908 48.5873 64.7172 46.0608C61.6424 43.6369 60.0893 40.2339 60.0579 35.8519C60.0265 31.4698 61.5787 27.6369 64.7145 24.3532C67.7491 21.1722 71.865 19.563 77.0623 19.5257Z"
              className="fill-primary-foreground"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between gap-1">
          <div className="hidden sm:flex md:hidden items-center gap-4">
            <Avatar className="w-8 h-8 md:w-10 md:h-10">
              <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.designation}</p>
            </div>
          </div>
        </div>
        <p className="mt-6 text-lg sm:text-2xl lg:text-[1.75rem] xl:text-3xl leading-normal lg:!leading-normal font-semibold tracking-tight">
          &quot;{testimonial.testimonial}&quot;
        </p>
        <div className="flex sm:hidden md:flex mt-6 items-center gap-4">
          <Avatar>
            <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TestimonialPage;
