export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  status: string;
  highlights: string[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    id: "navyug",
    company: "Navyug Infosolutions",
    role: "Software Engineer Intern",
    period: "Jun 2025 — Aug 2025",
    status: "MISSION COMPLETE",
    highlights: [
      "Engineered automated mailing system with LLM-powered email pipelines",
      "Implemented full-stack integration across procurement workflows",
      "Optimized internal workflow processes for operational efficiency",
      "Enhanced reporting system with intelligent data aggregation",
    ],
    tech: ["Python", "DSPy", "Email APIs", "Full-Stack"],
  },
];
