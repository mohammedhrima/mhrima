import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import ClientProviders from "./ClientProviders";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "Hrima Mohammed | Software Engineer",
  description:
    "Portfolio of Hrima Mohammed — Software Engineer passionate about systems programming, compilers, 3D graphics, and full-stack web development. Creator of the Ura programming language, UraJS framework, and a C++ raytracer.",
  keywords: [
    "Hrima Mohammed",
    "Software Engineer",
    "Portfolio",
    "Ura Language",
    "UraJS",
    "Raytracer",
    "C++",
    "LLVM",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Hrima Mohammed" }],
  openGraph: {
    title: "Hrima Mohammed | Software Engineer",
    description:
      "Creator of the Ura programming language, UraJS framework, and a C++ raytracer. Full-stack developer with a passion for low-level systems.",
    type: "website",
    url: "https://mohammedhrima.github.io/mhrima",
    siteName: "Hrima Mohammed Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hrima Mohammed | Software Engineer",
    description:
      "Creator of the Ura programming language, UraJS framework, and a C++ raytracer.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans">
        <Suspense fallback={null}>
          <ClientProviders>{children}</ClientProviders>
        </Suspense>
      </body>
    </html>
  );
}
