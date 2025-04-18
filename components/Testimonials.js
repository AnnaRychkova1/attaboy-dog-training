"use client";
import TestimonialCard from "./TestimonialCard";
import testimonials from "../testimonials.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testimonials() {
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
          <a className="anhor-link">
            <button className="anhor-btn">Write your testimonial</button>
          </a>
        </div>
      </section>
    </>
  );
}
