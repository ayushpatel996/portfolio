import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, MapPin } from 'lucide-react';
import { experiences } from '../data/portfolio';

export function ExperienceSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" aria-labelledby="experience-title" className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 id="experience-title" className="mb-12 text-center text-3xl font-bold">Quest log</h2>
        <ol className="relative space-y-12 pl-10 before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-divider md:pl-0 md:before:left-1/2">
          {experiences.map(({ company, role, period, location, icon: Icon, outcome, details }, index) => (
            <motion.li
              key={company}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
              viewport={{ once: true }}
              className="relative focus-within:!transform-none focus-within:!opacity-100 motion-reduce:!transform-none motion-reduce:!opacity-100 md:grid md:grid-cols-2"
            >
              <article className={`rounded-xl border border-divider bg-surface p-6 ${index % 2 === 0 ? 'md:mr-12' : 'md:col-start-2 md:ml-12'}`}>
                <h3 className="mb-3 text-lg font-bold text-content">{role}</h3>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-theme-accent">{company}</span>
                  <span className="text-sm text-secondary-text">{period}</span>
                </div>
                <p className="mb-4 flex items-center gap-1.5 text-sm text-secondary-text">
                  <MapPin aria-hidden="true" className="size-4 shrink-0" /> {location}
                </p>
                <p className="text-content">{outcome}</p>
                <details className="mt-4">
                  <summary className="w-fit cursor-pointer rounded-sm text-sm font-semibold text-theme-accent hover:underline">Engineering details</summary>
                  <ul className="mt-3 space-y-2">
                    {details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-content">
                        <ChevronRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-theme-accent" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </details>
              </article>
              <div aria-hidden="true" className="absolute -left-6 top-0 z-10 grid size-8 -translate-x-1/2 place-items-center rounded-full bg-theme-accent md:left-1/2">
                <Icon className="size-4 text-on-accent" />
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
