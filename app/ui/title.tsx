"use client";
// import React, { useEffect, useState } from "react";
import React from "react";
import { SparklesCore } from "../../components/ui/sparkles";
import { fetchPodcastFeed } from "../lib/podcast";

export async function getPodcastData() {
  const podcastData = await fetchPodcastFeed();
  console.log(podcastData.description);
  return podcastData;
}

export function SparklesPreview() {

  // const [description, setDescription] = useState("");

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getPodcastData();
  //     setDescription(data.description ?? "");
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <h1 className="md:text-6xl text-4xl lg:text-6xl font-bold text-center text-white relative z-20">
        brainSTEM podcast
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
