export interface Project {
  id: string;
  title: string;
  codename: string;
  description: string;
  tech: string[];
  github: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "medusa-protocol",
    title: "The Medusa Protocol",
    codename: "MEDUSA",
    description:
      "Developed a secure medical imaging pipeline using AES-256 encryption and steganography while preserving diagnostic image quality.",
    tech: ["Python", "TensorFlow", "OpenCV", "PyWavelets"],
    github: "https://github.com/drishti55/Medusa-Protocol",
    theme: {
      primary: "#ff0040",
      secondary: "#1a0010",
      accent: "#ff3366",
    },
    tags: [
      "Encrypted MRI Scans",
      "Binary Corruption",
      "Steganography",
      "Secure Vault",
    ],
  },
  {
    id: "evallens",
    title: "EvalLens",
    codename: "EVALLENS",
    description:
      "Building an AI evaluation framework for schema validation, hallucination detection, and structured LLM benchmarking.",
    tech: ["Python", "Pydantic", "LangChain", "Next.js"],
    github: "https://github.com/drishti55/EvalLens",
    theme: {
      primary: "#ff6600",
      secondary: "#1a0d00",
      accent: "#ffaa00",
    },
    tags: [
      "Schema Validation",
      "Hallucination Detection",
      "AI Diagnostics",
      "LLM Benchmarking",
    ],
  },
  {
    id: "edurag",
    title: "EduRAG",
    codename: "EDURAG",
    description:
      "Developed a RAG-based assistant for answering queries from academic PDFs using semantic retrieval workflows.",
    tech: ["Python", "LangChain", "FAISS", "ChromaDB", "Gemma LLM"],
    github: "https://github.com/drishti55/EduRAG",
    theme: {
      primary: "#00e5ff",
      secondary: "#001a1f",
      accent: "#00ffcc",
    },
    tags: [
      "Vector-Space",
      "Semantic Retrieval",
      "Embeddings",
      "Memory Fragments",
    ],
  },
  {
    id: "spec-to-schema",
    title: "Spec-to-Schema",
    codename: "S2S",
    description:
      "Built an LLM-powered system that converts software requirement specifications into structured SQL schemas.",
    tech: ["Python", "LangChain", "PostgreSQL", "Groq API"],
    github: "https://github.com/drishti55/Spec-to-Schema",
    theme: {
      primary: "#bf00ff",
      secondary: "#0d001a",
      accent: "#e040ff",
    },
    tags: [
      "NLP to SQL",
      "ER Diagrams",
      "Schema Synthesis",
      "Relational Graphs",
    ],
  },
  {
    id: "navyug",
    title: "Navyug",
    codename: "NAVYUG",
    description:
      "Automated vendor follow-ups and quotation workflows using DSPy-powered LLM email pipelines.",
    tech: ["Python", "DSPy", "Email APIs"],
    github: "https://github.com/drishti55/Navyug",
    theme: {
      primary: "#00ff41",
      secondary: "#001a0a",
      accent: "#39ff14",
    },
    tags: [
      "AI Workflows",
      "Email Automation",
      "Procurement Pipelines",
      "Network Overlays",
    ],
  },
];
