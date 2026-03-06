"use client";

import { useState, useEffect, useRef } from "react";

const lines = [
  { text: "$ ura build hello.ura", color: "text-gray-400", delay: 0 },
  { text: "→ lexing ...", color: "text-yellow-400", delay: 400 },
  { text: "→ parsing ...", color: "text-yellow-400", delay: 900 },
  { text: "→ type-checking ...", color: "text-yellow-400", delay: 1500 },
  { text: "→ emitting LLVM IR ...", color: "text-blue-400", delay: 2200 },
  { text: "→ compiling to native ...", color: "text-blue-400", delay: 2900 },
  { text: "✓ built ./out/hello in 0.08s", color: "text-green-400", delay: 3600 },
  { text: "$ ./out/hello", color: "text-gray-400", delay: 4200 },
  { text: "Hello, World!", color: "text-white", delay: 4700 },
];

export default function AnimatedTerminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);
  const timerRef = useRef([]);

  useEffect(() => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setVisibleCount(0);
    setDone(false);

    lines.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleCount(i + 1);
        if (i === lines.length - 1) setDone(true);
      }, line.delay);
      timerRef.current.push(t);
    });

    return () => timerRef.current.forEach(clearTimeout);
  }, []);

  // loop: restart after pause
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      setVisibleCount(0);
      setDone(false);
      timerRef.current.forEach(clearTimeout);
      timerRef.current = [];
      lines.forEach((line, i) => {
        const tt = setTimeout(() => {
          setVisibleCount(i + 1);
          if (i === lines.length - 1) setDone(true);
        }, line.delay);
        timerRef.current.push(tt);
      });
    }, 3000);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <div className="terminal-window w-full max-w-lg mx-auto">
      {/* title bar */}
      <div className="terminal-bar">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-auto text-xs font-mono text-gray-600">ura-lang — bash</span>
      </div>

      {/* body */}
      <div className="terminal-body">
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className={`${line.color} animate-fade-up`} style={{ animationDelay: "0ms" }}>
            {line.text}
          </div>
        ))}
        {/* blinking cursor on last visible line or at end */}
        <span className="terminal-cursor" />
      </div>
    </div>
  );
}
