export const site = {
  name: "Ravindra Singh",
  role: "Software Developer - Full-Stack & GenAI",
  tagline:
    "I'm a full-stack developer who enjoys turning complex problems into simple, elegant systems. Currently building GenAI-powered platforms at KuKi Solutions, with a B.Tech in Computer Science from LNMIIT Jaipur.",
  location: "India",
  email: "ravindrasingh4632@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/ravindrasingh7897" },
    { label: "LinkedIn", href: "https://linkedin.com/in/rss7897" },
    { label: "Instagram", href: "https://instagram.com/rss_7897" },
    { label: "WhatsApp", href: "https://wa.me/918503987897" },
  ],
};

export const nav = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const galleryLink = { label: "Gallery", href: "/gallery" };

export const hero = {
  introLines: [`Hey, I'm ${site.name.split(" ")[0]} -`, "a Full-Stack Engineer building and shipping GenAI-powered applications."],
  typewriter: "Glad you stopped by. Good code tends to speak for itself - so, what should we build?",
  videoUrl: "/videos/hero-scrub.mp4",
  pills: [
    { label: "See my work", href: "#projects" },
    { label: "View achievements", href: "#achievements" },
    { label: "Let's talk", href: "#contact" },
  ],
  stats: [
    { value: "200+", label: "DSA problems solved" },
    { value: "97.7%ile", label: "JEE Mains 2022" },
    { value: "4", label: "Companies & teams" },
    { value: "₹20L+", label: "Sponsorship raised" },
  ],
};

export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
  tech: string[];
  certificateUrl: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "SDE",
    company: "KuKi Solutions",
    location: "On-Site",
    period: "Nov 2025 — Present",
    certificateUrl: "#",
    tech: ["Next.js", "React", "FastAPI", "Celery", "Redis", "MySQL", "MongoDB", "Azure OpenAI", "Gemini"],
    points: [
      "Co-built two GenAI-powered ESG & BRSR compliance platforms, cutting report preparation time from months to hours for 4-5 clients; independently designed and shipped the product's landing website.",
      "Built a multi-provider LLM pipeline (Azure OpenAI, Google Gemini via AI Studio/Vertex AI for OCR + extraction) with Langfuse tracing and retry/backoff handling, powering document classification, checklist auto-mapping, and structured ESG data extraction.",
      "Collaborated with the backend team to build an async batch-processing system (FastAPI, Celery, Redis) for document pipelines, using MySQL (SQLAlchemy) and MongoDB (Motor), with cross-service RS256 JWT authentication between the Node.js and Python backends.",
      "Built ESG dashboards and automated PDF reports (Next.js, React, Jinja2/WeasyPrint) with multilingual support, allowing users to review and edit AI-generated reports before export.",
    ],
  },
  {
    role: "Tech Lead",
    company: "SkillsOn",
    location: "Remote",
    period: "Mar 2025 — Aug 2025",
    certificateUrl: "#",
    tech: ["Vercel", "DigitalOcean", "Cloudinary", "VdoCipher", "Google OAuth", "Razorpay", "Nodemailer"],
    points: [
      "Led end-to-end development of a scalable LMS, and deployed the platform to production using Vercel, DigitalOcean, and Cloudinary to serve 100+ users in the first month.",
      "Streamed recorded lectures via VdoCipher DRM, enhancing engagement for 80%+ of enrolled learners.",
      "Integrated secure authentication using Google OAuth 2.0, JWT, and session handling, increasing signup/login success rate by 35%.",
      "Enabled payments via Razorpay and purchase workflows for course access and post-purchase emails using Nodemailer.",
    ],
  },
  {
    role: "Teaching Assistant",
    company: "The LNM Institute of Information Technology",
    location: "Jaipur, Rajasthan · On-site · Part-time",
    period: "Jan 2025 — Apr 2025",
    certificateUrl: "#",
    tech: ["Internet of Things (IoT)", "Arduino IDE", "ESP8266", "Programming", "Circuit Design", "Mentoring"],
    points: [
      "Mentored over 80 students in IoT development by offering personalized support, which helped improve their lab performance.",
      "Helped design and review more than 10 lab assignments, focusing on building students' problem-solving abilities.",
      "Led 12+ hands-on sessions using tools like Arduino, ESP8266, DHT22, and HiveMQ, while also troubleshooting technical issues to keep the sessions running smoothly.",
    ],
  },
  {
    role: "Front-end Developer",
    company: "CoreTeams Softech Pvt. Ltd",
    location: "Hybrid",
    period: "Jun 2024 — Jul 2024",
    certificateUrl: "#",
    tech: ["React.js", "Tailwind CSS", "Multer", "MongoDB", "jsPDF"],
    points: [
      "Built responsive, accessible UIs for 3+ client-facing apps using React.js and Tailwind CSS, and integrated RESTful APIs in collaboration with backend teams.",
      "Engineered a full-featured Admin Panel with Excel export (xlsx), secure uploads (Multer), MongoDB, and PDF certificates (jsPDF).",
    ],
  },
];

