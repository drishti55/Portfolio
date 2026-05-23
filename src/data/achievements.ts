export interface Achievement {
  id: string;
  title: string;
  event: string;
  position: string;
  classification: string;
  description: string;
  icon: string;
}

export const achievements: Achievement[] = [
  {
    id: "sih",
    title: "Smart India Hackathon",
    event: "SIH National Competition",
    position: "3rd Prize",
    classification: "PRIORITY-HIGH",
    description:
      "Secured 3rd position in Smart India Hackathon — a national-level competition fostering innovation and problem-solving.",
    icon: "III",
  },
  {
    id: "robothon",
    title: "ROBOTHON 2025",
    event: "Robotics & AI Competition",
    position: "2nd Prize",
    classification: "PRIORITY-CRITICAL",
    description:
      "Achieved 2nd place in ROBOTHON 2025 — demonstrating expertise in robotics, automation, and AI-driven systems.",
    icon: "II",
  },
];
