import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { BookOpen, ArrowUpRight } from "lucide-react";

const tutorialRoutes = {
  "ura-lang": "/tutorials/ura-lang",
  urajs: "/tutorials/urajs",
};

export default function FeaturedProjectCard({ project, index = 0 }) {
  const { id, title, tagline, description, technologies, github, highlights } = project;
  const tutorialLink = tutorialRoutes[id];
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="card-lift group relative rounded-2xl border border-border hover:border-primary/40 bg-card overflow-hidden transition-all duration-300">
      {/* Top accent bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-primary/70 via-primary/30 to-transparent" />

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono text-primary/60 uppercase tracking-widest mb-2">
              Featured Project
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">{title}</h3>
            <p className="text-primary text-sm mt-1.5 font-medium">{tagline}</p>
          </div>
          {/* Faded project number */}
          <span className="text-6xl md:text-7xl font-black leading-none select-none flex-shrink-0 -mt-1 -mr-1 opacity-[0.06] text-primary">
            {num}
          </span>
        </div>

        {/* Body — 2 columns on desktop */}
        <div className="grid md:grid-cols-[1fr_160px] gap-6 md:gap-8">
          {/* Left: description + highlights */}
          <div>
            <p className="hidden md:block text-muted-foreground text-sm leading-relaxed mb-5">{description}</p>
            {highlights && highlights.length > 0 && (
              <ul className="space-y-2 border-l-2 border-primary/20 pl-4">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5 flex-shrink-0 text-xs">▸</span>
                    <span className="text-foreground/75 hidden md:inline">{h}</span>
                    <span className="text-foreground/75 md:hidden line-clamp-1">{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: tech badges + links */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary/10 text-primary py-0.5 px-2.5 rounded-md text-xs border border-primary/20 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-auto">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 text-sm bg-muted hover:bg-muted/80 border border-border hover:border-primary/30 text-foreground px-3 py-2 rounded-lg transition-all group/link"
                >
                  <span className="flex items-center gap-2">
                    <FaGithub className="w-3.5 h-3.5 flex-shrink-0" />
                    GitHub
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
              )}
              {tutorialLink && (
                <Link
                  to={tutorialLink}
                  className="flex items-center justify-between gap-2 text-sm bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 text-primary px-3 py-2 rounded-lg transition-all group/link"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                    Tutorial
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
