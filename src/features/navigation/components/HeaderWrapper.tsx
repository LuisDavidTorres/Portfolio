import { useEffect, useState } from "react";

interface HeaderWrapperProps {
  children: React.ReactNode;
}

export default function HeaderWrapper({ children }: HeaderWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          {children}
        </div>
      </div>
    </header>
  );
}