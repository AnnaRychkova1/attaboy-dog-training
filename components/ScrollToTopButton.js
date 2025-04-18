"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      title="Go to top"
      className={`fixed bottom-6 right-3 z-[99] flex items-center justify-center rounded-full text-white bg-[var(--dark-background)] shadow-[4px_4px_6px_rgba(26,27,29,0.1),-4px_-4px_6px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-white hover:text-[#1a1b1d] ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      } w-12 h-12 md:w-18 md:h-18 text-2xl md:text-4xl`}
    >
      &uarr;
    </button>
  );
}
