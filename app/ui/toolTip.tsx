"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
const people = [
    {
        id: 1,
        name: "Hilary Marusak",
        designation: "Host | Neuroscientist",
        image: "/placeholder.jpg",
    },
    {
        id: 2,
        name: "Amanpreet Bhogal",
        designation: "Co-Producer | Video Production",
        image: "/placeholder.jpg",
    },
    {
        id: 3,
        name: "Manmeet Bhogal",
        designation: "Co-Producer | Audio Production",
        image: "/Manmeet.jpg",
    },
    {
        id: 4,
        name: "Gabby Maramag",
        designation: "Co-Producer | Social Media Director",
        image: "/placeholder.jpg",
    },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full bg-black pb-10">
      <AnimatedTooltip items={people} />
    </div>
  );
}
