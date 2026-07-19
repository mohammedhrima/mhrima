import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Band, { BandHeading } from "@/components/site/Band";
import CodeShowcase from "@/components/site/CodeShowcase";
import { featuredProjects } from "@/data/projects";
import content from "@/data/content.json";

const PRINCIPLES = [
  {
    title: "Systems Programming",
    body: "LLVM, C and C++. Compilers, interpreters, memory-safe runtimes and high-performance networking — built from the ground up rather than assembled from libraries.",
  },
  {
    title: "Full-Stack Web",
    body: "React, Next.js, Node.js, Spring Boot and Flutter. From REST APIs and real-time dashboards to production banking platforms.",
  },
  {
    title: "Precision by Training",
    body: "A background in mechanical and CNC engineering, applied to software: tight tolerances, repeatable processes, and a bias toward correctness over cleverness.",
  },
  {
    title: "Learning by Building",
    body: "1337 / 42 Network — no lectures, no professors. Every concept earned by shipping the thing that proves you understand it.",
  },
];

export default function HomePage() {
  const { personal, stats } = content;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Band tone="brand" innerClassName="py-20 text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/70">
          {personal.title}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          {personal.name}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
          I build things from the ground up — a compiled language, a frontend
          framework, a 3D raytracer, and production systems for real banks.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/projects"
            className="rounded bg-[var(--ds-secondary)] px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            View Projects
          </Link>
          <Link
            to="/tutorials"
            className="rounded border border-white/50 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Read the Docs
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xl text-white/70">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-white"
          >
            <FaLinkedin />
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-white"
          >
            <FaGithub />
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className="transition-colors hover:text-white"
          >
            <FaEnvelope />
          </a>
        </div>
      </Band>

      {/* ── Intro + live Ura example ─────────────────────────── */}
      <Band tone="alt">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <BandHeading sub="Ura is a compiled, statically-typed language with Python's clean indentation syntax — a tokenizer, parser, and LLVM IR backend written entirely in C.">
              I write the layers other people import
            </BandHeading>

            <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--ds-muted)]">
              {personal.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                to="/tutorials/ura-lang"
                className="rounded border border-[var(--ds-primary)] px-4 py-1.5 text-sm font-medium text-[var(--ds-primary)] transition-colors hover:bg-[var(--ds-primary)] hover:text-[var(--ds-primary-contrast)]"
              >
                Ura Language Docs
              </Link>
              <Link
                to="/tutorials/urajs"
                className="rounded border border-[var(--ds-primary)] px-4 py-1.5 text-sm font-medium text-[var(--ds-primary)] transition-colors hover:bg-[var(--ds-primary)] hover:text-[var(--ds-primary-contrast)]"
              >
                UraJS Docs
              </Link>
              <a
                href="https://github.com/mohammedhrima/ura-lang"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-[var(--ds-primary)] px-4 py-1.5 text-sm font-medium text-[var(--ds-primary)] transition-colors hover:bg-[var(--ds-primary)] hover:text-[var(--ds-primary-contrast)]"
              >
                Browse Source
              </a>
            </div>
          </div>

          <CodeShowcase />
        </div>
      </Band>

      {/* ── Measured impact ──────────────────────────────────── */}
      <Band tone="base">
        <BandHeading sub="Numbers from shipped production work, not side projects.">
          In Production
        </BandHeading>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-l-2 border-[var(--ds-secondary)] pl-4"
            >
              <dt className="text-2xl font-bold">{stat.value}</dt>
              <dd className="mt-1 text-sm font-medium">{stat.label}</dd>
              <dd className="mt-1 text-[0.8rem] leading-relaxed text-[var(--ds-muted)]">
                {stat.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Band>

      {/* ── Featured work ────────────────────────────────────── */}
      <Band tone="alt">
        <BandHeading sub="A language, a framework, and a 3D engine — the projects that pushed me hardest.">
          Flagship Work
        </BandHeading>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded border border-[var(--ds-border)] bg-[var(--ds-bg)] p-5"
            >
              <h3 className="text-base font-bold">{project.title}</h3>
              <p className="mt-2 flex-1 text-[0.85rem] leading-relaxed text-[var(--ds-muted)]">
                {project.tagline}
              </p>

              {project.technologies?.length > 0 && (
                <ul className="mt-4 flex list-none flex-wrap gap-1.5 p-0">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-[var(--ds-border)] px-2 py-0.5 font-mono text-[0.7rem] text-[var(--ds-muted)]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 flex gap-3 text-[0.8rem]">
                {project.hasTutorial && (
                  <Link to={`/tutorials/${project.id}`} className="ds-link">
                    Docs
                  </Link>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-link"
                  >
                    Source
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/projects"
            className="rounded border border-[var(--ds-primary)] px-4 py-1.5 text-sm font-medium text-[var(--ds-primary)] transition-colors hover:bg-[var(--ds-primary)] hover:text-[var(--ds-primary-contrast)]"
          >
            See All Projects
          </Link>
        </div>
      </Band>

      {/* ── Approach ─────────────────────────────────────────── */}
      <Band tone="base">
        <BandHeading>How I Work</BandHeading>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-normal">{item.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--ds-muted)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Band>

      {/* ── Contact CTA ──────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "var(--ds-secondary)",
          color: "var(--ds-secondary-contrast)",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-10 text-center">
          <h2 className="text-xl font-bold">
            Building something that needs a systems engineer?
          </h2>
          <Link
            to="/contact"
            className="rounded border border-current px-5 py-2 text-sm font-semibold transition-colors hover:bg-black/10"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
