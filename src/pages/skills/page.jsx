"use client";

import ReviewOnScroll from "@/components/ReviewOnScroll";
import { skillGroups } from "@/data/skills";

export default function SkillsPage() {
  return (
    <div className="pt-16">
      {/* Hero banner */}
      <section className="relative pt-20 pb-12 px-4 grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="section-label">Tech Stack</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 gradient-text-blue">Skills</h1>
          <p className="text-muted-foreground text-base mt-4 max-w-xl mx-auto">
            Languages, frameworks, and tools I work with daily.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <ReviewOnScroll>
          <div className="max-w-5xl w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {skillGroups.map((group) => (
                <div
                  key={group.id}
                  className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-primary text-lg">{group.icon}</span>
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wide font-mono">
                      {group.title}
                    </h3>
                  </div>

                  <div className="space-y-3.5">
                    {group.skills.map((skill, si) => (
                      <div key={skill.name} style={{ transitionDelay: `${si * 80}ms` }}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm text-muted-foreground">{skill.name}</span>
                          <span className="text-xs font-mono text-primary">{skill.level}%</span>
                        </div>
                        <div className="skill-bar-bg">
                          <div className="skill-bar-fill" style={{ "--skill-width": `${skill.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ReviewOnScroll>
      </section>
    </div>
  );
}
