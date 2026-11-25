import { useEffect, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2, Database, Cloud, Award,
  Briefcase, Mail, Github, Linkedin, ExternalLink,
  ChevronRight, Zap, Shield, Cpu, Layers, MapPin, Phone, Moon, Sun, Terminal
} from 'lucide-react';

const financialAdvisory = {
  improvement: '25–30%',
  resultDescription: 'improvement in API response times after introducing Redis caching',
};

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
  { id: 'stats', label: 'Stats' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
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

// Stats Card Component
const StatCard = ({ icon: Icon, value, label, targetId }: { icon: any; value: string; label: string; targetId?: string }) => {
  const handleClick = () => {
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      className="bg-surface border border-divider rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 relative group"
    >
      <Icon className="w-8 h-8 text-theme-accent" />
      <div className="text-3xl font-bold tabular-nums text-content">{value}</div>
      <div className="text-sm text-secondary-text flex items-center gap-1">
        {label}
        {targetId && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-theme-accent -mr-5" />}
      </div>
    </motion.div>
  );
};

// Skill Tree Component
const SkillTree = () => {
  const skillCategories = [
    {
      name: 'Languages',
      icon: Code2,
      skills: ['Java', 'SQL', 'Python']
    },
    {
      name: 'Backend',
      icon: Layers,
      skills: ['Spring Boot', 'REST APIs', 'Microservices', 'Hibernate', 'JPA']
    },
    {
      name: 'Distributed',
      icon: Database,
      skills: ['Apache Kafka', 'Redis', 'Event Streaming']
    },
    {
      name: 'DevOps',
      icon: Cloud,
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skillCategories.map((category, i) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="bg-surface border border-divider rounded-xl p-6 hover:border-theme-accent transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <category.icon className="size-6 text-theme-accent" />
            <h3 className="text-lg font-bold">{category.name}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, j) => (
              <motion.span
                key={skill}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.1 + j * 0.05 }}
                viewport={{ once: true }}
                className="rounded-full border border-divider bg-section px-3 py-1 font-mono text-xs text-content"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Achievement Badge Component
const AchievementBadge = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="flex flex-col items-center gap-4 rounded-xl border border-divider bg-surface p-6">
    <div className="grid size-12 place-items-center rounded-full bg-theme-accent/10 text-theme-accent">
      <Icon className="size-6" />
    </div>
    <div className="text-center">
      <h3 className="font-bold text-content">{title}</h3>
      <p className="text-sm text-secondary-text mt-1">{description}</p>
    </div>
  </div>
);

// Experience Timeline Component
const ExperienceTimeline = () => {
  const experiences = [
    {
      company: 'HashedIn by Deloitte',
      role: 'Software Engineer 2',
      period: 'Oct 2025 - Present',
      location: 'Pune, MH',
      icon: Zap,
      outcome: `${financialAdvisory.improvement} ${financialAdvisory.resultDescription}`,
      achievements: [
        'Modernized legacy financial systems to microservices',
        'Implemented Apache Kafka for event-driven architecture'
      ]
    },
    {
      company: 'Infosys',
      role: 'Digital Specialist Engineer',
      period: 'Jun 2022 - Oct 2025',
      location: 'Bangalore, KA',
      icon: Shield,
      outcome: 'Reduced API latency by 20–25%',
      achievements: [
        'Built backend services for large-scale identity platform',
        'Led UI development for admin workflows'
      ]
    }
  ];

  return (
    <div className="relative pl-10 md:pl-0">
      <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-divider md:left-1/2" />

      {experiences.map((exp, i) => (
        <motion.div
          key={exp.company}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
            i % 2 === 0 ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
            <div className="bg-surface border border-divider rounded-xl p-6 hover:border-theme-accent transition-all">
              <div className="flex items-center gap-3 mb-3">
                <exp.icon className="size-6 shrink-0 text-theme-accent" />
                <h3 className="text-lg font-bold text-content">{exp.role}</h3>
              </div>
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <span className="text-sm font-semibold text-theme-accent">{exp.company}</span>
                <span className="text-secondary-text text-sm">• {exp.period}</span>
              </div>
              <p className="mb-4 flex items-center gap-1.5 text-sm text-secondary-text">
                <MapPin aria-hidden="true" className="size-4" /> {exp.location}
              </p>
              <p className="text-content">{exp.outcome}</p>
              <details className="mt-4">
                <summary className="w-fit cursor-pointer rounded-sm text-sm font-semibold text-theme-accent hover:underline">
                  Engineering details
                </summary>
                <ul className="mt-3 space-y-2">
                  {exp.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-2 text-sm text-content">
                      <ChevronRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-theme-accent" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>

          <div className="absolute left-4 grid size-8 -translate-x-1/2 place-items-center rounded-full bg-theme-accent md:left-1/2">
            <exp.icon className="w-4 h-4 text-on-accent" />
          </div>

          <div className="hidden md:block flex-1" />
        </motion.div>
      ))}
    </div>
  );
};

type ProjectCardProps = {
  id?: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  details?: string;
};

const ProjectCard = ({ id, title, description, tech, link, details }: ProjectCardProps) => (
  <article
    id={id}
    className="flex scroll-mt-6 flex-col overflow-hidden rounded-xl border border-divider bg-surface transition-colors target:border-theme-accent/60"
  >
    <div className="flex flex-1 flex-col items-start p-5 sm:p-6">
      <h3 className="mb-3 text-xl font-bold text-content">{title}</h3>
      <p className="mb-4 leading-relaxed text-content">{description}</p>
      <ul aria-label="Technologies" className="mb-4 flex flex-wrap gap-2">
        {tech.map((t) => (
          <li
            key={t}
            className="rounded border border-divider bg-section px-2 py-1 font-mono text-xs text-content"
          >
            {t}
          </li>
        ))}
      </ul>
      {details && (
        <details className="mt-auto w-full border-t border-divider pt-4">
          <summary className="w-fit cursor-pointer rounded-sm text-sm font-semibold text-theme-accent hover:underline">Engineering details</summary>
          <p className="mt-3 text-sm leading-relaxed text-content">{details}</p>
        </details>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 rounded-lg border border-theme-accent/40 px-3 py-2 text-sm font-semibold text-theme-accent transition-colors hover:bg-theme-accent/10"
        >
          Live demo <ExternalLink aria-hidden="true" className="size-4" />
        </a>
      )}
    </div>
  </article>
);

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
      </header>
      <NavigationDots />

      <section id="hero" aria-labelledby="hero-title" className="px-6 pb-14 pt-12 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid items-center gap-9 md:grid-cols-[1.5fr_1fr] md:gap-12">
            <div>
              <p className="mb-3 text-base font-semibold text-theme-accent">Software Engineer 2 · Pune, India</p>
              <h1 id="hero-title" className="text-[clamp(2.25rem,8vw,4.5rem)] font-bold leading-tight tracking-tight text-content">
                Ayush Patel
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-content">
                I build backend services with Java and Spring Boot. My work includes modernizing legacy systems into
                event-driven microservices and improving API performance.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
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

            <div className="overflow-hidden rounded-xl border border-divider bg-surface">
              <div className="flex items-center gap-2 border-b border-divider bg-surface px-4 py-3">
                <Terminal aria-hidden="true" className="size-4 text-secondary-text" />
                <span className="font-mono text-xs text-secondary-text">ayush@portfolio</span>
              </div>
              <div className="flex items-center gap-4 p-4">
                <img
                  src={import.meta.env.BASE_URL + 'photo.jpg'}
                  alt="Ayush Patel"
                  width="80"
                  height="80"
                  className="size-[4.5rem] shrink-0 rounded-lg border border-divider object-cover sm:size-20"
                />
                <nav aria-label="Terminal shortcuts" className="flex min-w-0 flex-wrap gap-x-4 gap-y-2 font-mono text-sm">
                  <a href="#experience" className="text-theme-accent hover:underline">$ experience</a>
                  <a href="#skills" className="text-theme-accent hover:underline">$ skills</a>
                  <a href="#contact" className="text-theme-accent hover:underline">$ contact</a>
                </nav>
              </div>
            </div>
          </div>

          <a
            href="#financial-advisory"
            className="group mt-8 flex w-full flex-col gap-x-5 gap-y-1 rounded-xl border border-theme-accent/25 bg-theme-accent/5 px-5 py-4 transition-colors hover:border-theme-accent/60 sm:mt-10 sm:flex-row sm:items-center"
          >
            <span className="text-3xl font-bold tabular-nums text-theme-accent">{financialAdvisory.improvement}</span>
            <span>
              <span className="block text-content first-letter:uppercase">{financialAdvisory.resultDescription}</span>
              <span className="text-sm text-secondary-text group-hover:underline">Financial Advisory Modernization</span>
            </span>
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" aria-labelledby="projects-title" className="border-y border-divider bg-section px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 id="projects-title" className="mb-7 text-3xl font-bold text-content">
            Selected work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="PHx2 Music Player"
              description="A collaborative music player where listeners vote in real time to control Spotify playback."
              tech={['Django', 'REST APIs', 'Spotify API', 'WebSockets']}
              link="https://phx2-app.onrender.com/"
            />
            <ProjectCard
              id="financial-advisory"
              title="Financial Advisory Modernization"
              description={`Helped move legacy financial workflows to microservices, with a ${financialAdvisory.improvement} ${financialAdvisory.resultDescription}.`}
              tech={['Java', 'Spring Boot', 'Apache Kafka', 'Redis']}
              details="Implemented Apache Kafka for event-driven communication and used Redis caching to improve API performance as part of the move to Java and Spring Boot services."
            />
            <ProjectCard
              title="Enterprise Identity Platform"
              description="Built backend services and led UI development for admin workflows on an enterprise identity management platform."
              tech={['Java', 'Spring Boot', 'PostgreSQL', 'REST APIs']}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Quest log
          </motion.h2>

          <ExperienceTimeline />
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Character stats
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Briefcase} value="2" label="Companies" targetId="experience" />
            <StatCard icon={Code2} value="4+" label="Years Coding" targetId="experience" />
            <StatCard icon={Cpu} value="15+" label="Technologies" targetId="skills" />
            <StatCard icon={Award} value="5" label="Achievements" targetId="achievements" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Skill tree
          </motion.h2>

          <SkillTree />
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-6 bg-section">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Achievements
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AchievementBadge
              icon={Zap}
              title="System Architect"
              description="Led microservices migration"
            />
            <AchievementBadge
              icon={Cpu}
              title="Performance Master"
              description="25-30% API improvement"
            />
            <AchievementBadge
              icon={Cloud}
              title="Cloud Native"
              description="Docker/Kubernetes deployment"
            />
            <AchievementBadge
              icon={Layers}
              title="Kafka Expert"
              description="Event-driven architecture"
            />
            <AchievementBadge
              icon={Shield}
              title="Bug Slayer"
              description="Production incident resolution"
            />
            <AchievementBadge
              icon={Database}
              title="Data Handler"
              description="Multi-database expertise"
            />
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-8 text-3xl font-bold"
          >
            Get in touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-secondary-text mb-12"
          >
            Ready to level up your team? Let's connect and discuss how I can contribute to your next project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <a
              href="mailto:ayush.patel.996@gmail.com"
              className="group flex max-w-full items-center gap-2 rounded-xl border border-divider bg-surface px-3 py-3 transition-all hover:border-theme-accent hover:bg-theme-accent hover:text-on-accent sm:gap-3 sm:px-6"
            >
              <Mail className="size-5 shrink-0 text-theme-accent group-hover:text-on-accent" />
              <span className="break-all font-mono text-sm sm:text-base">ayush.patel.996@gmail.com</span>
            </a>
            <a
              href="tel:+917987351889"
              className="flex items-center gap-3 px-6 py-3 bg-surface border border-divider rounded-xl hover:border-theme-accent hover:bg-theme-accent hover:text-on-accent transition-all group"
            >
              <Phone className="w-5 h-5 text-theme-accent group-hover:text-on-accent" />
              <span className="font-mono">+91 7987351889</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-6 mt-12"
          >
            <a
              href="https://github.com/ayushpatel996"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border border-divider rounded-xl hover:border-theme-accent hover:bg-theme-accent group transition-all"
            >
              <Github className="w-5 h-5 text-secondary-text group-hover:text-on-accent" />
            </a>
            <a
              href="https://www.linkedin.com/in/ayushpatel1312/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border border-divider rounded-xl hover:border-theme-accent hover:bg-theme-accent group transition-all"
            >
              <Linkedin className="w-5 h-5 text-secondary-text group-hover:text-on-accent" />
            </a>
          </motion.div>

          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 text-sm text-secondary-text"
          >
            <p>© {new Date().getFullYear()} Ayush Patel</p>
          </motion.footer>
        </div>
      </section>
    </div>
  );
}

export default App;
