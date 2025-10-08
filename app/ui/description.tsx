"use client"

import React from "react";
import PlasmaBackground from "@/components/ui/plasmaBackground";

export function Description() {
    return (
         <div className="h-[40rem] w-full bg-[#060010] relative overflow-hidden flex justify-center">
            <div className="absolute inset-0 z-10 pointer-events-none" 
            style={{
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%)",
              }}>
                <PlasmaBackground />
            </div>

              

            {/* <h2 className="text-center">
                Hosted by neuroscientist Dr. Hilary Marusak <br></br>
                Produced by Manmeet Bhogal, Amanpreet Bhogal, and Gabby Marumag
            </h2> */}
         </div>
    )
};

