'use client';
import { useState, useEffect } from 'react';
import RestaurantLogin from '../_components/restaurantLogin';
import RestaurantSignUp from '../_components/restaurantSignUp';
import './restaurant.css';

// Separate Dashboard Component for clean architecture
const RestaurantDashboard = ({ restaurant, onLogout }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Burgers');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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
      price: price.startsWith('$') ? price : `$${price}`,
      description: description || 'No description provided.',
      image: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80', // default food photo
    };

    const updatedMenu = [...menuItems, newItem];
    setMenuItems(updatedMenu);
    localStorage.setItem(`restaurant_menu_${restaurant.id}`, JSON.stringify(updatedMenu));

    // Reset Form Fields
    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');

    alert('Menu item added successfully!');
  };

  const handleDeleteItem = (itemId) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    const updatedMenu = menuItems.filter((item) => item.id !== itemId);
    setMenuItems(updatedMenu);
    localStorage.setItem(`restaurant_menu_${restaurant.id}`, JSON.stringify(updatedMenu));
  };

  // Helper Stats
  const totalItems = menuItems.length;
  const avgPrice = menuItems.length
    ? (
        menuItems.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')), 0) /
        menuItems.length
      ).toFixed(2)
    : '0.00';

  return (
    <div className="dashboard-card">
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <h2>Welcome, {restaurant.restaurantName}</h2>
          <p>
            Portal Administrator ({restaurant.email}) | {restaurant.city}
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
          <div className="stat-value" style={{ color: '#10b981' }}>Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Menu Items</div>
          <div className="stat-value">{totalItems}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Average Price</div>
          <div className="stat-value">${avgPrice}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Contact Number</div>
          <div className="stat-value" style={{ fontSize: '18px' }}>{restaurant.contact}</div>
        </div>
      </div>

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
                placeholder="Price (e.g. 12.99)"
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
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
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
