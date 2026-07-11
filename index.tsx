import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Code2, Palette, Rocket, Wrench, Smartphone, Search, Mail, Phone, MapPin,
  Menu, X, ArrowRight, Check, Globe, Store, User, Briefcase, Layout, RefreshCw,
  MessageSquare, Github, Zap, Users, Heart, ExternalLink
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ThreeDev Crete — Websites Built in Heraklion" },
      { name: "description", content: "Three Computer Science students in Heraklion building modern, responsive, affordable websites for businesses, shops, restaurants, and individuals." },
      { property: "og:title", content: "ThreeDev Crete — Websites Built in Heraklion" },
      { property: "og:description", content: "Modern, responsive, affordable websites built by three Computer Science students in Heraklion, Crete." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Briefcase, title: "Business Websites", desc: "Professional sites that establish credibility and convert visitors into customers." },
  { icon: User, title: "Personal Portfolios", desc: "Showcase your work, skills, and story with a site that stands out." },
  { icon: Store, title: "Restaurants, Cafes & Shops", desc: "Menus, hours, bookings — everything your local customers need." },
  { icon: Layout, title: "Landing Pages", desc: "Focused, high-converting pages for products, launches, and campaigns." },
  { icon: RefreshCw, title: "Website Redesigns", desc: "Modernize an outdated site with a fresh look and better performance." },
  { icon: Smartphone, title: "Responsive Design", desc: "Every site looks flawless on phones, tablets, and desktops." },
  { icon: Search, title: "Basic SEO Setup", desc: "Clean metadata, sitemaps, and structure so Google can find you." },
  { icon: MessageSquare, title: "Contact Forms", desc: "Reliable forms so leads reach your inbox, not your spam folder." },
  { icon: Wrench, title: "Maintenance & Updates", desc: "Ongoing support so your website stays fast, secure, and current." },
];

const skills = [
  "HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap",
  "Git & GitHub", "Responsive Design", "UI/UX Basics", "SEO Basics",
  "Web Hosting Setup", "Performance Optimization",
];

const process = [
  { n: "01", title: "We discuss your idea", desc: "A quick conversation to understand your goals, audience, and style." },
  { n: "02", title: "We design the structure", desc: "Wireframes and a clear visual direction before a single line of code." },
  { n: "03", title: "We build the website", desc: "Clean, responsive, fast code — reviewed with you every step." },
  { n: "04", title: "We launch & support", desc: "Deployment, handover, and continued help whenever you need it." },
];

const portfolio = [
  {
    title: "Local Business Website",
    tag: "Business",
    desc: "A demo gym website with memberships, classes, and booking.",
    href: "/gym-demo",
  },
  {
    title: "Personal Portfolio",
    tag: "Portfolio",
    desc: "A minimal, image-forward portfolio for a creative professional.",
  },
  {
    title: "Restaurant Landing Page",
    tag: "Restaurant",
    desc: "A single-page site with menu, gallery, and reservations.",
  },
  {
    title: "Student Project Website",
    tag: "Academic",
    desc: "A clean project showcase built for a university team.",
  },
];

const reasons = [
  { icon: Code2, title: "Computer Science background" },
  { icon: Zap, title: "Young and motivated team" },
  { icon: MapPin, title: "Based in Heraklion, Crete" },
  { icon: Heart, title: "Affordable pricing" },
  { icon: Smartphone, title: "Mobile-friendly websites" },
  { icon: Users, title: "Personal communication" },
  { icon: Rocket, title: "Fast and clean design" },
  { icon: Wrench, title: "Support after launch" },
];

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

