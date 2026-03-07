import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { BookOpen, Terminal, ArrowRight } from "lucide-react";
import ReviewOnScroll from "@/components/ReviewOnScroll";

const tutorials = [
  {
    href: "/tutorials/ura-lang",
    label: "Language Docs",
    title: "Ura Language",
    tagline: "A compiled, statically-typed language with Python's clean indentation syntax — built on LLVM and written entirely in C.",
    github: "https://github.com/mohammedhrima/ura-lang",
    Icon: Terminal,
    sections: 19,
    tags: ["C", "LLVM", "Compiler", "Systems"],
    highlight: "LLVM-based compiler",
    color: "text-primary",
    sample: `use "@/io"

fn fib(n int) int:
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

main():
    printf("fib(10) = %d\\n", fib(10))`,
  },
  {
    href: "/tutorials/urajs",
    label: "Framework Docs",
    title: "UraJS",
    tagline: "A lightweight SPA framework with directory-based routing, reactive state, and live reload — inspired by React and Next.js.",
    github: "https://github.com/mohammedhrima/UraJS",
    Icon: BookOpen,
    sections: 14,
    tags: ["JavaScript", "JSX", "SPA", "Framework"],
    highlight: "Custom JSX extensions",
    color: "text-emerald-400",
    sample: `function Counter() {
  const [count, setCount] = Ura.State(0);

  return (
    <button onclick={() => setCount(count() + 1)}>
      Clicks: {count()}
    </button>
  );
}`,
  },
];

export default function TutorialsPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative pt-20 pb-12 px-4 grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="section-label">Docs & Guides</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 gradient-text-blue">Tutorials</h1>
          <p className="text-muted-foreground text-base mt-4 max-w-xl mx-auto">
            Deep-dives into two projects I built from scratch — a compiled language and a frontend framework.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-12 px-4">
        <ReviewOnScroll>
          <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-6">
            {tutorials.map(({ href, label, title, tagline, github, Icon, sections, tags, highlight, color, sample }) => (
              <div key={href} className="card-lift rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
                {/* Card header */}
                <div className="p-8 pb-6 border-b border-border">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-primary/10 border border-border flex items-center justify-center ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <FaGithub className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{label}</span>
                  <h2 className="text-2xl font-bold text-foreground mt-1 mb-2">{title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tagline}</p>
                </div>

                {/* Code preview */}
                <div className="mx-6 my-5 rounded-lg overflow-hidden border border-border flex-1">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-muted border-b border-border">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-xs font-mono text-muted-foreground">{title === "Ura Language" ? "example.ura" : "Counter.jsx"}</span>
                  </div>
                  <pre className="bg-[#0d0d0d] text-[#d4d4d8] text-xs font-mono p-4 overflow-x-auto leading-relaxed whitespace-pre">
                    <code>{sample}</code>
                  </pre>
                </div>

                {/* Meta */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.map((tag) => (
                      <span key={tag} className="badge badge-blue">{tag}</span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mb-5">
                    {sections} sections · {highlight}
                  </p>
                  <Link
                    to={href}
                    className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/60 text-primary font-semibold text-sm py-2.5 rounded-lg transition-all"
                  >
                    Read the Docs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </ReviewOnScroll>
      </section>
    </div>
  );
}
