import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  Code2,
  Rocket,
  Smartphone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Store,
  User,
  Briefcase,
  Layout,
  RefreshCw,
  Zap,
  Users,
  Heart,
  ExternalLink,
  MessageCircle,
  PencilRuler,
  Dumbbell,
  Coffee,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rocket3Dev" },
      {
        name: "description",
        content:
          "Rocket3Dev is a three-person web development team in Heraklion, Crete, creating modern, responsive websites for businesses and professionals.",
      },
      {
        property: "og:title",
        content: "Rocket3Dev",
      },
      {
        property: "og:description",
        content:
          "Modern, responsive websites by Rocket3Dev, a three-person web development team based in Heraklion, Crete.",
      },
    ],
  }),
  component: Index,
});

const services = [
  {
    icon: Briefcase,
    title: "Business Websites",
    desc: "Professional sites that establish credibility and convert visitors into customers.",
  },
  {
    icon: User,
    title: "Personal Portfolios",
    desc: "Showcase your work, skills, and story with a site that stands out.",
  },
  {
    icon: Store,
    title: "Restaurants, Cafes & Shops",
    desc: "Menus, hours, bookings — everything your local customers need.",
  },
  {
    icon: Layout,
    title: "Landing Pages",
    desc: "Focused, high-converting pages for products, launches, and campaigns.",
  },
  {
    icon: RefreshCw,
    title: "Website Redesigns",
    desc: "Modernize an outdated site with a fresh look and better performance.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    desc: "Every site looks flawless on phones, tablets, and desktops.",
  },
];

const process = [
  {
    icon: MessageCircle,
    title: "Tell us your idea",
    desc: "We learn what you need and what style fits your business.",
  },
  {
    icon: PencilRuler,
    title: "See the direction",
    desc: "We shape the layout and agree on a clear visual plan.",
  },
  {
    icon: Code2,
    title: "Watch it take shape",
    desc: "We build the site and share progress along the way.",
  },
  {
    icon: Rocket,
    title: "Ready for launch",
    desc: "We complete the final checks and put your website online.",
  },
];

