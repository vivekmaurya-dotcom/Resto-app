'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RestaurantLogin from '../_components/restaurantLogin';
import RestaurantSignUp from '../_components/restaurantSignUp';
import './restaurant.css';

// Separate Dashboard Component for clean architecture
const RestaurantDashboard = ({ restaurant, onLogout }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'menu', 'profile'
  const [orders, setOrders] = useState([]);

  // Form states for menu items
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Burgers');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [foodType, setFoodType] = useState('Veg'); // 'Veg', 'Non-Veg', 'Egg'
  const [tag, setTag] = useState('');

  // Profile Form States
  const [profileName, setProfileName] = useState(restaurant.restaurantName || '');
  const [profileCity, setProfileCity] = useState(restaurant.city || '');
  const [profileAddress, setProfileAddress] = useState(restaurant.address || '');
  const [profileContact, setProfileContact] = useState(restaurant.contact || '');
  const [profileCuisines, setProfileCuisines] = useState(restaurant.cuisines || 'North Indian, Fast Food');
  const [profileIsVeg, setProfileIsVeg] = useState(restaurant.isVeg || false);
  const [profileDeliveryTime, setProfileDeliveryTime] = useState(restaurant.deliveryTime || '25 mins');
  const [profileCostForTwo, setProfileCostForTwo] = useState(restaurant.costForTwo || '₹300 for two');
  const [profileImage, setProfileImage] = useState(restaurant.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80');

  // Fetch menu items from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`restaurant_menu_${restaurant.id}`);
      if (stored) {
        setMenuItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading menu items:', err);
    }
  }, [restaurant.id]);

  // Load orders and sync live updates
  useEffect(() => {
    const fetchOrders = () => {
      try {
        const stored = localStorage.getItem('resto_orders');
        if (stored) {
          const parsed = JSON.parse(stored);
          // Filter orders for this specific restaurant ID
          const filtered = parsed.filter((o) => o.restaurantId === restaurant.id);
          setOrders(filtered);
        }
      } catch (err) {
        console.error('Failed to load portal orders:', err);
      }
    };
    
    fetchOrders();
    window.addEventListener('storage', fetchOrders);
    const interval = setInterval(fetchOrders, 2000); // Polling sync check every 2s
    
    return () => {
      window.removeEventListener('storage', fetchOrders);
      clearInterval(interval);
    };
  }, [restaurant.id]);

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert('Please fill out all required fields.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name,
      category,
      price: price.startsWith('₹') || price.startsWith('$') ? price : `₹${price}`,
      description: description || 'No description provided.',
      image: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
      foodType,
      tag: tag || ''
    };

    const updatedMenu = [...menuItems, newItem];
    setMenuItems(updatedMenu);
    localStorage.setItem(`restaurant_menu_${restaurant.id}`, JSON.stringify(updatedMenu));

    // Reset Form Fields
    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    setTag('');

    alert('Menu item added successfully!');
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    try {
      const stored = localStorage.getItem('restaurants');
      const allRes = stored ? JSON.parse(stored) : [];
      
      const updatedRes = {
        ...restaurant,
        restaurantName: profileName,
        city: profileCity,
        address: profileAddress,
        contact: profileContact,
        cuisines: profileCuisines,
        isVeg: profileIsVeg,
        deliveryTime: profileDeliveryTime,
        costForTwo: profileCostForTwo,
        image: profileImage
      };

      const newAllRes = allRes.map((r) => r.id === restaurant.id ? updatedRes : r);
      localStorage.setItem('restaurants', JSON.stringify(newAllRes));
      localStorage.setItem('currentRestaurant', JSON.stringify(updatedRes));
      
      alert('Profile updated successfully!');
      window.location.reload();
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Error updating profile.');
    }
  };

  const handleDeleteItem = (itemId) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    const updatedMenu = menuItems.filter((item) => item.id !== itemId);
    setMenuItems(updatedMenu);
    localStorage.setItem(`restaurant_menu_${restaurant.id}`, JSON.stringify(updatedMenu));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    try {
      const stored = localStorage.getItem('resto_orders');
      if (!stored) return;
      const parsed = JSON.parse(stored);
      
      const updated = parsed.map((o) => {
        if (o.id === orderId) {
          return { ...o, status: newStatus };
        }
        return o;
      });
      
      localStorage.setItem('resto_orders', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage')); // Notify customer tabs
      
      // Update local state
      const filtered = updated.filter((o) => o.restaurantId === restaurant.id);
      setOrders(filtered);
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  // Helper Stats calculations
  const totalItems = menuItems.length;
  const activeOrders = orders.filter((o) => o.status !== 'completed');
  const completedOrders = orders.filter((o) => o.status === 'completed');
  
  const totalLiveSales = completedOrders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

  return (
    <div className="dashboard-card">
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <h2>Welcome, {restaurant.restaurantName}</h2>
          <p>
            Portal Dashboard ({restaurant.email}) | Outlet: {restaurant.city}
          </p>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Stats Display Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Portal Status</div>
          <div className="stat-value" style={{ color: '#10b981' }}>Live & Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Live Sales</div>
          <div className="stat-value" style={{ color: '#f97316' }}>₹{totalLiveSales.toFixed(0)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Incoming Orders</div>
          <div className="stat-value">{activeOrders.length} active</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Menu Items</div>
          <div className="stat-value">{totalItems} listed</div>
        </div>
      </div>

      {/* Dashboard Section Navigation Tabs */}
      <div style={{ display: 'flex', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '30px', paddingBottom: '2px' }}>
        <button 
          onClick={() => setActiveTab('orders')}
          style={{
            background: 'transparent',
            border: 'none',
            color: activeTab === 'orders' ? 'var(--accent)' : '#94a3b8',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '10px 15px',
            borderBottom: activeTab === 'orders' ? '2.5px solid var(--accent)' : 'none',
            cursor: 'pointer'
          }}
        >
          📥 Live Order Center ({activeOrders.length})
        </button>
        <button 
          onClick={() => setActiveTab('menu')}
          style={{
            background: 'transparent',
            border: 'none',
            color: activeTab === 'menu' ? 'var(--accent)' : '#94a3b8',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '10px 15px',
            borderBottom: activeTab === 'menu' ? '2.5px solid var(--accent)' : 'none',
            cursor: 'pointer'
          }}
        >
          🍔 Menu Catalog Management
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          style={{
            background: 'transparent',
            border: 'none',
            color: activeTab === 'profile' ? 'var(--accent)' : '#94a3b8',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '10px 15px',
            borderBottom: activeTab === 'profile' ? '2.5px solid var(--accent)' : 'none',
            cursor: 'pointer'
          }}
        >
          ⚙️ Edit Restaurant Profile
        </button>
      </div>

      {activeTab === 'menu' ? (
        <div className="dashboard-layout">
          {/* Left Side: Add Menu Item Form */}
          <div className="dashboard-form-container">
            <h3 className="form-section-title">Add Menu Item</h3>
            <form onSubmit={handleAddMenuItem}>
              <div className="input-group">
                <div className="input-icon">🍔</div>
                <input
                  type="text"
                  placeholder="Item Name (e.g. Cheese Pizza)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <div className="input-icon">🏷️</div>
                <input
                  type="text"
                  placeholder="Category (e.g. Burgers, Pizza, Desserts)"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <div className="input-icon">💵</div>
                <input
                  type="text"
                  placeholder="Price (e.g. 149)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <div className="input-icon">🖼️</div>
                <input
                  type="url"
                  placeholder="Image URL (Unsplash, etc.)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>

              <div className="input-group">
                <div className="input-icon">🟢</div>
                <select
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    outline: 'none',
                    fontSize: '14px',
                    padding: '10px 0',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Veg" style={{ background: '#0a0f1d', color: '#10b981' }}>🟢 Pure Veg</option>
                  <option value="Non-Veg" style={{ background: '#0a0f1d', color: '#ef4444' }}>🔴 Non-Veg</option>
                  <option value="Egg" style={{ background: '#0a0f1d', color: '#f59e0b' }}>🟡 Eggitarian</option>
                </select>
              </div>

              <div className="input-group">
                <div className="input-icon">✨</div>
                <input
                  type="text"
                  placeholder="Item Tag (e.g. Best Seller, Chef Choice)"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>

              <div className="textarea-group">
                <textarea
                  placeholder="Item Description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button type="submit" className="primary-btn">
                Add To Menu
              </button>
            </form>
          </div>

          {/* Right Side: Scrollable Menu List */}
          <div>
            <h3 className="form-section-title">Live Menu Catalog</h3>
            <div className="menu-list-container">
              {menuItems.length === 0 ? (
                <p className="empty-menu-text">No menu items added yet. Use the form on the left to add items.</p>
              ) : (
                menuItems.map((item) => (
                  <div key={item.id} className="menu-item-row">
                    <div className="menu-item-left">
                      <img src={item.image} alt={item.name} className="menu-item-avatar" />
                      <div className="menu-item-info">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <h4 style={{ margin: 0 }}>{item.name}</h4>
                          <span style={{
                            fontSize: '9px',
                            padding: '1px 6px',
                            borderRadius: '3px',
                            border: item.foodType === 'Veg' ? '1px solid #10b981' : item.foodType === 'Egg' ? '1px solid #f59e0b' : '1px solid #ef4444',
                            color: item.foodType === 'Veg' ? '#10b981' : item.foodType === 'Egg' ? '#f59e0b' : '#ef4444',
                            fontWeight: 'bold'
                          }}>
                            {item.foodType || 'Veg'}
                          </span>
                          {item.tag && (
                            <span style={{ fontSize: '9px', background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: '3px', color: '#cbd5e1' }}>
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p style={{ margin: '4px 0 0 0' }}>{item.description || item.desc}</p>
                      </div>
                    </div>
                    <div className="menu-item-right">
                      <span className="menu-item-price-tag">{item.price}</span>
                      <button className="btn-delete" onClick={() => handleDeleteItem(item.id)} title="Delete Item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : activeTab === 'orders' ? (
        /* Orders Management Tab */
        <div>
          <h3 className="form-section-title">Active Delivery Orders</h3>
          {orders.length === 0 ? (
            <p className="empty-menu-text" style={{ padding: '40px 0' }}>No incoming customer orders found yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                    <div>
                      <strong style={{ fontSize: '15px', color: 'white' }}>Order Reference: #{order.id}</strong>
                      <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '15px' }}>
                        📅 {new Date(order.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <span className={`status-badge-dashboard ${order.status}`} style={{ margin: 0, textTransform: 'uppercase', fontSize: '10px' }}>
                      {order.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                    <div style={{ flex: '2 1 300px' }}>
                      <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Ordered Food Items</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {order.items.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#cbd5e1' }}>
                            <span>🍕 {item.name} <strong style={{ color: 'var(--accent)' }}>x{item.quantity}</strong></span>
                            <span>{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ flex: '1 1 200px', borderLeft: '1px solid rgba(255,255,255,0.04)', paddingLeft: '20px' }}>
                      <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Delivery Address</span>
                      <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.4', margin: '0 0 10px 0' }}>{order.address}</p>
                      
                      <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Payment Mode</span>
                      <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>{order.paymentMethod}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '15px', flexWrap: 'wrap', gap: '15px' }}>
                    <span style={{ fontSize: '14px', color: 'white' }}>
                      Grand Total Bill: <strong style={{ color: 'var(--accent)', fontSize: '16px' }}>₹{order.total.toFixed(2)}</strong>
                    </span>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      {order.status === 'pending' && (
                        <button 
                          onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}
                          style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                          🧑‍🍳 Accept & Prepare Order
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button 
                          onClick={() => handleUpdateOrderStatus(order.id, 'delivering')}
                          style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                          🚀 Handover to Rider (Dispatch)
                        </button>
                      )}
                      {order.status === 'delivering' && (
                        <button 
                          onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                          style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                          ✓ Mark Delivered (Complete)
                        </button>
                      )}
                      {order.status === 'completed' && (
                        <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          ✓ Order completed and delivered successfully
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Profile Management Tab */
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 className="form-section-title">Edit Restaurant Profile Info</h3>
          <form onSubmit={handleUpdateProfile} className="dashboard-form-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="input-group">
              <span style={{ color: '#cbd5e1', fontSize: '13px', width: '120px', display: 'inline-block' }}>Outlet Name:</span>
              <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} required />
            </div>
            <div className="input-group">
              <span style={{ color: '#cbd5e1', fontSize: '13px', width: '120px', display: 'inline-block' }}>City:</span>
              <input type="text" value={profileCity} onChange={(e) => setProfileCity(e.target.value)} required />
            </div>
            <div className="input-group">
              <span style={{ color: '#cbd5e1', fontSize: '13px', width: '120px', display: 'inline-block' }}>Cuisines:</span>
              <input type="text" placeholder="Burgers, Chinese, Desserts" value={profileCuisines} onChange={(e) => setProfileCuisines(e.target.value)} required />
            </div>
            <div className="input-group">
              <span style={{ color: '#cbd5e1', fontSize: '13px', width: '120px', display: 'inline-block' }}>Delivery Time:</span>
              <input type="text" placeholder="25 mins" value={profileDeliveryTime} onChange={(e) => setProfileDeliveryTime(e.target.value)} required />
            </div>
            <div className="input-group">
              <span style={{ color: '#cbd5e1', fontSize: '13px', width: '120px', display: 'inline-block' }}>Cost for Two:</span>
              <input type="text" placeholder="₹300 for two" value={profileCostForTwo} onChange={(e) => setProfileCostForTwo(e.target.value)} required />
            </div>
            <div className="input-group">
              <span style={{ color: '#cbd5e1', fontSize: '13px', width: '120px', display: 'inline-block' }}>Banner Image URL:</span>
              <input type="url" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
              <input type="checkbox" id="profileIsVeg" checked={profileIsVeg} onChange={(e) => setProfileIsVeg(e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <label htmlFor="profileIsVeg" style={{ color: '#cbd5e1', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }}>🟢 Pure Veg Outlet (All dishes are vegetarian)</label>
            </div>
            <button type="submit" className="primary-btn">Save Profile Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

const Restaurant = () => {
  const [login, setLogin] = useState(true);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Safe checks for localStorage to prevent hydration issues
  useEffect(() => {
    try {
      const stored = localStorage.getItem('currentRestaurant');
      if (stored) {
        setCurrentRestaurant(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load session:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentRestaurant');
    setCurrentRestaurant(null);
  };

  const handleLoginSuccess = (restaurantData) => {
    setCurrentRestaurant(restaurantData);
  };

  // Prevent flashing content during hydration loads
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

      {currentRestaurant ? (
        <RestaurantDashboard restaurant={currentRestaurant} onLogout={handleLogout} />
      ) : login ? (
        <RestaurantLogin toggleView={() => setLogin(false)} onLogin={handleLoginSuccess} />
      ) : (
        <RestaurantSignUp toggleView={() => setLogin(true)} />
      )}
    </main>
  );
};

export default Restaurant;
