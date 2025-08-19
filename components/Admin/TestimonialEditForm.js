"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function TestimonialEditForm({
  formData,
  setFormData,
  handleImageChange,
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
          Editing Testimonial
        </legend>

        {/* Name field */}
        <div className="flex flex-col">
          <label htmlFor="customer-name" className="text-gray-700 mb-2">
            Customer&apos;s Name
          </label>
          <input
            id="customer-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-2 py-1 border rounded transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] border-[var(--dark-background)] bg-transparent hover:bg-[rgba(202,228,250,0.15)] hover:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] focus:bg-transparent focus:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] outline-none"
            required
          />
        </div>

        {/* Message field */}
        <div className="flex flex-col">
          <label htmlFor="customer-message" className="text-gray-700 mb-2">
            Customer&apos;s Testimonial
          </label>
          <textarea
            id="customer-message"
            name="message"
            ref={ref}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            rows={1}
            className="w-full px-2 py-1 border rounded transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] border-[var(--dark-background)] bg-transparent hover:bg-[rgba(202,228,250,0.15)] hover:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] focus:bg-transparent focus:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] outline-none overflow-hidden resize-none"
            required
          />
        </div>

        {/* Image upload */}
        <div className="flex flex-col">
          <label htmlFor="image-upload" className="text-gray-700 mb-2">
            Upload New Image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer w-full px-2 py-1 border rounded transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] border-[var(--dark-background)] bg-transparent hover:bg-[rgba(202,228,250,0.15)] hover:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] focus:bg-transparent focus:shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] outline-none file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-blue-100 file:text-[var(--blue-text-color)] hover:file:bg-blue-200 file:cursor-pointer"
          />
          {formData.preview && (
            <Image
              src={formData.preview}
              alt="Preview of uploaded image"
              width={300}
              height={300}
              className="w-20 h-20 rounded-full object-cover mt-3"
            />
          )}
        </div>
      </fieldset>

      {/* Action buttons */}
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
