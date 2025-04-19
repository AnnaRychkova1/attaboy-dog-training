"use client";

import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import testimonialsData from "../testimonials.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testimonials() {
  const [showModal, setShowModal] = useState(false);
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = {
      id: Date.now(),
      name: formData.name || "Grateful Customer",
      message: formData.message,
      image: formData.image
        ? URL.createObjectURL(formData.image)
        : "/favicon.png",
    };
    setTestimonials([newTestimonial, ...testimonials]);
    setShowModal(false); // Closing the modal
    setFormData({ name: "", message: "", image: null });
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
        <div className="testimonial-modal fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
          <div className="bg-[var(--light-background)] rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-[var(--blue-text-color)]">
              Leave a testimonial
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              <textarea
                placeholder="Your message"
                value={formData.message}
                onChange={
                  (e) => setFormData({ ...formData, message: e.target.value }) // Make sure this updates the state properly
                }
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 border border-gray-300 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Add a photo of your pet
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files?.[0] })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
