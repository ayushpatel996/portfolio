# Gamified Developer Portfolio

A gamified portfolio website for **Ayush Patel**, Software Engineer 2. The design combines a developer terminal with selected work, a skill tree, and an experience timeline.

## ✨ Features

- **Terminal Hero Section**: An engineering introduction, résumé link, and terminal-style shortcuts.
- **Selected Work**: Project summaries, a link to the PHx2 demo, and the API performance result from Financial Advisory Modernization.
- **At a Glance**: Links to experience, projects, and skill areas with counts based on the portfolio content.
- **Skill Tree**: Technical skills grouped by specialty.
- **Quest Log (Experience)**: A timeline with outcomes and expandable details for each role.
- **Responsive Design**: Fully optimized for both desktop and mobile views.
- **Light and Dark Modes**: The header button toggles between olive and charcoal and saves the selection in the browser.

## 🛠️ Technology Stack

- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 📦 Building for Production

To create a production-ready build, run:
```bash
npm run build
```
The optimized files will be generated in the `dist` directory, which you can deploy to Vercel, Netlify, GitHub Pages, or any static hosting service.

## Portfolio checks

GitHub Actions builds the portfolio and runs a Chromium smoke test on pull requests to `main`. To run the same checks locally:

```bash
npx playwright install chromium
npm run build
npm run test:smoke
```

Set `PLAYWRIGHT_CHROMIUM_CHANNEL` to `msedge` or `chrome` to use an installed browser. Update the project and experience entries in `src/data/portfolio.ts`.

## 📫 Contact

- **Email**: ayush.patel.996@gmail.com
- **LinkedIn**: [https://www.linkedin.com/in/ayushpatel1312/](https://www.linkedin.com/in/ayushpatel1312/)
- **GitHub**: [https://github.com/ayushpatel996](https://github.com/ayushpatel996)

---
*Designed & Built by Ayush Patel.*
