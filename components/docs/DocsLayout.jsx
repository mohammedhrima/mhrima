import { Link } from "react-router-dom";
import DocsSidebar from "./DocsSidebar";
import { useScrollSpy } from "./useScrollSpy";

function Breadcrumb({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3">
      <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0 text-[0.78rem] text-[var(--ds-muted)]">
        {trail.map((crumb, i) => (
          <li key={crumb.to ?? crumb.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {crumb.to ? (
              <Link to={crumb.to} className="ds-link">
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Two-column documentation shell:
 *
 *   [ sidebar ][ ---------- article ---------- ]
 *
 * The sidebar is sticky and doubles as the table of contents — it tracks the
 * reader's scroll position and expands the current section's sub-headings.
 * It collapses away below `lg` so the article gets the full width.
 */
export default function DocsLayout({
  groups,
  spyIds = [],
  breadcrumb,
  title,
  tagline,
  actions,
  autonumber = false,
  children,
}) {
  const activeId = useScrollSpy(spyIds);

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4">
      <div className="flex">
        <aside className="ds-sidebar-border hidden w-[16rem] shrink-0 lg:block">
          <DocsSidebar groups={groups} activeId={activeId} />
        </aside>

        <article className="min-w-0 flex-1 py-6 lg:px-10">
          <header>
            {breadcrumb && <Breadcrumb trail={breadcrumb} />}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                {tagline && (
                  <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--ds-muted)]">
                    {tagline}
                  </p>
                )}
              </div>
              {actions}
            </div>
          </header>

          <div
            className="ds-article mt-8 max-w-4xl"
            {...(autonumber ? { "data-autonumber": "" } : {})}
          >
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}
