"use client";
import { memo } from "react";
import Aurora from "../Aurora";

const AURORA_COLOR_STOPS = ["#F566FF", "#DC56E6", "#6092E1"];

const AuroraBackground = memo(function AuroraBackground() {
  return (
    <Aurora
      colorStops={AURORA_COLOR_STOPS}
      blend={0.5}
      amplitude={1.0}
      speed={0.5}
    />
  );
});

export default AuroraBackground;
