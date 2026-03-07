import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { X } from "lucide-react";

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

export default function MobileMenu({ menuOpen, setMenuOpen }) {
  const { pathname: rawPathname } = useLocation();
  const pathname = rawPathname === "/" ? "/" : rawPathname.replace(/\/$/, "");

  // Close menu when pathname changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col bg-background/98 backdrop-blur-2xl transition-all duration-300 ease-in-out
        ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-border flex-shrink-0">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Menu</span>
        <button
          onClick={() => setMenuOpen(false)}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-col px-5 py-6 gap-1.5 overflow-y-auto flex-1">
        {navLinks.map(({ href, label }, i) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              to={href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-semibold transition-all duration-200 ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              } ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 30}ms` : "0ms" }}
            >
              <span>{label}</span>
              {isActive && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-5 border-t border-border flex-shrink-0">
        <p className="text-xs text-muted-foreground font-mono text-center">
          Hrima Mohammed — Software Engineer
        </p>
      </div>
    </div>
  );
}
