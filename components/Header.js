"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuMenuOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsBlurred(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent ${
        isBlurred ? "backdrop-blur-md shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-2 lg:px-8">
        <a href="#home" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Logo Attaboy Dog Training"
            width={160}
            height={160}
            loading="lazy"
            className="h-18 w-18 sm:h-20 sm:w-20"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:block text-lg 2xl:text-2xl font-medium">
          <ul className="flex gap-6 list-none">
            <NavLink href="#hero" text="Home" />
            <NavLink href="#about" text="About" />
            <NavLink href="#services" text="Services" />
            <NavLink href="#testimonials" text="Testimonials" />
            <NavLink href="#contacts" text="Contacts" />
          </ul>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[var(--accent-color)] focus:outline-none px-4"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-9 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-0 text-lg font-medium items-end list-none">
            <NavLink href="#hero" text="Home" isMobile />
            <NavLink href="#about" text="About" isMobile />
            <NavLink href="#services" text="Services" isMobile />
            <NavLink href="#testimonials" text="Testimonials" isMobile />
            <NavLink href="#contacts" text="Contacts" isMobile />
          </ul>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, text, isMobile = false }) {
  return (
    <li className="list-none">
      <a
        href={href}
        className={`px-4 py-2 rounded-full hover:text-[var(--accent-color)] hover:drop-shadow-[0_2px_4px_rgba(246,92,115,0.7)] transition ${
          isMobile ? "block" : ""
        }`}
      >
        {text}
      </a>
    </li>
  );
}
