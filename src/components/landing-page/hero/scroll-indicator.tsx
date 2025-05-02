"use client";

import React from "react";
import Image from "next/image";

export default function ScrollIndicator() {
  return (
    <div className="z-50">
      <div className="w-32 h-32 relative">
        <svg className="animate-spin-text w-full h-full" viewBox="0 0 100 100">
          <defs>
            <path
              id="circle"
              d="
                    M 50, 50
                    m -35, 0
                    a 35,35 0 1,1 70,0
                    a 35,35 0 1,1 -70,0
                "
            />
          </defs>
          <text fill="green" fontSize="8" fontWeight="bold" letterSpacing="2">
            <textPath href="#circle">
              SCROLL DOWN SCROLL DOWN SCROLL DOWN
            </textPath>
          </text>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/ReuseMart_logo_only.png"
            alt="ReuseMart Icon"
            width={45}
            height={45}
            priority
          />
        </div>
      </div>
    </div>
  );
}
