import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api } from "../api";

export default function BookDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get(`/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setMessage("");
      })
      .catch(() => setMessage("Book not found"));
  }, [id]);

  if (message) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold">Book not found</h2>
        <p className="mt-2 text-gray-600">{message}</p>
      </section>
    );
  }

  if (!book) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-gray-600">Loading...</p>
      </section>
    );
  }

  const normalized = { ...book, price: Number(book.price) };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
      <img
        src={normalized.cover}
        alt={normalized.title}
        className="w-full h-64 object-cover rounded shadow-sm"
      />
      <div>
        <h2 className="text-3xl font-bold text-slate-900">{normalized.title}</h2>
        <p className="text-gray-600 mt-1">by {normalized.author}</p>
        <p className="text-xs text-gray-500 mt-1">Category: {normalized.category}</p>
        <p className="mt-4 leading-relaxed text-sm text-slate-800">
          {normalized.description}
        </p>
        <p className="mt-4 text-indigo-600 font-bold text-xl">
          ${normalized.price.toFixed(2)}
        </p>
        <button
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
          onClick={() => addToCart(normalized)}
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}