function Index() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[var(--brand-navy-deep)] text-[oklch(0.72_0.17_200)]">
              <Code2 className="h-4 w-4" />
            </span>
            <span>ThreeDev<span className="text-[oklch(0.55_0.15_200)]">.</span>Crete</span>
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="hidden rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 md:inline-flex">
            Get in touch
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        {open && (
          <div className="border-t border-border md:hidden">
            <ul className="mx-auto flex max-w-6xl flex-col px-6 py-4">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-muted-foreground hover:text-foreground">
                    {n.label}
                  </a>
                </li>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-foreground px-4 py-2 text-center text-sm font-medium text-background">
                Get in touch
              </a>
            </ul>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="animate-fade-up max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-[oklch(0.88_0.08_200)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.17_200)]" />
              A small web studio in Heraklion, Crete
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl">
              Professional Websites Built by <span className="text-[oklch(0.78_0.15_200)]">Computer Science Students</span> in Crete
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              We are three Bachelor Computer Science students based in Heraklion, Crete, helping businesses and individuals build modern, responsive, and affordable websites.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-md bg-[oklch(0.72_0.17_200)] px-6 py-3 font-medium text-[oklch(0.15_0.05_260)] transition-transform hover:-translate-y-0.5" style={{ boxShadow: "var(--shadow-glow)" }}>
                Contact Us <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10">
                See Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-16 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-[oklch(0.55_0.15_200)]">About us</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A small team. Full attention. Real craft.</h2>
          </div>
          <div className="space-y-5 text-muted-foreground">
            <p>
              We are a team of three Computer Science students who combine academic knowledge with practical web development skills. We focus on clean design, responsive layouts, fast websites, and clear communication with clients.
            </p>
            <p>
              Being a small team allows us to offer personal attention, flexibility, and affordable solutions — every project is handled by the people you actually talk to.
            </p>
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {["Aristotelis Moulas", "Giannis Zaroliagkis", "Thodoris Nickaris"].map((name) => (
                <div key={name} className="rounded-lg border border-border bg-card p-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--brand-navy)] text-white">
                    {name.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">CS Student, 23</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-border bg-[oklch(0.985_0.005_250)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-[oklch(0.55_0.15_200)]">Services</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Everything you need to launch and grow online.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-[oklch(0.72_0.17_200)]" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-[var(--brand-navy)] text-[oklch(0.78_0.15_200)] transition-transform group-hover:scale-110">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-[oklch(0.55_0.15_200)]">Our stack</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Technologies we work with.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {skills.map((s) => (
            <span key={s} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-[oklch(0.72_0.17_200)] hover:text-[oklch(0.45_0.15_200)]">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-[var(--brand-navy-deep)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-[oklch(0.78_0.15_200)]">How we work</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A simple, transparent process.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div key={p.n} className="relative">
                <div className="text-5xl font-bold text-[oklch(0.72_0.17_200)]/40">{p.n}</div>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-[oklch(0.55_0.15_200)]">Portfolio</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Work we're proud to build.</h2>
          <p className="mt-3 text-muted-foreground">Placeholder projects — real client work coming soon.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {portfolio.map((p) => (
            <article key={p.title} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[var(--brand-navy)] to-[var(--brand-navy-deep)]">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, oklch(0.72 0.17 200 / 0.6), transparent 50%)" }} />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {p.tag}
                </div>
                <Globe className="absolute right-6 top-6 h-8 w-8 text-white/30" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                {p.href ? (
  <a
    href={p.href}
    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[oklch(0.45_0.15_200)] transition-transform group-hover:translate-x-1"
  >
    View Project <ExternalLink className="h-3.5 w-3.5" />
  </a>
) : (
  <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[oklch(0.45_0.15_200)] transition-transform group-hover:translate-x-1">
    Coming Soon <ExternalLink className="h-3.5 w-3.5" />
  </button>
)}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="border-y border-border bg-[oklch(0.985_0.005_250)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-[oklch(0.55_0.15_200)]">Why choose us</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Small enough to care. Skilled enough to deliver.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[oklch(0.72_0.17_200)]/15 text-[oklch(0.45_0.15_200)]">
                  <r.icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium">{r.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-[oklch(0.55_0.15_200)]">Contact</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Let's build something great.</h2>
            <p className="mt-4 text-muted-foreground">
              Have an idea for a website? Contact us and we will help you turn it into a professional online presence.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-[oklch(0.55_0.15_200)]" />
                <span>hello@threedevcrete.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-[oklch(0.55_0.15_200)]" />
                <span>+30 000 000 0000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-[oklch(0.55_0.15_200)]" />
                <span>Heraklion, Crete, Greece</span>
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch soon."); }}
            className="rounded-xl border border-border bg-card p-6 sm:p-8"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name</label>
                <input required className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-[oklch(0.72_0.17_200)]" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Email</label>
                  <input required type="email" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-[oklch(0.72_0.17_200)]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Phone</label>
                  <input type="tel" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-[oklch(0.72_0.17_200)]" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Message</label>
                <textarea required rows={4} className="w-full resize-none rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-[oklch(0.72_0.17_200)]" />
              </div>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--brand-navy)] px-6 py-3 font-medium text-white transition-transform hover:-translate-y-0.5">
                Send Message <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-[var(--brand-navy-deep)] text-white/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 font-semibold text-white">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-white/10 text-[oklch(0.72_0.17_200)]">
                  <Code2 className="h-4 w-4" />
                </span>
                ThreeDev Crete
              </div>
              <p className="mt-3 text-sm">Heraklion, Crete · Greece</p>
            </div>
            <ul className="flex flex-wrap gap-6 text-sm">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-white">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs md:flex-row">
            <p>© {new Date().getFullYear()} ThreeDev Crete. All rights reserved.</p>
            <p>Built by Aristotelis Moulas, Giannis Zaroliagkis, and Thodoris Nickaris.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
