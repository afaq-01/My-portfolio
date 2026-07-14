import React, { useMemo, useRef, useState, useEffect } from "react";

// Reveals children with a fade + slide-up transition the first time
// they scroll into view. Pure IntersectionObserver, no extra deps.
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

// Same reveal-on-scroll behavior as <Reveal>, but as a hook so it can be
// applied directly to elements (like <li>) that shouldn't be wrapped in
// an extra <div>.
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function TimelineItem({ item, delay, isLast }) {
  const [ref, visible] = useReveal();
  return (
    <li
      ref={ref}
      className={`relative pl-8 transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${isLast ? "" : "pb-10"}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      <span className="absolute -left-[9px] top-1 flex items-center justify-center w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-indigo-500">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
      </span>
      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">{item.period}</p>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-1">{item.title}</h3>
      <p className="text-sm text-neutral-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
    </li>
  );
}

export default function PortfolioStats() {
  // ---------------- Data ----------------
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const dayLabels = ["", "M", "", "W", "", "F", ""];

  const levelColors = [
    "bg-neutral-200 dark:bg-slate-800/60",
    "bg-emerald-200 dark:bg-emerald-900",
    "bg-emerald-400 dark:bg-emerald-700",
    "bg-emerald-500",
    "bg-emerald-600 dark:bg-emerald-400",
  ];

  const stats = [
    { label: "Repos", value: "95" },
    { label: "Contributions", value: "1.2k" },
    { label: "Followers", value: "23" },
    { label: "Following", value: "7" },
  ];

  const languages = [
    { name: "JavaScript", color: "#f4d03f", pct: 35 },
    { name: "TypeScript", color: "#3b82f6", pct: 25 },
    { name: "Python", color: "#22c55e", pct: 20 },
    { name: "CSS", color: "#8b5cf6", pct: 12 },
    { name: "Other", color: "#64748b", pct: 8 },
  ];

  const journey = [
    {
      period: "2024 - Present",
      title: "Full-Stack Developer",
      description: "Building scalable MERN stack applications and exploring new technologies.",
    },
    {
      period: "2023 - 2024",
      title: "Freelance Developer",
      description: "Worked on client projects including websites, dashboards and REST APIs.",
    },
    {
      period: "2022 - 2023",
      title: "Computer Science Student",
      description: "Focused on data structures, algorithms and full-stack development.",
    },
  ];

  // ---------------- Derived values ----------------

  // 53 weeks x 7 days contribution intensity grid
  const contributionGrid = useMemo(() => {
    const cols = 53;
    const rows = 7;
    const grid = [];
    for (let c = 0; c < cols; c++) {
      const col = [];
      for (let r = 0; r < rows; r++) {
        const rand = Math.random();
        let level = 0;
        if (rand > 0.55) level = 1;
        if (rand > 0.72) level = 2;
        if (rand > 0.85) level = 3;
        if (rand > 0.93) level = 4;
        col.push(level);
      }
      grid.push(col);
    }
    return grid;
  }, []);

  // Donut chart geometry
  const size = 96;
  const thickness = 16;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;
  const donutSegments = languages.map((lang) => {
    const dash = (lang.pct / 100) * circumference;
    const gap = circumference - dash;
    const offset = -((cumulative / 100) * circumference);
    cumulative += lang.pct;
    return { ...lang, dash, gap, offset };
  });

  // ---------------- Render ----------------
  return (
    <div id="experience" className="min-h-screen w-full bg-white dark:bg-black px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-16">
        {/* ---------------- GitHub stats card ---------------- */}
        <section>
          <Reveal>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                GitHub Activity
              </p>
              <a
                href="#"
                className="hidden sm:flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
              >
                View GitHub Profile
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">My GitHub Statistics</h2>
          </Reveal>

          <Reveal delay={100}>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-b from-black/[0.03] dark:from-white/[0.04] to-transparent p-5 md:p-6">
            <p className="text-sm text-neutral-600 dark:text-slate-300 mb-4">
              <span className="font-semibold text-neutral-900 dark:text-white">1,243</span> Contributions in the last
              year
            </p>

            {/* Contribution graph */}
            <div className="overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                <div className="flex flex-col gap-[3px] pt-4 text-[10px] text-neutral-500 dark:text-slate-500 leading-none">
                  {dayLabels.map((d, i) => (
                    <div key={i} className="h-[11px] flex items-center">
                      {d}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-[10px] text-neutral-500 dark:text-slate-500 mb-1 gap-[3px]">
                    {months.map((m) => (
                      <div key={m} style={{ width: "44px" }} className="shrink-0">
                        {m}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-[3px]">
                    {contributionGrid.map((col, ci) => (
                      <div key={ci} className="flex flex-col gap-[3px]">
                        {col.map((level, ri) => (
                          <div
                            key={ri}
                            className={`w-[11px] h-[11px] rounded-[2px] ${levelColors[level]}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stat tiles */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={150 + i * 80}>
                  <div className="rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 px-4 py-3">
                    <p className="text-xl font-bold text-neutral-900 dark:text-white">{s.value}</p>
                    <p className="text-xs text-neutral-500 dark:text-slate-400 mt-0.5">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Language donut + legend */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <p className="text-xs font-semibold text-neutral-500 dark:text-slate-400 sm:hidden">Top Languages</p>

              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 shrink-0">
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  className="stroke-black/[0.06] dark:stroke-white/[0.06]"
                  strokeWidth={thickness}
                />
                {donutSegments.map((seg, i) => (
                  <circle
                    key={i}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={thickness}
                    strokeDasharray={`${seg.dash} ${seg.gap}`}
                    strokeDashoffset={seg.offset}
                    strokeLinecap="butt"
                  />
                ))}
              </svg>

              <div className="flex flex-col gap-1.5">
                <p className="hidden sm:block text-xs font-semibold text-neutral-500 dark:text-slate-400 mb-1">
                  Top Languages
                </p>
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-slate-300">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    {lang.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          </Reveal>
        </section>

        {/* ---------------- Journey timeline ---------------- */}
        <section>
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-1">
              Experience
            </p>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">My Journey</h2>
          </Reveal>

          <ol className="relative border-l border-black/10 dark:border-white/10 ml-2">
            {journey.map((item, i) => (
              <TimelineItem
                key={item.title}
                item={item}
                delay={i * 150}
                isLast={i === journey.length - 1}
              />
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}