export type Project = {
  title: string;
  label: string;
  description: string;
  link: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "SkillsOn",
    label: "Fullstack • Web",
    description:
      "Developed and deployed a scalable LMS at production level using the MERN stack, Tailwind CSS, and Vercel/DigitalOcean. Integrated secure authentication and DRM-protected video streaming.",
    link: "https://skills-on-frontend.vercel.app/",
    image: "/projects/skillson.png",
  },
  {
    title: "My Poll",
    label: "Fullstack • Real-Time",
    description:
      "Built a real-time polling app with teacher-student roles using Next.js, Express.js, and Socket.io. Implemented live updates, custom timers, and instant results.",
    link: "https://mypoll-beryl.vercel.app/",
    image: "/projects/My_poll.png",
  },
  {
    title: "Travelhub",
    label: "Frontend • Booking",
    description:
      "A tourism platform for Himachal Pradesh offering tour packages, booking with Stripe payments, and OTP-based profile management.",
    link: "https://travelhub-app.vercel.app",
    image: "/projects/Travel_hub.png",
  },
  {
    title: "Coin Trackr",
    label: "Frontend • Finance",
    description:
      "A coin tracking dashboard application displaying live cryptocurrency prices by integrating the CoinGecko API for real-time market data visualization.",
    link: "https://cointrackr-rss-projects-446bee74.vercel.app/",
    image: "/projects/Coin_tracker.png",
  },
];

export type Achievement = {
  stat: string;
  title: string;
  description: string;
  icon: "code" | "graduationCap" | "trophy" | "handCoins" | "users";
};

export const achievements: Achievement[] = [
  {
    stat: "200+",
    title: "Competitive Programming",
    description: "Coding problems solved across various platforms.",
    icon: "code",
  },
  {
    stat: "97.7%ile",
    title: "JEE Mains 2022",
    description: "Percentile secured in the JEE Mains 2022 entrance exam.",
    icon: "graduationCap",
  },
  {
    stat: "Alumni",
    title: "Senior Member, LNMIIT Alumni Association",
    description: "Recognized as a Senior Member of the LNMIIT Alumni Association.",
    icon: "users",
  },
  {
    stat: "₹20L+",
    title: "Sponsorship Lead, Plinth",
    description: "Raised in sponsorships from companies including BMW Motorrad, Mahindra, SBI, Unstop, and EaseMyTrip.",
    icon: "handCoins",
  },
  {
    stat: "Mentorship",
    title: "Teaching Assistant, IoT Labs",
    description: "Mentored 80+ students and led 12+ hands-on IoT labs using Arduino, ESP8266, DHT22, and HiveMQ.",
    icon: "trophy",
  },
  {
    stat: "Ownership",
    title: "Artist Coordination",
    description: "Coordinated performances and hospitality for artists including Mohd. Irfan, Nikhil D'Souza, and Stebin Ben.",
    icon: "users",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export const gallery: GalleryItem[] = [
  { src: "/gallery/witcher.jpg", alt: "The Witcher 3 key art", caption: "The Witcher 3" },
  { src: "/gallery/tomb-raider.jpg", alt: "Shadow of the Tomb Raider key art", caption: "Shadow of the Tomb Raider" },
  { src: "/gallery/kratos.jpg", alt: "God of War Kratos key art", caption: "God of War" },
  { src: "/gallery/neon-japan.jpg", alt: "Neon 80s Japan aesthetic art", caption: "Neon Tokyo" },
  { src: "/gallery/sci-fi-mask.jpg", alt: "Sci-fi girl in a mask, digital art", caption: "Sci-Fi Mask" },
];
