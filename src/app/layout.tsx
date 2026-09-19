import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/content";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransitionProvider } from "@/components/PageTransition";

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${code.variable} dark`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="site-backdrop" aria-hidden>
          <div className="nebula-blob left-[-15%] top-[10%] h-[50vw] w-[50vw] bg-emerald-500" />
          <div className="nebula-blob right-[-10%] top-[55%] h-[45vw] w-[45vw] bg-violet-600 [animation-delay:-11s]" />
        </div>
        <CustomCursor />
        <PageTransitionProvider>
          <SmoothScroll>
            <div className="relative z-10">{children}</div>
          </SmoothScroll>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
