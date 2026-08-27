import { GraduationCap, HandCoins, Trophy } from "lucide-react";
import { achievements, type Achievement } from "@/data/content";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltCard } from "@/components/TiltCard";

const icons: Record<Achievement["icon"], typeof GraduationCap> = {
  graduationCap: GraduationCap,
  trophy: Trophy,
  handCoins: HandCoins,
};

export function Achievements() {
  return (
    <section id="achievements" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading eyebrow="What I've delivered" title="Achievements & Responsibilities" />

      <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {achievements.map((item) => {
          const Icon = icons[item.icon];
          return (
            <RevealItem key={item.title}>
              <TiltCard className="h-full">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-2xl font-semibold text-foreground">{item.stat}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  {item.description}
                </p>
              </TiltCard>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
