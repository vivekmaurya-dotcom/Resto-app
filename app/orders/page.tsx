'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
  category?: string;
}

interface Order {
  id: string;
  restaurantId?: string;
  restaurantName?: string;
  timestamp: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'preparing' | 'delivering' | 'completed';
  address?: string;
  paymentMethod?: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchOrders = () => {
      try {
        const stored = localStorage.getItem('resto_orders');
        if (stored) {
          setOrders(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchOrders();

    window.addEventListener('storage', fetchOrders);
    const interval = setInterval(fetchOrders, 2000); // Poll every 2s for fast sync with restaurant partner

    return () => {
      window.removeEventListener('storage', fetchOrders);
      clearInterval(interval);
    };
  }, []);

  // Simulate active order progression in the background on the Orders page
  useEffect(() => {
    const advanceOrders = () => {
      try {
        const stored = localStorage.getItem('resto_orders');
        if (!stored) return;
        const parsedOrders: Order[] = JSON.parse(stored);
        let updated = false;

        const now = Date.now();
        const nextOrders = parsedOrders.map(order => {
          if (order.status === 'completed') return order;

          const orderTime = new Date(order.timestamp).getTime();
          const elapsedSeconds = (now - orderTime) / 1000;

          let targetStatus: Order['status'] = order.status;
          if (elapsedSeconds >= 15) {
            targetStatus = 'completed';
          } else if (elapsedSeconds >= 8) {
            targetStatus = 'delivering';
          } else if (elapsedSeconds >= 3) {
            targetStatus = 'preparing';
          }

          if (targetStatus !== order.status) {
            updated = true;
            return { ...order, status: targetStatus };
          }
          return order;
        });

        if (updated) {
          localStorage.setItem('resto_orders', JSON.stringify(nextOrders));
          setOrders(nextOrders);
          window.dispatchEvent(new Event('storage'));
        }
      } catch (err) {
        console.error('Failed to advance orders in background:', err);
      }
    };

    // Run order status advancement check every 2 seconds
    const statusInterval = setInterval(advanceOrders, 2000);
    return () => clearInterval(statusInterval);
  }, []);

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing in Kitchen';
      case 'delivering':
        return 'Out for Delivery';
      case 'completed':
        return 'Delivered';
    }
  };

  const getStepClass = (orderStatus: Order['status'], step: number) => {
    const statusLevels = { pending: 1, preparing: 2, delivering: 3, completed: 4 };
    const currentLevel = statusLevels[orderStatus] || 1;
    if (currentLevel >= step) {
      return 'step-active';
    }
    return 'step-inactive';
  };

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#0a0f1d] text-white flex items-center justify-center">
        <div className="text-[#f97316] text-lg font-medium animate-pulse">Loading Your Orders...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white flex flex-col">
      {/* Header */}
      <header className="header" style={{ position: 'static' }}>
        <Link href="/" className="logo">
          Resto<span>App</span>
        </Link>
        <Link href="/" className="cart-text-btn" style={{ fontSize: '14px', textDecoration: 'none' }}>
          ← Back to Menu
        </Link>
      </header>

      <div className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white inline-block relative pb-2">
              My Order <span className="text-[#f97316]">History</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#f97316] rounded-full"></span>
            </h1>
          </div>

