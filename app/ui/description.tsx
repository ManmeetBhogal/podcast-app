"use client";

import React from "react";
import Image from 'next/image';
import PlasmaBackground from "@/components/ui/plasmaBackground";
import TeamSection from "@/components/TeamMember";

export function Description() {
  return (
    <div className="w-full bg-[#060010] relative overflow-hidden flex justify-center">
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%)",
        }}
      >
        <PlasmaBackground />
      </div>

      <div className="description-container">
        <TeamSection />
      </div>

      {/* <h2 className="text-center">
                Hosted by neuroscientist Dr. Hilary Marusak <br></br>
                Produced by Manmeet Bhogal, Amanpreet Bhogal, and Gabby Marumag
            </h2> */}
    </div>
  );
}
