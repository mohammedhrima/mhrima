"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { SiAnthropic, SiGoogle, SiX, SiFacebook } from "react-icons/si";
import { Code2, LayoutGrid } from "lucide-react";

const themes = [
  { id: "portfolio", label: "Portfolio", Icon: Code2,       color: "#3b82f6" },
  { id: "claude",    label: "Claude",    Icon: SiAnthropic, color: "#d97706" },
  { id: "twitter",   label: "X",         Icon: SiX,         color: "#1d9bf0" },
  { id: "verecell",  label: "Verecell",  Icon: LayoutGrid,  color: "#ffffff" },
  { id: "facebook",  label: "Facebook",  Icon: SiFacebook,  color: "#2d88ff" },
  { id: "google",    label: "Google",    Icon: SiGoogle,    color: "#8ab4f8" },
];

export default function ThemeSelector() {
  const { setTheme, resolvedTheme } = useTheme();
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleToggle = () => setOpen((p) => !p);

  if (!mounted) return null;

  const current = themes.find((t) => t.id === resolvedTheme) ?? themes[0];
  const { Icon: CurrentIcon } = current;

  return (
    <div ref={ref} className="fixed top-20 left-8 z-50">
      {/* Button */}
      <div className="relative flex items-center justify-center">
        {/* Sonar rings — always animating */}
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-full border-2 pointer-events-none"
            style={{
              borderColor: current.color,
              animation: `sonar-ring 2.4s cubic-bezier(0.2,0,0.8,1) ${i * 800}ms infinite`,
            }}
          />
        ))}
        <button
          onClick={handleToggle}
          className="relative w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            borderColor: current.color,
            backgroundColor: `${current.color}20`,
            color: current.color,
          }}
          aria-label="Change theme"
        >
          <CurrentIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute top-14 left-0 bg-card border border-border rounded-xl shadow-2xl overflow-hidden w-48 py-1.5 z-50 animate-fade-up"
          style={{ animationDuration: "0.15s" }}
        >
          {themes.map(({ id, label, Icon, color }) => (
            <button
              key={id}
              onClick={() => { setTheme(id); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                resolvedTheme === id
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
              <span className="font-medium">{label}</span>
              {resolvedTheme === id && (
                <svg className="w-3.5 h-3.5 ml-auto flex-shrink-0" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
