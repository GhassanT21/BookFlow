import { useState } from "react";
import { api } from "../api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ sent: false, error: "" });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    setStatus({ sent: false, error: "" });

    api
      .post("/contact", form)
      .then(() => {
        setStatus({ sent: true, error: "" });
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        const m = err?.response?.data?.message;
        setStatus({
          sent: false,
          error: Array.isArray(m) ? m.join(", ") : "Failed to send message",
        });
      });
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
      <p className="text-gray-600 mb-4">
        Have a question or suggestion? Send us a message and we’ll get back to you.
      </p>

      {status.error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
          {status.error}
        </div>
      )}

      {status.sent && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-700">
          Thanks! Your message was sent successfully.
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4 bg-white border rounded p-5">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Your name"
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          placeholder="Message"
          className="w-full border rounded px-3 py-2 h-32"
          required
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Send
        </button>
      </form>
    </section>
  );
}
