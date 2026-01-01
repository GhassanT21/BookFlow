import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-blue-600 font-bold">${book.price.toFixed(2)}</span>
          <Link
            to={`/book/${book.id}`}
            className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}