export default function Features() {
  const features = [
    {
      title: "Curated Book Catalog",
      description:
        "Browse a focused selection of books across multiple categories, chosen to provide value and relevance.",
      icon: "📚",
    },
    {
      title: "Smart Search",
      description:
        "Quickly find books by title or author using a responsive and easy-to-use search experience.",
      icon: "🔍",
    },
    {
      title: "Detailed Book Pages",
      description:
        "View complete information for each book, including descriptions, pricing, and category details.",
      icon: "📖",
    },
    {
      title: "Shopping Cart",
      description:
        "Add books to your cart, adjust quantities, and view your total before checkout.",
      icon: "🛒",
    },
    {
      title: "Clean & Responsive Design",
      description:
        "Enjoy a modern interface that works smoothly on desktop, tablet, and mobile devices.",
      icon: "✨",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8 max-w-2xl">
        <h2 className="text-3xl font-bold mb-2">Features</h2>
        <p className="text-gray-600">
          BookFlow provides everything you need to explore and purchase books in
          a simple, user-friendly environment.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex gap-4"
          >
            <div className="text-2xl">{feature.icon}</div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
