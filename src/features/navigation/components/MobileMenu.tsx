import { useState } from "react";
import type { NavItem } from "../constants/navItems";

interface MobileMenuProps {
  items: NavItem[];
}

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center z-50 relative"
        aria-label="Toggle menu"
      >
        <span
          className={`w-full h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`w-full h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-full h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Menu Panel */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-zinc-900/95 backdrop-blur-md border-l border-zinc-800 z-40 lg:hidden transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 p-8 mt-20">
          {items.map((item) => (
            <a
              key={item.url}
              href={item.url}
              onClick={closeMenu}
              className="text-gray-300 hover:text-green-custom transition-colors duration-300 text-lg font-medium"
            >
              {item.title}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
