"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";

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

export default function Hero() {
  const fullText = "Hi, I'm Afaq";
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();

  useEffect(() => {
    let timeout;

    if (!isDeleting && typedText === fullText) {
      // Pause at full text before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && typedText === "") {
      // Pause at empty before typing again
      timeout = setTimeout(() => setIsDeleting(false), 500);
    } else {
      const speed = isDeleting ? 40 : 80; // deleting faster than typing
      timeout = setTimeout(() => {
        setTypedText((prev) =>
          isDeleting
            ? fullText.slice(0, prev.length - 1)
            : fullText.slice(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, fullText]);

  return (
    <section className="relative bg-black overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left: Text */}
        <div
          ref={leftRef}
          className={`flex flex-col items-center text-center md:items-start md:text-left transition-all duration-700 ${
            leftInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900 text-xs text-neutral-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for freelance work
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight min-h-[1.2em]">
            {typedText}
            <span className="inline-block w-[3px] h-[0.9em] bg-purple-500 ml-1 align-middle animate-pulse" />
          </h1>

          <p className="mt-2 text-2xl md:text-3xl font-semibold text-purple-500">
            Full Stack Developer
          </p>

          {/* Subtext */}
          <p className="mt-6 text-neutral-400 text-base md:text-lg max-w-md">
            I build fast, responsive, and user-friendly web applications using
            modern technologies. Let's turn your ideas into reality.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#projects"
              className="flex items-center gap-2 text-sm font-medium bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors"
            >
              View My Work
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 text-sm font-medium border border-neutral-700 text-neutral-300 px-6 py-3 rounded-md hover:border-neutral-500 hover:text-white transition-colors"
            >
              Contact Me
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div
          ref={rightRef}
          className={`flex justify-center md:justify-end transition-all duration-700 delay-200 ${
            rightInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#b648e3]/40 blur-2xl scale-105 animate-pulse" />
            <img
              src="/image.jpeg"
              alt="Afaq"
              className="relative w-full h-full max-w-sm md:max-w-md object-cover rounded-full ring-4 ring-[#b648e3] ring-offset-4 ring-offset-black"
            />
          </div>
        </div>
      </div>
    </section>
  );
}