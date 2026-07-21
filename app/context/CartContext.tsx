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
  addToCart: (item: Omit<CartItem, 'quantity'>, restaurantId: string, restaurantName: string, force?: boolean) => boolean;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  currencySymbol: string;
  cartRestaurantId: string | null;
  cartRestaurantName: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [cartRestaurantId, setCartRestaurantId] = useState<string | null>(null);
  const [cartRestaurantName, setCartRestaurantName] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('resto_cart');
    const savedId = localStorage.getItem('resto_cart_restaurant_id');
    const savedName = localStorage.getItem('resto_cart_restaurant_name');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from localStorage', e);
      }
    }
    if (savedId) setCartRestaurantId(savedId);
    if (savedName) setCartRestaurantName(savedName);
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
      // If cart is empty, reset restaurant metadata
      setCartRestaurantId(null);
      setCartRestaurantName(null);
      localStorage.removeItem('resto_cart_restaurant_id');
      localStorage.removeItem('resto_cart_restaurant_name');
    }
  }, [cart]);

  // Sync restaurant state to localStorage separately
  useEffect(() => {
    if (cartRestaurantId) {
      localStorage.setItem('resto_cart_restaurant_id', cartRestaurantId);
    } else {
      localStorage.removeItem('resto_cart_restaurant_id');
    }
  }, [cartRestaurantId]);

  useEffect(() => {
    if (cartRestaurantName) {
      localStorage.setItem('resto_cart_restaurant_name', cartRestaurantName);
    } else {
      localStorage.removeItem('resto_cart_restaurant_name');
    }
  }, [cartRestaurantName]);

  // Utility to parse string price like "$14.99" or "Rs. 149" or "₹149" to number
  const parsePrice = (priceStr: string): number => {
    const numeric = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(numeric) ? 0 : numeric;
  };

  const addToCart = (
    newItem: Omit<CartItem, 'quantity'>,
    restaurantId: string,
    restaurantName: string,
    force: boolean = false
  ): boolean => {
    // Check if adding item from a different restaurant
    if (cart.length > 0 && cartRestaurantId && cartRestaurantId !== restaurantId) {
      if (force) {
        // Discard existing cart and start new
        setCart([{ ...newItem, quantity: 1 }]);
        setCartRestaurantId(restaurantId);
        setCartRestaurantName(restaurantName);
        return true;
      } else {
        // Report conflict to let UI prompt user
        return false;
      }
    }

    // Set restaurant metadata if cart was empty
    if (cart.length === 0) {
      setCartRestaurantId(restaurantId);
      setCartRestaurantName(restaurantName);
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });

    return true;
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((item) => item.id !== id);
      return updated;
    });
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
    setCartRestaurantId(null);
    setCartRestaurantName(null);
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
        cartRestaurantId,
        cartRestaurantName,
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
