export type Project = {
  slug: string;
  name: string;
  index: string;
  tagline: string;
  year: string;
  role: string;
  category: "AI" | "Computer Vision" | "Deep Learning" | "Web Development" | "Research";
  status: "Completed" | "Production" | "In Development" | "Research";
  difficulty: "Foundational" | "Intermediate" | "Advanced" | "Research";
  tags: string[];
  stack: string[];
  github?: string;
};

export const projects: Project[] = [
  {
    slug: "agroscan",
    name: "AgroScan",
    index: "01",
    tagline: "A custom-attention CNN and advisory tool for plant disease diagnosis.",
    year: "2025 — 2026",
    role: "Data Science Intern · ATEES Global",
    category: "Deep Learning",
    status: "Completed",
    difficulty: "Advanced",
    tags: ["AI", "Computer Vision", "Deep Learning"],
    stack: ["Python", "PyTorch", "OpenCV", "Streamlit", "REST APIs", "NumPy"],
    github: "https://github.com/RyoHaradaps/AgroScan-Leaf-Disease-Detection",
  },
  {
    slug: "mymovielist",
    name: "MyMovieList",
    index: "02",
    tagline: "A Django tracker unifying films, series, anime, and comics behind one API surface.",
    year: "2025",
    role: "Full-Stack Web Developer Intern · Grapesgenix",
    category: "Web Development",
    status: "Completed",
    difficulty: "Intermediate",
    tags: ["Web Development"],
    stack: ["Django", "Python", "SQLite", "Django ORM", "Bootstrap 5", "JavaScript"],
    github: "https://github.com/RyoHaradaps/MyMovieList",
  },
  {
    slug: "attendance-system",
    name: "Face-Recognition Attendance",
    index: "03",
    tagline: "OpenCV LBPH attendance deployed live at IOC Gujarat Refinery.",
    year: "2024 — 2025",
    role: "Python Developer Intern · Indian Oil Corporation",
    category: "Computer Vision",
    status: "Completed",
    difficulty: "Intermediate",
    tags: ["AI", "Computer Vision"],
    stack: ["Python", "OpenCV", "MySQL", "Tkinter", "ReportLab"],
    github: "https://github.com/RyoHaradaps/Attendance-Management-Using-Face-Recognition",
  },
  {
    slug: "sign-language-detector",
    name: "Dynamic Sign Language Detector",
    index: "04",
    tagline:
      "Person-invariant continuous sign recognition with MediaPipe + Bi-LSTM + Temporal Attention.",
    year: "2025",
    role: "Independent Research",
    category: "Research",
    status: "In Development",
    difficulty: "Research",
    tags: ["AI", "Computer Vision", "Deep Learning"],
    stack: ["Python", "PyTorch", "MediaPipe", "OpenCV", "NumPy"],
    github: "https://github.com/RyoHaradaps/sign-language-detector",
  },
];
