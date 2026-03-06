"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

export default function Navbar({ menuOpen, setMenuOpen }) {
  const rawPathname = usePathname();
  const pathname = rawPathname === "/" ? "/" : rawPathname.replace(/\/$/, "");
  const containerRef = useRef(null);
  const linkRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const updateIndicator = useCallback(() => {
    const el = linkRefs.current[pathname];
    const container = containerRef.current;
    if (!el || !container) return;
    const cRect = container.getBoundingClientRect();
    const lRect = el.getBoundingClientRect();
    setIndicator({ left: lRect.left - cRect.left, width: lRect.width, ready: true });
  }, [pathname]);

  useEffect(() => {
    const raf = requestAnimationFrame(updateIndicator);
    return () => cancelAnimationFrame(raf);
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <nav className="fixed top-0 w-full z-40 bg-background/85 backdrop-blur-lg border-b border-border">
      <div ref={containerRef} className="max-w-6xl mx-auto px-4 relative">
        {/* Sliding active indicator */}
        <div
          className="absolute bottom-0 h-[2px] bg-primary rounded-full pointer-events-none"
          style={{
            left: indicator.left,
            width: indicator.width,
            opacity: indicator.ready ? 1 : 0,
            transition: "left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
          }}
        />

        <div className="flex justify-between items-center h-16">
          {/* Mobile: current page label */}
          <span className="md:hidden text-sm font-semibold text-foreground capitalize">
            {pathname === "/" ? "Home" : pathname.replace("/", "")}
          </span>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-stretch space-x-1 ml-auto">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  ref={(el) => { linkRefs.current[href] = el; }}
                  className={`px-3 flex items-center text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
