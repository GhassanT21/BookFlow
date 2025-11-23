import { useParams } from "react-router-dom";
import { books } from "../data/Books";
import { useCart } from "../context/CartContext";

export default function BookDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const book = books.find((b) => String(b.id) === id);

  if (!book) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold">Book not found</h2>
        <p className="mt-2 text-gray-600">Please go back to the home page.</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-64 object-cover rounded shadow-sm"
      />
      <div>
        <h2 className="text-3xl font-bold text-slate-900">{book.title}</h2>
        <p className="text-gray-600 mt-1">by {book.author}</p>
        <p className="text-xs text-gray-500 mt-1">Category: {book.category}</p>
        <p className="mt-4 leading-relaxed text-sm text-slate-800">
          {book.description}
        </p>
        <p className="mt-4 text-indigo-600 font-bold text-xl">
          ${book.price.toFixed(2)}
        </p>
        <button
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
          onClick={() => addToCart(book)}
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}
