import { useState, useEffect } from "react";
import type { NavItem } from "../constants/navItems";

interface MobileNavProps {
  items: NavItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition < 400) {
        setActiveSection("");
        return;
      }

      if (scrollPosition + windowHeight >= documentHeight - 200) {
        const lastItem = items[items.length - 1];
        setActiveSection(lastItem.url);
        return;
      }

      const sections = items.map((item) => ({
        id: item.url,
        element: document.querySelector(item.url)
      })).filter(item => item.element) as Array<{ id: string, element: Element }>;

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom > 100) {
          setActiveSection(section.id);
          return;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden flex items-center">
      {/* Botón Hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[60] p-2 text-neutral-600 dark:text-slate-300 hover:text-neutral-900 dark:hover:text-white transition-colors focus:outline-none"
        aria-label="Toggle menu"
      >
        <div className="w-6 flex flex-col items-end gap-1.5">
          <span className={`h-0.5 bg-current transition-all duration-300 ease-out ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
          <span className={`h-0.5 bg-current transition-all duration-300 ease-out ${isOpen ? 'w-0 opacity-0' : 'w-4'}`} />
          <span className={`h-0.5 bg-current transition-all duration-300 ease-out ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
        </div>
      </button>

      {/* Dropdown Overlay / Menú Móvil */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-[50] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        style={{ height: '100dvh' }}
      >
        <nav className="flex flex-col items-center justify-center gap-8 w-full h-full px-6">
          {items.map((item, index) => (
            <a
              key={item.url}
              href={item.url}
              onClick={() => setIsOpen(false)}
              style={{
                transitionDelay: isOpen ? `${index * 100 + 100}ms` : '0ms'
              }}
              className={`text-2xl font-medium transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                } ${activeSection === item.url
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-neutral-600 dark:text-slate-300 hover:text-neutral-900 dark:hover:text-slate-50"
                }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

