"use client";

import { useRef, useState, useEffect } from "react";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validations = {
    name: (value) => value.trim() !== "",
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value) => /^\+?\d{10,15}$/.test(value),
    location: (value) => true,
    message: (value) => value.trim() !== "",
  };

  const errorMessages = {
    name: "Name is required.",
    email: "Enter a valid email address.",
    phone: {
      required: "Phone number is required.",
      invalid: "Enter a valid phone number.",
    },
    message: "Message is required.",
  };

  const validateField = (name, value) => {
    const trimmedValue = value.trim();

    if (name === "name" && trimmedValue === "") {
      setErrors((prev) => ({ ...prev, [name]: errorMessages.name }));
      return false;
    }

    if (name === "email") {
      if (trimmedValue === "") {
        setErrors((prev) => ({ ...prev, [name]: "Email is required." }));
        return false;
      } else if (!validations.email(trimmedValue)) {
        setErrors((prev) => ({ ...prev, [name]: errorMessages.email }));
        return false;
      }
    }

    if (name === "phone") {
      if (trimmedValue === "") {
        setErrors((prev) => ({
          ...prev,
          [name]: errorMessages.phone.required,
        }));
        return false;
      } else if (!validations.phone(trimmedValue)) {
        setErrors((prev) => ({ ...prev, [name]: errorMessages.phone.invalid }));
        return false;
      }
    }

    if (name === "message" && trimmedValue === "") {
      setErrors((prev) => ({ ...prev, [name]: errorMessages.message }));
      return false;
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldValidations = Object.keys(validations).map((field) =>
      validateField(field, formData[field])
    );

    const isFormValid = fieldValidations.every(Boolean);
    if (!isFormValid) return;

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "",
          message: "",
        });
      } else {
        setSubmitted(false);
      }

      setShowModal(true);
    } catch (error) {
      setSubmitted(false);
      setShowModal(true);
      console.error("Error sending message:", error);
    }
  };

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [formData.message]);

  return (
    <section id="contacts">
      <div className="container">
        <h2 className="contact-title">Contact</h2>
        <form onSubmit={handleSubmit} noValidate className="form">
          {/* Name Field */}
          <div className="relative field-container">
            <label htmlFor="name" className="text-2xl label-shadow">
              Name<span className="text-red-500"> *</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className={`input w-full ${errors.name ? "invalid" : ""}`}
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.name && (
              <p className="absolute bottom-[-24px] left-0 text-red-500 text-lg">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="field-container relative">
            <label htmlFor="email" className="text-2xl label-shadow">
              Email<span className="text-red-500"> *</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              className={`input w-full ${errors.email ? "invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.email && (
              <p className="absolute bottom-[-24px] left-0 text-red-500 text-lg">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="field-container relative">
            <label htmlFor="phone" className="text-2xl label-shadow">
              Phone number<span className="text-red-500"> *</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone number"
              className={`input w-full ${errors.phone ? "invalid" : ""}`}
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.phone && (
              <p className="absolute bottom-[-24px] left-0 text-red-500 text-lg">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Location Field */}
          <div className="field-container">
            <label htmlFor="location" className="text-2xl label-shadow">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Location"
              className="input w-full mt-1"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Message Field */}
          <div className="field-container">
            <label htmlFor="message" className="text-2xl label-shadow">
              How can I help?
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message"
              className="input w-full min-h-[120px] mt-1 overflow-hidden resize-none"
              ref={ref}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <a className="anhor-link h-10">
            <button type="submit" className="anhor-btn">
              Send
            </button>
          </a>
        </form>

        {/* Modal */}
        {showModal && (
          <div
            className="submit-modal fixed inset-0 flex items-center justify-center bg-opacity-50 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowModal(false);
              }
            }}
          >
            <div className="bg-[var(--light-background)] rounded-xl p-6 max-w-sm w-full text-center shadow-xl">
              <p
                className={`text-xl font-bold ${
                  submitted
                    ? "text-[var(--blue-text-color)]"
                    : "text-[var(--accent-color)]"
                }`}
              >
                {submitted
                  ? "Message sent successfully!"
                  : "Oops! Something went wrong. Please try again later."}
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
