"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function PasswordResetRequestForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) setMessage(error.message);
    else setMessage("Password reset email sent! Check your inbox.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
        type="email"
        required
      />
      <button type="submit">Send Reset Email</button>
      {message && <p>{message}</p>}
    </form>
  );
} 