import { useEffect, useState } from "react";

interface HeaderWrapperProps {
  children: React.ReactNode;
}

export default function HeaderWrapper({ children }: HeaderWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      console.log("Scroll position:", scrollPosition); // Debug
      setIsScrolled(scrollPosition > 0);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log("isScrolled:", isScrolled); // Debug

  return (
    <header
      className="py-5 w-full sticky top-0 z-50"
      style={{
        backgroundColor: isScrolled ? '#000000' : 'transparent',
        boxShadow: isScrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : 'none',
        transition: 'background-color 0.1s ease',
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center px-10 sm:px-20 xl:px-40">
        {children}
      </div>
    </header>
  );
}
