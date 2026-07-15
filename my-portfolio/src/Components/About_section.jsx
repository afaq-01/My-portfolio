"use client";

import { useState, useEffect, useRef } from "react";
import {
  User,
  MapPin,
  GraduationCap,
  Landmark,
  Mail,
  Download,
} from "lucide-react";
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGithub,
  SiPostman,
  SiDocker,
  SiFigma,
} from "react-icons/si";

const info = [
  { icon: User, label: "Name:", value: "Afaq Ahmad" },
  { icon: MapPin, label: "From:", value: "Swabi, Pakistan" },
  { icon: GraduationCap, label: "Education:", value: "BS Computer Science" },
  { icon: Landmark, label: "University:", value: "University of Swabi" },
  { icon: Mail, label: "Email:", value: "afaq23994@gmail.com" },
];

const skillCategories = {
  Frontend: [
    { name: "React.js", icon: SiReact, color: "#61DAFB" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  ],
  Backend: [
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
  ],
  Database: [{ name: "MongoDB", icon: SiMongodb, color: "#47A248" }],
  Tools: [
    { name: "Git & GitHub", icon: SiGithub, color: "#FFFFFF" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  ],
};

// "All" combines every skill from every category, de-duplicated by name
const allSkills = Object.values(skillCategories)
  .flat()
  .filter((skill, i, arr) => arr.findIndex((s) => s.name === skill.name) === i);

const tabs = ["All", ...Object.keys(skillCategories)];

// Reusable hook: tells us when an element has scrolled into view
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(el);
      }
    }, { threshold: 0.15, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

function SkillCard({ name, icon: Icon, color, delay }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
      className={`flex flex-col items-center justify-center gap-3 py-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/60 hover:border-purple-500/50 transition-all duration-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
    >
      <Icon size={32} color={color} />
      <span className="text-xs text-neutral-600 dark:text-neutral-300 text-center px-2">{name}</span>
    </div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState("All");
  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();

  const activeSkills = activeTab === "All" ? allSkills : skillCategories[activeTab];

  return (
    <section id="about" className="bg-white dark:bg-black py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16">
        {/* Left: About Me */}
        <div
          ref={leftRef}
          className={`flex flex-col items-start text-left transition-all duration-700 ${leftInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <span className="text-xs font-medium text-purple-600 dark:text-purple-500 tracking-wide mb-3">
            ABOUT ME
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            Get to know me!
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg mb-8">
            I'm a passionate Full-Stack Developer focused on building (and
            occasionally designing) exceptional digital experiences.
            Currently, I'm focused on building accessible, human-centered
            products.
          </p>

          <ul className="flex flex-col gap-3 mb-10 w-full">
            {info.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                <Icon size={16} className="text-purple-600 dark:text-purple-500 shrink-0" />
                <span className="text-neutral-500 w-24 shrink-0">{label}</span>
                <span className="text-neutral-700 dark:text-neutral-200">{value}</span>
              </li>
            ))}
          </ul>

          <a
            href="/AFAQ AHMAD resume.pdf"
            download
            className="flex items-center gap-2 text-sm font-medium border border-purple-400 dark:border-purple-700 text-purple-600 dark:text-purple-400 px-6 py-3 rounded-md hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors"
          >
            Download Resume
            <Download size={16} />
          </a>
        </div>

        {/* Right: My Skills */}
        <div
          id="skill"
          ref={rightRef}
          className={`flex flex-col items-start text-left transition-all duration-700 delay-150 ${rightInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <span className="text-xs font-medium text-purple-600 dark:text-purple-500 tracking-wide mb-3">
            WHAT I DO
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            My Skills
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Skill grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            {activeSkills.map((skill, i) => (
              <SkillCard key={skill.name} {...skill} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}