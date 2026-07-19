import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/src/providers/ThemeProvider";
import content from "@/data/content.json";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/tutorials", label: "Tutorials" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

/* Active state is a 2px amber underline rather than a filled pill — it reads
   as a tab indicator and keeps the bar visually quiet. */
const desktopLink = ({ isActive }) =>
  [
    "relative flex h-14 items-center px-3 text-[0.875rem] transition-colors",
    "after:absolute after:inset-x-2 after:bottom-0 after:h-[2px] after:rounded-full after:transition-colors",
    isActive
      ? "text-white after:bg-[var(--ds-secondary)]"
      : "text-white/70 hover:text-white after:bg-transparent",
  ].join(" ");

const mobileLink = ({ isActive }) =>
  [
    "block rounded px-3 py-2 text-sm transition-colors",
    isActive
      ? "bg-white/15 font-medium text-white"
      : "text-white/75 hover:bg-white/10 hover:text-white",
  ].join(" ");

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { mode, toggleMode } = useTheme();
  const isDark = mode === "dark";

  return (
    <header className="sticky top-0 z-50">
      <nav
        className="ds-band-brand border-b border-black/20 shadow-sm"
        aria-label="Main"
      >
        <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center px-5">
          <NavLink
            to="/"
            className="text-[0.95rem] font-semibold tracking-tight text-white transition-opacity hover:opacity-80"
          >
            {content.personal.name}
          </NavLink>

          <ul className="ml-auto hidden list-none items-center gap-0.5 p-0 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={desktopLink}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1 lg:ml-4 lg:border-l lg:border-white/20 lg:pl-3">
            <button
              type="button"
              onClick={toggleMode}
              className="rounded p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title="Toggle light/dark mode"
            >
              {isDark ? (
                <Sun className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
              ) : (
                <Moon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen((p) => !p)}
              className="rounded p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-white/15 lg:hidden">
            <ul className="mx-auto flex w-full max-w-[1400px] list-none flex-col gap-0.5 p-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={mobileLink}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
