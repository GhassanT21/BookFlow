export default function Features() {
  const features = [
    {
      title: "Responsive Design",
      subtitle: "Looks good on any screen",
      description:
        "Mobile-first layout that adapts smoothly to phones, tablets, and desktops.",
      tag: "UI/UX",
      icon: "📱",
    },
    {
      title: "Smart Search & Filter",
      subtitle: "Find books quickly",
      description:
        "Search by title or author and filter by category to focus on what you need.",
      tag: "Usability",
      icon: "🔍",
    },
    {
      title: "Dynamic Book Pages",
      subtitle: "Details per book",
      description:
        "Each book has its own details page with description, price, and actions.",
      tag: "Routing",
      icon: "📚",
    },
    {
      title: "Cart Management",
      subtitle: "Simple checkout flow",
      description:
        "Add, remove, and update quantities while seeing the total in real time.",
      tag: "State",
      icon: "🛒",
    },
    {
      title: "Clean Architecture",
      subtitle: "Easy to extend later",
      description:
        "Pages, components, context, and data are separated for clarity and reuse.",
      tag: "Code quality",
      icon: "🧩",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8 max-w-2xl">
        <h2 className="text-3xl font-bold mb-2">Features</h2>
        <p className="text-gray-600 text-sm md:text-base">
          BookFlow is designed as a small but complete front-end bookstore:
          responsive layout, dynamic routing, and a simple cart workflow.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex gap-4"
          >
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl">
              {feature.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-slate-900">
                  {feature.title}
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 uppercase tracking-wide">
                  {feature.tag}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{feature.subtitle}</p>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
