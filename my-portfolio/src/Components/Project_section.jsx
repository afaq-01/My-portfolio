"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingCart, MessageCircle, Bot, Link as LinkIcon } from "lucide-react";
import { SiGithub } from "react-icons/si";

const projects = [
  {
    icon: ShoppingCart,
    image: "/ecommerce.jpeg",
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce platform with admin dashboard, payments, orders and more.",
    stack: "MERN Stack",
    liveUrl: "#",
    githubUrl: "https://github.com/afaq-01/E-commerce-Website",
  },
  {
    icon: MessageCircle,
    image: "/chatapp.jpeg",
    title: "Real-Time Chat Application",
    description:
      "WhatsApp like real-time chat app with 1-1 messaging, online status and more.",
    stack: "MERN Stack",
    liveUrl: "#",
    githubUrl: "https://github.com/afaq-01/Chat-App",
  },
  {
    icon: Bot,
    image: "/chatbot.jpeg",
    title: "AI Chatbot (Nexora)",
    description:
      "AI chatbot integrated with OpenAI API. Ask anything, get intelligent answers instantly.",
    stack: "MERN Stack",
    liveUrl: "#",
    githubUrl: "https://github.com/afaq-01/ChatBot",
  },
];

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
        observer.unobserve(el); // animate once, not every scroll
      }
    }, { threshold: 0.15, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

function ProjectCard({ icon: Icon, image, title, description, stack, liveUrl, githubUrl, delay }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
      className={`flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 overflow-hidden hover:border-purple-500/50 transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Thumbnail with overlapping icon badge */}
      <div className="relative bg-neutral-200 dark:bg-neutral-800">
        <img src={image} alt={title} className="w-full h-auto block" />
        <div className="absolute -bottom-4 left-4 w-9 h-9 rounded-full bg-purple-600 border-4 border-white dark:border-black flex items-center justify-center">
          <Icon size={16} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-4 pt-8 pb-4">
        <h3 className="text-neutral-900 dark:text-white font-semibold text-sm mb-2">{title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed mb-4 flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800">
          <span className="text-xs text-neutral-500">{stack}</span>
          <div className="flex items-center gap-3">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 dark:text-neutral-400 hover:text-purple-500 transition-colors"
              aria-label={`Live link for ${title}`}
            >
              <LinkIcon size={16} />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 dark:text-neutral-400 hover:text-purple-500 transition-colors"
              aria-label={`GitHub repo for ${title}`}
            >
              <SiGithub size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [headerRef, headerInView] = useInView();

  return (
    <section id="projects" className="bg-white dark:bg-black py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`flex items-center justify-between mb-8 transition-all duration-700 ${
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <span className="text-xs font-medium text-purple-600 dark:text-purple-500 tracking-wide mb-2 block">
              FEATURED PROJECTS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Some Things I've Built
            </h2>
          </div>
          <a
            href="#projects"
            className="hidden sm:flex items-center gap-1 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors"
          >
            View all projects
            <LinkIcon size={14} />
          </a>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}