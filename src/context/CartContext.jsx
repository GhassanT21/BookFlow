import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addToCart(book) {
    setItems((current) => {
      const index = current.findIndex((item) => item.id === book.id);
      if (index === -1) {
        return [...current, { ...book, qty: 1 }];
      }
      const copy = [...current];
      copy[index] = { ...copy[index], qty: copy[index].qty + 1 };
      return copy;
    });
  }

  function removeFromCart(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function updateQty(id, qty) {
    setItems((current) => {
      if (qty <= 0) {
        return current.filter((item) => item.id !== id);
      }
      return current.map((item) =>
        item.id === id ? { ...item, qty } : item
      );
    });
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
