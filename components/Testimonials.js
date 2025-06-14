"use client";

import { useState, useEffect, useRef } from "react";
import TestimonialCard from "./TestimonialCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testimonials() {
  const [showModal, setShowModal] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        return res.json();
      })
      .then((data) => {
        const approvedOnly = data.filter((t) => t.approved);
        setTestimonials(approvedOnly);
      })
      .catch((err) => console.error("Fetch testimonials error:", err));
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [formData.message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("message", formData.message);
    if (formData.image) form.append("image", formData.image);

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        throw new Error("Failed to submit testimonial");
      }

      setShowModal(false);
      setFormData({ name: "", message: "", image: null });
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="testimonials">
        <div className="container testimonials-container">
          <h2 className="testimonials-title">Testimonials</h2>
        </div>
      </section>

      <section>
        <div className="container testimonial-info">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="testimonials-item">
                <TestimonialCard {...testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          <a className="anhor-link h-20 sm:h-10">
            <button className="anhor-btn" onClick={() => setShowModal(true)}>
              <span className="block sm:hidden">
                Write your
                <br />
                testimonial
              </span>
              <span className="hidden sm:inline">Write your testimonial</span>
            </button>
          </a>
        </div>
      </section>

      {showModal && (
        <div className="testimonial-modal fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="bg-[var(--light-background)] rounded-xl p-6 md:p-8 w-full max-w-sm md:max-w-xl">
            <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-8 text-[var(--blue-text-color)]">
              Leave a testimonial
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-lg font-medium text-[var(--blue-text-color)]"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full input-modal"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 text-lg font-medium text-[var(--blue-text-color)]"
                >
                  Your Message
                </label>
                <textarea
                  ref={ref}
                  id="message"
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full input-modal textarea-modal overflow-hidden resize-none"
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block mb-1 text-lg font-medium text-[var(--blue-text-color)]"
                >
                  Add a photo of your pet
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files?.[0] })
                  }
                  className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-md file:font-semibold file:bg-blue-100 file:text-[var(--blue-text-color)] hover:file:bg-blue-200 input-modal"
                />
              </div>

              {error && (
                <p role="alert" className="text-red-600 text-sm font-medium">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-[var(--blue-text-color)] md:text-lg font-medium hover:[background-color:#eef4fb] hover:[box-shadow:inset_0_2px_20px_rgba(101,197,242,0.3)] hover:text-cyan-700 px-6 py-2 rounded-full transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  } bg-[var(--blue-text-color)] text-[var(--bright-text-color)] md:text-lg font-medium px-6 py-2 rounded-full hover:[background-color:#eef4fb] hover:[box-shadow:inset_0_2px_20px_rgba(101,197,242,0.3)] hover:text-cyan-700 transition`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="submit-modal fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-[var(--light-background)] rounded-xl p-6 max-w-sm w-full text-center shadow-xl">
            <h3 className="text-xl font-bold text-[var(--accent-color)]">
              Thank you!
            </h3>
            <p className="text-xl font-bold text-[var(--blue-text-color)]">
              Your testimonial was submitted successfully.
              <br />
              It will appear after it’s approved by our team.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
