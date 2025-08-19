"use client";

import Image from "next/image";
import TestimonialEditForm from "./TestimonialEditForm";

export default function PendingTestimonialsList({
  pending,
  editingId,
  formData,
  setFormData,
  handleApprove,
  handleEdit,
  handleDelete,
  handleSave,
  handleImageChange,
  setEditingId,
}) {
  return (
    <div>
      <h4 className="text-xl font-semibold my-4 text-center">
        Pending Testimonials
      </h4>
      <div className="grid gap-4">
        {pending.length === 0 && (
          <p className="text-white mb-3 text-center">No new testimonials.</p>
        )}
        {pending.map((t) => (
          <div
            key={t.id}
            className="border rounded-xl p-8 shadow-md admin-list-card"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                {editingId === t.id || (
                  <>
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={300}
                      height={300}
                      className="w-20 h-20 rounded-full object-cover"
                      loading="lazy"
                    />
                    <p className="font-semibold text-xl text-center mt-8 text-[var(--accent-color)]">
                      {t.name}
                    </p>
                  </>
                )}
                {editingId === t.id || (
                  <div className="flex flex-col items-center justify-between gap-2">
                    <button
                      onClick={() => handleApprove(t.id)}
                      className="px-3 py-1 rounded approve-btn"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleEdit(t)}
                      className=" px-3 py-1 rounded edit-btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M9.9165 1.74997C10.0697 1.59676 10.2516 1.47523 10.4518 1.39232C10.652 1.3094 10.8665 1.26672 11.0832 1.26672C11.2998 1.26672 11.5144 1.3094 11.7146 1.39232C11.9147 1.47523 12.0966 1.59676 12.2498 1.74997C12.403 1.90318 12.5246 2.08507 12.6075 2.28524C12.6904 2.48542 12.7331 2.69997 12.7331 2.91664C12.7331 3.13331 12.6904 3.34786 12.6075 3.54803C12.5246 3.74821 12.403 3.9301 12.2498 4.08331L4.37484 11.9583L1.1665 12.8333L2.0415 9.62497L9.9165 1.74997Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="px-3 py-1 rounded delete-btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M5.25 1.75H8.75" />
                        <path d="M1.75 3.5H12.25M11.0833 3.5L10.6742 9.63625C10.6129 10.5569 10.5822 11.0172 10.3833 11.3663C10.2083 11.6735 9.94422 11.9206 9.62597 12.0748C9.26448 12.25 8.80314 12.25 7.88045 12.25H6.11955C5.19686 12.25 4.73552 12.25 4.37403 12.0748C4.05577 11.9206 3.79172 11.6735 3.61666 11.3663C3.41781 11.0172 3.38713 10.5569 3.32575 9.63625L2.91667 3.5" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              {editingId === t.id || (
                <>
                  <div className="mt-2 admin-message">
                    <p className="text-[var(--blue-text-color)] text-xl mb-2">
                      Customer&apos;s Testimonial:
                    </p>
                    <p className="text-gray-700">{t.message}</p>
                  </div>
                </>
              )}
            </div>
            {editingId === t.id && (
              <TestimonialEditForm
                formData={formData}
                setFormData={setFormData}
                handleImageChange={handleImageChange}
                onSave={() => handleSave(t.id)}
                onCancel={() => setEditingId(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
