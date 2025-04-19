"use client";

import { useState } from "react";

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

    if ((name === "name" || name === "phone") && trimmedValue === "") {
      const message =
        name === "phone" ? errorMessages.phone.required : errorMessages[name];
      setErrors((prev) => ({
        ...prev,
        [name]: message,
      }));
      return false;
    }

    if (
      name === "email" &&
      trimmedValue !== "" &&
      !validations.email(trimmedValue)
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: errorMessages.email,
      }));
      return false;
    }

    if (
      name === "phone" &&
      trimmedValue !== "" &&
      !validations.phone(trimmedValue)
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: errorMessages.phone.invalid,
      }));
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
      const res = await fetch("/api/send-email", {
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

  return (
    <section id="contacts">
      <div className="container">
        <h2 className="contact-title">Contact</h2>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="field-container relative">
            <label htmlFor="name">
              Name<span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className={`input w-full ${errors.name ? "invalid" : ""}`}
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.name && (
              <p className="absolute bottom-[-20px] left-0 text-red-500 text-base">
                {errors.name}
              </p>
            )}
          </div>
          <div className="field-container relative">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className={`input w-full ${errors.email ? "invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && (
              <p className="absolute bottom-[-20px] left-0 text-red-500 text-base">
                {errors.email}
              </p>
            )}
          </div>
          <div className="field-container relative">
            <label htmlFor="phone">
              Phone number<span className="text-red-500"> *</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              className={`input w-full ${errors.phone ? "invalid" : ""}`}
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.phone && (
              <p className="absolute bottom-[-20px] left-0 text-red-500 text-base">
                {errors.phone}
              </p>
            )}
          </div>
          <div className="field-container">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="input w-full"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="field-container">
            <label htmlFor="message">How can I help?</label>
            <textarea
              name="message"
              placeholder="Your message"
              className="input w-full min-h-[120px]"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <a className="anhor-link h-10">
            <button type="submit" className="anhor-btn">
              Send
            </button>
          </a>
        </form>

        {/* Modal */}
        {showModal && (
          <div className="submit-modal fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
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
