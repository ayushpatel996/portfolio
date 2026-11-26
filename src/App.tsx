import { useEffect, useLayoutEffect, useState } from 'react';
import {
  Code2, Database, Cloud, Award,
  Briefcase, Mail, Github, Linkedin, ExternalLink, Layers, Phone, Moon, Sun,
  type LucideIcon,
} from 'lucide-react';
import { ExperienceSection } from './components/ExperienceSection';
import { HeroTerminal } from './components/HeroTerminal';
import { ProjectsSection } from './components/ProjectsSection';
import { experiences, projects } from './data/portfolio';

const lightTheme = { id: 'olive', name: 'Light mode', icon: Sun };
const darkTheme = { id: 'charcoal', name: 'Dark mode', icon: Moon };

const themeStorageKey = 'portfolio-theme';

function getSavedDarkMode() {
  try {
    return window.localStorage.getItem(themeStorageKey) === darkTheme.id;
  } catch {
    return false;
  }
}

const sections = [
  { id: 'hero', label: 'About' },
  { id: 'projects', label: 'Selected work' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'stats', label: 'Overview' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const mobileLinks = [
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const NavigationDots = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const pageSections = sections.map(({ id }) => document.getElementById(id));
    const updateActiveSection = () => {
      const viewportHeight = window.innerHeight;
      const readingPosition = viewportHeight * 0.3;
      const atPageEnd = window.scrollY + viewportHeight >= document.documentElement.scrollHeight - 1;
      const visibleSection = atPageEnd
        ? pageSections[pageSections.length - 1]
        : pageSections.find((section) => {
            const bounds = section?.getBoundingClientRect();
            return bounds && bounds.top <= readingPosition && bounds.bottom > readingPosition;
          });
      if (visibleSection) setActiveSection(visibleSection.id);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return (
    <nav aria-label="Page sections" className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col lg:flex">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          aria-current={activeSection === id ? 'location' : undefined}
          className="group relative grid size-8 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-theme-accent"
        >
          <span className={`size-3 rounded-full border-2 border-theme-accent transition-colors group-hover:bg-theme-accent ${activeSection === id ? 'bg-theme-accent' : ''}`} />
          <span aria-hidden="true" className="pointer-events-none absolute right-full whitespace-nowrap rounded bg-surface px-2 py-1 font-mono text-xs opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </nav>
  );
};

function StatCard({ icon: Icon, value, label, targetId }: { icon: LucideIcon; value: number; label: string; targetId: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="flex flex-col items-center gap-2 rounded-xl border border-divider bg-surface px-2 py-4 text-center transition-colors hover:border-theme-accent sm:p-6"
    >
      <Icon aria-hidden="true" className="size-6 text-theme-accent" />
      <span className="text-2xl font-bold tabular-nums text-content">{value}</span>
      <span className="text-sm text-secondary-text">{label}</span>
    </a>
  );
}

const skillCategories = [
  { name: 'Languages', icon: Code2, skills: ['Java', 'SQL', 'Python'] },
  { name: 'Backend', icon: Layers, skills: ['Spring Boot', 'REST APIs', 'Microservices', 'Hibernate', 'JPA'] },
  { name: 'Distributed systems', icon: Database, skills: ['Apache Kafka', 'Redis', 'Event Streaming'] },
  { name: 'DevOps', icon: Cloud, skills: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD'] },
  { name: 'Databases', icon: Database, skills: ['PostgreSQL', 'MySQL', 'Oracle DB', 'IBM DB2'] },
];

function SkillTree() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {skillCategories.map(({ name, icon: Icon, skills }) => (
        <article key={name} className="rounded-xl border border-divider bg-surface p-6">
          <div className="mb-4 flex items-center gap-3">
            <Icon aria-hidden="true" className="size-6 text-theme-accent" />
            <h3 className="text-lg font-bold">{name}</h3>
          </div>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill} className="rounded-full border border-divider bg-section px-3 py-1 font-mono text-xs text-content">
                {skill}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

const companyCount = new Set(experiences.map(({ company }) => company)).size;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(getSavedDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const nextTheme = isDarkMode ? lightTheme : darkTheme;

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme.id;
  }, [theme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    try {
      window.localStorage.setItem(themeStorageKey, nextTheme.id);
    } catch {
      // The active theme remains usable when browser storage is unavailable.
    }
  };

  return (
    <div className="relative min-h-screen bg-page">
      <a href="#main-content" className="sr-only z-[60] rounded-lg bg-theme-accent px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-divider bg-page">
        <div className="mx-auto flex min-h-16 max-w-[59rem] items-center justify-between gap-4 px-6">
          <a href="#hero" className="font-semibold text-content hover:text-theme-accent">Ayush Patel</a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`${theme.name}. Switch to ${nextTheme.name}`}
            className="inline-flex min-h-11 min-w-28 items-center justify-center gap-2 rounded-lg border border-divider bg-surface px-3 text-sm font-semibold text-content transition-colors hover:border-theme-accent hover:text-theme-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent"
          >
            <theme.icon aria-hidden="true" className="size-4 text-theme-accent" />
            {theme.name}
          </button>
          <span className="sr-only" role="status">{theme.name} active</span>
        </div>
        <nav aria-label="Quick navigation" className="mx-auto grid max-w-[59rem] grid-cols-3 border-t border-divider px-6 lg:hidden">
          {mobileLinks.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="grid min-h-11 place-items-center text-sm font-semibold text-content hover:text-theme-accent">
              {label}
            </a>
          ))}
        </nav>
      </header>
      <NavigationDots />

      <main id="main-content" tabIndex={-1}>
        <section id="hero" aria-labelledby="hero-title" className="px-6 pb-14 pt-12 sm:pb-20 sm:pt-20">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-9 md:grid-cols-[1.5fr_1fr] md:gap-12">
              <div className="flex flex-col items-start">
                <p className="mb-3 text-base font-semibold text-theme-accent">Software Engineer 2 · Pune, India</p>
                <h1 id="hero-title" className="text-[clamp(2.25rem,8vw,4.5rem)] font-bold leading-tight tracking-tight text-content">
                  Ayush Patel
                </h1>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-content">
                  I build enterprise applications and modernize legacy systems, with a focus on distributed services and API performance.
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                  <a href="#projects" className="rounded-lg bg-theme-accent px-5 py-3 font-semibold text-on-accent transition-colors hover:bg-theme-accent/90">
                    View work
                  </a>
                  <a
                    href="https://drive.google.com/file/d/1IkEwcC6rfWROk8N-kVH3YtydH3_LshXI/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-theme-accent/50 px-5 py-3 font-semibold text-theme-accent transition-colors hover:bg-theme-accent/10"
                  >
                    Résumé
                  </a>
                </div>
              </div>

              <div className="grid min-w-0 gap-3 md:grid-rows-[auto_1fr]">
                <div role="group" aria-label="Employers" className="grid grid-cols-2 gap-3">
                  <div className="grid h-16 min-w-0 place-items-center rounded-lg border border-divider bg-white px-3">
                    <img
                      src={import.meta.env.BASE_URL + 'hashedin-logo.png'}
                      alt="HashedIn by Deloitte"
                      width="400"
                      height="129"
                      className="h-9 w-full max-w-28 object-contain"
                    />
                  </div>
                  <div className="grid h-16 min-w-0 place-items-center rounded-lg border border-divider bg-white px-3">
                    <img
                      src={import.meta.env.BASE_URL + 'infosys-logo.png'}
                      alt="Infosys"
                      width="330"
                      height="132"
                      className="h-8 w-full max-w-24 object-contain"
                    />
                  </div>
                </div>
                <HeroTerminal />
              </div>
            </div>

            <a
              href="#experience"
              className="group mt-8 flex w-full flex-col gap-1 rounded-xl border border-theme-accent/25 bg-theme-accent/5 px-5 py-4 transition-colors hover:border-theme-accent/60 sm:mt-10"
            >
              <span className="text-xl font-bold text-theme-accent group-hover:underline">Backend engineering and AI development</span>
              <span className="text-content">
                My stack includes Java, Spring Boot, and Python, with Apache Kafka for event streaming and Redis for caching.
                I also develop AI-powered features and integrations with Claude.
              </span>
            </a>
          </div>
        </section>

        <ProjectsSection />
        <ExperienceSection />

        <section id="certifications" aria-labelledby="certifications-title" className="px-6 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 id="certifications-title" className="mb-7 text-3xl font-bold">Certifications</h2>
            <article className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl border border-divider bg-surface p-5 sm:flex-nowrap sm:p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-theme-accent/10 text-theme-accent">
                <Award aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0 flex-1 basis-40">
                <h3 className="text-lg font-bold">Claude Certified Developer - Foundations</h3>
                <p className="mt-1 text-sm text-secondary-text">
                  Anthropic · Issued <time dateTime="2026-09-18">Sep 18, 2026</time> · Expires <time dateTime="2027-09-18">Sep 18, 2027</time>
                </p>
              </div>
              <a
                href="https://www.credly.com/badges/2a58f7b8-d828-4451-a1e6-4f57234330fa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-theme-accent/40 px-3 py-2 text-sm font-semibold text-theme-accent transition-colors hover:bg-theme-accent/10"
              >
                View credential <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            </article>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" aria-labelledby="stats-title" className="px-6 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 id="stats-title" className="mb-7 text-3xl font-bold">At a glance</h2>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <StatCard icon={Briefcase} value={companyCount} label="Companies" targetId="experience" />
              <StatCard icon={Layers} value={projects.length} label="Projects" targetId="projects" />
              <StatCard icon={Code2} value={skillCategories.length} label="Skill areas" targetId="skills" />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" aria-labelledby="skills-title" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 id="skills-title" className="mb-12 text-center text-3xl font-bold">Skill tree</h2>
            <SkillTree />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" aria-labelledby="contact-title" className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="contact-title" className="mb-8 text-3xl font-bold">Get in touch</h2>

            <p className="text-secondary-text mb-12">
              Ready to level up your team? Let's connect and discuss how I can contribute to your next project.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:ayush.patel.996@gmail.com"
                className="group flex max-w-full items-center gap-2 rounded-xl border border-divider bg-surface px-3 py-3 transition-all hover:border-theme-accent hover:bg-theme-accent hover:text-on-accent sm:gap-3 sm:px-6"
              >
                <Mail aria-hidden="true" className="size-5 shrink-0 text-theme-accent group-hover:text-on-accent" />
                <span className="break-all font-mono text-sm sm:text-base">ayush.patel.996@gmail.com</span>
              </a>
              <a
                href="tel:+917987351889"
                className="flex items-center gap-3 px-6 py-3 bg-surface border border-divider rounded-xl hover:border-theme-accent hover:bg-theme-accent hover:text-on-accent transition-all group"
              >
                <Phone aria-hidden="true" className="w-5 h-5 text-theme-accent group-hover:text-on-accent" />
                <span className="font-mono">+91 7987351889</span>
              </a>
            </div>

            <div className="flex justify-center gap-6 mt-12">
              <a
                href="https://github.com/ayushpatel996"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-divider rounded-xl hover:border-theme-accent hover:bg-theme-accent group transition-all"
              >
                <Github aria-hidden="true" className="w-5 h-5 text-secondary-text group-hover:text-on-accent" />
              </a>
              <a
                href="https://www.linkedin.com/in/ayushpatel1312/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-divider rounded-xl hover:border-theme-accent hover:bg-theme-accent group transition-all"
              >
                <Linkedin aria-hidden="true" className="w-5 h-5 text-secondary-text group-hover:text-on-accent" />
              </a>
            </div>

            <footer className="mt-16 text-sm text-secondary-text">
              <p>© {new Date().getFullYear()} Ayush Patel</p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
