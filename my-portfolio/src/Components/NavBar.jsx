import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skill", href: "#skill" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="relative bg-neutral-950 border-b border-neutral-800">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
         <a 
            href="#"
            className="flex items-center text-white font-semibold tracking-tight text-lg"
          >
            <img src="/logo.png" alt="logo" className="h-[50px] w-[50px]" />
            Afaq
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
            <a  
                key={link.label}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-purple-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Theme toggle */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setIsDark(!isDark)}
              className="text-neutral-300 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md p-2 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neutral-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md p-1"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-800 px-6 py-4 space-y-4 bg-neutral-950">
          {links.map((link) => (
          <a  
              key={link.label}
              href={link.href}
              className="block text-sm text-neutral-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-neutral-800 flex items-center">
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}