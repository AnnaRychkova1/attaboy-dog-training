"use client";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest("a[href^='#']");
      if (!link) return;

      e.preventDefault();
      const id = link.getAttribute("href").substring(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${id}`);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
