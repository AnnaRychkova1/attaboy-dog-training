import Image from "next/image";

export default function TestimonialCard({ name, message, image }) {
  return (
    <>
      <Image
        src={image}
        alt={`Testimonial of ${name || "Grateful Customer"}`}
        width={200}
        height={200}
        className="testimonial-img mx-auto rounded-full mb-4"
        loading="lazy"
      />
      <p className="testimonial-text">{message}</p>
      <p className="font-semibold text-xl text-[var(--accent-color)] mt-4 text-center">
        {name || "Grateful Customer"}
      </p>
    </>
  );
}
