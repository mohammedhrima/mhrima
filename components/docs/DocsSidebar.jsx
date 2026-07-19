import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

/** The doc set — add an entry here when a new tutorial ships. */
export const DOC_PAGES = [
  { to: "/tutorials", label: "All Tutorials", end: true },
  { to: "/tutorials/ura-lang", label: "Ura Language" },
  { to: "/tutorials/urajs", label: "UraJS" },
];

/**
 * Left rail: the doc set, then in-page navigation that tracks your scroll
 * position. The section you're reading is highlighted, and its sub-headings
 * expand underneath it so the rail doubles as a table of contents.
 */
export default function DocsSidebar({ groups = [], activeId }) {
  const activeRef = useRef(null);
  const scrollRef = useRef(null);

  // Keep the highlighted entry in view as the reader scrolls the article,
  // but scroll only the rail — never the page.
  useEffect(() => {
    const el = activeRef.current;
    const box = scrollRef.current;
    if (!el || !box) return;

    const elTop = el.offsetTop;
    const elBottom = elTop + el.offsetHeight;
    const viewTop = box.scrollTop;
    const viewBottom = viewTop + box.clientHeight;

    if (elTop < viewTop + 8) {
      box.scrollTo({ top: elTop - 8, behavior: "smooth" });
    } else if (elBottom > viewBottom - 8) {
      box.scrollTo({
        top: elBottom - box.clientHeight + 8,
        behavior: "smooth",
      });
    }
  }, [activeId]);

  return (
    <div ref={scrollRef} className="sticky ds-below-nav py-6 pr-4">
      <nav aria-label="Documentation">
        <ul className="m-0 mb-6 list-none space-y-0.5 p-0">
          {DOC_PAGES.map((page) => (
            <li key={page.to}>
              <NavLink
                to={page.to}
                end={page.end}
                className={({ isActive }) =>
                  [
                    "block rounded px-3 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-[var(--ds-primary)] font-medium text-[var(--ds-primary-contrast)]"
                      : "text-[var(--ds-fg)] hover:bg-[var(--ds-code-bg)]",
                  ].join(" ")
                }
              >
                {page.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {groups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="mb-1.5 px-3 text-[0.68rem] font-semibold uppercase tracking-widest text-[var(--ds-muted)]">
              {group.label}
            </p>
            <ul className="m-0 list-none space-y-px p-0">
              {group.sections.map((section) => {
                const childActive = section.children?.some(
                  (c) => c.id === activeId
                );
                const isActive = activeId === section.id || childActive;

                return (
                  <li key={section.id} ref={isActive ? activeRef : null}>
                    <a
                      href={`#${section.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={[
                        "block border-l-2 py-1 pl-3 pr-2 text-[0.82rem] transition-colors",
                        isActive
                          ? "border-[var(--ds-secondary)] bg-[var(--ds-code-bg)] font-semibold text-[var(--ds-secondary)]"
                          : "border-transparent text-[var(--ds-muted)] hover:border-[var(--ds-border)] hover:text-[var(--ds-primary)]",
                      ].join(" ")}
                    >
                      {section.title}
                    </a>

                    {isActive && section.children?.length > 0 && (
                      <ul className="m-0 list-none space-y-px p-0">
                        {section.children.map((child) => (
                          <li key={child.id}>
                            <a
                              href={`#${child.id}`}
                              aria-current={
                                activeId === child.id ? "location" : undefined
                              }
                              className={[
                                "block border-l-2 py-0.5 pl-6 pr-2 text-[0.76rem] transition-colors",
                                activeId === child.id
                                  ? "border-[var(--ds-secondary)] font-medium text-[var(--ds-secondary)]"
                                  : "border-transparent text-[var(--ds-muted)] hover:text-[var(--ds-primary)]",
                              ].join(" ")}
                            >
                              {child.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
