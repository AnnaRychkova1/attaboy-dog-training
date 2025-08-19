"use client";

import { useEffect, useState } from "react";
import AdminTop from "./AdminTop";
import PendingTestimonialsList from "./PendingTestimonialsList";
import ApprovedTestimonialsList from "./ApprovedTestimonialsList";
import NewCustomersList from "./NewCustomersList";
import ContactedCustomersList from "./ContactedCustomersList";

export default function AdminDashboard({ onLogout }) {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    image: null,
    preview: "",
  });
  const [newContacts, setNewContacts] = useState([]);
  const [contactedContacts, setContactedContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setPending(data.filter((t) => !t.approved));
      setApproved(data.filter((t) => t.approved));
    }
    load();
  }, []);

  useEffect(() => {
    async function loadContacts() {
      const res = await fetch("/api/contacts");
      const data = await res.json();
      setNewContacts(data.filter((c) => !c.contacted));
      setContactedContacts(data.filter((c) => c.contacted));
    }
    loadContacts();
  }, []);

  const handleApprove = async (id) => {
    await fetch(`/api/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: true }),
    });

    const approvedItem = pending.find((t) => t.id === id);
    if (!approvedItem) return;

    setPending((prev) => prev.filter((t) => t.id !== id));
    setApproved((prev) => [approvedItem, ...prev]);
  };

  const handleMarkContacted = async (id) => {
    await fetch(`/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contacted: true }),
    });

    const contactedItem = newContacts.find((c) => c.id === id);
    if (!contactedItem) return;

    setNewContacts((prev) => prev.filter((c) => c.id !== id));
    setContactedContacts((prev) => [contactedItem, ...prev]);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setPending((prev) => prev.filter((t) => t.id !== id));
    setApproved((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDeleteContact = async (id) => {
    await fetch(`/api/contacts/${id}`, { method: "DELETE" });

    setContactedContacts((prev) => prev.filter((c) => c.id !== id));
    setNewContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      message: testimonial.message,
      image: null,
      preview: testimonial.image,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleEditContact = (contact) => {
    setEditingContactId(contact.id);
    setContactFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || "",
      location: contact.location || "",
      message: contact.message || "",
    });
  };

  const handleSave = async (id) => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("message", formData.message);
    if (formData.image) form.append("image", formData.image);

    await fetch(`/api/testimonials/${id}`, {
      method: "PUT",
      body: form,
    });

    const updated = {
      id,
      name: formData.name,
      message: formData.message,
      image: formData.preview,
      approved: pending.some((t) => t.id === id) ? false : true,
    };

    setPending((prev) => prev.map((t) => (t.id === id ? updated : t)));
    setApproved((prev) => prev.map((t) => (t.id === id ? updated : t)));
    setEditingId(null);
  };

  const handleSaveContact = async (id) => {
    await fetch(`/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactFormData),
    });

    const updatedContact = { ...contactFormData, id };

    setNewContacts((prev) =>
      prev.map((c) => (c.id === id ? updatedContact : c))
    );
    setContactedContacts((prev) =>
      prev.map((c) => (c.id === id ? updatedContact : c))
    );
    setEditingContactId(null);
  };

  return (
    <div className="p-6 space-y-12 max-w-7xl mx-auto relative">
      <AdminTop onLogout={onLogout} />
      <div className="admin-dashboard">
        <section className="admin-testimonials">
          <h3 className="text-2xl font-semibold mb-4 text-center admin-title">
            Testimonials
          </h3>

          <PendingTestimonialsList
            pending={pending}
            editingId={editingId}
            formData={formData}
            setFormData={setFormData}
            handleApprove={handleApprove}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleSave={handleSave}
            handleImageChange={handleImageChange}
            setEditingId={setEditingId}
          />

          <ApprovedTestimonialsList
            approved={approved}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            editingId={editingId}
            formData={formData}
            setFormData={setFormData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleSave={handleSave}
            handleImageChange={handleImageChange}
            setEditingId={setEditingId}
          />
        </section>
        <section className="admin-customers">
          <h3 className="text-2xl font-semibold mb-4 text-center admin-title">
            Customers
          </h3>
          <NewCustomersList
            newContacts={newContacts}
            editingContactId={editingContactId}
            contactFormData={contactFormData}
            setContactFormData={setContactFormData}
            handleSaveContact={handleSaveContact}
            setEditingContactId={setEditingContactId}
            handleMarkContacted={handleMarkContacted}
            handleEditContact={handleEditContact}
            handleDeleteContact={handleDeleteContact}
          />
          <ContactedCustomersList
            contactedContacts={contactedContacts}
            editingContactId={editingContactId}
            contactFormData={contactFormData}
            setContactFormData={setContactFormData}
            handleSaveContact={handleSaveContact}
            setEditingContactId={setEditingContactId}
            handleEditContact={handleEditContact}
            handleDeleteContact={handleDeleteContact}
            isNew={isNew}
            setIsNew={setIsNew}
          />
          {/* <div>
            <div className="flex flex-col items-center justify-center my-4">
              <button
                onClick={() => setIsNew((prev) => !prev)}
                className="admin-show-btn"
              >
                {isNew
                  ? "Hide Contacted Customers"
                  : "Show Contacted Customers"}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d={isNew ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
            {isNew && (
              <div>
                <h4 className="text-xl font-semibold my-4 text-center">
                  Contacted Customers
                </h4>
                <div className="grid gap-4">
                  {contactedContacts.length === 0 && (
                    <p className="text-white mb-3 mx-3 text-center">
                      No contacted customers yet.
                    </p>
                  )}
                  {contactedContacts.map((c) => (
                    <div
                      key={c.id}
                      className="border rounded-xl p-8 shadow-md admin-list-card"
                    >
                      {editingContactId === c.id ? (
                        <ContactEditForm
                          formData={contactFormData}
                          setFormData={setContactFormData}
                          onSave={() => handleSaveContact(c.id)}
                          onCancel={() => setEditingContactId(null)}
                        />
                      ) : (
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-xl text-[var(--accent-color)]">
                              {c.name}
                            </p>
                            <p className="text-gray-500 text-md">{c.email}</p>
                            <p className="text-gray-500 text-md">{c.phone}</p>
                            <p className="text-gray-500 text-md">
                              {c.location}
                            </p>
                            {editingContactId === c.id && (
                              <p className="text-gray-700">{c.message}</p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 items-end justify-center">
                            <button
                              onClick={() => handleEditContact(c)}
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
                              onClick={() => handleDeleteContact(c.id)}
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
                        </div>
                      )}
                      {editingContactId === c.id || (
                        <div className="mt-2 admin-message">
                          <p className="text-[var(--blue-text-color)] text-xl mb-2">
                            Customer&apos;s Message:
                          </p>
                          <p className="text-gray-700">{c.message}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div> */}
        </section>
      </div>
    </div>
  );
}
