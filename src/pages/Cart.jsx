import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-600">You have no books in your cart yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="bg-white border rounded p-4 flex items-center gap-4"
          >
            <img
              src={item.cover}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="text-sm text-gray-600">{item.author}</p>
              <p className="text-indigo-600 font-bold">
                ${item.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="border px-2 rounded text-sm"
                onClick={() => updateQty(item.id, item.qty - 1)}
              >
                -
              </button>
              <span className="w-8 text-center text-sm">{item.qty}</span>
              <button
                className="border px-2 rounded text-sm"
                onClick={() => updateQty(item.id, item.qty + 1)}
              >
                +
              </button>
            </div>
            <button
              className="text-red-600 hover:underline text-xs"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg">
          <span className="font-semibold">Total:</span>{" "}
          <span className="text-indigo-600 font-bold">
            ${total.toFixed(2)}
          </span>
        </p>
        <div className="space-x-2">
          <button
            className="bg-gray-200 px-4 py-2 rounded text-sm"
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm">
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
