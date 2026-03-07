"use client";

import { MapPin } from "lucide-react";
import ReviewOnScroll from "@/components/ReviewOnScroll";
import { educationEntries } from "@/data/education";

export default function EducationPage() {
  return (
    <div className="pt-16">
      {/* Hero banner */}
      <section className="relative pt-20 pb-12 px-4 grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="section-label">Background</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 gradient-text-blue">Education</h1>
          <p className="text-muted-foreground text-base mt-4 max-w-xl mx-auto">
            From mechanical engineering to compiler design — an unconventional path.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <ReviewOnScroll>
          <div className="max-w-3xl w-full mx-auto">
            <div className="relative pl-6 border-l-2 border-border space-y-8">
              {educationEntries.map((edu, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[1.65rem] w-3 h-3 bg-primary rounded-full border-2 border-background mt-1.5" />

                  <div className="card-lift p-6 rounded-xl border border-border border-l-0 bg-card hover:border-primary/30">
                    {/* Degree + date */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-foreground">{edu.degree}</h3>
                      <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded flex-shrink-0">
                        {edu.date}
                      </span>
                    </div>

                    {/* Institution */}
                    {edu.institution && (
                      edu.link ? (
                        <a
                          href={edu.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm font-medium"
                        >
                          {edu.institution}
                        </a>
                      ) : (
                        <p className="text-primary/80 text-sm font-medium">{edu.institution}</p>
                      )
                    )}

                    {/* Location */}
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1 mb-3">
                      <MapPin className="w-3 h-3 flex-shrink-0" />{edu.location}
                    </p>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 hidden md:block">
                      {edu.description}
                    </p>

                    {/* Topic pills */}
                    {edu.topics && edu.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {edu.topics.map((topic) => (
                          <span key={topic} className="badge badge-blue">{topic}</span>
                        ))}
                      </div>
                    )}
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
