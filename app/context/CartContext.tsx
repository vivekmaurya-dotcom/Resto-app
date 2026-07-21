'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: string; // Price as represented in UI, e.g., "$14.99" or "Rs. 149"
  quantity: number;
  image: string;
  desc: string;
  category: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  currencySymbol: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState('$');

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('resto_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage on change and compute primary currency symbol
  useEffect(() => {
    localStorage.setItem('resto_cart', JSON.stringify(cart));
    
    if (cart.length > 0) {
      // Find currency symbol of the first item (e.g. '$' or 'Rs.')
      const match = cart[0].price.match(/^([^0-9\s.]+)/);
      if (match) {
        setCurrencySymbol(match[1].trim());
      }
    } else {
      setCurrencySymbol('$');
    }
  }, [cart]);

  // Utility to parse string price like "$14.99" or "Rs. 149" to number
  const parsePrice = (priceStr: string): number => {
    const numeric = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(numeric) ? 0 : numeric;
  };

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce((total, item) => {
    const itemPrice = parsePrice(item.price);
    return total + itemPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        currencySymbol,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
