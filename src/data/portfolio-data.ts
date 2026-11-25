/**
 * =========================================================================
 * ANAS MANZOOR — CENTRALIZED PORTFOLIO DATA
 * =========================================================================
 * Edit URLs, contact endpoints, and project links in this single file.
 * =========================================================================
 */

export interface ProjectItem {
  number: string;
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string | null;
  sourceUrl: string | null;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
}

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
}

export interface SocialPlatform {
  id: "email" | "github" | "instagram" | "facebook";
  label: string;
  displayName: string;
  handleOrValue: string;
  href: string | null;
}

export const portfolioData = {
  personal: {
    name: "Anas Manzoor",
    githubDisplayName: "Muhammad Anas Manzoor",
    role: "Software Engineering Student & Aspiring Full-Stack Web Developer",
    profileImage: "/images/profile.png",
  },

  intro: {
    lines: [
      "Hello, I'm Anas.",
      "Welcome to my digital world.",
      "I'm a Software Engineering Student",
      "And an aspiring Full-Stack Web Developer.",
    ],
    scrollPrompt: "Scroll down to explore",
  },

  hero: {
    heading: "Turning Ideas Into Digital Experiences.",
    description:
      "I'm Anas Manzoor, a Software Engineering student passionate about software development, modern web technologies and building meaningful digital products.",
    primaryCta: {
      label: "Explore My Work",
      targetId: "projects",
    },
    secondaryCta: {
      label: "Contact Me",
      targetId: "contact",
    },
  },

  about: {
    heading: "Who I Am",
    paragraphs: [
      "I'm Anas Manzoor, a Software Engineering student who enjoys building modern digital experiences and exploring the world of software development.",
      "My interests include frontend development, backend systems, database management and creating practical applications.",
      "I believe in continuous learning, solving problems and improving my ability to turn ideas into functional products.",
    ],
    identities: [
      "Software Engineering Student",
      "Aspiring Full-Stack Developer",
      "Creative Problem Solver",
      "Technology Enthusiast",
    ],
    profileImagePath: "/images/profile.png",
  },

  skills: {
    heading: "Technical Skills",
    groups: [
      {
        id: "frontend",
        category: "FRONTEND",
        items: [
          "HTML",
          "CSS",
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Tailwind CSS",
        ],
      },
      {
        id: "backend",
        category: "BACKEND",
        items: ["Node.js", "Express.js", "REST APIs"],
      },
      {
        id: "database",
        category: "DATABASE",
        items: ["MongoDB", "Mongoose"],
      },
      {
        id: "tools",
        category: "TOOLS",
        items: ["Git", "GitHub", "VS Code", "Vercel"],
      },
      {
        id: "additional",
        category: "ADDITIONAL",
        items: [
          "Android development fundamentals",
          "Kotlin",
          "API integration",
        ],
      },
    ] as SkillGroup[],
  },

  journey: {
    heading: "My Development Journey",
    steps: [
      {
        step: "01",
        title: "Beginning Software Engineering studies.",
        description:
          "Establishing a strong academic foundation in software construction, logic, and core computer science principles.",
      },
      {
        step: "02",
        title: "Learning frontend development.",
        description:
          "Crafting responsive user interfaces with HTML, CSS, JavaScript, TypeScript, React, Next.js, and Tailwind CSS.",
      },
      {
        step: "03",
        title: "Exploring backend development.",
        description:
          "Designing server-side logic, authentication workflows, and structured REST APIs using Node.js and Express.js.",
      },
      {
        step: "04",
        title: "Building full-stack applications.",
        description:
          "Connecting interactive client interfaces with backend services to create cohesive end-to-end web platforms.",
      },
      {
        step: "05",
        title: "Learning database integration and deployment.",
        description:
          "Modeling persistent data with MongoDB and Mongoose, and managing version control and cloud deployments via Git, GitHub, and Vercel.",
      },
      {
        step: "06",
        title: "Developing more advanced real-world projects.",
        description:
          "Expanding into cross-platform telemetry, secure OTP systems, and tailored digital commerce experiences.",
      },
    ] as JourneyStep[],
  },

  projects: {
    heading: "Selected Works",
    items: [
      {
        number: "01",
        id: "wifivision",
        title: "WiFiVision",
        category: "Full-Stack Web & Android Application",
        description:
          "A smart Wi-Fi monitoring and visualization platform that helps users understand network signal strength, connection quality, performance, and geographical coverage through interactive heatmaps and analytics.",
        technologies: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "Express",
          "MongoDB",
          "Kotlin",
        ],
        image: "/images/projects/wifivision.svg",
        liveUrl: "https://wi-fi-vision-d6kt-theta.vercel.app/",
        sourceUrl: null,
      },
      {
        number: "02",
        id: "cortex",
        title: "Cortex",
        category: "Full-Stack Authentication Platform",
        description:
          "A full-stack authentication platform featuring secure account management, login, password recovery and email functionality.",
        technologies: [
          "React",
          "Vite",
          "Tailwind CSS",
          "Express.js",
          "MongoDB",
          "JWT",
          "bcrypt",
          "Nodemailer",
        ],
        image: "/images/projects/cortex.svg",
        liveUrl: "https://cortex-frontend-sable.vercel.app/",
        sourceUrl: null,
      },
      {
        number: "03",
        id: "learnloop",
        title: "LearnLoop",
        category: "Educational Web Platform",
        description:
          "An educational web platform featuring modern interface design and email OTP authentication.",
        technologies: [
          "React",
          "Tailwind CSS",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Email OTP",
        ],
        image: "/images/projects/learnloop.svg",
        liveUrl: null,
        sourceUrl: null,
      },
      {
        number: "04",
        id: "saffron-and-sage",
        title: "Saffron & Sage",
        category: "Gastronomy & Direct Ordering Experience",
        description:
          "A premium restaurant website featuring sophisticated design and WhatsApp-based ordering.",
        technologies: [
          "React",
          "Tailwind CSS",
          "JavaScript",
          "WhatsApp Ordering Integration",
        ],
        image: "/images/projects/noirtable.svg",
        liveUrl: "https://saffron-sage-frontend.vercel.app/",
        sourceUrl: null,
      },
      {
        number: "05",
        id: "mirau-atelier",
        title: "MIRAU ATELIER",
        category: "Luxury Fashion E-Commerce",
        description:
          "A luxury fashion e-commerce experience with modern styling and premium presentation.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        image: "/images/projects/mirau.svg",
        liveUrl: null,
        sourceUrl: null,
      },
    ] as ProjectItem[],
  },

  contact: {
    heading: "Let's Connect",
    supportingText:
      "Have an idea, project or opportunity? Let's connect and create something meaningful.",
    displayName: "Anas Manzoor",
    githubDisplayName: "Muhammad Anas Manzoor",
    // Editable contact configuration — update with actual address/URLs as desired
    email: "anasmanzoor0099@gmail.com",
    platforms: [
      {
        id: "email",
        label: "Email",
        displayName: "anasmanzoor0099@gmail.com",
        handleOrValue: "anasmanzoor0099@gmail.com",
        href: "mailto:anasmanzoor0099@gmail.com",
      },
      {
        id: "github",
        label: "GitHub",
        displayName: "Muhammad Anas Manzoor",
        handleOrValue: "Muhammad Anas Manzoor",
        href: "https://github.com/search?q=Muhammad+Anas+Manzoor&type=users",
      },
      {
        id: "instagram",
        label: "Instagram",
        displayName: "@ianasmanzoorofficial",
        handleOrValue: "@ianasmanzoorofficial",
        href: "https://www.instagram.com/ianasmanzoorofficial/",
      },
      {
        id: "facebook",
        label: "Facebook",
        displayName: "Anas Manzoor",
        handleOrValue: "Anas Manzoor",
        href: "https://www.facebook.com/share/1EHFfqYXwE/",
      },
    ] as SocialPlatform[],
  },

  footer: {
    credit: "Designed & Developed by Anas Manzoor",
  },
};
