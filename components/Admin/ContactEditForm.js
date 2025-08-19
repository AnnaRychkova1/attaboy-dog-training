"use client";

import { useEffect, useRef } from "react";

export default function ContactEditForm({
  formData,
  setFormData,
  onSave,
  onCancel,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [formData.message]);
  return (
    <form
      className="space-y-4 text-gray-500"
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      <fieldset className="space-y-4">
        <legend className="text-[var(--accent-color)] text-xl font-semibold">
          Editing
        </legend>

        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="edit-name" className="sr-only">
            Name
          </label>
          <input
            id="edit-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-2 py-1 border rounded transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] border-[var(--dark-background)] bg-transparent hover:bg-[rgba(202,228,250,0.15)] hover:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] focus:bg-transparent focus:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] outline-none"
            placeholder="Name"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="edit-email" className="sr-only">
            Email
          </label>
          <input
            id="edit-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-2 py-1 border rounded transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] border-[var(--dark-background)] bg-transparent hover:bg-[rgba(202,228,250,0.15)] hover:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] focus:bg-transparent focus:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] outline-none"
            placeholder="Email"
            required
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="edit-phone" className="sr-only">
            Phone
          </label>
          <input
            id="edit-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-2 py-1 border rounded transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] border-[var(--dark-background)] bg-transparent hover:bg-[rgba(202,228,250,0.15)] hover:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] focus:bg-transparent focus:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] outline-none"
            placeholder="Phone"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label htmlFor="edit-location" className="sr-only">
            Location
          </label>
          <input
            id="edit-location"
            name="location"
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full px-2 py-1 border rounded transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] border-[var(--dark-background)] bg-transparent hover:bg-[rgba(202,228,250,0.15)] hover:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] focus:bg-transparent focus:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] outline-none"
            placeholder="Location"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="edit-message" className="text-gray-700 mb-2">
            Customer&apos;s Message
          </label>
          <textarea
            id="edit-message"
            name="message"
            ref={ref}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Message"
            rows={1}
            className="w-full px-2 py-1 border rounded transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] border-[var(--dark-background)] bg-transparent hover:bg-[rgba(202,228,250,0.15)] hover:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] focus:bg-transparent focus:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] outline-none overflow-hidden resize-none"
          />
        </div>
      </fieldset>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-[var(--dark-background)] text-[var(--bright-text-color)] px-4 py-1 rounded transition-all duration-300 ease-in-out hover:opacity-80 hover:shadow-lg"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1 transition-all duration-300 ease-in-out hover:opacity-80 hover:text-black"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
