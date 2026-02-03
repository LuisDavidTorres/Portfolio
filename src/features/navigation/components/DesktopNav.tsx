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
      
      // Si estamos en el hero section (primeros ~400px), no marcar ninguna sección
      if (scrollPosition < 400) {
        setActiveSection("");
        return;
      }

      // Si estamos cerca del final de la página (últimos 200px), activar la última sección
      if (scrollPosition + windowHeight >= documentHeight - 200) {
        const lastItem = items[items.length - 1];
        setActiveSection(lastItem.url);
        return;
      }

      // Encontrar la sección activa
      const sections = items.map((item) => ({
        id: item.url,
        element: document.querySelector(item.url)
      })).filter(item => item.element) as Array<{id: string, element: Element}>;

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect();
        // Si la sección está en la parte superior de la pantalla (considerando el header)
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
    <nav className="hidden lg:flex items-center gap-2">
      {items.map((item) => (
        <a
          key={item.url}
          href={item.url}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
            activeSection === item.url
              ? "bg-green-custom/30 text-green-custom border-2 border-green-custom/60 shadow-lg shadow-green-custom/10"
              : "text-white hover:text-green-custom hover:bg-white/15 border-2 border-white/20"
          }`}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
