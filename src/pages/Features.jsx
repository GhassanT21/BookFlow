export default function Features() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Features</h2>
      <ul className="space-y-4">
        <li>
          <span className="font-semibold">Responsive Design:</span> Mobile-first layout
          optimized for phones, tablets, and desktops.
        </li>
        <li>
          <span className="font-semibold">Smart Search & Filter:</span> Find books by title,
          author, or category.
        </li>
        <li>
          <span className="font-semibold">Dynamic Book Pages:</span> Each book has its own
          details page with actions.
        </li>
        <li>
          <span className="font-semibold">Cart Management:</span> Add, remove, update quantities,
          and view totals.
        </li>
        <li>
          <span className="font-semibold">Clean Architecture:</span> Components, context, and data
          separated for clarity.
        </li>
      </ul>
    </section>
  );
}