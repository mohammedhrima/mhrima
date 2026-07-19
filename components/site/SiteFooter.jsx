import { Link } from "react-router-dom";
import content from "@/data/content.json";

const COLUMNS = [
  {
    title: "Site",
    links: [
      { label: "Home", to: "/" },
      { label: "Projects", to: "/projects" },
      { label: "Experience", to: "/experience" },
      { label: "Resume", to: "/resume" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "All Tutorials", to: "/tutorials" },
      { label: "Ura Language", to: "/tutorials/ura-lang" },
      { label: "UraJS", to: "/tutorials/urajs" },
      { label: "Skills", to: "/skills" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "GitHub", href: "https://github.com/mohammedhrima" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mohammedhrima/",
      },
      { label: "Email", href: "mailto:mohammed.hrima1998@gmail.com" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer
      style={{
        backgroundColor: "var(--ds-footer-bg)",
        color: "var(--ds-footer-fg)",
      }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-semibold text-white">
              {content.personal.name}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed opacity-80">
              Software engineer building compilers, frameworks, and the layers
              underneath. Marrakesh, Morocco.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-widest text-white">
                {col.title}
              </p>
              <ul className="list-none space-y-1.5 p-0 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="opacity-80 transition-opacity hover:opacity-100 hover:underline"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-80 transition-opacity hover:opacity-100 hover:underline"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs opacity-60">
          © {new Date().getFullYear()} {content.personal.name}. Built with Vite, React and
          far too much C.
        </p>
      </div>
    </footer>
  );
}
