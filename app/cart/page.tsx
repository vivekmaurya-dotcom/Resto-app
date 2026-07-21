'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    currencySymbol,
    cartRestaurantId,
    cartRestaurantName,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'validating' | 'cooking' | 'delivery' | 'completed'>('idle');
  const [activeOrderId, setActiveOrderId] = useState<string>('');
  const [isSandboxSimulate, setIsSandboxSimulate] = useState<boolean>(true); // Defaults to simulation mode for testing convenience

  // Address and payment states for professional feel
  const [deliveryAddress, setDeliveryAddress] = useState('456 Gourmet Boulevard, Foodville, CA 90210');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Load customer profile from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('resto_customer_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.address) setDeliveryAddress(parsed.address);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Simulate checkout process and save order
  const startCheckout = () => {
    if (cart.length === 0) return;
    const orderId = `RA-${Math.floor(100000 + Math.random() * 900000)}`;
    setActiveOrderId(orderId);
    setCheckoutStep('validating');

    const newOrder = {
      id: orderId,
      restaurantId: cartRestaurantId,
      restaurantName: cartRestaurantName,
      timestamp: new Date().toISOString(),
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category,
      })),
      subtotal: cartSubtotal,
      tax: tax,
      deliveryFee: deliveryFee,
      total: total,
      status: 'pending', // pending, preparing, delivering, completed
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment',
      address: deliveryAddress
    };

    try {
      const stored = localStorage.getItem('resto_orders');
      const orders = stored ? JSON.parse(stored) : [];
      localStorage.setItem('resto_orders', JSON.stringify([newOrder, ...orders]));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error('Error saving order:', err);
    }
  };

  // Sync state with localstorage to support LIVE updates from the partner dashboard
  useEffect(() => {
    if (checkoutStep === 'idle' || !activeOrderId) return;

    const syncWithDb = () => {
      try {
        const stored = localStorage.getItem('resto_orders');
        if (!stored) return;
        const orders = JSON.parse(stored);
        const activeOrder = orders.find((o: any) => o.id === activeOrderId);
        
        if (activeOrder) {
          const status = activeOrder.status;
          if (status === 'pending') {
            setCheckoutStep('validating');
          } else if (status === 'preparing') {
            setCheckoutStep('cooking');
          } else if (status === 'delivering') {
            setCheckoutStep('delivery');
          } else if (status === 'completed') {
            setCheckoutStep('completed');
            clearCart(); // Clear cart state once order is successfully completed
          }
        }
      } catch (err) {
        console.error('Failed sync', err);
      }
    };

    // Listen for storage changes
    window.addEventListener('storage', syncWithDb);
    const interval = setInterval(syncWithDb, 1000); // Poll every 1s for fast live sync

    return () => {
      window.removeEventListener('storage', syncWithDb);
      clearInterval(interval);
    };
  }, [checkoutStep, activeOrderId, clearCart]);

  // Sandbox simulation timer (optional convenience)
  useEffect(() => {
    if (!isSandboxSimulate || checkoutStep === 'idle' || checkoutStep === 'completed') return;

    const updateOrderStatus = (status: string) => {
      try {
        const stored = localStorage.getItem('resto_orders');
        if (!stored || !activeOrderId) return;
        const orders = JSON.parse(stored);
        const updated = orders.map((o: any) => o.id === activeOrderId ? { ...o, status } : o);
        localStorage.setItem('resto_orders', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
      } catch (err) {
        console.error('Error updating order status in simulation:', err);
      }
    };

    if (checkoutStep === 'validating') {
      const timer = setTimeout(() => {
        setCheckoutStep('cooking');
        updateOrderStatus('preparing');
      }, 3000);
      return () => clearTimeout(timer);
    } else if (checkoutStep === 'cooking') {
      const timer = setTimeout(() => {
        setCheckoutStep('delivery');
        updateOrderStatus('delivering');
      }, 5000);
      return () => clearTimeout(timer);
    } else if (checkoutStep === 'delivery') {
      const timer = setTimeout(() => {
        setCheckoutStep('completed');
        updateOrderStatus('completed');
        clearCart();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [checkoutStep, activeOrderId, isSandboxSimulate, clearCart]);

  const handleNewOrder = () => {
    setCheckoutStep('idle');
    setActiveOrderId('');
  };

  // Fees calculation
  const deliveryFee = cartSubtotal > 300 ? 0 : 40;
  const tax = cartSubtotal * 0.05; // 5% GST
  const total = cartSubtotal + deliveryFee + tax;

  const formatPrice = (value: number) => {
    return `₹${value.toFixed(2)}`;
  };

  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white flex flex-col">
      {/* Navigation Header */}
      <header className="header" style={{ position: 'static' }}>
        <Link href="/" className="logo">
          Resto<span>App</span>
        </Link>
        <Link href="/" className="cart-text-btn" style={{ fontSize: '14px', textDecoration: 'none' }}>
          ← Back to Explore
        </Link>
      </header>

      <div className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
          
          {checkoutStep === 'idle' ? (
            <div className="space-y-6">
              {/* Header Title */}
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white inline-block relative pb-2">
                  Premium Express <span className="text-[#f97316]">Cart Checkout</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#f97316] rounded-full"></span>
                </h1>
              </div>

              {cart.length === 0 ? (
                <div className="cart-empty-state" style={{ margin: '40px auto', float: 'none', background: 'rgba(19, 28, 49, 0.4)' }}>
                  <div className="cart-empty-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </div>
                  <h4>Your cart is empty</h4>
                  <p>Add some delicious meals from our partner restaurants to place your order.</p>
                  <Link href="/" className="btn-browse-menu" style={{ textDecoration: 'none', display: 'inline-block' }}>
                    Browse Restaurants
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column: Cart Items (2/3 width) */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Cart list card container */}
                    <div className="bg-[#131c31]/50 border border-white/5 p-5 rounded-2xl">
                      <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                        <h3 className="font-bold text-base text-white">
                          Selected Items from <span className="text-[#f97316]">{cartRestaurantName}</span>
                        </h3>
                        <span className="text-xs text-slate-400 font-medium">Single Restaurant Order</span>
                      </div>

                      <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                        {cart.map((item) => (
                          <div className="cart-item-card" key={item.id} style={{ margin: 0, width: 'auto' }}>
                            <div className="cart-item-img-container">
                              <img src={item.image} alt={item.name} className="cart-item-img" />
                            </div>
                            <div className="cart-item-details">
                              <div className="cart-item-header">
                                <h4 className="cart-item-name">{item.name}</h4>
                                <span className="cart-item-price-tag">{item.price}</span>
                              </div>
                              <span className="cart-item-category">{item.category}</span>
                              
                              <div className="cart-item-footer">
                                <div className="quantity-adjuster">
                                  <button
                                    className="qty-btn minus"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    aria-label="Decrease quantity"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                  </button>
                                  <span className="qty-val">{item.quantity}</span>
                                  <button
                                    className="qty-btn plus"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    aria-label="Increase quantity"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="12" y1="5" x2="12" y2="19"></line>
                                      <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                  </button>
                                </div>

                                <button
                                  className="cart-item-remove-btn"
                                  onClick={() => removeFromCart(item.id)}
                                  aria-label="Remove item"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                  </svg>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Address & Payment Form card */}
                    <div className="bg-[#131c31]/50 border border-white/5 p-5 rounded-2xl space-y-4">
                      <h4 className="font-bold text-sm text-slate-300 uppercase tracking-wider">Delivery Details</h4>
                      
                      <div className="space-y-1">
                        <label className="text-xs text-slate-400 font-bold">Delivering To address:</label>
                        <textarea
                          rows={2}
                          className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-[#f97316] text-white"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div 
                          onClick={() => setPaymentMethod('cod')}
                          className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#f97316] bg-[#f97316]/5' : 'border-white/10 hover:border-white/20'}`}
                        >
                          <span className="text-2xl mb-1">💵</span>
                          <span className="text-xs font-bold">Cash on Delivery</span>
                        </div>
                        <div 
                          onClick={() => setPaymentMethod('online')}
                          className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-[#f97316] bg-[#f97316]/5' : 'border-white/10 hover:border-white/20'}`}
                        >
                          <span className="text-2xl mb-1">💳</span>
                          <span className="text-xs font-bold">UPI / Cards Mock</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Checkout Summary (1/3 width) */}
                  <div className="bg-[#131c31]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl h-fit space-y-6 shadow-xl">
                    <h3 className="font-bold text-lg border-b border-white/10 pb-2">Bill Details</h3>
                    <div className="space-y-3 text-sm text-slate-300">
                      <div className="flex justify-between">
                        <span>Item Subtotal</span>
                        <span>{formatPrice(cartSubtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery partner fee</span>
                        <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Govt Taxes & GST (5%)</span>
                        <span>{formatPrice(tax)}</span>
                      </div>
                    </div>
                    
                    {deliveryFee > 0 && (
                      <p className="text-[11px] text-green-400 bg-green-500/10 p-2 rounded-lg text-center font-bold">
                        💡 Tip: Add items worth ₹{(300 - cartSubtotal).toFixed(0)} more for FREE delivery!
                      </p>
                    )}
                    
                    <hr className="border-white/10" />
                    <div className="flex justify-between font-bold text-lg text-white">
                      <span>To Pay</span>
                      <span className="text-[#f97316]">{formatPrice(total)}</span>
                    </div>

                    <button className="btn-checkout" onClick={startCheckout} style={{ width: '100%', float: 'none', margin: '10px 0 0 0' }}>
                      <span>Place Dynamic Order</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Live Order Tracking Screens (Centered full-screen layout) */
            <div className="bg-[#131c31]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.4)] text-center max-w-md mx-auto">
              <div className="order-tracking-container" style={{ display: 'block' }}>
                
                {/* Simulator Mode Bar Toggle */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold' }}>🧪 Driver Simulator</span>
                  <button 
                    onClick={() => setIsSandboxSimulate(!isSandboxSimulate)}
                    style={{ background: isSandboxSimulate ? '#10b981' : 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '3px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {isSandboxSimulate ? 'Active (Auto-step)' : 'Inactive (Sync Portal Only)'}
                  </button>
                </div>

                {checkoutStep === 'validating' && (
                  <div className="tracking-step active">
                    <div className="tracking-anim-circle pulse">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <h3>Connecting Restaurant...</h3>
                    <p>Securing payment and sending order data to <strong>{cartRestaurantName}</strong> kitchen dashboard.</p>
                    <div className="progress-bar-glow">
                      <div className="progress-fill validating"></div>
                    </div>
                  </div>
                )}

                {checkoutStep === 'cooking' && (
                  <div className="tracking-step active">
                    <div className="tracking-anim-circle cook">
                      <span className="emoji-large">🍳</span>
                    </div>
                    <h3>Kitchen is Preparing!</h3>
                    <p>Chef at <strong>{cartRestaurantName}</strong> has accepted your order and is crafting your hot meal.</p>
                    <div className="progress-bar-glow">
                      <div className="progress-fill cooking"></div>
                    </div>
                  </div>
                )}

                {checkoutStep === 'delivery' && (
                  <div className="tracking-step active">
                    <div className="tracking-anim-circle ride">
                      <span className="emoji-large">🚀</span>
                    </div>
                    <h3>Rider Dispatching!</h3>
                    <p>Delivery partner has collected food packages and is speeding to <strong>{deliveryAddress}</strong>.</p>
                    <div className="progress-bar-glow">
                      <div className="progress-fill delivery"></div>
                    </div>
                  </div>
                )}

                {checkoutStep === 'completed' && (
                  <div className="tracking-step active success">
                    <div className="tracking-anim-circle checked">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <h3 className="success-text">Order Delivered!</h3>
                    <p className="success-desc">Enjoy your fresh, hot food! Thank you for choosing RestoApp.</p>
                    
                    <div className="success-details-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="detail-item">
                        <span>Restaurant:</span>
                        <strong>{cartRestaurantName}</strong>
                      </div>
                      <div className="detail-item">
                        <span>Order Reference:</span>
                        <strong className="text-[#f97316]">#{activeOrderId}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
                      <button className="btn-new-order" onClick={handleNewOrder} style={{ margin: 0, float: 'none', flex: 1 }}>
                        Place New Order
                      </button>
                      <Link href="/orders" className="btn-new-order" style={{ margin: 0, float: 'none', background: 'var(--accent)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', flex: 1 }}>
                        View History
                      </Link>
                    </div>
                  </div>
                )}

                {checkoutStep !== 'completed' && !isSandboxSimulate && (
                  <div style={{ marginTop: '20px', fontSize: '11px', color: '#64748b' }}>
                    💡 Syncing live state. Login as <strong>{cartRestaurantName}</strong> partner portal to manage and accept this order reference.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
