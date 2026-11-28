# Ayush Patel · Developer Portfolio

A personal portfolio for Ayush Patel, Software Engineer 2, covering backend engineering, distributed systems, and AI development.

[View the live portfolio](https://ayushpatel996.github.io/portfolio/)

## Explore the portfolio

- **Selected work** covers the PHx2 Music Player, financial advisory modernization, and an enterprise identity platform.
- **Experience** highlights the technologies used on Edward Jones and Cisco projects, alongside the roles at HashedIn by Deloitte and Infosys. Expand **Engineering details** for contributions and outcomes.
- **Certifications** includes the Anthropic Claude Certified Developer - Foundations credential and its Credly verification link.
- **Interactive terminal** opens from `ayush@portfolio` in the hero. Run `help` to see the available commands. There are a few hidden animations to discover.
- **Accessibility** includes keyboard navigation, mobile shortcuts, reduced-motion support, and a Light/Dark preference that persists across visits.

## Run locally

The portfolio uses React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide. CI uses Node.js 20.

```bash
git clone https://github.com/ayushpatel996/portfolio.git
cd portfolio
npm ci
npm run dev
```

Open [localhost:5173](http://localhost:5173/).

## Build and test

```bash
npm run build
npx playwright install chromium
npm run test:smoke
```

The smoke test serves the production build under `/portfolio/` and checks mobile and desktop navigation, theme persistence, asset loading, and terminal interactions. Set `PLAYWRIGHT_CHROMIUM_CHANNEL` to `msedge` or `chrome` to use an installed browser.

GitHub Actions runs the [build and smoke test](.github/workflows/check.yml) on pull requests to `main`. Pushes to `main` trigger the [GitHub Pages deployment](.github/workflows/deploy.yml).

## Update the content

- Edit projects, experience, client names, and technology lists in [`src/data/portfolio.ts`](src/data/portfolio.ts).
- Edit the hero, skill tree, certification, and contact sections in [`src/App.tsx`](src/App.tsx).

## Contact

[Email](mailto:ayush.patel.996@gmail.com) · [LinkedIn](https://www.linkedin.com/in/ayushpatel1312/) · [GitHub](https://github.com/ayushpatel996)
