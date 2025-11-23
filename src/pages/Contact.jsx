import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true); // Simulate submit
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      {!sent ? (
        <form onSubmit={onSubmit} className="space-y-4">
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Send
          </button>
        </form>
      ) : (
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          Thanks! We’ve received your message.
        </div>
      )}
    </section>
  );
}