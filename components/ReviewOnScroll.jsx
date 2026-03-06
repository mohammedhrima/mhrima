"use client";

import { useEffect, useRef } from "react";

export default function ReviewOnScroll({ children, stagger = false, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add("visible");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const base = stagger ? "stagger-reveal" : "reveal";
  const fallback = stagger ? "" : "w-full flex justify-center";

  return (
    <div ref={ref} className={`${base} ${className ?? fallback}`}>
      {children}
    </div>
  );
}
