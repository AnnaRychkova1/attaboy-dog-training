"use client";

import { useState, useEffect } from "react";
import AdminDashboard from "@/components/Admin/AdminDashboard";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/check");
        const data = await res.json();
        if (data.authenticated) setAuthenticated(true);
      } catch (err) {
        console.error("Auth check error:", err);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setAuthenticated(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = await res.json();
      if (result.success) {
        setAuthenticated(true);
      } else {
        setError("Incorrect password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong, try again");
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
            <div className="relative mb-8">
              {" "}
              <label htmlFor="admin-password" className="sr-only">
                Admin password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                placeholder="Enter admin password"
                className={`w-full px-3 py-2 rounded bg-[var(--white-text-color)] shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] text-[var(--blue-text-color)] placeholder:text-[var(--blue-text-color)] transition focus:outline-none hover:bg-[rgba(255,255,255,0.8)] focus:bg-[rgba(255,255,255,0.8)] ${
                  error ? "border-2 border-red-500" : "border border-gray-300"
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                required
                aria-required="true"
              />
              {error && (
                <p className="absolute bottom-[-24px] left-0 text-red-500 text-md">
                  {error}
                </p>
              )}
            </div>
            <div className="m-0 flex justify-center items-center overflow-hidden h-10 md:h-[36px] md:mt-0">
              <button
                type="submit"
                disabled={loading}
                className="h-[100px] bg-[var(--white-text-color)] text-[var(--blue-text-color)] text-[18px] font-bold rounded-full cursor-pointer  shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] z-30 m-0 px-3 transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] md:text-[20px]  md:rounded-[200px] md:px-6 hover:bg-[#cae4fa] focus:bg-[#cae4fa] active:bg-[#cae4fa] focus-visible:bg-[#cae4fa]"
              >
                {loading ? "Checking..." : "Enter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
