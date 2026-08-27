import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : "text-left"}>
      <p className="font-mono text-sm text-accent tracking-wide">{`// ${eyebrow}`}</p>
      <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
    </Reveal>
  );
}
