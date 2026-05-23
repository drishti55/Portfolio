export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    icon: "/>",
    color: "#00ff41",
    skills: [
      { name: "Python", level: 95 },
      { name: "C++", level: 80 },
      { name: "SQL", level: 85 },
      { name: "JavaScript", level: 82 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "<>",
    color: "#00e5ff",
    skills: [
      { name: "React.js", level: 85 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "{}",
    color: "#bf00ff",
    skills: [
      { name: "FastAPI", level: 88 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    icon: "AI",
    color: "#ff0040",
    skills: [
      { name: "PyTorch", level: 88 },
      { name: "LangChain", level: 92 },
      { name: "OpenAI API", level: 90 },
      { name: "NumPy", level: 85 },
      { name: "Pandas", level: 85 },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "DB",
    color: "#ffaa00",
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "MySQL", level: 85 },
      { name: "Pinecone", level: 78 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: ">>",
    color: "#39ff14",
    skills: [
      { name: "GitHub", level: 90 },
      { name: "VS Code", level: 92 },
      { name: "Cursor", level: 85 },
      { name: "Firebase", level: 75 },
      { name: "CrewAI", level: 78 },
    ],
  },
  {
    id: "core-cs",
    title: "Core CS",
    icon: "CS",
    color: "#e040ff",
    skills: [
      { name: "DSA", level: 85 },
      { name: "DBMS", level: 82 },
      { name: "OOPs", level: 88 },
    ],
  },
];
