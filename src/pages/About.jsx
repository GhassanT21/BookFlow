export default function About() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid gap-10 md:grid-cols-[2fr,1.3fr] items-start">
        <div>
          <h2 className="text-3xl font-bold mb-4">About BookFlow</h2>
          <p className="text-gray-700 mb-3">
            BookFlow is a lightweight online bookstore frontend built with React and
            Tailwind CSS. It focuses on the core experience of browsing a small
            curated catalog, checking book details, and managing a simple cart.
          </p>
          <p className="text-gray-700 mb-5">
            The goal of this project is to practice modern frontend patterns:
            component-based design, client-side routing, shared state with context,
            and responsive layouts that work on both mobile and desktop.
          </p>

          <ul className="space-y-2 text-sm text-gray-800">
            <li>
              <span className="font-semibold text-indigo-600">Student-friendly:</span>{" "}
              the app is small on purpose, so each part of the codebase is easy to
              read and extend.
            </li>
            <li>
              <span className="font-semibold text-indigo-600">Realistic flow:</span>{" "}
              users can search, filter by category, open a book, and add it to
              their cart in a way similar to real e-commerce sites.
            </li>
            <li>
              <span className="font-semibold text-indigo-600">Clean structure:</span>{" "}
              pages, reusable components, context, and data are separated into their
              own folders.
            </li>
          </ul>
        </div>

        <aside className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 text-sm space-y-4">
          <h3 className="font-semibold text-slate-900 text-lg">
            What this project demonstrates
          </h3>
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            <li>Single Page Application using React Router.</li>
            <li>Global cart state managed with the Context API.</li>
            <li>Responsive UI built with Tailwind utility classes.</li>
            <li>Version control and deployment through GitHub.</li>
          </ul>

          <div className="grid grid-cols-2 gap-4 pt-2 text-center">
            <div className="rounded-lg bg-indigo-50 py-3">
              <p className="text-xs uppercase tracking-wide text-indigo-600">
                Pages
              </p>
              <p className="text-xl font-semibold text-slate-900">6</p>
            </div>
            <div className="rounded-lg bg-slate-50 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Demo books
              </p>
              <p className="text-xl font-semibold text-slate-900">5</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
