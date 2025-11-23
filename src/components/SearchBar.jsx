export default function SearchBar({ query, setQuery }) {
  return (
    <div className="flex gap-2 w-full">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title or author"
        className="flex-1 border rounded px-3 py-2 text-sm"
      />
    </div>
  );
}
