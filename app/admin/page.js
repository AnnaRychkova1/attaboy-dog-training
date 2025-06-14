"use client";

import { useState } from "react";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await res.json();
      if (result.success) {
        setAuthenticated(true);
      } else {
        alert("Incorrect password");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--light-background)] opacity-80">
        <div className="p-6 rounded-xl shadow-md space-y-4 w-80 my-4 bg-[var(--dark-background)]">
          <h2 className="text-xl font-semibold text-center text-[var(--bright-text-color)]">
            Admin Login
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-6"
            noValidate
          >
            <label htmlFor="admin-password" className="sr-only">
              Admin password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              placeholder="Enter admin password"
              className="w-full border px-3 py-2 rounded bg-[var(--white-text-color)] shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] text-[var(--blue-text-color)] placeholder:text-[var(--blue-text-color)] transition focus:outline-none hover:bg-[rgba(255,255,255,0.8)] focus:bg-[rgba(255,255,255,0.8)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
            <div className="h-10 flex justify-center items-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-[52px] bg-[var(--white-text-color)] text-[var(--blue-text-color)] text-lg font-bold rounded-full shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] transition hover:bg-[#cae4fa] focus:bg-[#cae4fa]"
              >
                {loading ? "Checking..." : "Enter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setAuthenticated(false)} />;
}
