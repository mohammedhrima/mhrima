"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Copy, Check, ChevronDown, ChevronRight } from "lucide-react";

function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="rounded-lg overflow-hidden border border-border my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          {label && (
            <span className="text-xs font-mono text-muted-foreground">{label}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted/80"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre className="bg-[#0d0d0d] text-[#d4d4d8] text-sm font-mono p-5 overflow-x-auto leading-relaxed whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SidebarGroup({ group, activeId, onSelect }) {
  const isGroupActive = group.sections.some((s) => s.id === activeId);
  const [open, setOpen] = useState(isGroupActive);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors"
      >
        <span>{group.label}</span>
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        )}
      </button>
      {open &&
        group.sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`w-full text-left px-6 py-2 text-sm transition-colors border-l-2 ${
              activeId === s.id
                ? "border-primary bg-primary/10 text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {s.title}
          </button>
        ))}
    </div>
  );
}

function BlockRenderer({ blocks }) {
  return blocks.map((block, i) => {
    if (block.type === "text") {
      return (
        <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-4">
          {block.content}
        </p>
      );
    }
    if (block.type === "heading") {
      return (
        <h3 key={i} className="text-base font-bold text-foreground mt-6 mb-2 border-t border-border pt-4 first:border-0 first:pt-0">
          {block.content}
        </h3>
      );
    }
    if (["code", "bash", "output"].includes(block.type)) {
      return <CodeBlock key={i} code={block.code} label={block.label} />;
    }
    if (block.type === "info") {
      return (
        <div key={i} className="my-4 p-4 rounded-lg bg-primary/10 border border-primary/20 text-sm text-foreground leading-relaxed">
          <span className="font-semibold text-primary">Note — </span>
          {block.content}
        </div>
      );
    }
    if (block.type === "warning") {
      return (
        <div key={i} className="my-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm leading-relaxed">
          <span className="font-semibold text-yellow-400">Warning — </span>
          {block.content}
        </div>
      );
    }
    if (block.type === "table") {
      return (
        <div key={i} className="my-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-foreground font-semibold text-xs uppercase tracking-wide border-b border-border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-2.5 font-mono text-xs ${ci === 0 ? "text-primary" : "text-muted-foreground"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (block.type === "list") {
      return (
        <ul key={i} className="my-3 space-y-1.5">
          {block.items.map((item, li) => (
            <li key={li} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  });
}

export default function DocPage({ tutorial }) {
  const allSections = tutorial.groups.flatMap((g) => g.sections);
  const [activeId, setActiveId] = useState(allSections[0].id);

  const section = allSections.find((s) => s.id === activeId) ?? allSections[0];
  const idx = allSections.findIndex((s) => s.id === activeId);
  const prev = allSections[idx - 1];
  const next = allSections[idx + 1];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative pt-16 pb-10 px-4 grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            ← All Tutorials
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="section-label">{tutorial.label}</span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 gradient-text-blue">
                {tutorial.title}
              </h1>
              <p className="text-muted-foreground mt-2 text-sm max-w-2xl leading-relaxed">
                {tutorial.tagline}
              </p>
            </div>
            <a
              href={tutorial.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 text-sm bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 px-4 py-2 rounded-lg transition-all"
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-52 flex-shrink-0">
          <div className="sticky top-24 rounded-xl border border-border bg-card overflow-hidden max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-thin">
            {tutorial.groups.map((group) => (
              <SidebarGroup
                key={group.label}
                group={group}
                activeId={activeId}
                onSelect={(id) => {
                  setActiveId(id);
                }}
              />
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Section header + content — keyed so it fades in on each switch */}
            <div key={section.id} className="animate-fade-up" style={{ animationDuration: "0.2s" }}>
              <div className="px-8 py-6 border-b border-border">
                <p className="text-xs font-mono text-primary mb-1.5 flex items-center gap-1.5">
                  <span>{tutorial.id}</span>
                  <span className="text-muted-foreground">/</span>
                  <span>{section.id}</span>
                </p>
                <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                <p className="text-xs text-muted-foreground font-mono mt-1.5">
                  Section {idx + 1} of {allSections.length}
                </p>
              </div>

              {/* Content */}
              <div className="px-8 py-6">
                <BlockRenderer blocks={section.blocks} />
              </div>
            </div>

            {/* Prev / Next */}
            <div className="flex items-center justify-between px-8 pb-8 pt-4 border-t border-border gap-4">
              {prev ? (
                <button
                  onClick={() => {
                    setActiveId(prev.id);
                  }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
                  <span>{prev.title}</span>
                </button>
              ) : (
                <div />
              )}
              {next ? (
                <button
                  onClick={() => {
                    setActiveId(next.id);
                  }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span>{next.title}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* Mobile section list */}
          <div className="md:hidden mt-6 rounded-xl border border-border bg-card overflow-hidden">
            <p className="text-xs font-mono text-muted-foreground px-4 py-3 border-b border-border uppercase tracking-widest">
              All Sections
            </p>
            {allSections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors border-l-2 ${
                  activeId === s.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {i + 1}. {s.title}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
