import { useMemo, useState, useCallback } from "react";
import { FaGithub } from "react-icons/fa";
import { Copy, Check } from "lucide-react";
import DocsLayout from "./docs/DocsLayout";
import { slugify } from "./docs/slug";

function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="ds-code">
      {label && (
        <div className="flex items-center justify-between border-b border-[var(--ds-border)] px-3 py-1.5">
          <span className="font-mono text-[0.72rem] text-[var(--ds-muted)]">
            {label}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[0.72rem] text-[var(--ds-muted)] transition-colors hover:text-[var(--ds-fg)]"
          >
            {copied ? (
              <Check className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Copy className="h-3 w-3" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

/** A heading that carries its own `#` anchor link, like Odin's docs. */
function AnchoredHeading({ level, id, children }) {
  const Tag = `h${level}`;
  return (
    <Tag id={id}>
      {children}
      <a className="ds-anchor" href={`#${id}`} aria-label="Link to this section">
        #
      </a>
    </Tag>
  );
}

function Blocks({ blocks, sectionId }) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "text":
        return <p key={i}>{block.content}</p>;

      case "heading":
        return (
          <AnchoredHeading
            key={i}
            level={3}
            id={`${sectionId}-${slugify(block.content)}`}
          >
            {block.content}
          </AnchoredHeading>
        );

      case "code":
      case "bash":
      case "output":
        return <CodeBlock key={i} code={block.code} label={block.label} />;

      case "info":
        return (
          <div key={i} className="ds-callout">
            <strong>Note — </strong>
            {block.content}
          </div>
        );

      case "warning":
        return (
          <div key={i} className="ds-callout ds-callout-warn">
            <strong>Warning — </strong>
            {block.content}
          </div>
        );

      case "table":
        return (
          <table key={i}>
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "list":
        return (
          <ul key={i}>
            {block.items.map((item, li) => (
              <li key={li}>{item}</li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  });
}

export default function DocPage({ tutorial }) {
  const sections = useMemo(
    () => tutorial.groups.flatMap((g) => g.sections),
    [tutorial]
  );

  // Decorate each section with its sub-headings so the sidebar can expand them
  // under the section you're currently reading.
  const groups = useMemo(
    () =>
      tutorial.groups.map((group) => ({
        ...group,
        sections: group.sections.map((section) => ({
          ...section,
          children: section.blocks
            .filter((b) => b.type === "heading")
            .map((b) => ({
              id: `${section.id}-${slugify(b.content)}`,
              title: b.content,
            })),
        })),
      })),
    [tutorial]
  );

  // Every anchor in document order — what the scroll-spy walks.
  const spyIds = useMemo(
    () =>
      groups.flatMap((g) =>
        g.sections.flatMap((s) => [s.id, ...s.children.map((c) => c.id)])
      ),
    [groups]
  );

  return (
    <DocsLayout
      groups={groups}
      spyIds={spyIds}
      title={tutorial.title}
      tagline={tutorial.tagline}
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Tutorials", to: "/tutorials" },
        { label: tutorial.title },
      ]}
      actions={
        <a
          href={tutorial.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 rounded border border-[var(--ds-border)] px-3 py-1.5 text-sm text-[var(--ds-fg)] transition-colors hover:border-[var(--ds-primary)] hover:text-[var(--ds-primary)]"
        >
          <FaGithub className="h-4 w-4" aria-hidden="true" />
          GitHub
        </a>
      }
    >
      {sections.map((section) => (
        <section key={section.id}>
          <AnchoredHeading level={2} id={section.id}>
            {section.title}
          </AnchoredHeading>
          <Blocks blocks={section.blocks} sectionId={section.id} />
        </section>
      ))}
    </DocsLayout>
  );
}
