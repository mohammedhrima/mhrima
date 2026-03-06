"use client";

import { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import ReviewOnScroll from "@/components/ReviewOnScroll";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const emailjs = (await import("emailjs-com")).default;
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pt-16">
      {/* Hero banner */}
      <section className="relative pt-20 pb-12 px-4 grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="section-label">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 gradient-text-blue">Contact</h1>
        </div>
      </section>

      <section className="py-12 px-4">
        <ReviewOnScroll>
          <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Info panel */}
            <div className="p-8 rounded-2xl border border-border bg-card flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Have a project or opportunity?</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {"I'd love to hear from you. Whether it's a freelance project, a full-time role, or just a technical conversation — reach out."}
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:mohammed.hrima1998@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-muted transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">
                      mohammed.hrima1998@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/mohammedhrima/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-muted transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaLinkedin className="text-primary text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">LinkedIn</p>
                    <p className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">
                      linkedin.com/in/mohammedhrima
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com/mohammedhrima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-muted transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaGithub className="text-primary text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">GitHub</p>
                    <p className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">
                      github.com/mohammedhrima
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Form panel */}
            <div className="p-8 rounded-2xl border border-border bg-card">
              <h2 className="text-lg font-bold text-foreground mb-6">Send a message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-input border border-border focus:border-primary/50 rounded-lg px-4 py-2.5 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-input border border-border focus:border-primary/50 rounded-lg px-4 py-2.5 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="What's on your mind?"
                    className="w-full bg-input border border-border focus:border-primary/50 rounded-lg px-4 py-2.5 text-foreground text-sm outline-none transition-colors resize-none placeholder:text-muted-foreground"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground py-3 rounded-lg font-medium transition-all"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <p className="text-center text-accent-green text-sm">
                    Message sent! {"I'll"} get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center text-red-400 text-sm">
                    Something went wrong. Email me directly at mohammed.hrima1998@gmail.com
                  </p>
                )}
              </form>
            </div>
          </div>
        </ReviewOnScroll>
      </section>
    </div>
  );
}
