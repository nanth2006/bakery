import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('sweet_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState('');

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('sweet_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  const addToCart = (product, quantity = 1) => {
    const qtyToAdd = Math.max(1, Number(quantity) || 1);
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + qtyToAdd }
            : item
        );
      }
      return [...prev, { ...product, qty: qtyToAdd }];
    });
    showToast(`✨ Added "${product.name}" (${qtyToAdd} ${product.unit || 'kg'}) to cart!`);
  };

  const updateQty = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, qty: newQty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const target = prev.find((item) => item._id === id);
      if (target) {
        showToast(`🗑️ Removed "${target.name}" from cart`);
      }
      return prev.filter((item) => item._id !== id);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('sweet_cart');
    } catch {}
  };

  const totalItems = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (Number(item.rate) || 0) * (Number(item.qty) || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalAmount,
        toastMessage,
        showToast,
      }}
    >
      {children}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4A1521] text-[#FDF8F0] border-2 border-[#E8A33D] px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce transition-all">
          <span className="text-xl">🍬</span>
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);