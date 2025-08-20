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
        </section>
      </div>
    </div>
  );
}
