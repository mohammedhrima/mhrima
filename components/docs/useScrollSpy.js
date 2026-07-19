import { useEffect, useState } from "react";

/**
 * Tracks which heading is currently being read.
 *
 * `ids` is a flat list of element ids in document order. We resolve the active
 * one on scroll rather than trusting IntersectionObserver callbacks directly,
 * because long code blocks routinely leave *no* heading intersecting the
 * viewport — in that case the correct answer is "the last heading we scrolled
 * past", which observer entries alone can't tell you.
 */
export function useScrollSpy(ids, offset = 80) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    if (!ids.length) return;

    let frame = null;

    const resolve = () => {
      frame = null;

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        } else {
          break;
        }
      }

      // At the very bottom of the page the last section may be too short to
      // ever reach the offset line — force it so the final item can activate.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1];

      setActiveId(current);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(resolve);
    };

    resolve();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return activeId;
}
