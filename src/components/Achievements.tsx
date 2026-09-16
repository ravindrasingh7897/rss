import { achievements } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { CircularCarousel } from "@/components/ui/circular-carousel";

const carouselItems = achievements.map((item, index) => ({
  id: String(index),
  title: item.title,
  description: item.description,
  tag: item.stat,
}));

export function Achievements() {
  return (
    <section id="achievements" className="relative mx-auto max-w-6xl px-6 pb-4 pt-28 sm:pb-6 sm:pt-36">
      <SectionHeading eyebrow="What I've delivered" title="Achievements & Responsibilities" />

      <div className="mt-16 flex justify-center">
        <CircularCarousel items={carouselItems} />
      </div>
    </section>
  );
}
