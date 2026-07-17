import React from "react";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

// Inline brand icons — kept local instead of importing from lucide-react,
// since brand/logo icon export names shift between lucide-react versions.
function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

/**
 * SimpleContact — React + Tailwind, single file, no form.
 * Just a clean list of contact channels: email, phone, GitHub, LinkedIn.
 * Fill in your real details in the CONTACTS array below.
 */

const CONTACTS = [
  {
    label: "Email",
    value: "afaq23994@gmail.com",
    href: "mailto:afaq23994@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+92 349 5615693",
    href: "tel:+923495615693",
    icon: Phone,
  },
  {
    label: "GitHub",
    value: "github.com/afaq-01",
    href: "https://github.com/afaq-01",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/your-username",
    href: "https://linkedin.com/in/your-username",
    icon: LinkedinIcon,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-black text-white">
      <div className="max-w-xl mx-auto px-6 py-20">
        <p className="text-xs tracking-widest uppercase text-purple-600 mb-3">
          Get in touch
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold mb-10">
          Let's connect.
        </h2>

        <ul className="flex flex-col gap-1">
          {CONTACTS.map(({ label, value, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center gap-4 py-4 border-b border-white/10 hover:border-white/30 transition-colors"
              >
                <span className="w-10 h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-white/70 group-hover:bg-white/10 group-hover:text-white transition-colors">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs text-white/40">{label}</span>
                  <span className="block text-[15px] truncate">{value}</span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}