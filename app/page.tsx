'use client';

import { useState } from 'react';
import Link from 'next/link';
import './home.css';
import { useCart } from './context/CartContext';
import { CartDrawer } from './_components/CartDrawer';

// Sample Featured Menu Data
const MENU_ITEMS = [
  {
    id: 1,
    name: 'Truffle Mushroom Burger',
    category: 'Burgers',
    price: '$14.99',
    rating: 4.9,
    tag: 'Best Seller',
    desc: 'Juicy wagyu beef patty, wild truffles, melted swiss cheese, caramelized onions on a brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    name: 'Pepperoni & Honey Pizza',
    category: 'Pizza',
    price: '$16.49',
    rating: 4.8,
    tag: 'Trending',
    desc: 'Artisanal sourdough crust, hot honey drizzle, fresh mozzarella, double pepperoni, and fresh basil.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    name: 'Mango Passion Smoothie',
    category: 'Drinks',
    price: '$6.99',
    rating: 4.7,
    tag: 'Refreshing',
    desc: 'Blend of fresh organic mango, passionfruit nectar, Greek yogurt, and raw wild honey.',
    image: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    name: 'Warm Pistachio Brownie',
    category: 'Dessert',
    price: '$8.99',
    rating: 4.9,
    tag: 'Chef Choice',
    desc: 'Rich dark chocolate fudge brownie topped with crushed Iranian pistachios and vanilla gelato.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 5,
    name: 'Avocado Caesar Salad',
    category: 'Salads',
    price: '$11.99',
    rating: 4.6,
    tag: 'Healthy',
    desc: 'Crisp romaine lettuce, fresh avocados, shaved parmesan, garlic croutons, house Caesar dressing.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 6,
    name: 'Crispy Korean Fried Chicken',
    category: 'Burgers',
    price: '$13.99',
    rating: 4.8,
    tag: 'New',
    desc: 'Spicy glazed crispy chicken, house kimchi slaw, pickled cucumbers on toasted sesame bun.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 7,
    name: 'Veg Chowmein',
    category: 'Chowmein',
    price: 'Rs. 149',
    rating: 4.8,
    tag: 'New',
    desc: 'Stir-fried noodles tossed with fresh vegetables and savory Indo-Chinese sauces. Hot, flavorful, and satisfying.',
    image: '/chowmein.png',
  },
];

const CATEGORIES = ['All', 'Burgers', 'Pizza', 'Drinks', 'Dessert', 'Salads', 'Chowmein'];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { cartTotal, addToCart, setIsCartOpen } = useCart();
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  const triggerToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast((prev) => (prev.message === message ? { ...prev, show: false } : prev));
    }, 3000);
  };

  const filteredMenu = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for location/dishes:', searchQuery);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you! ${newsletterEmail} has been subscribed.`);
    setNewsletterEmail('');
  };

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
            <li><a href="#menu">Explore Menu</a></li>
            <li><a href="#features">Our Services</a></li>
            <li><Link href="/restaurant">Restaurant Partner</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)} title="View Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartTotal > 0 && <span className="cart-badge">{cartTotal}</span>}
          </button>

          <Link href="/restaurant" className="btn-partner">
            Partner Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tagline">🔥 Premium Food Delivery Service</span>
          <h1 className="hero-title">
            Discover the Best Food from <span>Your Favorite</span> Restaurants
          </h1>
          <p className="hero-desc">
            Order fresh meals from top-rated restaurants, customized to your taste buds, and delivered directly to your doorstep in minutes.
          </p>

          <form onSubmit={handleSearchSubmit} className="search-container">
            <div className="search-input-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search for restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="search-btn">
              Search
            </button>
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
                <div>Top Rated</div>
                <div>4.9 Stars</div>
              </div>
            </div>
            <div className="floating-badge badge-2">
              <div className="badge-icon">🚀</div>
              <div className="badge-text">
                <div>Super Fast</div>
                <div>25 Min Delivery</div>
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
            <h3>Quality Ingredients</h3>
            <p>Every dish is crafted using fresh, locally sourced, and high-quality organic ingredients to ensure superior taste.</p>
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
            <p>Our dedicated delivery partner network guarantees your meals arrive hot, fresh, and on time, every time.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h3>Loved By Thousands</h3>
            <p>With thousands of 5-star reviews, we are proud to be the highest-rated food service portal in the community.</p>
          </div>
        </div>
      </section>

      {/* Menu Filter Section */}
      <section id="menu" className="menu-section">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-subtitle">Featured Selection</span>
          <h2 className="section-title">Explore Our Popular Cuisines</h2>
        </div>

        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredMenu.map((item) => (
            <div className="menu-card" key={item.id}>
              <div className="menu-img-wrapper">
                <img src={item.image} alt={item.name} className="menu-img" />
                <span className="menu-tag">{item.tag}</span>
              </div>
              <div className="menu-details">
                <div className="menu-header">
                  <h3 className="menu-name">{item.name}</h3>
                  <div className="menu-rating">
                    <span>★</span>
                    <span>{item.rating}</span>
                  </div>
                </div>
                <p className="menu-desc">{item.desc}</p>
                <div className="menu-footer">
                  <span className="menu-price">{item.price}</span>
                  <button
                    className="order-btn"
                    title="Add to Order"
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        desc: item.desc,
                        category: item.category,
                      });
                      triggerToast(`${item.name} added to your cart!`);
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurant Owner CTA Section */}
      <section className="partner-cta">
        <div className="cta-card">
          <div className="cta-content">
            <h2 className="cta-title">Become a Restaurant Partner</h2>
            <p className="cta-desc">
              Register your business, customize your menus, and reach thousands of hungry food lovers in your local neighborhood. Take your sales to the next level today.
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
            <p>Bringing delicious food from your neighborhood’s best kitchens straight to your table. Fast, fresh, and reliable.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><a href="#menu">Our Menu</a></li>
              <li><a href="#features">Services</a></li>
              <li><Link href="/restaurant">Partner Registration</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#help">Help Center</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
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
          <div>© 2026 RestoApp Portal. All Rights Reserved.</div>
          <div>Made with Passion for Good Food.</div>
        </div>
      </footer>

      {/* Toast Notification */}
      <div className={`cart-toast ${toast.show ? 'show' : ''}`}>
        <div className="toast-icon">✨</div>
        <div className="toast-message">{toast.message}</div>
      </div>

      {/* Cart Drawer Panel */}
      <CartDrawer />
    </div>
  );
}
