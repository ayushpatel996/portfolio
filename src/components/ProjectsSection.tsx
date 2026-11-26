import { ExternalLink } from 'lucide-react';
import { projects, type Project } from '../data/portfolio';

function ProjectCard({ id, title, description, tech, link, details }: Project) {
  return (
    <article
      id={id}
      className="flex scroll-mt-6 flex-col overflow-hidden rounded-xl border border-divider bg-surface transition-colors target:border-theme-accent/60"
    >
      <div className="flex flex-1 flex-col items-start p-5 sm:p-6">
        <h3 className="mb-3 text-xl font-bold text-content">{title}</h3>
        <p className="mb-4 leading-relaxed text-content">{description}</p>
        <ul aria-label="Technologies" className="mb-4 flex flex-wrap gap-2">
          {tech.map((technology) => (
            <li key={technology} className="rounded border border-divider bg-section px-2 py-1 font-mono text-xs text-content">
              {technology}
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
}

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-y border-divider bg-section px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <h2 id="projects-title" className="mb-7 text-3xl font-bold text-content">Selected work</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.id} {...project} />)}
        </div>
      </div>
    </section>
  );
}
