"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [text, setText] = useState("");
  const fullText = "<Welcome aboard!/>";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 200);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center w-full">
      <div className="mb-4 text-2xl sm:text-4xl font-mono font-bold w-full text-center">
        {text}
        <span className="animate-blink ml-1">|</span>
      </div>
      <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-primary animate-loading-bar" style={{ boxShadow: "0 0 15px var(--primary)" }}></div>
      </div>
    </div>
  );
}
