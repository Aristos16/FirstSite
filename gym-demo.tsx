import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Dumbbell,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

export const Route = createFileRoute("/gym-demo")({
  head: () => ({
    meta: [
      { title: "IronPulse Gym — Demo Website by ThreeDev Crete" },
      {
        name: "description",
        content:
          "A modern demo gym website with memberships, classes, trainers, and booking call-to-action.",
      },
    ],
  }),
  component: GymDemo,
});

const classes = [
  {
    title: "Strength Training",
    desc: "Build muscle with guided weight training programs.",
  },
  {
    title: "HIIT Classes",
    desc: "Fast, intense sessions for fat loss and conditioning.",
  },
  {
    title: "Personal Training",
    desc: "1-on-1 coaching based on your body and goals.",
  },
];

const memberships = [
  {
    name: "Basic",
    price: "€29/mo",
    features: ["Gym access", "Locker room", "Free fitness assessment"],
  },
  {
    name: "Plus",
    price: "€49/mo",
    features: ["Gym access", "Group classes", "Training plan", "Nutrition tips"],
    featured: true,
  },
  {
    name: "Premium",
    price: "€79/mo",
    features: ["Everything in Plus", "2 PT sessions/month", "Priority booking"],
  },
];

function GymDemo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isEmbeddedPreview =
      new URLSearchParams(window.location.search).get("preview") === "1";

    if (!isEmbeddedPreview) return;

    document.documentElement.classList.add("gym-demo-preview");
    document.body.classList.add("gym-demo-preview");

    return () => {
      document.documentElement.classList.remove("gym-demo-preview");
      document.body.classList.remove("gym-demo-preview");
    };
  }, []);

  function handleSectionNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) {
    event.preventDefault();
    event.stopPropagation();

    const section = document.getElementById(sectionId);
    if (!section) return;

    const header = document.querySelector("header");
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const targetTop =
      section.getBoundingClientRect().top + window.scrollY - headerHeight - 8;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });

    setOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#070b12] text-white">
      <style>{`
        html.gym-demo-preview,
        body.gym-demo-preview {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        html.gym-demo-preview::-webkit-scrollbar,
        body.gym-demo-preview::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b12]/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#home"
            onClick={(event) => handleSectionNavigation(event, "home")}
            className="flex items-center gap-2 font-bold"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-lime-400 text-black">
              <Dumbbell className="h-5 w-5" />
            </span>
            IronPulse Gym
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <a
                href="#classes"
                onClick={(event) => handleSectionNavigation(event, "classes")}
                className="text-sm text-white/70 hover:text-white"
              >
                Classes
              </a>
            </li>
            <li>
              <a
                href="#memberships"
                onClick={(event) => handleSectionNavigation(event, "memberships")}
                className="text-sm text-white/70 hover:text-white"
              >
                Memberships
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(event) => handleSectionNavigation(event, "contact")}
                className="text-sm text-white/70 hover:text-white"
              >
                Contact
              </a>
            </li>
          </ul>

          <a
            href="/register"
            className="hidden rounded-md bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300 md:inline-flex"
          >
            Create Account
          </a>

          <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </nav>

        {open && (
          <div className="border-t border-white/10 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <a
                href="#classes"
                onClick={(event) => handleSectionNavigation(event, "classes")}
                className="text-white/70"
              >
                Classes
              </a>
              <a
                href="#memberships"
                onClick={(event) => handleSectionNavigation(event, "memberships")}
                className="text-white/70"
              >
                Memberships
              </a>
              <a
                href="#contact"
                onClick={(event) => handleSectionNavigation(event, "contact")}
                className="text-white/70"
              >
                Contact
              </a>
              <a onClick={() => setOpen(false)} href="/register" className="text-lime-300">
                Create Account
              </a>
              <a onClick={() => setOpen(false)} href="/login" className="text-lime-300">
                Member Login
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.22),transparent_35%),linear-gradient(135deg,#07111f,#05070b)]" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
          <div>
            <a href="/" className="mb-6 inline-flex text-sm text-lime-300 hover:text-lime-200">
              ← Back to ThreeDev portfolio
            </a>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-xs font-semibold text-lime-300">
              Demo Website · Gym / Fitness Business
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
              Train Hard. <span className="text-lime-400">Feel Strong.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              IronPulse is a modern fitness club in Heraklion offering strength training,
              group classes, personal coaching, and flexible memberships.
            </p>

            {/* REPLACED HERO BUTTONS */}
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/register"
                className="inline-flex items-center gap-2 rounded-md bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
              >
                Create Account <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/login"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Member Login
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-500 p-1">
              <div className="rounded-2xl bg-[#07111f] p-8">
                <Dumbbell className="h-16 w-16 text-lime-400" />
                <h2 className="mt-8 text-3xl font-bold">Open 7 days/week</h2>
                <p className="mt-3 text-white/65">
                  Modern equipment, expert trainers, flexible plans, and a clean premium
                  training environment.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-3xl font-black text-lime-400">500+</p>
                    <p className="text-xs text-white/60">Members</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-lime-400">25+</p>
                    <p className="text-xs text-white/60">Classes/week</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-lime-400">4.9</p>
                    <p className="text-xs text-white/60">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes */}
      <section id="classes" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-lime-400">Classes</p>
          <h2 className="mt-3 text-4xl font-black">Programs for every goal.</h2>
          <p className="mt-4 text-white/65">
            From beginners to advanced athletes, the gym offers flexible programs for strength,
            endurance, and transformation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {classes.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-lime-400/50"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-lime-400/15 text-lime-400">
                <Dumbbell className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Memberships */}
      <section id="memberships" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-lime-400">
              Memberships
            </p>
            <h2 className="mt-3 text-4xl font-black">Simple monthly plans.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {memberships.map((m) => (
              <div
                key={m.name}
                className={`rounded-2xl border p-6 ${
                  m.featured
                    ? "border-lime-400 bg-lime-400 text-black"
                    : "border-white/10 bg-[#070b12] text-white"
                }`}
              >
                {m.featured && (
                  <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-black px-3 py-1 text-xs font-bold text-lime-400">
                    <Star className="h-3 w-3" /> Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-black">{m.name}</h3>
                <p className="mt-3 text-4xl font-black">{m.price}</p>

                <ul className="mt-6 space-y-3">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="/register"
                  className={`mt-8 inline-flex w-full justify-center rounded-md px-4 py-3 text-sm font-bold ${
                    m.featured
                      ? "bg-black text-white hover:bg-black/85"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  Choose Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Booking */}
      <section id="contact" className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-lime-400">
            Book a visit
          </p>
          <h2 className="mt-3 text-4xl font-black">Ready to start?</h2>
          <p className="mt-4 text-white/65">
            Create an account, wait for admin approval, and then book your gym appointment
            from your member dashboard.
          </p>

          <div className="mt-8 space-y-4 text-sm text-white/75">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-lime-400" />
              Heraklion, Crete
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-lime-400" />
              +30 2810 000 000
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-lime-400" />
              Mon–Sun: 07:00–23:00
            </div>
          </div>
        </div>

        {/* REPLACED OLD BOOKING FORM */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-2xl font-bold">Book through your account</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Create a member account, wait for admin approval, and then book your gym
            appointment from your account dashboard.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/register"
              className="rounded-md bg-lime-400 px-5 py-3 text-sm font-bold text-black hover:bg-lime-300"
            >
              Create Account
            </a>

            <a
              href="/login"
              className="rounded-md border border-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              Login
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}