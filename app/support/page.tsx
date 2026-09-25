import type { Metadata } from "next";
import SupportPage from "./SupportPage";

export const metadata: Metadata = {
  title: "Support brainSTEM",
  description: "Help keep the brainSTEM podcast going.",
};

export default function Page() {
  return <SupportPage />;
}
