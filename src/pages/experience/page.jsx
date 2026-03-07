"use client";

import { MapPin } from "lucide-react";
import { experiences } from "@/data/experience";

const typeBadge = {
  "Full-time": "badge-green",
  "Freelance":  "badge-blue",
  "Contract":   "badge-purple",
  "Bootcamp":   "badge-purple",
  "Part-time":  "badge-blue",
};

export default function ExperiencePage() {
  return (
    <div className="pt-16">
      {/* Hero banner */}
      <section className="relative pt-20 pb-12 px-4 grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="section-label">Work History</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 gradient-text-blue">Experience</h1>
          <p className="text-muted-foreground text-base mt-4 max-w-xl mx-auto">
            From aerospace engineering to software — my journey across industries.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="animate-fade-up max-w-3xl w-full mx-auto">
            <div className="relative pl-6 border-l-2 border-border space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[1.65rem] w-3 h-3 bg-primary rounded-full border-2 border-background mt-1.5" />

                  <div className="card-lift p-6 rounded-xl border border-border border-l-0 bg-card hover:border-primary/30">
                    {/* Title + badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-foreground text-base">{exp.title}</h3>
                      <span className={`badge ${typeBadge[exp.type] || "badge-blue"}`}>{exp.type}</span>
                    </div>

                    {/* Company + date */}
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      {exp.company && (
                        exp.link ? (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm font-medium"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          <span className="text-primary text-sm font-medium">{exp.company}</span>
                        )
                      )}
                      <span className="text-xs font-mono text-muted-foreground">{exp.date}</span>
                    </div>

                    {/* Location */}
                    {exp.location && (
                      <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <MapPin className="w-3 h-3 flex-shrink-0" />{exp.location}
                      </p>
                    )}

                    {/* Description */}
                    {exp.description && (
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{exp.description}</p>
                    )}

                    {/* Bullets */}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="space-y-1.5">
                        {exp.bullets.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                            <span className="text-primary flex-shrink-0 mt-0.5">▸</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech tags */}
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="badge badge-blue">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>
    </div>
  );
}
