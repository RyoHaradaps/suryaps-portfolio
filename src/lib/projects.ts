export type Project = {
  slug: string;
  name: string;
  index: string;
  tagline: string;
  year: string;
  role: string;
  category:
    | "AI"
    | "Computer Vision"
    | "Deep Learning"
    | "Web Development"
    | "Research";
  status: "Completed" | "Production" | "In Development" | "Research";
  difficulty: "Foundational" | "Intermediate" | "Advanced" | "Research";
  tags: string[];
  stack: string[];
  summary: string;
  problem: string;
  objectives: string[];
  architecture: string;
  workflow: string[];
  implementation: string;
  dataset?: string;
  model?: string;
  challenges: string[];
  solutions: string[];
  decisions?: { title: string; body: string }[];
  tradeoffs?: { title: string; body: string }[];
  results: string[];
  lessons?: string[];
  future: string[];
  relatedReading?: { label: string; href: string }[];
  github?: string;
  demo?: string;
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
    summary:
      "AgroScan is a decision-support tool for farmers: upload a single leaf photo, get a disease diagnosis, a confidence score, live weather context, and an AI-generated advisory — all in one flow.",
    problem:
      "Plant disease detection demos usually stop at a validation accuracy number. Farmers need something else: a diagnosis they can act on, in context, with an idea of what to do next.",
    objectives: [
      "Design a custom attention-augmented CNN that focuses on lesion regions, not background.",
      "Ship an inference pipeline usable from a browser — upload to advisory in one screen.",
      "Fold in live environmental context so remedies are situated, not generic.",
    ],
    architecture:
      "Streamlit UI → 224×224 preprocessing → AttCM-AlexNet (Channel + Spatial + Self-Attention) → softmax + confidence → Weather REST API → AI-generated advisory panel.",
    workflow: [
      "Farmer uploads leaf image",
      "Preprocess & normalise to 224×224",
      "AttCM-AlexNet forward pass",
      "Fetch live weather via REST",
      "Compose diagnosis + remedy advisory",
    ],
    implementation:
      "Custom AlexNet backbone with three attention modules stacked on top: Channel Attention re-weights feature maps, Spatial Attention localises lesion regions, and a Self-Attention block captures long-range dependencies. Trained in PyTorch, served through Streamlit for zero-install access.",
    dataset: "PlantVillage-style leaf disease corpus, resized to 224×224 with photometric augmentation.",
    model: "AttCM-AlexNet — AlexNet + Channel + Spatial + Self-Attention (PyTorch).",
    challenges: [
      "Background noise dominating features on field-quality images",
      "Keeping inference light enough for a Streamlit runtime",
      "Making a raw prediction feel like advice, not a number",
    ],
    solutions: [
      "Layered attention so the network learned where to look before what to say",
      "Kept the AlexNet backbone instead of a heavier ResNet — smaller, faster, enough capacity",
      "Coupled weather + disease into a single advisory panel, not two disconnected widgets",
    ],
    decisions: [
      {
        title: "Why AlexNet, not ResNet-50?",
        body: "The dataset is small and the deployment target is Streamlit on modest hardware. A lighter backbone with strong attention beat a deeper backbone with weak inductive bias in early experiments.",
      },
      {
        title: "Why three attention modules?",
        body: "Channel picks the right features, Spatial picks the right region, Self-Attention lets the network relate distant lesions. Each addressed a distinct failure mode I saw in the confusion matrix.",
      },
    ],
    tradeoffs: [
      {
        title: "Custom architecture vs pre-trained",
        body: "Building AttCM-AlexNet cost weeks I could have spent fine-tuning. In exchange I understand every layer and can defend every design choice.",
      },
      {
        title: "Streamlit vs FastAPI",
        body: "Streamlit locked me into a Python-only frontend, but shipped the whole product in one file. For a farmer-facing pilot, that trade was worth it.",
      },
    ],
    results: [
      "End-to-end product: upload → diagnosis → advisory in a single screen",
      "Attention maps make model decisions inspectable, not opaque",
      "Weather-conditioned advisories rather than generic remedy lists",
    ],
    lessons: [
      "Attention is only useful when the failure mode actually looks like attention.",
      "The last 10% — advisory framing, weather context — is what makes a model feel like a product.",
    ],
    future: [
      "Quantised TorchScript export for on-device use",
      "Multi-crop coverage beyond the current class set",
      "Severity estimation, not just classification",
    ],
    relatedReading: [
      { label: "CBAM: Convolutional Block Attention Module", href: "https://arxiv.org/abs/1807.06521" },
      { label: "AlexNet, revisited", href: "https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html" },
    ],
    github: "https://github.com/RyoHaradaps",
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
    summary:
      "MyMovieList is a full-stack Django application that tracks watching history across four different media types — films, series, anime, and comics — powered by four live external APIs, unified under one clean data model.",
    problem:
      "Existing trackers pick one medium and specialise. If you actually watch a bit of everything, you need four apps. I wanted one profile, one review system, one dashboard.",
    objectives: [
      "Model films, series, anime, and comics under one inheritance-based schema",
      "Wire four external APIs (TMDB, Jikan, Kitsu, Comic Vine) behind a consistent interface",
      "Ship real auth: registration, login, sessions, hashed passwords, profile dashboard",
    ],
    architecture:
      "Django MVT → Django ORM (content inheritance) → SQLite → REST fetch layer wrapping TMDB · Jikan · Kitsu · Comic Vine → Bootstrap 5 templates with progressive JS.",
    workflow: [
      "Auth (register / login / sessions)",
      "Search a title → API resolver picks the right upstream",
      "Persist metadata under the shared content model",
      "User adds to a watchlist, rates, reviews",
      "Profile dashboard aggregates everything",
    ],
    implementation:
      "The core insight was a content inheritance model in Django ORM so films, series, anime, and comics all share a single base while keeping medium-specific fields. Each of the four APIs got its own thin resolver that normalised into the shared shape.",
    dataset: "Live external APIs: TMDB (films/series), Jikan (anime), Kitsu (anime), Comic Vine (comics).",
    challenges: [
      "Four APIs with four different rate limits, auth models, and payload shapes",
      "Keeping the ORM clean when four media types have overlapping-but-not-identical metadata",
    ],
    solutions: [
      "One resolver per API, one normaliser to a shared shape, one persistence path",
      "Content inheritance instead of a mega-flat table with nullable columns",
    ],
    decisions: [
      {
        title: "SQLite in dev, not Postgres from day one",
        body: "Two-month internship; SQLite kept iteration fast. The ORM makes migration to Postgres trivial when scale demands it.",
      },
      {
        title: "Bootstrap 5 over Tailwind",
        body: "Team preference and existing components meant faster shipping. Not the choice I'd make for a solo project, but the right one here.",
      },
    ],
    tradeoffs: [
      {
        title: "Server-rendered vs SPA",
        body: "Django templates + progressive JS meant no build step and instant deploys. Lost some UI polish; gained shipping velocity.",
      },
    ],
    results: [
      "Four APIs unified behind one consistent content model",
      "Full auth surface: register, login, sessions, hashed passwords, dashboard",
      "Responsive UI across mobile and desktop with Bootstrap 5 + custom JS",
    ],
    lessons: [
      "A boring stack you understand ships faster than an exciting one you don't.",
      "Normalising four APIs into one shape is a design exercise before it's a coding one.",
    ],
    future: [
      "Recommendation engine trained on user ratings across media types",
      "Import from Letterboxd / MAL / IMDb",
      "Migrate to PostgreSQL and add full-text search",
    ],
    github: "https://github.com/RyoHaradaps",
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
    summary:
      "A face-recognition attendance system built to replace manual roll-calls during Toolbox Talk safety sessions at IOC's Gujarat Refinery. Enrol once, get logged automatically after that.",
    problem:
      "Manual attendance at shift briefings was slow, easily faked, and generated paperwork nobody wanted to touch. Proxy attendance was a real, recurring problem.",
    objectives: [
      "Enrol workers with a small handful of photos",
      "Recognise and log attendance in real time on refinery hardware",
      "Give HR a report they can pull without touching the database",
    ],
    architecture:
      "Webcam → OpenCV capture → LBPH face recogniser → MySQL attendance log (timestamped) → Tkinter admin UI → ReportLab PDF/CSV exporter.",
    workflow: [
      "Enrol worker (few reference photos)",
      "Live capture at briefing entry",
      "LBPH match against enrolled faces",
      "Log entry to MySQL with timestamp",
      "HR pulls PDF/CSV via ReportLab",
    ],
    implementation:
      "LBPH kept the whole thing runnable on modest refinery hardware — no GPU, no cloud round-trip. Tkinter kept the operator UI simple enough that workers could register their own faces without training.",
    challenges: [
      "Lighting variance at refinery entry points",
      "Preventing proxy attendance without adding friction",
      "Operating in an environment with zero training budget",
    ],
    solutions: [
      "Histogram equalisation preprocessing before recognition",
      "Automated logging so proxy attendance had no manual gap to exploit",
      "Tkinter UI tuned to be self-explanatory — enrol, check log, done",
    ],
    decisions: [
      {
        title: "LBPH over a deep model",
        body: "Zero-GPU environment, on-prem constraints, and a small enrolled population. LBPH is the right tool — fast, understandable, defensible.",
      },
      {
        title: "Tkinter over a web UI",
        body: "Air-gapped shopfloor machine. A desktop app deployed as an .exe was operationally simpler than any browser-based option.",
      },
    ],
    tradeoffs: [
      {
        title: "Accuracy vs deployability",
        body: "A CNN would have been more accurate on hard lighting. LBPH shipped this month; the CNN would have shipped next quarter.",
      },
    ],
    results: [
      "Deployed live during Toolbox Talk sessions at the Gujarat Refinery",
      "Manual roll-calls removed from the loop entirely",
      "HR pulls PDF/CSV reports directly, without SQL access",
    ],
    lessons: [
      "Choose the model your deployment environment can actually run.",
      "Operator UX matters as much as the recognition pipeline.",
    ],
    future: [
      "Anti-spoof CNN trained on-site footage",
      "Multi-camera coverage for larger briefings",
      "Roll-based access + audit log for HR",
    ],
    github: "https://github.com/RyoHaradaps",
  },
  {
    slug: "sign-language-detector",
    name: "Dynamic Sign Language Detector",
    index: "04",
    tagline: "Person-invariant continuous sign recognition with MediaPipe + Bi-LSTM + Temporal Attention.",
    year: "2025",
    role: "Independent Research",
    category: "Research",
    status: "In Development",
    difficulty: "Research",
    tags: ["AI", "Computer Vision", "Deep Learning"],
    stack: ["Python", "PyTorch", "MediaPipe", "OpenCV", "NumPy"],
    summary:
      "A dynamic sign-language recognition system that classifies continuous hand gestures in real time from a standard webcam — built around a person-invariant feature set and a Bidirectional LSTM with temporal attention.",
    problem:
      "Most sign recognition work treats gestures as static poses or hard-codes per-signer landmarks. Real signing is temporal, and it has to work across different hands, angles, and speeds.",
    objectives: [
      "Design a person-invariant feature set (velocity + relative position) instead of raw landmarks",
      "Recognise continuous, dynamic signs — not isolated snapshots",
      "Hit real-time performance on a laptop CPU",
    ],
    architecture:
      "Webcam → MediaPipe hand landmarks (21 pts × 2) → person-invariant features (velocity + relative position) → Bi-LSTM with Temporal Attention → smoothed transcript.",
    workflow: [
      "Extract MediaPipe landmarks per frame",
      "Compute velocity + relative-position features",
      "Slide a temporal window",
      "Bi-LSTM + Temporal Attention classifier",
      "Threshold + debounce → live transcript",
    ],
    implementation:
      "Landmark-based features keep the model tiny and CPU-friendly. Person-invariance comes from deriving velocity and relative positions from the landmarks instead of feeding raw coordinates, so the model doesn't overfit to a specific hand geometry.",
    dataset: "Self-collected dynamic gesture clips, supplemented with open sign datasets.",
    model: "Bidirectional LSTM with a Temporal Attention head over MediaPipe landmark features.",
    challenges: [
      "Distinguishing signs that differ only in subtle motion",
      "Handling both hands and out-of-frame gestures",
      "Avoiding per-signer overfitting",
    ],
    solutions: [
      "Bi-LSTM + temporal attention to weight the discriminative window",
      "Two-hand landmark stream when both hands are visible",
      "Person-invariant features derived from landmarks, not raw coordinates",
    ],
    decisions: [
      {
        title: "Landmarks over raw pixels",
        body: "A landmark-based feature set trades some richness for a tiny, CPU-friendly model — and, critically, transfers across signers.",
      },
      {
        title: "Bi-LSTM over Transformer (for now)",
        body: "The dataset is small. A Bi-LSTM regularises better and trains faster; a Transformer is on the roadmap once I have the data to feed it.",
      },
    ],
    results: [
      "Real-time performance on CPU with landmark-based inference",
      "Person-invariant feature design generalises across signers in tests",
      "Active research — architecture and dataset are still evolving",
    ],
    lessons: [
      "Feature engineering isn't dead; it's just moved.",
      "For sequence tasks with small data, a smaller model with the right features beats a bigger model with the wrong ones.",
    ],
    future: [
      "Transformer-based sequence model once dataset grows",
      "Sentence-level decoding",
      "Publishable ablation study on feature choice",
    ],
    github: "https://github.com/RyoHaradaps",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectNav = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
};

export const relatedProjects = (slug: string, count = 2) => {
  const current = getProject(slug);
  if (!current) return [];
  return projects
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aOverlap = a.tags.filter((t) => current.tags.includes(t)).length;
      const bOverlap = b.tags.filter((t) => current.tags.includes(t)).length;
      return bOverlap - aOverlap;
    })
    .slice(0, count);
};

export const projectCategories = [
  "All",
  "AI",
  "Computer Vision",
  "Deep Learning",
  "Web Development",
  "Research",
] as const;