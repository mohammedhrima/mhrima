import { Download } from "lucide-react";
import ReviewOnScroll from "@/components/ReviewOnScroll";
import { experiences } from "@/data/experience";
import { educationEntries } from "@/data/education";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";

const highlightProjects = ["ura-lang", "urajs", "raytracer", "medi-simple-gpt", "apcm-pharma"];

export default function ResumePage() {
  const resumeProjects = projects.filter((p) => highlightProjects.includes(p.id));

  return (
    <div className="pt-16">
      <ReviewOnScroll>
      <div className="max-w-3xl mx-auto px-6 py-12 w-full">
        {/* Download button */}
        <div className="flex justify-end mb-8 print:hidden">
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-10 pb-8 border-b border-border">
          <h1 className="text-3xl font-bold text-foreground mb-1">Hrima Mohammed</h1>
          <p className="text-primary font-medium mb-3">Software Engineer</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground font-mono">
            <a href="mailto:mohammed.hrima1998@gmail.com" className="hover:text-primary transition-colors">
              mohammed.hrima1998@gmail.com
            </a>
            <span>+212 657 80 48 24</span>
            <a href="https://www.linkedin.com/in/mohammedhrima/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              linkedin/mohammedhrima
            </a>
            <a href="https://github.com/mohammedhrima" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              github/mohammedhrima
            </a>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-mono mb-3 pb-1 border-b border-border">
            Summary
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Full stack engineer specializing in performance-critical code and architecting scalable web applications.
            Transitioned from Mechanical and CNC Engineering to IT — bringing a deep commitment to precision, robust
            architecture, and process optimization. Creator of the Ura programming language (LLVM-based compiler in C),
            UraJS framework, and a real-time C++ raytracer. Currently building banking and real estate platforms at Yakeey.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-mono mb-4 pb-1 border-b border-border">
            Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                  <h3 className="font-semibold text-foreground text-sm">{exp.title}</h3>
                  <span className="text-xs font-mono text-muted-foreground">{exp.date}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {exp.company && (
                    <span className="text-primary text-sm font-medium">{exp.company}</span>
                  )}
                  {exp.location && (
                    <span className="text-xs text-muted-foreground">· {exp.location}</span>
                  )}
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="space-y-1">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary flex-shrink-0 mt-0.5">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-mono mb-4 pb-1 border-b border-border">
            Education
          </h2>
          <div className="space-y-4">
            {educationEntries.map((edu) => (
              <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-1">
                <div>
                  <span className="font-semibold text-foreground text-sm">{edu.degree}</span>
                  {edu.institution && (
                    <span className="text-muted-foreground text-sm"> — {edu.institution}</span>
                  )}
                </div>
                <span className="text-xs font-mono text-muted-foreground flex-shrink-0">{edu.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-mono mb-4 pb-1 border-b border-border">
            Skills
          </h2>
          <div className="space-y-2">
            {skillGroups.map((group) => (
              <div key={group.id} className="flex gap-2 text-sm">
                <span className="text-muted-foreground font-medium min-w-[140px] flex-shrink-0">{group.title}:</span>
                <span className="text-foreground">{group.skills.map((s) => s.name).join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-mono mb-4 pb-1 border-b border-border">
            Selected Projects
          </h2>
          <div className="space-y-5">
            {resumeProjects.map((p) => (
              <div key={p.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                  <h3 className="font-semibold text-foreground text-sm">{p.title}</h3>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-primary hover:underline"
                    >
                      {p.github.replace("https://", "")}
                    </a>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.technologies.map((t) => (
                    <span key={t} className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      </ReviewOnScroll>
    </div>
  );
}
