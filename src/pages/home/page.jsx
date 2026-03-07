import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { Cpu, Globe, Brain, FolderGit2, BookOpen, Zap, Briefcase, GraduationCap } from "lucide-react";
import ReviewOnScroll from "@/components/ReviewOnScroll";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import AnimatedTerminal from "@/components/ui/AnimatedTerminal";
import { featuredProjects } from "@/data/projects";

const quickNav = [
  { href: "/projects", label: "Projects", desc: "20 projects", Icon: FolderGit2 },
  { href: "/tutorials", label: "Tutorials", desc: "Ura · UraJS", Icon: BookOpen },
  { href: "/skills", label: "Skills", desc: "Tech stack", Icon: Zap },
  { href: "/experience", label: "Experience", desc: "Work history", Icon: Briefcase },
  { href: "/education", label: "Education", desc: "Background", Icon: GraduationCap },
];

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* ── Full-page background blur (fixed, theme-adaptive) ──── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        <div className="absolute top-0 left-1/4 w-[700px] h-screen bg-primary/5 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[80vh] bg-primary/4 rounded-full blur-[140px]" />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center px-4 py-16 md:py-24 grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div className="text-center md:text-left">
            <span className="section-label">Software Engineer</span>

            <h1 className="text-[2.4rem] md:text-6xl font-bold mt-4 mb-6 leading-[1.1] text-foreground">
              Hi, I&apos;m{" "}
              <span className="gradient-text-blue">Hrima&nbsp;Mohammed</span>
            </h1>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
              I build things from scratch — a{" "}
              <span className="text-primary font-semibold">compiled language</span>,
              a{" "}
              <span className="text-primary font-semibold">frontend framework</span>,
              a{" "}
              <span className="text-primary font-semibold">3D raytracer</span>, and production systems at{" "}
              <span className="text-emerald-400 font-semibold">Yakeey</span>.
              I love understanding every layer of the stack.
            </p>

            <div className="flex flex-wrap gap-3 mb-10 justify-center md:justify-start">
              <Link
                to="/projects"
                className="bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 px-6 rounded-lg font-semibold text-sm transition-all"
              >
                View Projects
              </Link>
              <Link
                to="/tutorials"
                className="border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/70 py-2.5 px-6 rounded-lg font-semibold text-sm transition-all"
              >
                Tutorials
              </Link>
              <Link
                to="/contact"
                className="border border-border text-muted-foreground hover:bg-muted/50 hover:border-border-hover py-2.5 px-6 rounded-lg font-semibold text-sm transition-all"
              >
                Get in Touch
              </Link>
            </div>

            <div className="flex items-center gap-5 justify-center md:justify-start">
              <a href="https://www.linkedin.com/in/mohammedhrima/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors text-2xl">
                <FaLinkedin />
              </a>
              <a href="https://github.com/mohammedhrima" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors text-2xl">
                <FaGithub />
              </a>
              <a href="mailto:mohammed.hrima1998@gmail.com" aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors text-2xl">
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Right — animated terminal (desktop only) */}
          <div className="hidden md:block animate-float">
            <AnimatedTerminal />
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────────────── */}
      <section className="py-24 px-4">
        <ReviewOnScroll>
          <div className="max-w-5xl mx-auto w-full">
            <div className="text-center mb-14">
              <span className="section-label">Flagship Work</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
                Projects I&apos;m Most Proud Of
              </h2>
              <p className="mt-4 text-muted-foreground text-base max-w-xl mx-auto">
                Three projects that pushed my limits — a language, a framework, and a 3D engine.
              </p>
            </div>
          </div>
        </ReviewOnScroll>
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {featuredProjects.map((project, i) => (
            <ReviewOnScroll key={project.id}>
              <FeaturedProjectCard project={project} index={i} />
            </ReviewOnScroll>
          ))}
        </div>
      </section>

      {/* ── About Me ──────────────────────────────────────────────── */}
      <ReviewOnScroll>
        <section className="py-20 px-4 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-label">The Story</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-8 gradient-text-blue">About Me</h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              I started as a mechanical engineer and CNC machinist — a background that gave me a deep appreciation
              for precision and process. During the COVID lockdown in 2020, I taught myself Python and JavaScript
              from scratch. That spark led me to{" "}
              <span className="text-primary font-semibold">1337</span> (42 Network) — a peer-to-peer CS school
              with no professors and no lectures, where you learn by doing. I graduated in January 2025, having
              built a full LLVM-based compiler in C (the Ura language), a frontend JavaScript framework (UraJS),
              and a real-time 3D raytracer in C++. I now build banking and real estate platforms at{" "}
              <span className="text-emerald-400 font-semibold">Yakeey</span>, full time.
            </p>
          </div>
        </section>
      </ReviewOnScroll>

      {/* ── What I Do ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-border bg-background">
        <ReviewOnScroll>
          <div className="max-w-5xl mx-auto w-full text-center mb-14">
            <span className="section-label">Expertise</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">What I Do</h2>
          </div>
        </ReviewOnScroll>
        <ReviewOnScroll stagger className="max-w-5xl mx-auto w-full grid md:grid-cols-3 gap-6">
          {[
            {
              Icon: Cpu,
              title: "Systems Programming",
              desc: "LLVM, C, C++. Compilers, interpreters, memory-safe runtimes, high-performance networking.",
              color: "text-primary",
            },
            {
              Icon: Globe,
              title: "Full-Stack Web",
              desc: "React, Next.js, Node.js, Spring Boot, Flutter. From REST APIs to real-time dashboards.",
              color: "text-emerald-400",
            },
            {
              Icon: Brain,
              title: "AI & Machine Learning",
              desc: "Python, TensorFlow, Ollama. Local LLMs, RAG pipelines, CNN classifiers, prediction systems.",
              color: "text-indigo-400",
            },
          ].map(({ Icon, title, desc, color }) => (
            <div
              key={title}
              className="card-lift glow-card p-6 rounded-xl bg-card border border-border hover:border-primary/30"
            >
              <Icon className={`w-8 h-8 ${color}`} />
              <h3 className="text-foreground font-bold text-lg mt-4 mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </ReviewOnScroll>
      </section>

      {/* ── Quick Nav ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 border-t border-border">
        <ReviewOnScroll>
          <p className="text-center text-muted-foreground text-xs font-mono tracking-widest uppercase mb-8">
            Explore the portfolio
          </p>
        </ReviewOnScroll>
        <ReviewOnScroll stagger className="max-w-4xl mx-auto w-full grid grid-cols-2 md:grid-cols-5 gap-3">
          {quickNav.map(({ href, label, desc, Icon }) => (
            <Link
              key={href}
              to={href}
              className="card-lift p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 text-center group"
            >
              <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors mx-auto" />
              <p className="text-foreground font-semibold text-sm mt-2 group-hover:text-primary transition-colors">
                {label}
              </p>
              <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
            </Link>
          ))}
        </ReviewOnScroll>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="py-10 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="font-mono">
            <span className="text-foreground font-semibold">Hrima Mohammed</span> — Software Engineer
          </p>
          <div className="flex items-center gap-5">
            <a href="https://github.com/mohammedhrima" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/mohammedhrima/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="mailto:mohammed.hrima1998@gmail.com" className="hover:text-primary transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
