"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";
import ThemeSelector from "@/components/ui/ThemeSelector";

const resources = [
  { name: "projects", list: "/projects", meta: { label: "Projects" } },
  { name: "skills", list: "/skills", meta: { label: "Skills" } },
  { name: "experience", list: "/experience", meta: { label: "Experience" } },
  { name: "education", list: "/education", meta: { label: "Education" } },
  { name: "tutorials", list: "/tutorials", meta: { label: "Tutorials" } },
  { name: "contact", list: "/contact", meta: { label: "Contact" } },
  { name: "resume", list: "/resume", meta: { label: "Resume" } },
];

export default function ClientProviders({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="portfolio"
      themes={["portfolio", "claude", "twitter", "verecell", "facebook", "google"]}
      disableTransitionOnChange
    >
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div className={`transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <Refine
          routerProvider={routerProvider}
          resources={resources}
          options={{ disableTelemetry: true }}
        >
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <ThemeSelector />
          <main className="min-h-screen">{children}</main>
        </Refine>
      </div>
    </ThemeProvider>
  );
}
