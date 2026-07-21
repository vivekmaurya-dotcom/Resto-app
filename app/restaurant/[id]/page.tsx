'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { SEED_RESTAURANTS, DEFAULT_DISHES_MAP } from '../../context/mockData';
import '../../home.css';

const MOCK_REVIEWS = [
  { id: 1, name: 'Aarav Mehta', rating: 5, date: '2 days ago', comment: 'Absolutely delicious! The Truffle Burger was out of this world and packaging was clean.' },
  { id: 2, name: 'Priya Sharma', rating: 4, date: '1 week ago', comment: 'Great taste and portions. The cheese pull on the pizza was excellent. Will order again.' },
  { id: 3, name: 'Rohan Gupta', rating: 5, date: '3 weeks ago', comment: 'Best food experience in the area. High quality ingredients and great service!' }
];

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { addToCart, cartTotal, setIsCartOpen, cartRestaurantName } = useCart();

  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Custom detailed states per user request
  const [detailTab, setDetailTab] = useState<'menu' | 'reviews'>('menu');
  const [dishSearchQuery, setDishSearchQuery] = useState('');
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);

  // Conflict Modal State
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [pendingItem, setPendingItem] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    try {
      // Find restaurant detail
      const storedRes = localStorage.getItem('restaurants');
      const allRes = storedRes ? JSON.parse(storedRes) : SEED_RESTAURANTS;
      const matchedRes = allRes.find((r: any) => r.id === id);

      if (matchedRes) {
        setRestaurant(matchedRes);

        // Load menu items
        const defaults = DEFAULT_DISHES_MAP[id] || [];

        const storedCustom = localStorage.getItem(`restaurant_menu_${id}`);
        const customDishes = storedCustom ? JSON.parse(storedCustom) : [];

        const formattedCustom = customDishes.map((item: any) => {
          const rawPrice = item.price.toString();
          const cleanPrice = rawPrice.startsWith('₹') || rawPrice.startsWith('$') ? rawPrice : `₹${rawPrice}`;
          return {
            id: item.id,
            name: item.name,
            category: item.category,
            price: cleanPrice,
            rating: 4.5,
            tag: 'Chef Choice',
            desc: item.description,
            image: item.image,
            isVeg: item.category.toLowerCase().includes('veg') || item.name.toLowerCase().includes('veg')
          };
        });

        setMenuItems([...defaults, ...formattedCustom]);
      } else {
        router.push('/');
      }
    } catch (e) {
      console.error('Failed to load restaurant detail', e);
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  const triggerToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast((prev) => (prev.message === message ? { ...prev, show: false } : prev));
    }, 3000);
  };

  const handleAddItem = (item: any) => {
    const success = addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        desc: item.desc || item.description || '',
        category: item.category
      },
      restaurant.id,
      restaurant.restaurantName
    );

    if (!success) {
      setPendingItem(item);
      setShowConflictModal(true);
    } else {
      triggerToast(`Added ${item.name} to cart!`);
    }
  };

  const handleConfirmConflict = () => {
    if (!pendingItem) return;
    
    addToCart(
      {
        id: pendingItem.id,
        name: pendingItem.name,
        price: pendingItem.price,
        image: pendingItem.image,
        desc: pendingItem.desc || pendingItem.description || '',
        category: pendingItem.category
      },
      restaurant.id,
      restaurant.restaurantName,
      true // Force overwrite
    );

    setShowConflictModal(false);
    setPendingItem(null);
    triggerToast(`Reset cart and added ${pendingItem.name}!`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0f1d] text-white flex items-center justify-center">
        <div className="text-lg text-slate-400">Loading Menu details...</div>
      </main>
    );
  }

  if (!restaurant) return null;

  // Categories extraction
  const categories = ['All', ...Array.from(new Set(menuItems.map((item) => item.category)))];

  // Filtering dishes based on category, search, and Veg filters
  const filteredDishes = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(dishSearchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(dishSearchQuery.toLowerCase());
    const matchesVeg = !vegOnlyFilter || item.isVeg === true;

    return matchesCategory && matchesSearch && matchesVeg;
  });

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <Link href="/" className="logo">
          Resto<span>App</span>
        </Link>
        <div className="header-actions">
          <Link href="/" className="cart-text-btn" style={{ marginRight: '20px', fontSize: '14px', textDecoration: 'none' }}>
            ← Explore Menu
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="cart-icon-btn" title="View Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Cart</span>
            {cartTotal > 0 && <span className="cart-badge" style={{ position: 'static', transform: 'none', marginLeft: '4px' }}>{cartTotal}</span>}
          </button>
        </div>
      </header>

      {/* Restaurant Info Header Banner */}
      <section className="hero" style={{ padding: '40px 8%', minHeight: 'auto', background: 'radial-gradient(ellipse at bottom, #131c31 0%, #0a0f1d 100%)' }}>
        <div className="flex flex-col md:flex-row items-center gap-10 w-full">
          <div className="flex-[1_1_300px] w-full max-w-[400px] h-[250px] relative rounded-[24px] overflow-hidden border border-white/8">
            <img 
              src={restaurant.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80'} 
              alt={restaurant.restaurantName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {restaurant.isVeg && (
              <span style={{ position: 'absolute', top: '15px', left: '15px', background: '#10b981', color: 'white', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '30px' }}>
                🟢 PURE VEG
              </span>
            )}
          </div>
          
          <div style={{ flex: '2 1 400px', width: '100%' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
              <span className="hero-tagline" style={{ marginBottom: 0 }}>📍 {restaurant.city}</span>
              <div style={{ display: 'flex', alignItems: 'center', background: '#10b981', color: 'white', padding: '4px 10px', borderRadius: '15px', fontSize: '13px', fontWeight: '700' }}>
                ⭐ {restaurant.rating || '4.0'}
              </div>
            </div>
            <h1 className="hero-title" style={{ fontSize: '42px', marginBottom: '12px' }}>{restaurant.restaurantName}</h1>
            <p className="hero-desc" style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '15px' }}>
              {restaurant.cuisines}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', color: '#cbd5e1', fontSize: '14px' }}>
              <div>
                <span style={{ color: '#94a3b8', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Delivery Time</span>
                <strong>🕒 {restaurant.deliveryTime || '25 mins'}</strong>
              </div>
              <div>
                <span style={{ color: '#94a3b8', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Cost For Two</span>
                <strong>💰 {restaurant.costForTwo || '₹300 for two'}</strong>
              </div>
              <div>
                <span style={{ color: '#94a3b8', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Outlet Address</span>
                <span style={{ fontSize: '13px' }}>{restaurant.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu & Reviews Content Section */}
      <section className="menu-section" style={{ padding: '40px 8%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Navigation Tabs - Menu vs Reviews */}
          <div style={{ display: 'flex', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '10px' }}>
            <button 
              onClick={() => setDetailTab('menu')}
              style={{
                background: 'transparent',
                border: 'none',
                color: detailTab === 'menu' ? 'var(--accent)' : '#94a3b8',
                fontSize: '16px',
                fontWeight: 'bold',
                padding: '10px 15px',
                borderBottom: detailTab === 'menu' ? '2.5px solid var(--accent)' : 'none',
                cursor: 'pointer'
              }}
            >
              🍔 Explore Menu Categories
            </button>
            <button 
              onClick={() => setDetailTab('reviews')}
              style={{
                background: 'transparent',
                border: 'none',
                color: detailTab === 'reviews' ? 'var(--accent)' : '#94a3b8',
                fontSize: '16px',
                fontWeight: 'bold',
                padding: '10px 15px',
                borderBottom: detailTab === 'reviews' ? '2.5px solid var(--accent)' : 'none',
                cursor: 'pointer'
              }}
            >
              ⭐ Ratings & Reviews
            </button>
          </div>

          {detailTab === 'menu' ? (
            /* Menu Tab */
            <>
              {/* Search and Filters Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '20px' }}>
                {/* Search dishes */}
                <div className="search-container" style={{ margin: 0, padding: '4px', maxWidth: '300px', width: '100%', boxShadow: 'none' }}>
                  <div className="search-input-wrapper" style={{ paddingLeft: '10px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                      type="text"
                      placeholder="Search for dishes..."
                      value={dishSearchQuery}
                      onChange={(e) => setDishSearchQuery(e.target.value)}
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                </div>

                {/* Veg filter switch */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 'bold' }}>🟢 Pure Veg Only</span>
                  <button 
                    onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
                    style={{
                      width: '42px',
                      height: '22px',
                      borderRadius: '20px',
                      background: vegOnlyFilter ? '#10b981' : 'rgba(255,255,255,0.1)',
                      border: 'none',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.25s'
                    }}
                  >
                    <span 
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: 'white',
                        position: 'absolute',
                        top: '4px',
                        left: vegOnlyFilter ? '24px' : '4px',
                        transition: 'all 0.25s'
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* Category tabs */}
              <div className="category-tabs" style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '10px', justifyContent: 'flex-start', margin: '10px 0' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                    style={{ padding: '8px 20px', fontSize: '13px' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dishes cards grid */}
              {filteredDishes.length === 0 ? (
                <div style={{ padding: '40px 0', color: '#94a3b8', textAlign: 'center' }}>
                  No dishes found matching your selection.
                </div>
              ) : (
                <div className="menu-grid" style={{ gridTemplateColumns: '1fr', gap: '16px' }}>
                  {filteredDishes.map((dish) => (
                    <div key={dish.id} className="menu-card flex flex-col md:flex-row items-center gap-6 p-6 border border-white/5">
                      
                      {/* Dish thumbnail */}
                      <div className="w-[130px] h-[130px] rounded-2xl overflow-hidden border border-white/10 shrink-0">
                        <img 
                          src={dish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'} 
                          alt={dish.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Details */}
                      <div style={{ flexGrow: 1, textAlign: 'left', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: '4px', border: dish.isVeg ? '1px solid #10b981' : '1px solid #ef4444', color: dish.isVeg ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                            {dish.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                          </span>
                          
                          {/* Best Seller / New tags */}
                          {dish.tag && (
                            <span style={{ 
                              background: dish.tag.toLowerCase().includes('seller') ? 'rgba(249, 115, 22, 0.15)' : 'rgba(59, 130, 246, 0.15)', 
                              color: dish.tag.toLowerCase().includes('seller') ? '#f97316' : '#3b82f6', 
                              border: dish.tag.toLowerCase().includes('seller') ? '1px solid rgba(249, 115, 22, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)',
                              fontSize: '10px', 
                              fontWeight: '700', 
                              padding: '2px 8px', 
                              borderRadius: '4px',
                              textTransform: 'uppercase'
                            }}>
                              {dish.tag}
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: 0 }}>{dish.name}</h3>
                          <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--accent)' }}>{dish.price}</span>
                        </div>
                        <p style={{ color: '#cbd5e1', fontSize: '13px', margin: '10px 0 0 0', lineHeight: '1.5' }}>
                          {dish.desc || 'No description available for this mouth-watering dish.'}
                        </p>
                      </div>

                      {/* Add button */}
                      <div className="shrink-0 w-full md:w-auto flex justify-end">
                        <button
                          onClick={() => handleAddItem(dish)}
                          style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '30px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                          title="Add to Cart"
                        >
                          <span>Add to Cart</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Reviews & Ratings Tab */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Ratings Summary Header */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', paddingRight: '30px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                  <h2 style={{ fontSize: '48px', fontWeight: '800', color: 'var(--accent)', margin: 0 }}>{restaurant.rating || '4.0'}</h2>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold' }}>out of 5.0</span>
                </div>
                <div style={{ flexGrow: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                    <span style={{ width: '40px', color: '#94a3b8' }}>5 Star</span>
                    <div style={{ flexGrow: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '80%', height: '100%', background: '#10b981' }} />
                    </div>
                    <span style={{ width: '30px', textAlign: 'right', color: '#94a3b8' }}>80%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                    <span style={{ width: '40px', color: '#94a3b8' }}>4 Star</span>
                    <div style={{ flexGrow: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '15%', height: '100%', background: '#10b981' }} />
                    </div>
                    <span style={{ width: '30px', textAlign: 'right', color: '#94a3b8' }}>15%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                    <span style={{ width: '40px', color: '#94a3b8' }}>3 Star</span>
                    <div style={{ flexGrow: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '5%', height: '100%', background: '#f59e0b' }} />
                    </div>
                    <span style={{ width: '30px', textAlign: 'right', color: '#94a3b8' }}>5%</span>
                  </div>
                </div>
              </div>

              {/* Review Comments list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {MOCK_REVIEWS.map((review) => (
                  <div 
                    key={review.id} 
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      paddingBottom: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ fontSize: '15px', color: 'white' }}>{review.name}</strong>
                        <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '10px' }}>{review.date}</span>
                      </div>
                      <div style={{ background: '#10b981', color: 'white', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>
                        ★ {review.rating}.0
                      </div>
                    </div>
                    <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Floating Bottom Cart Bar */}
      {cartTotal > 0 && (
        <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '700px', background: 'rgba(249, 115, 22, 0.95)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', borderRadius: '16px', zIndex: 99, boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '12px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>Cart Items</span>
            <h4 style={{ margin: '2px 0 0 0', fontWeight: '700' }}>
              {cartTotal} {cartTotal === 1 ? 'item' : 'items'} in basket from {cartRestaurantName}
            </h4>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            style={{ background: 'white', color: 'var(--accent)', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>View Cart</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      )}

      {/* Conflict Modal */}
      {showConflictModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' }}>
          <div style={{ background: 'rgba(19, 28, 49, 0.98)', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '24px', maxWidth: '440px', width: '90%', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', margin: 'auto' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>Items Already in Cart</h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '24px' }}>
              Your basket already contains items from <strong>{cartRestaurantName}</strong>. 
              Do you want to discard your cart selection and add dishes from <strong>{restaurant.restaurantName}</strong> instead?
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button 
                onClick={() => {
                  setShowConflictModal(false);
                  setPendingItem(null);
                }}
                style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', flex: 1 }}
              >
                No, Keep Old
              </button>
              <button 
                onClick={handleConfirmConflict}
                style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', flex: 1 }}
              >
                Yes, Start New
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`cart-toast ${toast.show ? 'show' : ''}`}>
        <div className="toast-icon">✨</div>
        <div className="toast-message">{toast.message}</div>
      </div>
    </div>
  );
}
