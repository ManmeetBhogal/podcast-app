"use client";

import React from "react";
import PlasmaBackground from "@/components/ui/plasmaBackground";
import Image from 'next/image';

export function Description() {
  return (
    <div className="h-[40rem] w-full bg-[#060010] relative overflow-hidden flex justify-center">
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
        <h2 className="lg:text-3xl font-bold text-center text-white mb-4">
          Meet the team
        </h2>

        <div className="team-member">
            <Image
              src="/placeholder.jpg"
              alt="Dr. Hilary Marusak"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center text-white">Dr. Hilary Marusak</h3>
            <p className="text-center text-white mt-2">
              Host
            </p>
            <p>Dr. Marusak is a neuroscientist at Wayne State University, and directs the WSU THINK lab. 
               The THINK lab studies brain development in children and adolescents and the impacts of 
               environmental stress on the brain, as well as anxiety & PTSD. Dr. Marusak is interested 
               in neuroscience communication and science-advocacy, and is the host of the brainSTEM podcast.</p>
        </div>

         <div className="team-member">
            <Image
              src="/placeholder.jpg"
              alt="Dr. Hilary Marusak"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center text-white">Dr. Hilary Marusak</h3>
            <p className="text-center text-white mt-2">
              Host
            </p>
            <p>Dr. Marusak is a neuroscientist at Wayne State University, and directs the WSU THINK lab. 
               The THINK lab studies brain development in children and adolescents and the impacts of 
               environmental stress on the brain, as well as anxiety & PTSD. Dr. Marusak is interested 
               in neuroscience communication and science-advocacy, and is the host of the brainSTEM podcast.</p>
        </div>

      </div>

      {/* <h2 className="text-center">
                Hosted by neuroscientist Dr. Hilary Marusak <br></br>
                Produced by Manmeet Bhogal, Amanpreet Bhogal, and Gabby Marumag
            </h2> */}
    </div>
  );
}
