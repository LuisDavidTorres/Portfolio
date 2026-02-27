import { useEffect, useState } from "react";
import type { NavItem } from "../constants/navItems";

interface DesktopNavProps {
  items: NavItem[];
}

export default function DesktopNav({ items }: DesktopNavProps) {
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
      })).filter(item => item.element) as Array<{id: string, element: Element}>;

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

  return (
    <nav className="hidden md:flex items-center gap-6 md:gap-8 text-sm">
      {items.map((item) => (
        <a
          key={item.url}
          href={item.url}
          className={`font-medium transition-colors duration-200 ${
            activeSection === item.url
              ? "text-neutral-900 dark:text-slate-100"
              : "text-neutral-600 dark:text-slate-300 hover:text-neutral-900 dark:hover:text-slate-50"
          }`}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}