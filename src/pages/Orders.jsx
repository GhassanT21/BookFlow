import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  function load() {
    if (!user?.id) return;
    setLoading(true);
    setMessage("");

    api
      .get(`/orders/user/${user.id}`)
      .then((res) => setOrders(res.data || []))
      .catch(() => setMessage("Failed to load orders"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, [user?.id]);

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">My Orders</h2>
        <button
          onClick={load}
          className="border rounded px-3 py-1 text-sm hover:bg-white"
        >
          Refresh
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded border bg-red-50 text-red-700 text-sm">
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white border rounded p-5 text-gray-600">
          You don’t have any orders yet.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="bg-white border rounded p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">
                    Order #{o.id}
                  </div>
                  <div className="text-sm text-gray-600">
                    User ID: {o.userID}
                  </div>
                </div>
                <div className="text-indigo-600 font-bold">
                  ${Number(o.total).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
