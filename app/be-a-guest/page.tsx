import type { Metadata } from "next";
import BeAGuestPage from "./BeAGuestPage";

export const metadata: Metadata = {
  title: "Be a Guest · brainSTEM Podcast",
  description:
    "Share your brain science research, clinical perspective, or lived experience on Dr. Hilary Marusak's brainSTEM podcast.",
  openGraph: {
    title: "Be a Guest on the brainSTEM Podcast",
    description:
      "The brain is better understood together. Share your science or lived-experience perspective on brainSTEM to help spread mental health awareness.",
  },
};

export default function Page() {
  return <BeAGuestPage />;
}
