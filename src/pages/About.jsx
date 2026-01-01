export default function About() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid gap-10 md:grid-cols-[2fr,1.3fr] items-start">
        <div>
          <h2 className="text-3xl font-bold mb-4">About BookFlow</h2>

          <p className="text-gray-700 mb-4">
            BookFlow is an online bookstore designed to make discovering and
            purchasing books simple and enjoyable. It brings together a curated
            catalog of titles across different categories, allowing readers to
            explore, learn, and shop with ease.
          </p>

          <p className="text-gray-700 mb-4">
            Whether you’re looking for programming resources, personal
            development books, or inspiring reads, BookFlow helps you find the
            right book quickly through a clean interface and intuitive browsing
            experience.
          </p>

          <p className="text-gray-700">
            The platform focuses on clarity, usability, and speed, ensuring that
            users can search, view book details, and manage their shopping cart
            without unnecessary complexity.
          </p>
        </div>

        <aside className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
          <h3 className="font-semibold text-slate-900 text-lg">
            Why choose BookFlow?
          </h3>

          <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
            <li>Carefully curated book catalog.</li>
            <li>Fast search and category-based browsing.</li>
            <li>Clear book details with pricing and descriptions.</li>
            <li>Simple and smooth shopping experience.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
