"use client";
// import React, { useEffect, useState } from "react";
import React from "react";
import AuroraBackground from "@/components/ui/AuroraBackground";
import GlassNavBar from "@/components/ui/glassNavBar";
import type { NavItem } from "@/components/ui/glassNavBar";
import BlurText from "@/components/BlurText";
import { motion } from "motion/react";

const navItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Episodes", href: "#episodes" },
];


export function Title() {
  return (
    <div className="title-container">
      <div className="h-[40rem] w-full bg-[#060010] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <AuroraBackground />
        </div>

        <GlassNavBar items={navItems} />

        <div className="relative flex flex-col items-center z-20 w-full max-w-4xl px-4 mx-auto">          
          <h1 className="md:text-6xl text-4xl lg:text-6xl font-bold text-center text-white mt-24">
            brainSTEM podcast
          </h1>

        <BlurText 
          text="Understanding the brain through science and storytelling"
          delay={250}
          animateBy="words"
          direction="top"
          className="sm:px-0 md:px-0 lg:px-0 text-lg lg:text-3xl md:text-3xl font-bold justify-left md:justify-center text-left text-white mt-12 sm:mt-24 md:mt-24 w-full"

        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          className="lg:px-0 md:px-4 px-2 lg:text-md font-extralight justify-center text-left text-white mt-8 w-full"
          >
            Episodes feature individuals with lived experiences and experts, covering a range of neurological
          and psychiatric disorders, such as depression, PTSD, and Alzheimer&apos;s disease. We also discuss
          "hot topics" like how pregnancy shapes "mommy brain" and the effects of air pollution
          on the brain <br></br><br></br>
          Hosted by neuroscientist Dr. Hilary Marusak.
          Produced by Manmeet Bhogal, Amanpreet Bhogal, and Gabby Marumag
          </motion.p>
        {/* <p className="lg:text-md font-extralight justify-center text-left text-white mt-8 ml-36 mr-36">Episodes feature individuals with lived experiences and experts, covering a range of neurological
          and psychiatric disorders, such as depression, PTSD, and Alzheimer's disease. We also discuss
          "hot topics" like how pregnancy shapes "mommy brain" and the effects of air pollution
          on the brain
        </p> */}

        {/* <p className="lg:text-md font-extralight justify-center text-left text-white mt-8 ml-36 mr-auto">
          Hosted by neuroscientist Dr. Hilary Marusak
          Produced by Manmeet Bhogal, Amanpreet Bhogal, and Gabby Marumag
        </p> */}
        </div>
      </div>
    
      {/* <div className="description">
        <h2 className="lg:text-3xl font-bold text-center text-white">
          Understanding the brain through science and storytelling
        </h2>
      </div> */}

    </div>

    
  );
}
