import { experience } from "@/data/content";
import { ExperienceCard } from "@/components/ExperienceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/ui/timeline";

export function Experience() {
  const data = experience.map((item) => ({
    title: item.period,
    content: <ExperienceCard key={item.company} item={item} />,
  }));

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 pb-12 pt-28 sm:pb-16 sm:pt-36">
      <SectionHeading eyebrow="Where I've worked" title="Experience" />
      <Timeline data={data} />
    </section>
  );
}
