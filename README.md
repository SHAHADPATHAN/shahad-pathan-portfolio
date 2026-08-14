# Shahad Pathan — Personal Developer Portfolio

[![Deploy with Vercel](https://vercel.com/button)](https://shahadpathan.vercel.app)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start_v1-FF4154?style=flat-square&logo=tanstack&logoColor=white)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A high-performance, modern developer portfolio and interactive showcase built for **Shahad Pathan**, a Computer Engineering undergraduate at **Gujarat Technological University (GTU, Class of 2028)** specializing in **Artificial Intelligence, Data Science, and Full-Stack Software Engineering**.

🌐 **Live Demo:** [shahadpathan.vercel.app](https://shahadpathan.vercel.app)

---

## 🌟 Key Features

### 1. Interactive 3D Certificate & Credentials Showcase
- **11 Verified Global Credentials**: Certifications and awards from Oracle University, IBM (Coursera), AWS Training, Cisco Networking Academy, IN-SPACE / ISRO-registered Agnirva, IIT Guwahati (TechExpo), NHAI / MoRTH (National Road Safety Hackathon), and Government of India (MeitY/C-DAC).
- **Dual View Modes**: Seamless toggle between an **Interactive Drag-to-Scroll Carousel** and a **Full Responsive Grid Showcase**.
- **Interactive Scrubber Track**: Clickable & draggable progress bar that instantly scrubs the carousel to any certificate position with active pagination indicators.
- **Hardware-Accelerated 3D Tilt**: Perspective mouse-tracking tilt effects and radial glare sheen running on the GPU via `requestAnimationFrame` with zero React re-render lag.
- **Interactive Lightbox Viewer Modal**: Fullscreen high-resolution certificate inspector with zoom in/out (`+`/`-`), 100% reset (`0`), next/previous navigation (`←`/`→`), metadata specification sheet, and direct certificate downloads.
- **Direct Verification Proofs**: Official verification URLs and instant one-click Credential ID copying with animated checkmark feedback.

### 2. Revamped Interactive About Section
- **Multi-Tab Architecture**:
  - **Story Tab**: Personal narrative, core engineering philosophy, live shipped SaaS apps, and fast-fact counters (`11+ Verified Certs`, `GTU '28`, `2 Live AI Apps`, `10+ Repos`).
  - **Pillars Tab**: Visual cards breaking down core disciplines (*AI & Computer Vision*, *Data Science & Analytics*, *Full-Stack Software Architecture*).
  - **Journey Tab**: Milestone roadmap charting academic progress, national hackathons, aerospace internships, and production SaaS builds.
- **Holographic Developer Passport Card**: Live **"Open to Opportunities"** pulsing radar beacon, identity monogram, university specs, and one-click email copying.
- **Current Trajectory Trackers**: Color-coded engineering tracks for *Learning & Research*, *Active Engineering*, and *Future Exploration*.

### 3. Comprehensive Project Case Studies
- **Deep-Dive Architecture Overviews**: Problem analysis, tech stack breakdowns, implementation highlights, engineering challenges, key results, and live demonstrations for production systems like **Wriper AI** (AI background remover) and **Vidsnap AI** (automated video intelligence).
- **Interactive Category Filtering**: Filter across *AI / ML*, *Data Science*, *Full-Stack*, and *Tools*.

### 4. Interactive Terminal & Built-in AI Chatbot
- **Hero Interactive Terminal**: Developer-focused terminal with animated commands and execution telemetry.
- **AI Assistant Chatbot**: Floating virtual assistant capable of answering visitor queries regarding Shahad's technical stack, project architectures, and academic background.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
|---|---|---|
| **Framework** | [TanStack Start](https://tanstack.com/start) + [React 19](https://react.dev/) | Full-stack React framework with SSR and streaming capabilities |
| **Routing** | [TanStack Router](https://tanstack.com/router) | Type-safe client & server routing with automatic code splitting |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | End-to-end type safety |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + OKLCH tokens | Modern styling engine with hardware-accelerated CSS variables |
| **Animations** | [Motion](https://motion.dev/) | Fluid 60+ FPS layout and gesture animations |
| **Icons** | [Lucide React](https://lucide.dev/) | Modern, clean vector icon set |
| **Build & Dev** | [Vite 8](https://vitejs.dev/) | Instant HMR and optimized asset bundling |
| **Server Engine** | [Nitro](https://nitro.unjs.io/) | Server deployment engine configured with native `vercel` preset |
| **Deployment** | [Vercel](https://vercel.com/) | Edge & Serverless global deployment |

---

## 📁 Directory Structure

```text
shahad-pathan-portfolio/
├── public/                     # Static web assets
│   ├── certificates/           # High-resolution certificate images
│   ├── projects/               # Project screenshots and diagrams
│   ├── favicon.svg             # Custom SP monogram vector favicon
│   └── robots.txt              # Search engine crawler directives
├── src/
│   ├── components/             # Reusable UI & section components
│   │   ├── chat/               # Portfolio AI Assistant Chatbot
│   │   ├── motion/             # Antigravity canvas & particle effects
│   │   ├── projects/           # Project cards, grid, and case study modules
│   │   ├── sections/           # Hero, About, Skills, Experience, Awards, Contact
│   │   ├── ui/                 # Accessible primitives (Radix UI / custom)
│   │   ├── BrandLogo.tsx       # SP brand logo & status beacon
│   │   ├── Footer.tsx          # Live visitor counter, IST clock & footer nav
│   │   └── Navbar.tsx          # Responsive navbar with scroll spy
│   ├── data/                   # Centralized type-safe data models
│   │   ├── about.ts            # Bio, focus areas & milestones
│   │   ├── awards.ts           # 11 verified certificates & verification URLs
│   │   ├── experience.ts       # Education & technical experiences
│   │   ├── navigation.ts       # Header & footer routes
│   │   ├── profile.ts          # Core profile, contact info & SEO metadata
│   │   ├── projects.ts         # Project metadata & case study details
│   │   └── skills.ts           # Categorized engineering competencies
│   ├── routes/                 # File-based TanStack Start routes
│   │   ├── __root.tsx          # Root shell, HTML head, theme provider & styles
│   │   ├── index.tsx           # Portfolio landing page
│   │   └── projects/           # Projects hub & individual case studies ($slug.tsx)
│   ├── styles.css              # Global styles, OKLCH color tokens & utilities
│   └── routeTree.gen.ts        # Auto-generated TanStack route tree
├── package.json                # Project dependencies & scripts
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite & Nitro build configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.0.0` or higher
- **Package Manager**: `npm`, `pnpm`, or `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SHAHADPATHAN/shahad-pathan-portfolio.git
   cd shahad-pathan-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser to view the application.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment on Vercel

This repository is pre-configured with Nitro's native `vercel` preset in `vite.config.ts`.

1. Import the repository into [Vercel](https://vercel.com).
2. Vercel automatically detects the build command (`npm run build`).
3. Deploy! Output will be packaged under `.vercel/output/` according to the Build Output API v3.

---

## 📬 Contact & Connect

- **Name:** Shahad Pathan
- **Role:** Computer Engineering Student (Class of 2028)
- **Institution:** Gujarat Technological University (GTU)
- **Email:** [sahadpathan2697@gmail.com](mailto:sahadpathan2697@gmail.com)
- **LinkedIn:** [linkedin.com/in/shahad-pathan](https://www.linkedin.com/in/shahad-pathan/)
- **GitHub:** [github.com/SHAHADPATHAN](https://github.com/SHAHADPATHAN)
- **Portfolio:** [shahadpathan.vercel.app](https://shahadpathan.vercel.app)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
