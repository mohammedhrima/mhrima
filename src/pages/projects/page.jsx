"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects, CATEGORIES } from "@/data/projects";

const tabs = Object.values(CATEGORIES);

function getCount(tab) {
  if (tab === CATEGORIES.ALL) return projects.length;
  if (tab === CATEGORIES.FEATURED) return projects.filter((p) => p.featured).length;
  return projects.filter((p) => p.category === tab).length;
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState(CATEGORIES.ALL);

  const filtered =
    activeTab === CATEGORIES.ALL
      ? projects
      : activeTab === CATEGORIES.FEATURED
      ? projects.filter((p) => p.featured)
      : projects.filter((p) => p.category === activeTab);

  return (
    <div className="pt-16">
      {/* Hero banner */}
      <section className="relative pt-20 pb-12 px-4 grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="section-label">All Work</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 gradient-text-blue">Projects</h1>
          <p className="text-muted-foreground text-base mt-4">
            {projects.length} projects · {projects.filter((p) => p.featured).length} featured
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="animate-fade-up max-w-6xl w-full mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    activeTab === tab
                      ? "bg-primary border-primary text-primary-foreground ring-1 ring-primary/30"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {tab}
                  <span className="ml-1.5 text-xs opacity-60">{getCount(tab)}</span>
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  index={i}
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  technologies={project.technologies}
                  github={project.github}
                  live={project.live}
                  featured={project.featured}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-16">No projects in this category.</p>
            )}
        </div>
      </section>
    </div>
  );
}
