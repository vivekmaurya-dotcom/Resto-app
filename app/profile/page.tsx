'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../restaurant/restaurant.css';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface Order {
  id: string;
  timestamp: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'delivering' | 'completed';
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    phone: '+1 555-0199',
    address: '456 Gourmet Boulevard, Foodville, CA 90210',
  });
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load profile and order statistics from localStorage
  const loadProfileAndOrders = () => {
    try {
      const storedProfile = localStorage.getItem('resto_customer_profile');
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        localStorage.setItem('resto_customer_profile', JSON.stringify(profile));
      }

      const storedOrders = localStorage.getItem('resto_orders');
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders);
        setTotalOrders(parsedOrders.length);
      }
    } catch (err) {
      console.error('Failed to load profile dashboard:', err);
    }
  };

  useEffect(() => {
    loadProfileAndOrders();
    setIsLoaded(true);

    window.addEventListener('storage', loadProfileAndOrders);
    return () => window.removeEventListener('storage', loadProfileAndOrders);
  }, []);

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('resto_customer_profile', JSON.stringify(profile));
      setSaveSuccess(true);
      window.dispatchEvent(new Event('storage'));
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save profile:', err);
    }
  };

  const getMemberLevelShort = (ordersCount: number) => {
    if (ordersCount >= 10) return 'Gold Member';
    if (ordersCount >= 4) return 'Silver Member';
    return 'Bronze Member';
  };

  if (!isLoaded) {
    return (
      <main className="portal-container">
        <div style={{ color: '#fff', fontSize: '18px' }}>Loading Portal...</div>
      </main>
    );
  }

  return (
    <main className="portal-container">
      {/* Navigation link back to main menu */}
      <div style={{ position: 'absolute', top: '25px', left: '30px', zIndex: 10 }}>
        <Link href="/" className="cart-text-btn" style={{ fontSize: '14px', textDecoration: 'none', color: '#94a3b8' }}>
          ← Back to Menu
        </Link>
      </div>

      <div className="dashboard-card" style={{ marginTop: '50px' }}>
        {/* Dashboard Header Banner */}
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <h2>Customer Account Portal</h2>
            <p>
              Manage settings and view orders for {profile.name} ({profile.email})
            </p>
          </div>
          <Link href="/" className="logout-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Back to Menu
          </Link>
        </div>

        {/* Stats Display Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">Customer Status</div>
            <div className="stat-value" style={{ color: '#10b981' }}>Active</div>
          </div>
          <div className="stat-value-card stat-card">
            <div className="stat-title">Total Orders</div>
            <div className="stat-value">{totalOrders}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Loyalty Level</div>
            <div className="stat-value" style={{ color: '#f97316' }}>{getMemberLevelShort(totalOrders)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Registered Phone</div>
            <div className="stat-value" style={{ fontSize: '18px' }}>{profile.phone}</div>
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="dashboard-layout">
          
          {/* Left Column: Update Settings Form */}
          <div className="dashboard-form-container">
            <h3 className="form-section-title">Update Profile Details</h3>
            <form onSubmit={handleSubmitProfile}>
              
              <div className="input-group">
                <div className="input-icon">👤</div>
                <input
                  type="text"
                  placeholder="Full Name (e.g. Jane Doe)"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <div className="input-icon">✉️</div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <div className="input-icon">📞</div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  required
                />
              </div>

              <div className="textarea-group">
                <textarea
                  placeholder="Delivery Address..."
                  rows={3}
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="primary-btn" style={{ width: '100%' }}>
                Save Profile Details
              </button>
              
              {saveSuccess && (
                <p style={{ color: '#10b981', fontSize: '12px', marginTop: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                  ✓ Profile settings saved successfully!
                </p>
              )}
            </form>
          </div>

          {/* Right Column: Order History Catalog */}
          <div>
            <h3 className="form-section-title">Past Orders Catalog</h3>
            <div className="menu-list-container">
              {orders.length === 0 ? (
                <p className="empty-menu-text">No past orders found. Go back to the menu to order delicious dishes!</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="menu-item-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'between' }}>
                    <div className="menu-item-left">
                      <div className="menu-item-avatar" style={{ fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        📦
                      </div>
                      <div className="menu-item-info">
                        <h4>Order #{order.id}</h4>
                        <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                          {new Date(order.timestamp).toLocaleString()}
                        </p>
                        <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>
                          {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="menu-item-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <span className="menu-item-price-tag" style={{ margin: 0 }}>${order.total.toFixed(2)}</span>
                      <span className={`status-badge-dashboard ${order.status}`} style={{ margin: 0, fontSize: '10px', textTransform: 'uppercase', padding: '2px 8px' }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