          {orders.length === 0 ? (
            <div className="cart-empty-state" style={{ margin: '40px auto', float: 'none', background: 'rgba(19, 28, 49, 0.4)' }}>
              <div className="cart-empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="9" x2="15" y2="9"></line>
                  <line x1="9" y1="13" x2="15" y2="13"></line>
                  <line x1="9" y1="17" x2="15" y2="17"></line>
                </svg>
              </div>
              <h4>No orders found</h4>
              <p>You haven't placed any food orders yet.</p>
              <Link href="/" className="btn-browse-menu" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Order Delicious Food
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-[#131c31]/60 border border-white/10 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                  
                  {/* Top Metadata Header (Standard E-Commerce Format) */}
                  <div className="bg-white/[0.03] border-b border-white/10 px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-xs md:text-sm text-slate-300">
                    <div className="flex gap-6">
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Order Placed</span>
                        <span className="font-semibold text-white">{new Date(order.timestamp).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Restaurant</span>
                        <span className="font-semibold text-[#f97316]">{order.restaurantName || 'RestoApp Kitchen'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Total Bill</span>
                        <span className="font-semibold text-white">₹{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block sm:text-right mb-0.5">Order Reference</span>
                      <span className="font-semibold text-white tracking-wide">#{order.id}</span>
                    </div>
                  </div>

                  {/* Main Card Body */}
                  <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    
                    {/* Left & Center: Ordered Items list (2/3 width) */}
                    <div className="md:col-span-2 space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-14 h-14 object-cover rounded-xl border border-white/10 shrink-0" 
                            />
                          ) : (
                            <div className="w-14 h-14 bg-slate-800 rounded-xl border border-white/10 flex items-center justify-center text-xs text-slate-500 shrink-0">
                              Food
                            </div>
                          )}
                          <div className="flex-grow">
                            <h5 className="font-bold text-white text-sm leading-snug">{item.name}</h5>
                            <span className="text-xs text-slate-400 font-medium block mt-0.5">{item.category}</span>
                            <span className="text-xs text-[#f97316] font-semibold block mt-1">Quantity: {item.quantity}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-bold text-sm text-white">{item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Column: Status Tracker Stepper (1/3 width) */}
                    <div className="bg-black/20 border border-white/5 rounded-2xl p-4 flex flex-col justify-center space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400 font-bold uppercase">Status</span>
                        <span className={`status-badge-dashboard ${order.status}`} style={{ margin: 0 }}>
                          {getStatusText(order.status)}
                        </span>
                      </div>

                      {/* Stepper tracking progress bar */}
                      <div className="relative py-2">
                        <div className="absolute top-[16px] left-[5%] right-[5%] h-0.5 bg-white/10 rounded-full z-0"></div>
                        <div 
                          className="absolute top-[16px] left-[5%] h-0.5 bg-[#f97316] rounded-full z-0 transition-all duration-500"
                          style={{ 
                            width: order.status === 'pending' ? '0%' : 
                                   order.status === 'preparing' ? '33.33%' : 
                                   order.status === 'delivering' ? '66.66%' : '90%' 
                          }}
                        ></div>
                        
                        <div className="relative flex justify-between z-10">
                          {/* Step 1: Placed */}
                          <div className="flex flex-col items-center">
                            <div 
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${getStepClass(order.status, 1) === 'step-active' ? 'bg-[#f97316] text-white shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-slate-800 text-slate-400 border border-white/10'}`}
                              title="Order Placed"
                            >
                              1
                            </div>
                            <span className="text-[9px] text-slate-400 mt-1 font-bold">Placed</span>
                          </div>

                          {/* Step 2: Preparing */}
                          <div className="flex flex-col items-center">
                            <div 
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${getStepClass(order.status, 2) === 'step-active' ? 'bg-[#f97316] text-white shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-slate-800 text-slate-400 border border-white/10'}`}
                              title="Kitchen Preparing"
                            >
                              2
                            </div>
                            <span className="text-[9px] text-slate-400 mt-1 font-bold">Kitchen</span>
                          </div>

                          {/* Step 3: Delivering */}
                          <div className="flex flex-col items-center">
                            <div 
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${getStepClass(order.status, 3) === 'step-active' ? 'bg-[#f97316] text-white shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-slate-800 text-slate-400 border border-white/10'}`}
                              title="Out for Delivery"
                            >
                              3
                            </div>
                            <span className="text-[9px] text-slate-400 mt-1 font-bold">Transit</span>
                          </div>

                          {/* Step 4: Completed */}
                          <div className="flex flex-col items-center">
                            <div 
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${getStepClass(order.status, 4) === 'step-active' ? 'bg-green-500 text-white shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-800 text-slate-400 border border-white/10'}`}
                              title="Delivered"
                            >
                              ✓
                            </div>
                            <span className="text-[9px] text-slate-400 mt-1 font-bold">Arrived</span>
                          </div>
                        </div>
                      </div>

                      {order.address && (
                        <div className="text-[11px] text-slate-400 border-t border-white/5 pt-2">
                          <span className="font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Address</span>
                          <span className="line-clamp-1">{order.address}</span>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
