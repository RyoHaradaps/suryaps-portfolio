export type SkillItem = {
  name: string;
  years?: string;
  projects?: number;
  primary?: string;
};

export type SkillGroup = {
  label: string;
  caption: string;
  items: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Programming",
    caption: "Languages I use to build.",
    items: [
      { name: "Python" },
      { name: "SQL" },
      { name: "C / C++" },
      { name: "JavaScript" },
    ],
  },
  {
    label: "AI / ML",
    caption: "Modelling, training, evaluation.",
    items: [
      { name: "PyTorch" },
      { name: "TensorFlow" },
      { name: "Scikit-Learn" },
      { name: "NumPy" },
      { name: "Matplotlib" },
      { name: "Seaborn" },
    ],
  },
  {
    label: "Computer Vision",
    caption: "Perception & image systems.",
    items: [
      { name: "OpenCV" },
      { name: "MediaPipe" },
      { name: "Custom CNNs" },
      { name: "Attention Modules" },
    ],
  },
  {
    label: "Backend",
    caption: "Servers, APIs, data flow.",
    items: [
      { name: "Django" },
      { name: "Django ORM" },
      { name: "REST APIs" },
      { name: "Streamlit" },
    ],
  },
  {
    label: "Frontend",
    caption: "Interfaces people actually use.",
    items: [
      { name: "HTML / CSS" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "Tkinter" },
    ],
  },
  {
    label: "Databases",
    caption: "Where the data lives.",
    items: [
      { name: "MySQL" },
      { name: "SQLite" },
      { name: "MongoDB" },
      { name: "Supabase" },
    ],
  },
  {
    label: "Data Analytics",
    caption: "Turning data into insights.",
    items: [
      { name: "Pandas" },
      { name: "Tableau" },
      { name: "Power BI" },
    ],
  },
  {
    label: "Developer Tools",
    caption: "The engineering workbench.",
    items: [
      { name: "Git / GitHub" },
      { name: "VS Code" },
      { name: "WSL2" },
      { name: "Google Colab" },
      { name: "ReportLab" },
    ],
  },
  {
    label: "Currently Exploring",
    caption: "Expanding my engineering toolkit.",
    items: [
      { name: "Docker" },
      { name: "FastAPI" },
      { name: "ONNX" },
      { name: "Transformers" },
    ],
  },
];

export const experience = [
  {
    company: "ATEES Global",
    role: "Data Science Intern",
    project: "AgroScan — plant disease detection",
    period: "Nov 2025 — Jun 2026",
    location: "Thrissur",
    bullets: [
      "Designed AttCM-AlexNet in PyTorch, a custom architecture layering Channel, Spatial, and Self-Attention onto AlexNet for fine-grained leaf disease classification.",
      "Built the full inference pipeline in Streamlit: 224×224 preprocessing, forward pass, confidence display; all in one flow.",
      "Integrated a live weather REST API to generate context-aware remedy suggestions instead of static advisories.",
    ],
    metrics: [
      { label: "Attention modules", value: "3" },
      { label: "Input resolution", value: "224²" },
      { label: "APIs integrated", value: "1" },
    ],
    stack: ["PyTorch", "Streamlit", "REST API", "OpenCV", "NumPy", "Python"],
  },
  {
    company: "Grapesgenix Technical Solutions",
    role: "Full-Stack Web Developer Intern",
    project: "MyMovieList — Django multi-media tracker",
    period: "Jun 2025 — Jul 2025",
    location: "Thrissur",
    bullets: [
      "Built MyMovieList end-to-end in Django + SQLite: auth, sessions, watchlists, ratings, reviews, and a custom profile dashboard.",
      "Integrated four external APIs simultaneously: TMDB, Jikan, Kitsu, Comic Vine; behind one unified content model for films, series, anime, and comics.",
      "Modelled inheritance across media types with Django ORM to keep queries clean as the catalog grew.",
    ],
    metrics: [
      { label: "External APIs", value: "4" },
      { label: "Media categories", value: "4" },
      { label: "Auth flows", value: "Full" },
    ],
    stack: ["Django", "Django ORM", "SQLite", "REST APIs", "HTML / CSS", "Bootstrap 5"],
  },
  {
    company: "Indian Oil Corporation",
    role: "Python Developer Intern",
    project: "Face-recognition Attendance — IOC Gujarat Refinery",
    period: "Dec 2024 — Jan 2025",
    location: "Vadodara",
    bullets: [
      "Shipped an OpenCV LBPH-based face-recognition attendance system, deployed live during Toolbox Talk sessions at the Gujarat Refinery.",
      "Connected the recognition pipeline to MySQL with timestamped attendance logs, eliminating manual roll calls and proxy attendance.",
      "Added a ReportLab export module so HR could pull PDF/CSV reports directly, and wrapped the whole thing in a Tkinter UI simple enough for zero-training use.",
    ],
    metrics: [
      { label: "Manual roll calls", value: "→ 0" },
      { label: "Export formats", value: "PDF · CSV" },
      { label: "Training required", value: "None" },
    ],
    stack: ["Python", "OpenCV", "LBPH", "MySQL", "Tkinter", "ReportLab"],
  },
];
