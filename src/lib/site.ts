export const site = {
  name: "P S Suryanarayanan",
  handle: "P S SURYANARAYANAN",
  role: "Machine Learning & Computer Vision Engineer",
  email: "suryanarayananps2005@gmail.com",
  phone: "+91 90236 07811",
  location: "Bangalore, India",
  github: "https://github.com/RyoHaradaps",
  linkedin: "https://www.linkedin.com/in/pssuryanarayanan/",
  resumeUrl: "/P_S_SURYANARAYANAN_s_resume.pdf",
} as const;

export type NavItem = {
  label: string;
  kind: "section";
  hash: string;
};

export const nav: NavItem[] = [
  { label: "About", kind: "section", hash: "about" },
  { label: "Projects", kind: "section", hash: "projects" },
  { label: "Experience", kind: "section", hash: "experience" },
  { label: "Stack", kind: "section", hash: "skills" },
  { label: "Contact", kind: "section", hash: "contact" },
];

