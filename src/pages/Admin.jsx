import { useEffect, useMemo, useState } from "react";
import { adminHeaders, api, clearAdmin, getAdmin, setAdmin } from "../api";

export default function Admin() {
  const [admin, setAdminState] = useState(getAdmin());
  const [form, setForm] = useState({ username: "", password: "" });
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  const headers = useMemo(() => adminHeaders(), [admin]);

  function loadBooks() {
    api
      .get("/books")
      .then((res) => {
        setBooks(res.data);
        setMessage("");
      })
      .catch(() => setMessage("Error loading books"));
  }

  useEffect(() => {
    loadBooks();
  }, []);

  function onLogin(e) {
    e.preventDefault();
    setMessage("");
    api
      .post("/admin/login", { username: form.username, password: form.password })
      .then(() => {
        const a = { username: form.username, password: form.password };
        setAdmin(a);
        setAdminState(a);
        setForm({ username: "", password: "" });
      })
      .catch(() => setMessage("Invalid admin credentials"));
  }

  function logout() {
    clearAdmin();
    setAdminState(null);
    setMessage("");
  }

  const [bookForm, setBookForm] = useState({
    id: "",
    title: "",
    author: "",
    price: "",
    category: "",
    cover: "",
    description: "",
  });

  function pickBook(b) {
    setBookForm({
      id: String(b.id),
      title: b.title || "",
      author: b.author || "",
      price: String(b.price ?? ""),
      category: b.category || "",
      cover: b.cover || "",
      description: b.description || "",
    });
  }

  function clearBookForm() {
    setBookForm({
      id: "",
      title: "",
      author: "",
      price: "",
      category: "",
      cover: "",
      description: "",
    });
  }

  function onBookChange(e) {
    setBookForm({ ...bookForm, [e.target.name]: e.target.value });
  }

  function createBook(e) {
    e.preventDefault();
    setMessage("");
    api
      .post(
        "/books",
        {
          title: bookForm.title,
          author: bookForm.author,
          price: Number(bookForm.price),
          category: bookForm.category,
          cover: bookForm.cover,
          description: bookForm.description,
        },
        { headers }
      )
      .then(() => {
        clearBookForm();
        loadBooks();
      })
      .catch((err) => {
        const m = err?.response?.data?.message;
        setMessage(Array.isArray(m) ? m.join(", ") : "Create failed");
      });
  }

  function updateBook(e) {
    e.preventDefault();
    setMessage("");
    if (!bookForm.id) {
      setMessage("Select a book first");
      return;
    }
    api
      .put(
        `/books/${bookForm.id}`,
        {
          title: bookForm.title,
          author: bookForm.author,
          price: Number(bookForm.price),
          category: bookForm.category,
          cover: bookForm.cover,
          description: bookForm.description,
        },
        { headers }
      )
      .then(() => loadBooks())
      .catch(() => setMessage("Update failed"));
  }

  function deleteBook(id) {
    setMessage("");
    api
      .delete(`/books/${id}`, { headers })
      .then(() => {
        if (String(id) === bookForm.id) clearBookForm();
        loadBooks();
      })
      .catch(() => setMessage("Delete failed"));
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Admin</h2>

      {message && (
        <div className="mb-4 p-3 border rounded bg-red-50 text-red-700 text-sm">
          {message}
        </div>
      )}

      {!admin ? (
        <form onSubmit={onLogin} className="max-w-md bg-white border rounded p-5 space-y-3">
          <input
            name="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Admin username"
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Admin password"
            className="w-full border rounded px-3 py-2"
            required
          />
          <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Login as Admin
          </button>
        </form>
      ) : (
        <div className="flex items-center gap-3 mb-6">
          <div className="text-slate-700">Logged in as: {admin.username}</div>
          <button onClick={logout} className="border rounded px-3 py-1 text-sm hover:bg-slate-50">
            Logout
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <form
          onSubmit={bookForm.id ? updateBook : createBook}
          className="bg-white border rounded p-5 space-y-3"
        >
          <div className="text-sm text-gray-600">
            {bookForm.id ? `Editing book ID: ${bookForm.id}` : "Create new book"}
          </div>

          <input name="title" value={bookForm.title} onChange={onBookChange} placeholder="Title" className="w-full border rounded px-3 py-2" required />
          <input name="author" value={bookForm.author} onChange={onBookChange} placeholder="Author" className="w-full border rounded px-3 py-2" required />
          <input name="price" value={bookForm.price} onChange={onBookChange} placeholder="Price" className="w-full border rounded px-3 py-2" required />
          <input name="category" value={bookForm.category} onChange={onBookChange} placeholder="Category" className="w-full border rounded px-3 py-2" required />
          <input name="cover" value={bookForm.cover} onChange={onBookChange} placeholder="Cover URL" className="w-full border rounded px-3 py-2" required />
          <textarea name="description" value={bookForm.description} onChange={onBookChange} placeholder="Description" className="w-full border rounded px-3 py-2 h-28" required />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!admin}
              className={`px-4 py-2 rounded text-sm ${admin ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-200 text-gray-500"}`}
            >
              {bookForm.id ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={clearBookForm}
              className="bg-gray-200 px-4 py-2 rounded text-sm"
            >
              Clear
            </button>
          </div>

          {!admin && (
            <div className="text-sm text-gray-500">
              Login as admin to create/update/delete books.
            </div>
          )}
        </form>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Books</h3>
            <button onClick={loadBooks} className="border rounded px-3 py-1 text-sm hover:bg-slate-50">
              Refresh
            </button>
          </div>

          <div className="space-y-3">
            {books.map((b) => (
              <div key={b.id} className="bg-white border rounded p-4 flex gap-4">
                <img src={b.cover} alt={b.title} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">{b.title}</div>
                  <div className="text-sm text-gray-600">{b.author}</div>
                  <div className="text-sm text-indigo-600 font-bold">${Number(b.price).toFixed(2)}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => pickBook(b)}
                    className="border rounded px-3 py-1 text-sm hover:bg-slate-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBook(b.id)}
                    disabled={!admin}
                    className={`rounded px-3 py-1 text-sm ${admin ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-200 text-gray-500"}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {books.length === 0 && <div className="text-gray-600">No books.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
