/**
 * A full-bleed horizontal section band. Alternating `tone` values give a page
 * its rhythm the way odin-lang.org does: brand → alt → base → brand …
 *
 *   brand  solid accent block, light text
 *   alt    subtle tinted background
 *   base   plain page background
 */
const TONES = {
  brand: "ds-band-brand",
  alt: "ds-band-alt",
  base: "ds-band-base",
};

export default function Band({
  tone = "base",
  as: Tag = "section",
  className = "",
  innerClassName = "",
  children,
  ...rest
}) {
  return (
    <Tag className={`${TONES[tone] ?? TONES.base} ${className}`} {...rest}>
      <div
        className={`mx-auto w-full max-w-[1200px] px-5 py-16 ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}

/** Section heading used inside bands — plain, no gradients. */
export function BandHeading({ children, sub }) {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
        {children}
      </h2>
      {sub && (
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed opacity-80">
          {sub}
        </p>
      )}
    </>
  );
}
