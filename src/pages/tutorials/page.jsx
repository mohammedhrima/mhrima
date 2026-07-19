import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import Band, { BandHeading } from "@/components/site/Band";
import { uraLangTutorial } from "@/data/tutorials";
import { uraJsTutorial } from "@/data/tutorials-urajs";

/** Section counts are derived, so they can never drift from the content. */
function countSections(tutorial) {
  return tutorial.groups.reduce((n, g) => n + g.sections.length, 0);
}

const DOCS = [
  {
    tutorial: uraLangTutorial,
    href: "/tutorials/ura-lang",
    tags: ["C", "LLVM", "Compiler", "Systems"],
    sample: `struct Hero:
    name  chars
    level int

    pub fn new(name chars) Hero:
        h Hero
        h.name  = name
        h.level = 1
        return h

main():
    hero Hero = Hero::new("Aldric")
    output(hero.name, " lv", hero.level, "\\n")`,
  },
  {
    tutorial: uraJsTutorial,
    href: "/tutorials/urajs",
    tags: ["TypeScript", "JSX", "SPA", "Framework"],
    sample: `import Ura, { State } from "ura";

function Counter() {
  const [count, setCount] = State(0);

  return (
    <button onclick={() => setCount(count() + 1)}>
      Clicked {count()} times
    </button>
  );
}

export default Counter;`,
  },
];

export default function TutorialsPage() {
  return (
    <>
      <Band tone="brand" innerClassName="py-14">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Documentation
        </h1>
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-white/85">
          Full written documentation for the two things I built from scratch — a
          compiled language and a reactive UI framework.
        </p>
      </Band>

      <Band tone="alt">
        <div className="grid gap-6 lg:grid-cols-2">
          {DOCS.map(({ tutorial, href, tags, sample }) => (
            <article
              key={tutorial.id}
              className="flex flex-col rounded border border-[var(--ds-border)] bg-[var(--ds-bg)] p-6"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-[var(--ds-muted)]">
                {tutorial.label}
              </p>

              <h2 className="mt-2 text-xl font-bold">{tutorial.title}</h2>

              <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--ds-muted)]">
                {tutorial.tagline}
              </p>

              <ul className="mt-4 flex list-none flex-wrap gap-1.5 p-0">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded border border-[var(--ds-border)] px-2 py-0.5 font-mono text-[0.7rem] text-[var(--ds-muted)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="ds-code mt-5 flex-1">
                <pre>
                  <code>{sample}</code>
                </pre>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  to={href}
                  className="rounded bg-[var(--ds-primary)] px-4 py-1.5 text-sm font-medium text-[var(--ds-primary-contrast)] transition-opacity hover:opacity-90"
                >
                  Read the Docs
                </Link>
                <a
                  href={tutorial.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded border border-[var(--ds-border)] px-4 py-1.5 text-sm transition-colors hover:border-[var(--ds-primary)] hover:text-[var(--ds-primary)]"
                >
                  <FaGithub className="h-3.5 w-3.5" aria-hidden="true" />
                  Source
                </a>
                <span className="ml-auto font-mono text-[0.75rem] text-[var(--ds-muted)]">
                  {countSections(tutorial)} sections
                </span>
              </div>
            </article>
          ))}
        </div>
      </Band>
    </>
  );
}
