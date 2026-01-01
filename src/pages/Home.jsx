import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { api } from "../api";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/books")
      .then((res) => {
        setBooks(res.data);
        setMessage("");
      })
      .catch(() => {
        setMessage("Error fetching books from backend");
      });
  }, []);

  const categories = ["All", ...new Set(books.map((b) => b.category))];

  const filteredBooks = books.filter((book) => {
    const text = searchText.toLowerCase();
    const matchText =
      book.title.toLowerCase().includes(text) ||
      book.author.toLowerCase().includes(text);
    const matchCategory = category === "All" || book.category === category;
    return matchText && matchCategory;
  });

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6 mb-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Discover books that match your flow
          </h1>
          <p className="text-gray-600 mt-3">
            BookFlow helps you explore a curated library of titles.
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-slate-700">
          <p className="font-semibold mb-1">How BookFlow works</p>
          <p>
            Search and filter, open a book, then add it to your cart.
          </p>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 border rounded bg-red-50 text-red-700 text-sm">
          {message}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar query={searchText} setQuery={setSearchText} />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2 md:w-48 text-sm"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500">
          No books match your search yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={{ ...book, price: Number(book.price) }} />
          ))}
        </div>
      )}
    </section>
  );
}
