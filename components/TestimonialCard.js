"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function TestimonialCard({ name, message, image }) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
  }, [message]);

  const imgSrc = image
    ? image.startsWith("http") || image.startsWith("/")
      ? image
      : `https://res.cloudinary.com/your-cloud-name/image/upload/${image}`
    : "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/default_testimonial.jpg";

  return (
    <>
      <Image
        src={imgSrc}
        alt={`Dog training testimonial from ${
          name || "a customer"
        } in Dublin, Ireland`}
        width={300}
        height={300}
        className="tw-[300px] h-[300px] mx-auto rounded-full mb-8 object-cover"
        loading="lazy"
      />

      <div className="m-4">
        <div
          ref={contentRef}
          className={`transition-all duration-300 ease-in-out ${
            expanded
              ? "max-h-[2000px] overflow-auto"
              : "line-clamp-10 overflow-hidden"
          }`}
        >
          <p className="testimonial-text">{message}</p>
        </div>

        {isOverflowing && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-md text-[var(--accent-color)] underline block mx-auto"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      <p className="font-semibold text-xl 2xl:text-2xl text-[var(--accent-color)] mb-8 text-center">
        {name || "Grateful Customer"}
      </p>
    </>
  );
}
