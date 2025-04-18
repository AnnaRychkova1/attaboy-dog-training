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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent  ${
        isBlurred ? "backdrop-blur-md shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <a href="#home" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Logo Attaboy Dog Training"
            width={160}
            height={160}
            className="h-16 w-auto"
            loading="lazy"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-lg font-medium">
          <NavLink href="#home" text="Home" />
          <NavLink href="#about" text="About" />
          <NavLink href="#services" text="Services" />
          <NavLink href="#testimonials" text="Testimonials" />
          <NavLink href="#contacts" text="Contacts" />
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
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
          <ul className="flex flex-col gap-2 text-base font-medium items-end">
            <NavItem href="#home" text="Home" />
            <NavItem href="#about" text="About" />
            <NavItem href="#services" text="Services" />
            <NavItem href="#testimonials" text="Testimonials" />
            <NavItem href="#contacts" text="Contacts" />
          </ul>
        </div>
      )}
    </header>
  );
}

// Компоненти лінків
function NavLink({ href, text }) {
  return (
    <li className="list-none">
      <a
        href={href}
        className="px-4 py-2 rounded-full hover:text-[var(--accent-color)] hover:drop-shadow-[0_2px_4px_rgba(246,92,115,0.7)] transition"
      >
        {text}
      </a>
    </li>
  );
}

function NavItem({ href, text }) {
  return (
    <li className="list-none">
      <a
        href={href}
        className="block px-4 py-2 rounded-full hover:bg-gray-100 transition"
      >
        {text}
      </a>
    </li>
  );
}
