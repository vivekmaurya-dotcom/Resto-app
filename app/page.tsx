'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from './context/CartContext';
import { SEED_RESTAURANTS, DEFAULT_DISHES_MAP } from './context/mockData';
import './home.css';

export default function Home() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { addToCart, cartTotal, setIsCartOpen, cartRestaurantName } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);

  // States for Explore Dishes Feed per user request
  const [feedTab, setFeedTab] = useState<'restaurants' | 'dishes'>('restaurants');
  const [dishSearchQuery, setDishSearchQuery] = useState('');
  const [foodTypeFilter, setFoodTypeFilter] = useState<'All' | 'Veg' | 'Non-Veg' | 'Egg'>('All');
  const [activeCuisineFilter, setActiveCuisineFilter] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [allDishes, setAllDishes] = useState<any[]>([]);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Conflict Modal State
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [pendingItem, setPendingItem] = useState<any>(null);

  // Initialize and load restaurants
  useEffect(() => {
    try {
      const CURRENT_VERSION = 'resto_db_v6_rolls_fixed';
      const storedVersion = localStorage.getItem('resto_db_version');

      if (storedVersion !== CURRENT_VERSION) {
        localStorage.removeItem('restaurants');
        // Clear menu keys for default seed restaurants
        for (let i = 1; i <= 6; i++) {
          localStorage.removeItem(`restaurant_menu_res-${i}`);
        }
        localStorage.setItem('resto_db_version', CURRENT_VERSION);
      }

      const stored = localStorage.getItem('restaurants');
      if (stored) {
        const parsed = JSON.parse(stored);
        const hasSeedRestaurants = parsed.some((r: any) => r.id.startsWith('res-'));
        const usesOldImages = parsed.some((r: any) => r.image && r.image.includes('unsplash.com') && r.id.startsWith('res-'));
        if (parsed.length > 0 && hasSeedRestaurants && !usesOldImages) {
          setRestaurants(parsed);
        } else {
          const customPartners = parsed.filter((r: any) => !r.id.startsWith('res-'));
          const upgraded = [...SEED_RESTAURANTS, ...customPartners];
          localStorage.setItem('restaurants', JSON.stringify(upgraded));
          setRestaurants(upgraded);
        }
      } else {
        localStorage.setItem('restaurants', JSON.stringify(SEED_RESTAURANTS));
        setRestaurants(SEED_RESTAURANTS);
      }
    } catch (err) {
      console.error('Failed to parse restaurants', err);
      setRestaurants(SEED_RESTAURANTS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Compile all dishes dynamically (seed + custom partner menus)
  useEffect(() => {
    if (restaurants.length === 0) return;

    try {
      const compiledList: any[] = [];

      restaurants.forEach((res: any) => {
        // Load default dishes
        const defaultDishes = DEFAULT_DISHES_MAP[res.id] || [];

        // Load custom partner dishes
        const storedCustom = localStorage.getItem(`restaurant_menu_${res.id}`);
        const customDishes = storedCustom ? JSON.parse(storedCustom) : [];

        const formattedDefaults = defaultDishes.map((dish) => {
          const hasEgg = dish.name.toLowerCase().includes('egg') || dish.category.toLowerCase().includes('egg');
          return {
            ...dish,
            foodType: hasEgg ? 'Egg' : (dish.isVeg ? 'Veg' : 'Non-Veg')
          };
        });

        const formattedCustom = customDishes.map((item: any) => {
          const rawPrice = item.price.toString();
          const cleanPrice = rawPrice.startsWith('₹') || rawPrice.startsWith('$') ? rawPrice : `₹${rawPrice}`;
          const isVegDefault = item.category.toLowerCase().includes('veg') || item.name.toLowerCase().includes('veg');
          const finalFoodType = item.foodType || (isVegDefault ? 'Veg' : 'Non-Veg');
          return {
            id: item.id,
            name: item.name,
            category: item.category,
            price: cleanPrice,
            rating: 4.5,
            tag: item.tag || 'Chef Special',
            desc: item.description || '',
            image: item.image,
            isVeg: finalFoodType === 'Veg' || finalFoodType === 'Egg',
            foodType: finalFoodType
          };
        });

        const merged = [...formattedDefaults, ...formattedCustom];
        merged.forEach((dish) => {
          compiledList.push({
            ...dish,
            restaurantId: res.id,
            restaurantName: res.restaurantName,
            restaurantRating: res.rating || 4.2
          });
        });
      });

      setAllDishes(compiledList);
    } catch (err) {
      console.error('Failed to compile dishes list', err);
    }
  }, [restaurants]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you! ${newsletterEmail} has been subscribed to our food newsletter.`);
    setNewsletterEmail('');
  };

  const triggerToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast((prev) => (prev.message === message ? { ...prev, show: false } : prev));
    }, 3000);
  };

  const handleAddDishToCart = (dish: any) => {
    const success = addToCart(
      {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        desc: dish.desc || dish.description || '',
        category: dish.category
      },
      dish.restaurantId,
      dish.restaurantName
    );

    if (!success) {
      setPendingItem(dish);
      setShowConflictModal(true);
    } else {
      triggerToast(`Added ${dish.name} from ${dish.restaurantName} to cart!`);
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
      pendingItem.restaurantId,
      pendingItem.restaurantName,
      true // Force overwrite
    );

    setShowConflictModal(false);
    setPendingItem(null);
    triggerToast(`Reset cart and added ${pendingItem.name}!`);
  };

  // Helper to extract numeric price from costForTwo string (e.g. "₹350 for two" -> 350)
  const getNumericCost = (costStr?: string) => {
    if (!costStr) return 300; // default fallback
    const matched = costStr.match(/\d+/);
    return matched ? parseInt(matched[0], 10) : 300;
  };

  // Helper to extract numeric minutes from deliveryTime string (e.g. "20 mins" -> 20)
  const getNumericTime = (timeStr?: string) => {
    if (!timeStr) return 25; // default fallback
    const matched = timeStr.match(/\d+/);
    return matched ? parseInt(matched[0], 10) : 25;
  };

  // Apply filters and search to Restaurants Feed
  const filteredRestaurants = restaurants.filter((res) => {
    const name = res.restaurantName ? res.restaurantName.toLowerCase() : '';
    const cuisines = res.cuisines ? res.cuisines.toLowerCase() : 'north indian, fast food';
    const city = res.city ? res.city.toLowerCase() : '';
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      name.includes(query) ||
      cuisines.includes(query) ||
      city.includes(query);

    if (!matchesSearch) return false;

    // Filter by active cuisine type
    if (activeCuisineFilter !== 'All') {
      if (!cuisines.includes(activeCuisineFilter.toLowerCase())) return false;
    }

    if (activeFilter === 'All') return true;
    if (activeFilter === 'Rating 4.5+') return parseFloat(res.rating || '4.2') >= 4.5;
    if (activeFilter === 'Pure Veg') return res.isVeg === true;
    if (activeFilter === 'Fast Delivery') return getNumericTime(res.deliveryTime) <= 15;

    return true;
  });

  // Apply sorting to Restaurants Feed
  const sortedAndFilteredRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (activeFilter === 'Cost: Low to High') {
      return getNumericCost(a.costForTwo) - getNumericCost(b.costForTwo);
    }
    if (activeFilter === 'Cost: High to Low') {
      return getNumericCost(b.costForTwo) - getNumericCost(a.costForTwo);
    }
    return 0; // Default order
  });

  // Unique Categories extraction for Dishes Feed
  const dishCategories = ['All', ...Array.from(new Set(allDishes.map((d) => d.category)))];

  // Apply search, foodType-toggle, and category filters to Dishes Feed
  const filteredDishes = allDishes.filter((dish) => {
    const matchesCategory = activeCategory === 'All' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(dishSearchQuery.toLowerCase()) ||
      (dish.desc && dish.desc.toLowerCase().includes(dishSearchQuery.toLowerCase())) ||
      dish.restaurantName.toLowerCase().includes(dishSearchQuery.toLowerCase());

    let matchesType = true;
    if (foodTypeFilter === 'Veg') {
      matchesType = dish.foodType === 'Veg';
    } else if (foodTypeFilter === 'Non-Veg') {
      matchesType = dish.foodType === 'Non-Veg';
    } else if (foodTypeFilter === 'Egg') {
      matchesType = dish.foodType === 'Egg';
    }

    return matchesCategory && matchesSearch && matchesType;
  });

  return (
    <div className="home-container">
      {/* Header / Navigation Bar */}
      <header className="header">
        <Link href="/" className="logo">
          Resto<span>App</span>
        </Link>

        <nav>
          <ul className="nav-links">
            <li><Link href="/" className="active">Home</Link></li>
            <li><a href="#restaurants">Explore Menu</a></li>
            <li><a href="#features">Our Services</a></li>
            <li><Link href="/restaurant">Restaurant Partner</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          <Link href="/orders" className="cart-text-btn" style={{ marginRight: '15px', fontSize: '14px', textDecoration: 'none' }} title="Order History">
            My Orders
          </Link>

          <Link href="/profile" className="cart-text-btn" style={{ marginRight: '15px', fontSize: '14px', textDecoration: 'none' }} title="User Profile">
            My Profile
          </Link>

          <button onClick={() => setIsCartOpen(true)} className="cart-icon-btn" title="View Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Cart</span>
            {cartTotal > 0 && <span className="cart-badge" style={{ position: 'static', transform: 'none', marginLeft: '4px', border: 'none' }}>{cartTotal}</span>}
          </button>

          <Link href="/restaurant" className="btn-partner">
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tagline">🔥 Premium Hyperlocal Delivery Network</span>
          <h1 className="hero-title">
            Discover the Best Food from <span>Your Favorite</span> Kitchens
          </h1>
          <p className="hero-desc">
            Order fresh meals from top-rated local restaurants,
            customized to your taste buds,
            and delivered directly to your doorstep in minutes.
          </p>

          <form onSubmit={handleSearchSubmit} className="search-container">
            <div className="search-input-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search for restaurants, cuisines, or cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div className="hero-image-section">
          <div className="hero-image-container">
            <div className="hero-circle-bg"></div>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
              alt="Delicious gourmet food spread"
              className="hero-main-img"
            />
            <div className="floating-badge badge-1">
              <div className="badge-icon">⭐</div>
              <div className="badge-text">
                <div>Delhi Spice</div>
                <div>4.9 Rating</div>
              </div>
            </div>
            <div className="floating-badge badge-2">
              <div className="badge-icon">🚀</div>
              <div className="badge-text">
                <div>Super Fast</div>
                <div>Free Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Features Section */}
      <section id="features" className="features">
        <span className="section-subtitle">How It Works</span>
        <h2 className="section-title">We Deliver Quality Food</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3>Best Local Kitchens</h3>
            <p>We partner with high-grade hygiene certified restaurants to deliver only the best quality meals.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <h3>Lightning Fast Delivery</h3>
            <p>Our dedicated RestoRiders pick up and deliver your meals hot and fresh in under 20-30 minutes.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h3>Live Order Sync Tracking</h3>
            <p>Watch your order progress live from the restaurant kitchen preparation up to your front door.</p>
          </div>
        </div>
      </section>

      {/* Main Explore Section */}
      <section id="restaurants" className="menu-section">
        {/* Toggle Tabs: Restaurants Feed vs Dishes Feed */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '35px', paddingBottom: '2px' }}>
          <button
            onClick={() => setFeedTab('restaurants')}
            style={{
              background: 'transparent',
              border: 'none',
              color: feedTab === 'restaurants' ? 'var(--accent)' : '#94a3b8',
              fontSize: '18px',
              fontWeight: '800',
              padding: '12px 24px',
              borderBottom: feedTab === 'restaurants' ? '3px solid var(--accent)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            🏪 Near By Restaurants
          </button>
          <button
            onClick={() => setFeedTab('dishes')}
            style={{
              background: 'transparent',
              border: 'none',
              color: feedTab === 'dishes' ? 'var(--accent)' : '#94a3b8',
              fontSize: '18px',
              fontWeight: '800',
              padding: '12px 24px',
              borderBottom: feedTab === 'dishes' ? '3px solid var(--accent)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            🍔 Explore Dishes & Menu
          </button>
        </div>

        {feedTab === 'restaurants' ? (
          /* RESTAURANTS FEED */
          <>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <span className="section-subtitle">Local Partners</span>
              <h2 className="section-title">Popular Restaurants Near You</h2>
            </div>

            {/* Filter Navigation Tabs */}
            <div className="category-tabs" style={{ gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '30px' }}>
              {['All', 'Rating 4.5+', 'Pure Veg', 'Fast Delivery', 'Cost: Low to High', 'Cost: High to Low'].map((filter) => (
                <button
                  key={filter}
                  className={`category-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Cuisine Filter Navigation Tabs */}
            <div className="category-tabs" style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '10px', justifyContent: 'flex-start', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.04)', gap: '8px' }}>
              {['All', 'Burgers', 'Pizza', 'Chinese', 'Healthy', 'Desserts', 'South Indian', 'Snacks', 'Drinks'].map((cuisine) => (
                <button
                  key={cuisine}
                  className={`category-btn ${activeCuisineFilter === cuisine ? 'active' : ''}`}
                  onClick={() => setActiveCuisineFilter(cuisine)}
                  style={{ padding: '8px 20px', fontSize: '13px' }}
                >
                  {cuisine}
                </button>
              ))}
            </div>

            {/* Dynamic Restaurant Cards Grid */}
            {!isLoaded ? (
              <div style={{ textAlign: 'center', color: '#94a3b8', margin: '40px 0' }}>Loading restaurants...</div>
            ) : sortedAndFilteredRestaurants.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#94a3b8', margin: '40px 0' }}>
                No restaurants found matching your criteria.
              </div>
            ) : (
              <div className="menu-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                {sortedAndFilteredRestaurants.map((res) => (
                  <Link href={`/restaurant/${res.id}`} key={res.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="menu-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div className="menu-img-wrapper" style={{ height: '200px' }}>
                        <img
                          src={res.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80'}
                          alt={res.restaurantName}
                          className="menu-img"
                          style={{ height: '100%', objectFit: 'cover' }}
                        />
                        {res.tag && <span className="menu-tag" style={{ background: 'var(--accent)' }}>{res.tag}</span>}
                        {res.isVeg && (
                          <span className="menu-tag" style={{ background: '#10b981', left: '15px', right: 'auto' }}>
                            🟢 Pure Veg
                          </span>
                        )}
                      </div>

                      <div className="menu-details" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div className="menu-header">
                            <h3 className="menu-name" style={{ fontSize: '20px', fontWeight: '700' }}>{res.restaurantName}</h3>
                            <div className="menu-rating" style={{ background: parseFloat(res.rating || '0') >= 4.5 ? '#10b981' : '#f59e0b', color: 'white' }}>
                              <span>★</span>
                              <span>{res.rating || '4.0'}</span>
                            </div>
                          </div>
                          <p className="menu-desc" style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 12px' }}>
                            {res.cuisines}
                          </p>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#cbd5e1' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              🕒 {res.deliveryTime || '25 mins'}
                            </span>
                            <span>
                              💰 {res.costForTwo || '₹300 for two'}
                            </span>
                          </div>
                          
                          <button style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 10px rgba(249, 115, 22, 0.2)' }}>
                            View Menu
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          /* DISHES/MENU FEED */
          <>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <span className="section-subtitle">Delicious Catalog</span>
              <h2 className="section-title">Explore Dishes Across All Kitchens</h2>
            </div>

            {/* Dish Search & Veg Filters Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '24px', marginBottom: '20px' }}>
              {/* Search dishes */}
              <div className="search-container" style={{ margin: 0, padding: '4px', maxWidth: '350px', width: '100%', boxShadow: 'none' }}>
                <div className="search-input-wrapper" style={{ paddingLeft: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search for dishes, cuisines, or kitchens..."
                    value={dishSearchQuery}
                    onChange={(e) => setDishSearchQuery(e.target.value)}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Food Type filter buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                {(['All', 'Veg', 'Non-Veg', 'Egg'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFoodTypeFilter(type)}
                    style={{
                      background: foodTypeFilter === type ? 'var(--accent)' : 'transparent',
                      color: 'white',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {type === 'Veg' ? '🟢 Veg' : type === 'Non-Veg' ? '🔴 Non-Veg' : type === 'Egg' ? '🟡 Egg' : 'All'}
                  </button>
                ))}
              </div>
            </div>

            {/* Category tabs */}
            <div className="category-tabs" style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '10px', justifyContent: 'flex-start', marginBottom: '30px' }}>
              {dishCategories.map((cat) => (
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

            {/* Dishes Listing Cards Grid */}
            {filteredDishes.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>
                No dishes found matching your search criteria.
              </div>
            ) : (
              <div className="menu-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
                {filteredDishes.map((dish) => (
                  <div key={`${dish.restaurantId}-${dish.id}`} className="menu-card flex flex-col md:flex-row items-center gap-3 p-3 border border-white/5">

                    {/* Dish Thumbnail */}
                    <div className="w-[150px] h-[150px] rounded-2xl overflow-hidden border-2 border-white/15 shrink-0 shadow-md relative group">
                      <img
                        src={dish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'}
                        alt={dish.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Details */}
                    <div style={{ flexGrow: 1, textAlign: 'left', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '10px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          border: dish.foodType === 'Veg'
                            ? '1px solid #10b981'
                            : dish.foodType === 'Egg'
                              ? '1px solid #f59e0b'
                              : '1px solid #ef4444',
                          color: dish.foodType === 'Veg'
                            ? '#10b981'
                            : dish.foodType === 'Egg'
                              ? '#f59e0b'
                              : '#ef4444',
                          fontWeight: 'bold'
                        }}>
                          {dish.foodType === 'Veg' ? '🟢 Veg' : dish.foodType === 'Egg' ? '🟡 Egg' : '🔴 Non-Veg'}
                        </span>

                        {/* Best Seller / New Badge tags */}
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

                        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>
                          ★ {dish.restaurantRating}
                        </span>

                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                          (80+ ratings)
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: 0 }}>{dish.name}</h3>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                            from <Link href={`/restaurant/${dish.restaurantId}`} style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 'bold' }}>{dish.restaurantName}</Link>
                          </span>
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--accent)' }}>{dish.price}</span>
                      </div>

                      <p style={{ color: '#cbd5e1', fontSize: '13px', margin: '10px 0 0 0', lineHeight: '1.5' }}>
                        {dish.desc || 'No description available for this mouth-watering dish.'}
                      </p>
                    </div>

                    {/* Add to Cart Action */}
                    <div className="shrink-0 w-full md:w-auto flex justify-end">
                      <button
                        onClick={() => handleAddDishToCart(dish)}
                        style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '30px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
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
        )}
      </section>

      {/* Restaurant Owner CTA Section */}
      <section className="partner-cta">
        <div className="cta-card">
          <div className="cta-content">
            <h2 className="cta-title">Become a Restaurant Partner</h2>
            <p className="cta-desc">
              Register your kitchen, customize your menu catalog, and manage live incoming delivery orders in real-time. Reach thousands of customers and boost your sales.
            </p>
          </div>
          <Link href="/restaurant" className="cta-btn">
            Register Your Restaurant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              Resto<span>App</span>
            </Link>
            <p>Bringing delicious, hot food from your community’s favorite kitchens straight to your doorstep. Safe, dynamic, and lightning fast.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><a href="#restaurants">Our Partners</a></li>
              <li><a href="#features">How It Works</a></li>
              <li><Link href="/restaurant">Partner Registration</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Developer Hub</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Customer Privacy</a></li>
              <li><a href="#terms">Terms of Delivery</a></li>
              <li><a href="#faq">Partner Terms</a></li>
              <li><Link href="/restaurant">Portal Login</Link></li>
            </ul>
          </div>
          <div className="footer-col footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for exclusive discounts, new arrivals, and food trends.</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 RestoApp Inc. All Rights Reserved.</div>
          <div>Made with Passion for Good Food.</div>
        </div>
      </footer>

      {/* Conflict Modal */}
      {showConflictModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' }}>
          <div style={{ background: 'rgba(19, 28, 49, 0.98)', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '24px', maxWidth: '440px', width: '90%', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', margin: 'auto' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>Items Already in Cart</h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '24px' }}>
              Your basket already contains items from <strong>{cartRestaurantName}</strong>.
              Do you want to discard your cart selection and add dishes from <strong>{pendingItem?.restaurantName}</strong> instead?
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
