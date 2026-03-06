import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";

export default function ProjectCard({ title, description, category, technologies, github, live, featured, index = 0 }) {
  const visibleTags = technologies.slice(0, 3);
  const overflow = technologies.length - 3;

  return (
    <div
      className="card-lift group relative rounded-xl border border-border hover:border-primary/40 bg-card flex flex-col overflow-hidden transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            {category && (
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">{category}</p>
            )}
            <h3 className="text-base font-bold text-foreground leading-snug">{title}</h3>
          </div>
          {featured && (
            <span className="flex-shrink-0 text-xs bg-primary/15 text-primary border border-primary/25 px-2 py-0.5 rounded-full font-mono">
              ★
            </span>
          )}
        </div>

        {/* Description — truncated, shown on hover */}
        <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3 flex-1">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {visibleTags.map((tech) => (
            <span key={tech} className="bg-muted text-muted-foreground py-0.5 px-2 rounded-md text-xs font-mono border border-border">
              {tech}
            </span>
          ))}
          {overflow > 0 && (
            <span className="py-0.5 px-2 rounded-md text-xs font-mono text-muted-foreground border border-dashed border-border">
              +{overflow}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-muted border border-transparent hover:border-border"
            >
              <FaGithub className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors px-2.5 py-1.5 rounded-md hover:bg-primary/10 border border-transparent hover:border-primary/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