const portfolio = [
  {
    icon: Dumbbell,
    title: "Gym Website Demo",
    tag: "Fitness",
    desc: "A modern gym website with memberships, classes, member accounts, and bookings.",
    href: "/gym-demo",
  },
  {
    icon: Coffee,
    title: "Cafe Website Demo",
    tag: "Hospitality",
    desc: "A compact cafe concept for menu highlights, location, opening hours, and contact details.",
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
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const isProgrammaticScroll = useRef(false);
  const scrollAnimationFrame = useRef<number | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    let ticking = false;

    const updateNavigationState = () => {
      ticking = false;

      const nextScrolled = window.scrollY > 28;
      setIsScrolled((current) =>
        current === nextScrolled ? current : nextScrolled,
      );

      if (isProgrammaticScroll.current) return;

      const marker = window.scrollY + (window.innerWidth >= 768 ? 132 : 108);
      let currentSection = "home";

      for (const section of sections) {
        if (section.offsetTop <= marker) currentSection = section.id;
      }

      const pageBottom = window.scrollY + window.innerHeight;
      if (pageBottom >= document.documentElement.scrollHeight - 24) {
        currentSection = "contact";
      }

      setActiveSection((current) =>
        current === currentSection ? current : currentSection,
      );
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateNavigationState);
    };

    updateNavigationState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const cancelRunningScroll = () => {
      if (scrollAnimationFrame.current !== null) {
        window.cancelAnimationFrame(scrollAnimationFrame.current);
        scrollAnimationFrame.current = null;
        isProgrammaticScroll.current = false;
      }
    };

    window.addEventListener("wheel", cancelRunningScroll, { passive: true });
    window.addEventListener("touchstart", cancelRunningScroll, {
      passive: true,
    });

    return () => {
      cancelRunningScroll();
      window.removeEventListener("wheel", cancelRunningScroll);
      window.removeEventListener("touchstart", cancelRunningScroll);
    };
  }, []);

  function animateScrollTo(targetTop: number) {
    if (scrollAnimationFrame.current !== null) {
      window.cancelAnimationFrame(scrollAnimationFrame.current);
    }

    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || Math.abs(distance) < 2) {
      window.scrollTo(0, targetTop);
      isProgrammaticScroll.current = false;
      scrollAnimationFrame.current = null;
      return;
    }

    const duration = Math.min(760, Math.max(420, Math.abs(distance) * 0.42));
    const startTime = window.performance.now();
    isProgrammaticScroll.current = true;

    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      window.scrollTo(0, startTop + distance * eased);

      if (progress < 1) {
        scrollAnimationFrame.current = window.requestAnimationFrame(step);
        return;
      }

      window.scrollTo(0, targetTop);
      scrollAnimationFrame.current = null;
      isProgrammaticScroll.current = false;
    };

    scrollAnimationFrame.current = window.requestAnimationFrame(step);
  }


  function handleSectionClick(
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    event.preventDefault();

    const sectionId = href.replace("#", "");
    const target = document.getElementById(sectionId);
    if (!target) return;

    const compactHeaderOffset = window.innerWidth >= 768 ? 86 : 78;
    const absoluteTop = window.scrollY + target.getBoundingClientRect().top;
    const targetTop =
      sectionId === "home" ? 0 : Math.max(0, absoluteTop - compactHeaderOffset);

    isProgrammaticScroll.current = true;
    setActiveSection(sectionId);
    setOpen(false);
    window.history.replaceState(null, "", href);
    animateScrollTo(targetTop);
  }

  return (
    <div className="min-h-screen bg-[#dfe7e9] text-[#0b2136]">
      <style>{`
        html { scroll-behavior: auto; }

        [data-reveal] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 700ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        [data-reveal].is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-menu {
          animation: menuDrop 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
          transform-origin: top;
        }

        .site-header {
          padding: 0;
          transition: padding 720ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: padding;
        }

        .site-header.is-compact {
          padding: 0.75rem 0.75rem 0;
        }

        .site-nav {
          width: 100%;
          max-width: 100%;
          margin-inline: auto;
          border: 0 solid rgba(255, 255, 255, 0.55);
          border-bottom: 1px solid rgba(21, 51, 81, 0.10);
          border-radius: 0;
          background: rgba(233, 238, 240, 0.96);
          box-shadow: 0 5px 18px rgba(11, 33, 54, 0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transform: translateZ(0);
          transition:
            max-width 720ms cubic-bezier(0.22, 1, 0.36, 1),
            border-radius 620ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 520ms ease,
            background-color 520ms ease,
            box-shadow 620ms cubic-bezier(0.22, 1, 0.36, 1),
            backdrop-filter 520ms ease;
          will-change: max-width, border-radius, box-shadow;
        }

        .site-nav.is-compact {
          max-width: 72rem;
          border-width: 1px;
          border-radius: 1rem;
          background: rgba(233, 238, 240, 0.88);
          box-shadow: 0 12px 40px rgba(11, 33, 54, 0.14);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .site-nav-inner {
          max-width: 80rem;
          padding: 0.875rem 1.25rem;
          transition:
            max-width 720ms cubic-bezier(0.22, 1, 0.36, 1),
            padding 620ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .site-nav-inner.is-compact {
          max-width: 72rem;
          padding: 0.5rem 0.75rem;
        }

        @media (min-width: 640px) {
          .site-nav-inner {
            padding-inline: 1.75rem;
          }

          .site-nav-inner.is-compact {
            padding-inline: 1rem;
          }
        }

        .rocket-trail {
          stroke-dasharray: 18 22;
          animation: trailFlow 14s linear infinite;
        }

        .rocket-trail-slow {
          stroke-dasharray: 8 18;
          animation: trailFlow 22s linear infinite reverse;
        }

        .hero-rocket {
          animation: rocketFloat 5s ease-in-out infinite;
        }

        .hero-orbit {
          animation: orbitPulse 7s ease-in-out infinite;
          transform-origin: center;
        }

        .section-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          color: #31526e;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .section-kicker::before {
          content: "";
          width: 1.65rem;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #c97745, #d98a50);
          box-shadow: 0 0 18px rgba(224, 151, 89, 0.28);
        }

        .section-kicker-dark {
          color: #d98a50;
        }

        .section-kicker-dark::before {
          background: linear-gradient(90deg, #d98a50, #91adba);
        }

        .process-orb-small {
          animation: orbSmallDrift 9s ease-in-out infinite;
        }

        .process-step-icon {
          animation: stepFloat 6s ease-in-out infinite;
        }

        .ambient-dot {
          animation: ambientDotDrift 11s ease-in-out infinite;
          will-change: transform;
        }

        .ambient-dot-reverse {
          animation: ambientDotDriftReverse 14s ease-in-out infinite;
          will-change: transform;
        }

        .ambient-blob {
          animation: ambientBlobDrift 16s ease-in-out infinite;
          border-radius: 58% 42% 66% 34% / 42% 58% 42% 58%;
          will-change: transform, border-radius;
        }

        .ambient-tile {
          animation: ambientTileFloat 13s ease-in-out infinite;
          will-change: transform;
        }

        .ambient-ring {
          animation: ambientRingDrift 15s ease-in-out infinite;
          will-change: transform;
        }

        .ambient-ring-reverse {
          animation: ambientRingDriftReverse 18s ease-in-out infinite;
          will-change: transform;
        }

        .ambient-path {
          stroke-dasharray: 7 18;
          animation: ambientPathFlow 24s linear infinite;
        }

        .ambient-path-reverse {
          stroke-dasharray: 4 15;
          animation: ambientPathFlow 30s linear infinite reverse;
        }

        .process-kicker::before {
          display: none;
        }

        @keyframes trailFlow {
          to { stroke-dashoffset: -320; }
        }

        @keyframes rocketFloat {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(12deg); }
          50% { transform: translate3d(8px, -14px, 0) rotate(16deg); }
        }

        @keyframes orbitPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.03); }
        }

        @keyframes orbSmallDrift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(12px, -18px, 0); }
        }

        @keyframes stepFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes ambientDotDrift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          40% { transform: translate3d(13px, -16px, 0); }
          72% { transform: translate3d(-7px, 9px, 0); }
        }

        @keyframes ambientDotDriftReverse {
          0%, 100% { transform: translate3d(0, 0, 0); }
          38% { transform: translate3d(-15px, 10px, 0); }
          74% { transform: translate3d(8px, -12px, 0); }
        }

        @keyframes ambientBlobDrift {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-5deg);
            border-radius: 58% 42% 66% 34% / 42% 58% 42% 58%;
          }
          45% {
            transform: translate3d(12px, -14px, 0) rotate(4deg);
            border-radius: 42% 58% 37% 63% / 58% 42% 61% 39%;
          }
          75% {
            transform: translate3d(-6px, 8px, 0) rotate(-1deg);
          }
        }

        @keyframes ambientTileFloat {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(7deg); }
          50% { transform: translate3d(-10px, -12px, 0) rotate(-5deg); }
        }

        @keyframes ambientRingDrift {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          45% { transform: translate3d(14px, -12px, 0) rotate(11deg); }
          75% { transform: translate3d(-5px, 8px, 0) rotate(5deg); }
        }

        @keyframes ambientRingDriftReverse {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          40% { transform: translate3d(-12px, 10px, 0) rotate(-10deg); }
          72% { transform: translate3d(7px, -8px, 0) rotate(-4deg); }
        }

        @keyframes ambientPathFlow {
          to { stroke-dashoffset: -280; }
        }

        @keyframes menuDrop {
          from { opacity: 0; transform: translateY(-10px) scaleY(0.96); }
          to { opacity: 1; transform: translateY(0) scaleY(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          [data-reveal] { opacity: 1; transform: none; }
        }
      `}</style>
      {/* Nav */}
      <header
        className={`site-header sticky top-0 z-50 ${isScrolled ? "is-compact" : ""}`}
      >
        <nav
          data-nav-bar
          className={`site-nav ${isScrolled ? "is-compact" : ""}`}
        >
          <div
            className={`site-nav-inner mx-auto flex w-full items-center justify-between ${
              isScrolled ? "is-compact" : ""
            }`}
          >
          <a
            href="#home"
            onClick={(event) => handleSectionClick(event, "#home")}
            className="group flex items-center gap-2.5 rounded-xl px-1 py-1 font-semibold tracking-tight"
          >
            <span
              className={`grid place-items-center rounded-xl bg-[#153351] text-[#d98a50] shadow-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-105 ${
                isScrolled ? "h-8 w-8" : "h-10 w-10"
              }`}
            >
              <Rocket
                className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isScrolled ? "h-4 w-4" : "h-5 w-5"
                }`}
              />
            </span>
            <span
              className={`font-bold tracking-tight text-[#153351] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isScrolled ? "text-base" : "text-xl"
              }`}
            >
              Rocket<span className="text-[#c97745]">3</span>Dev
            </span>
          </a>

          <ul
            className={`hidden items-center gap-1 rounded-full border border-[#153351]/8 bg-[#dbe4e6]/75 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex ${
              isScrolled ? "p-1" : "p-1.5"
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => handleSectionClick(event, item.href)}
                    className={`flex items-center gap-2 rounded-full text-sm transition-[background-color,color,box-shadow,padding] duration-300 ${
                      isScrolled ? "px-3.5 py-1.5" : "px-[18px] py-2"
                    } ${
                      isActive
                        ? "bg-[#153351] text-white shadow-[0_8px_22px_rgba(11,33,54,0.22)]"
                        : "text-[#31526e] hover:bg-white/70 hover:text-[#0b2136]"
                    }`}
                    aria-current={isActive ? "location" : undefined}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full bg-[#d98a50] shadow-[0_0_9px_rgba(217,138,80,0.8)] transition-all duration-300 ${
                        isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"
                      }`}
                    />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="#contact"
              onClick={(event) => handleSectionClick(event, "#contact")}
              className={`group inline-flex items-center gap-2 rounded-full bg-[#c97745] text-sm font-semibold text-[#0b2136] shadow-[0_8px_24px_rgba(201,119,69,0.22)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#d98a50] active:scale-[0.98] ${
                isScrolled ? "px-3.5 py-1.5" : "px-5 py-2.5"
              }`}
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#153351]/10 bg-[#dbe4e6]/80 text-[#153351] transition-all hover:rotate-3 hover:bg-white md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          </div>
        </nav>

        {open && (
          <div
            className={`mobile-menu overflow-hidden border border-white/55 bg-[#e9eef0]/95 p-2 shadow-[0_16px_45px_rgba(11,33,54,0.18)] backdrop-blur-xl md:hidden ${
              isScrolled
                ? "mx-auto mt-2 max-w-6xl rounded-2xl"
                : "w-full rounded-b-2xl border-x-0 border-t-0"
            }`}
          >
            <ul className="grid gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) => handleSectionClick(event, item.href)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all ${
                        isActive
                          ? "bg-[#153351] font-semibold text-white"
                          : "text-[#31526e] hover:bg-white/75 hover:text-[#0b2136]"
                      }`}
                      aria-current={isActive ? "location" : undefined}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isActive ? "bg-[#d98a50]" : "bg-[#7898aa]/55"
                          }`}
                        />
                        {item.label}
                      </span>
                      <ArrowRight
                        className={`h-4 w-4 transition-transform ${
                          isActive ? "translate-x-0" : "-translate-x-1 opacity-45"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative scroll-mt-20 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 82% 18%, rgba(224,151,89,0.25), transparent 25%), radial-gradient(circle at 12% 88%, rgba(127,166,187,0.30), transparent 34%), linear-gradient(135deg, #07182a 0%, #0b2136 42%, #24445f 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full border border-[#7898aa]/20 hero-orbit" />
          <div className="absolute right-8 top-12 h-[280px] w-[280px] rounded-full border border-[#c97745]/15 hero-orbit" />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1440 760"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="trailGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7898aa" stopOpacity="0" />
                <stop offset="45%" stopColor="#91adba" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#c97745" stopOpacity="0.88" />
              </linearGradient>
            </defs>
            <path
              d="M-120 650 C 250 430, 540 560, 790 350 S 1180 80, 1540 170"
              fill="none"
              stroke="url(#trailGradient)"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="rocket-trail"
            />
            <path
              d="M80 740 C 420 520, 680 700, 950 470 S 1280 260, 1510 320"
              fill="none"
              stroke="#7898aa"
              strokeOpacity="0.22"
              strokeWidth="1.4"
              strokeLinecap="round"
              className="rocket-trail-slow"
            />
            <path
              d="M940 70 C 1110 160, 1160 290, 1070 410 C 1010 490, 1110 585, 1420 620"
              fill="none"
              stroke="#c97745"
              strokeOpacity="0.17"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="rocket-trail-slow"
            />
          </svg>

          <div className="hero-rocket absolute right-[10%] top-[18%] hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-sm lg:block">
            <Rocket className="h-20 w-20 text-[#d98a50] drop-shadow-[0_10px_25px_rgba(224,151,89,0.35)]" />
          </div>
          <div className="absolute right-[6%] top-[48%] hidden text-[220px] font-black leading-none text-white/[0.025] lg:block">
            3
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-24 md:pb-40 md:pt-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c97745]/35 bg-white/5 px-3 py-1 text-xs font-medium text-[#d4e0e3] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c97745] shadow-[0_0_12px_rgba(224,151,89,0.9)]" />
              A small web studio in Heraklion, Crete
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl">
              Professional Websites Built by{" "}
              <span className="text-[#d98a50]">Three Web Developers</span>{" "}
              in Crete
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/[0.72]">
              Rocket3Dev is a three-person web development team based in
              Heraklion, Crete, creating modern, responsive websites tailored to
              the needs of businesses and professionals.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                onClick={(event) => handleSectionClick(event, "#contact")}
                className="inline-flex items-center gap-2 rounded-md bg-[#c97745] px-6 py-3 font-semibold text-[#0b2136] shadow-[0_12px_35px_rgba(224,151,89,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#d98a50] active:scale-[0.98]"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                onClick={(event) => handleSectionClick(event, "#services")}
                className="inline-flex items-center gap-2 rounded-md border border-[#7898aa]/50 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98]"
              >
                See Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#d4e0e3_0%,#dfe7e9_54%,#dfe7e9_100%)]"
      >
        <div className="pointer-events-none absolute -left-24 top-24 h-56 w-56 rounded-full bg-[#7898aa]/10 blur-3xl" />
        <div className="ambient-dot pointer-events-none absolute left-[7%] top-[18%] h-4 w-4 rounded-full bg-[#c97745]/35" />
        <div className="ambient-dot-reverse pointer-events-none absolute left-[12%] top-[30%] h-2.5 w-2.5 rounded-full bg-[#7898aa]/45" style={{ animationDelay: "-5s" }} />
        <div className="ambient-blob pointer-events-none absolute right-[5%] top-[20%] h-20 w-24 border border-[#153351]/10" />
        <div className="ambient-ring pointer-events-none absolute right-[10%] top-[42%] h-14 w-14 rounded-full border border-[#c97745]/18" />
        <div className="ambient-ring-reverse pointer-events-none absolute bottom-[9%] left-[4%] h-9 w-9 rounded-full border-2 border-[#7898aa]/18" style={{ animationDelay: "-7s" }} />
        <div className="ambient-tile pointer-events-none absolute bottom-[13%] right-[18%] h-6 w-6 rounded-lg border border-[#7898aa]/35 bg-[#d4e0e3]/35" style={{ animationDelay: "-4s" }} />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div
            data-reveal
            className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#0b2136] p-8 text-white shadow-[0_22px_60px_rgba(11,33,54,0.18)] sm:p-10">
              <div className="ambient-blob absolute -right-12 -top-10 h-40 w-44 border border-[#7898aa]/18" />
              <div className="ambient-tile absolute right-5 top-20 h-16 w-16 rounded-2xl border border-[#c97745]/18" style={{ animationDelay: "-5s" }} />
              <Rocket className="absolute bottom-7 right-7 h-24 w-24 rotate-12 text-white/[0.05]" />
              <p className="section-kicker section-kicker-dark relative">
                About us
              </p>
              <h2 className="relative mt-4 text-3xl font-bold sm:text-4xl">
                A small team. Full attention. Real craft.
              </h2>
              <p className="relative mt-6 max-w-md leading-relaxed text-white/65">
                We combine Computer Science knowledge with practical design and
                development to build websites that feel modern, clear, and easy
                to use.
              </p>
            </div>

            <div className="space-y-5 text-[#31526e]">
              <p className="leading-relaxed">
                We are a team of three web developers combining strong technical
                knowledge with practical experience in modern web development.
                We focus on clean design, responsive layouts, fast websites, and
                clear communication with every client.
              </p>
              <p className="leading-relaxed">
                Being a small team allows us to offer personal attention,
                flexibility, and affordable solutions — every project is handled
                by the people you actually talk to.
              </p>
              <div className="grid gap-4 pt-3 sm:grid-cols-3">
                {[
                  "Aristotelis Moulas",
                  "Giannis Zaroliagkis",
                  "Thodoris Nickaris",
                ].map((name) => (
                  <div
                    key={name}
                    className="group rounded-xl border border-[#153351]/10 bg-[#f1f4f4]/90 p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-[#c97745]/60 hover:shadow-md"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#153351] text-white transition-transform group-hover:scale-105">
                      {name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-[#0b2136]">
                      {name}
                    </p>
                    <p className="text-xs text-[#31526e]">Co-founder &amp; Web Developer</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#dfe7e9_0%,#e9eef0_55%,#dfe7e9_100%)]"
      >
        <div className="ambient-blob pointer-events-none absolute right-[5%] top-[10%] h-24 w-28 border border-[#c97745]/14" />
        <div className="ambient-ring pointer-events-none absolute right-[14%] top-[24%] h-10 w-10 rounded-full border border-[#7898aa]/22" style={{ animationDelay: "-3s" }} />
        <div className="ambient-tile pointer-events-none absolute bottom-[16%] left-[5%] h-7 w-7 rounded-xl border border-[#153351]/12 bg-[#d4e0e3]/25" />
        <div className="ambient-dot pointer-events-none absolute right-[20%] bottom-[10%] h-3 w-3 rounded-full bg-[#7898aa]/40" style={{ animationDelay: "-5s" }} />
        <div className="ambient-dot-reverse pointer-events-none absolute left-[12%] top-[14%] h-3.5 w-3.5 rounded-full bg-[#c97745]/26" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 760" preserveAspectRatio="none" aria-hidden="true">
          <path d="M980 70 C 1160 150, 1150 280, 1320 350 S 1480 530, 1370 690" fill="none" stroke="#7898aa" strokeOpacity="0.16" strokeWidth="1.5" className="ambient-path" />
          <path d="M-100 620 C 140 520, 250 650, 430 560" fill="none" stroke="#c97745" strokeOpacity="0.12" strokeWidth="1.4" className="ambient-path-reverse" />
        </svg>
        <div data-reveal className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <p className="section-kicker">
              Services
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Everything you need to launch and grow online.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-xl border border-[#153351]/10 bg-[#f1f4f4] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c97745] hover:shadow-[0_18px_45px_rgba(11,33,54,0.12)]"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-[#153351] text-[#d98a50] transition-transform group-hover:scale-110">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative w-full overflow-hidden bg-[#0b2136] text-white shadow-[0_18px_50px_rgba(11,33,54,0.16)]">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="process-orb-small absolute left-[13%] top-20 h-5 w-5 rounded-full bg-[#d98a50]/65 shadow-[0_0_28px_rgba(240,168,102,0.45)]" />
            <div className="process-orb-small absolute bottom-20 right-[17%] h-4 w-4 rounded-full bg-[#91adba]/60" style={{ animationDelay: "-3s" }} />
            <div className="ambient-ring absolute right-[8%] top-[18%] h-10 w-10 rounded-full border border-white/10" style={{ animationDelay: "-6s" }} />
            <div className="ambient-ring-reverse absolute bottom-[17%] left-[7%] h-8 w-8 rounded-full border border-[#d98a50]/16" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 620" preserveAspectRatio="none">
              <path d="M-80 430 C 210 280, 390 460, 650 325 S 1060 190, 1510 300" fill="none" stroke="#91adba" strokeOpacity="0.10" strokeWidth="1.5" className="ambient-path" />
            </svg>
          </div>

          <div
            data-reveal
            className="relative mx-auto max-w-6xl px-6 py-20 md:py-24"
          >
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="process-kicker section-kicker section-kicker-dark justify-center">
                How we work
              </p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                From idea to website, without the confusion.
              </h2>
              <p className="mt-4 text-white/60">
                A friendly four-step process that keeps everything clear and easy
                to follow.
              </p>
            </div>

            <div className="relative">
              <div
                className="absolute left-[12%] right-[12%] top-10 hidden border-t-2 border-dashed border-[#7898aa]/20 lg:block"
                aria-hidden="true"
              />

              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {process.map((p, index) => (
                  <article key={p.title} className="group relative text-center">
                    <div
                      className="process-step-icon relative mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-[#153351] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-3 group-hover:border-[#d98a50]/55 group-hover:bg-[#1b405f]"
                      style={{ animationDelay: `${index * -1.2}s` }}
                    >
                      <p.icon className="h-7 w-7 text-[#d98a50]" />
                      <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-[#d98a50] text-xs font-bold text-[#0b2136] shadow-md">
                        {index + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mx-auto mt-3 max-w-[15rem] text-sm leading-relaxed text-white/60">
                      {p.desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
      </section>

      {/* Portfolio */}
      <section
        id="portfolio"
        className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#dfe7e9_0%,#e9eef0_100%)]"
      >
        <div className="ambient-tile pointer-events-none absolute left-[8%] top-[18%] h-7 w-7 rounded-xl border border-[#7898aa]/28 bg-[#d4e0e3]/30" />
        <div className="ambient-ring pointer-events-none absolute left-[4%] bottom-[13%] h-12 w-12 rounded-full border border-[#c97745]/15" style={{ animationDelay: "-6s" }} />
        <div className="ambient-blob pointer-events-none absolute bottom-[10%] right-[5%] h-20 w-24 border border-[#c97745]/13" style={{ animationDelay: "-4s" }} />
        <div className="ambient-dot-reverse pointer-events-none absolute right-[14%] top-[16%] h-3 w-3 rounded-full bg-[#7898aa]/36" />
        <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div data-reveal className="mb-9 max-w-xl">
          <p className="section-kicker">
            Portfolio
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            A couple of demo websites.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Small examples of the type of modern websites we can create for
            local businesses.
          </p>
        </div>

        <div data-reveal className="grid gap-5 md:grid-cols-2">
          {portfolio.map((p) => (
            <article
              key={p.title}
              className="group grid grid-cols-[96px_1fr] overflow-hidden rounded-2xl border border-[#153351]/10 bg-[#f1f4f4] shadow-[0_10px_30px_rgba(11,33,54,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c97745]/55 hover:shadow-[0_16px_38px_rgba(11,33,54,0.12)] sm:grid-cols-[120px_1fr]"
            >
              <div className="relative grid min-h-[180px] place-items-center overflow-hidden bg-[linear-gradient(145deg,#153351,#24445f)]">
                <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full border border-[#7898aa]/20" />
                <div className="absolute -bottom-7 -right-7 h-20 w-20 rounded-full bg-[#c97745]/15" />
                <p.icon className="relative h-9 w-9 text-[#d98a50] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
              </div>

              <div className="flex flex-col justify-center p-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#95543b]">
                  {p.tag}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-[#0b2136]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                {p.href ? (
                  <a
                    href={p.href}
                    className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#31526e] transition-all group-hover:translate-x-1 group-hover:text-[#95543b]"
                  >
                    Open demo <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="mt-4 inline-flex w-fit rounded-full bg-[#dfe7e9] px-3 py-1 text-xs font-medium text-[#31526e]">
                    Demo coming soon
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative overflow-hidden bg-[#e9eef0]">
        <div className="ambient-blob pointer-events-none absolute left-[3%] top-[13%] h-24 w-28 border border-[#153351]/9" />
        <div className="ambient-ring-reverse pointer-events-none absolute left-[11%] bottom-[19%] h-11 w-11 rounded-full border border-[#7898aa]/16" />
        <div className="ambient-dot-reverse pointer-events-none absolute right-[7%] top-[30%] h-4 w-4 rounded-full bg-[#c97745]/28" />
        <div className="ambient-dot pointer-events-none absolute bottom-[12%] left-[18%] h-3 w-3 rounded-full bg-[#7898aa]/40" style={{ animationDelay: "-6s" }} />
        <div className="ambient-dot pointer-events-none absolute right-[21%] top-[13%] h-2.5 w-2.5 rounded-full bg-[#7898aa]/42" style={{ animationDelay: "-2s" }} />
        <div className="ambient-tile pointer-events-none absolute bottom-[13%] right-[14%] h-8 w-8 rounded-xl border border-[#c97745]/14 bg-[#dfe7e9]/25" style={{ animationDelay: "-3s" }} />
        <div data-reveal className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <p className="section-kicker">
              Why choose us
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Small enough to care. Skilled enough to deliver.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="group flex items-start gap-3 rounded-lg border border-[#153351]/10 bg-[#f1f4f4] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c97745]/60 hover:shadow-md"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#c97745]/15 text-[#95543b] transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <r.icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium">{r.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#e9eef0_0%,#dfe7e9_100%)]"
      >
        <div className="ambient-blob pointer-events-none absolute right-[5%] top-[11%] h-24 w-28 border border-[#7898aa]/18" />
        <div className="ambient-ring pointer-events-none absolute right-[14%] bottom-[16%] h-12 w-12 rounded-full border border-[#c97745]/15" />
        <div className="ambient-dot-reverse pointer-events-none absolute bottom-[10%] left-[6%] h-4 w-4 rounded-full bg-[#c97745]/25" />
        <div className="ambient-dot pointer-events-none absolute left-[14%] top-[17%] h-2.5 w-2.5 rounded-full bg-[#7898aa]/44" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 700" preserveAspectRatio="none" aria-hidden="true">
          <path d="M1040 30 C 1210 120, 1170 260, 1340 350 S 1470 520, 1390 650" fill="none" stroke="#7898aa" strokeOpacity="0.14" strokeWidth="1.5" className="ambient-path-reverse" />
        </svg>
        <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div data-reveal className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="section-kicker">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Let's build something great.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Have an idea for a website? Contact us and we will help you turn
              it into a professional online presence.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-[#31526e]" />
                <span>rocket3devs@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-[#31526e]" />
                <span>Heraklion, Crete, Greece</span>
              </div>
            </div>
          </div>
          <form
            action="https://formsubmit.co/rocket3devs@gmail.com"
            method="POST"
            className="rounded-xl border border-[#153351]/10 bg-[#f1f4f4] p-6 sm:p-8"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name</label>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="w-full rounded-md border border-[#153351]/15 bg-[#e8edef] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[#c97745]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="w-full rounded-md border border-[#153351]/15 bg-[#e8edef] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[#c97745]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="w-full resize-none rounded-md border border-[#153351]/15 bg-[#e8edef] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[#c97745]"
                />
              </div>
              <input
                type="hidden"
                name="_subject"
                value="New Rocket3Dev website enquiry"
              />
              <input type="hidden" name="_template" value="table" />
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#c97745] px-6 py-3 font-semibold text-[#0b2136] transition-all hover:-translate-y-0.5 hover:bg-[#d98a50] active:scale-[0.99]"
              >
                Send Message
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#7898aa]/20 bg-[#0b2136] text-white/70">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 font-semibold text-white">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-white/10 text-[#c97745]">
                  <Rocket className="h-4 w-4" />
                </span>
                Rocket3Dev
              </div>
              <p className="mt-1.5 text-xs">Heraklion, Crete · Greece</p>
            </div>
            <ul className="flex flex-wrap gap-4 text-xs">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={(event) => handleSectionClick(event, n.href)}
                    className="transition-colors hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5 flex flex-col justify-between gap-2 border-t border-white/10 pt-4 text-[11px] sm:flex-row">
            <p>
              © {new Date().getFullYear()} Rocket3Dev. All rights reserved.
            </p>
            <p>Built by Rocket3Dev.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
