# P S Suryanarayanan — Portfolio

An engineering-first, minimalist portfolio showcasing systems and projects in Machine Learning, Computer Vision, and Full Stack Engineering.

This codebase is a premium Single Page Application (SPA) with Server-Side Rendering (SSR) capabilities built on **TanStack Start**, compiled via **Nitro**, and deployed on **Cloudflare Workers**.

---

## Key Features

* **Visual Scale & Breathing Room**: A typography-first aesthetic with a spacious `1360px` page layout, responsive negative spacing, and customized smooth scrolling.
* **Interactive AI Topology Graph**: A real-time D3-simulation powered SVG graph mapping core competencies (Machine Learning, CV, Deep Learning, Full Stack, Data Science) with organic node spread, hover transitions, and viewport-scale boundaries.
* **Case Study System**: Detailed, documentation-first case studies (e.g., AgroScan, MyMovieList, Refinery Attendance) covering problem statements, architecture, datasets, datasets trade-offs, and implementation logs.
* **Regression-Free Design**: Responsive and visual regression test suites using Playwright to prevent layout shifts across breakpoints.

---

## Tech Stack
* **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (React 19, Vite, TanStack Router)
* **Styling**: Tailwind CSS v4 + Lightning CSS
* **Build System**: Nitro (preset: `cloudflare-module`)
* **Environment**: Node.js / Bun
* **Deployment**: Cloudflare Workers / Wrangler

---

## Development Workflow

### 1. Install Dependencies
```bash
# Using npm
npm install

# Or using Bun
bun install
```

### 2. Run Local Development Server
```bash
npm run dev
# Or
bun run dev
```
Starts the local development server at [http://localhost:8080/](http://localhost:8080/).

---

## Production Preview & Deployment

### 1. Build the Application
```bash
npm run build
# Or
bun run build
```
This compiles the application and invokes **Nitro** with the `cloudflare-module` preset. The compiled server code and static assets are placed in the `.output/` directory:
* `.output/public/` - Bundled static resources (images, styles, compiled client JS).
* `.output/server/` - Compiled Cloudflare Worker server-side bundle.

### 2. Preview the Production Build Locally
```bash
npm run preview
# Or
bun run preview
```
* **Wrangler Preview**: The `preview` script is pre-configured to launch **Wrangler** using the generated `.output/server/wrangler.json` configuration file, which emulates the Cloudflare Worker runtime locally and serves static client assets correctly.

### 3. Deploy to Cloudflare Workers
To deploy the compiled application to Cloudflare Workers:
```bash
npx wrangler deploy --config .output/server/wrangler.json
```

---

## Testing & Quality Assurance
* **End-to-End Visual Regression**: Playwright is used to capture responsive visual snapshots of key sections to prevent layout shifts.
  ```bash
  # Run all E2E tests
  npm run test:e2e
  
  # Run visual regression screenshots and verify layout consistency
  npm run test:visual
  ```

---

## Documentation
Additional details about the codebase structure, state management, and design tokens can be found in the [docs/repository_analysis.md](docs/repository_analysis.md) file.
