import type { IconType } from "react-icons";
import {
  SiArduino,
  SiCelery,
  SiCloudinary,
  SiDigitalocean,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiRazorpay,
  SiReact,
  SiRedis,
  SiSentry,
  SiSocketdotio,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const techStack: { name: string; Icon: IconType; color: string }[] = [
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Express", Icon: SiExpress, color: "#FFFFFF" },
  { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Redis", Icon: SiRedis, color: "#DC382D" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#FFFFFF" },
  { name: "Vercel", Icon: SiVercel, color: "#FFFFFF" },
  { name: "Socket.io", Icon: SiSocketdotio, color: "#FFFFFF" },
  { name: "Stripe", Icon: SiStripe, color: "#635BFF" },
  { name: "Gemini", Icon: SiGooglegemini, color: "#4285F4" },
  { name: "Arduino", Icon: SiArduino, color: "#00979D" },
  { name: "Cloudinary", Icon: SiCloudinary, color: "#3448C5" },
  { name: "DigitalOcean", Icon: SiDigitalocean, color: "#0080FF" },
  { name: "Celery", Icon: SiCelery, color: "#37814A" },
  { name: "Razorpay", Icon: SiRazorpay, color: "#3395FF" },
  { name: "Sentry", Icon: SiSentry, color: "#FFFFFF" },
];

const textOnlyTech = [
  "Azure OpenAI",
  "OpenAI",
  "VdoCipher",
  "Google OAuth",
  "Nodemailer",
  "Multer",
  "jsPDF",
  "ESP8266",
  "JWT",
  "CoinGecko API",
];

export function TechMarquee() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-8 pt-20 sm:pb-10 sm:pt-26">
      <p className="mb-6 text-center font-mono text-xs tracking-wide text-accent sm:text-left">
        {"// Tech I work with"}
      </p>

      <div className="relative flex flex-col gap-5">
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
            {[...textOnlyTech, ...textOnlyTech].map((name, index) => (
              <span
                key={`text-${name}-${index}`}
                className="shrink-0 whitespace-nowrap rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="relative -mb-16 overflow-hidden pb-16 pt-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-4 [animation-direction:reverse] hover:[animation-play-state:paused]">
            {[...techStack, ...techStack].map((tech, index) => (
              <div
                key={`icon-${tech.name}-${index}`}
                aria-label={tech.name}
                className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-card/60 transition-transform duration-200 hover:-translate-y-1"
              >
                <tech.Icon size={28} style={{ color: tech.color }} aria-hidden />
                <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card/95 px-2 py-1 text-xs text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
