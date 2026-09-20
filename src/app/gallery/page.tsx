import type { Metadata } from "next";
import { GalleryFullScreen } from "@/components/GalleryFullScreen";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: `Gallery - ${site.name}`,
  description: "Photos and good moments.",
};

export default function GalleryPage() {
  return <GalleryFullScreen />;
}
