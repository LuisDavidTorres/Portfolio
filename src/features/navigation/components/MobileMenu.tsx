import { useState, useEffect } from "react";
import type { NavItem } from "../constants/navItems";

interface MobileMenuProps {
  items: NavItem[];
}

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (url: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-8 h-8 p-1"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <span className={`block w-6 h-0.5 bg-neutral-900 dark:bg-white mb-1.5 transition-all duration-200 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-neutral-900 dark:bg-white mb-1.5 transition-opacity duration-200 ${isOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-neutral-900 dark:bg-white transition-all duration-200 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-md z-40"
            onClick={() => setIsOpen(false)}
          />
          <nav className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-black border-l border-neutral-200 dark:border-neutral-800 z-50 pt-20 px-8 pb-8 overflow-y-auto">
            <div className="flex flex-col gap-6 mt-4">
              {items.map((item) => (
                <button
                  key={item.url}
                  onClick={() => handleNavClick(item.url)}
                  className="text-xl font-medium text-left text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
