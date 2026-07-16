'use client';
import { useState } from 'react';

const RestaurantLogin = ({ toggleView, onLogin }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const existing = localStorage.getItem('restaurants');
      const restaurants = existing ? JSON.parse(existing) : [];

      const matched = restaurants.find(
        (r) =>
          (r.email === emailOrPhone || r.contact === emailOrPhone) &&
          r.password === password
      );

      if (matched) {
        localStorage.setItem('currentRestaurant', JSON.stringify(matched));
        alert('Login Successful!');
        if (onLogin) onLogin(matched);
      } else {
        alert('Invalid Email/Phone or Password!');
      }
    } catch (err) {
      console.error('Failed to authenticate:', err);
      alert('Login authentication failed. Please try again.');
    }
  };

  return (
    <div className="portal-card">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img src="/logo.jpg" alt="RestoApp Logo" style={{ height: '70px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }} />
      </div>
      <h2 className="portal-title" style={{ marginTop: '0', marginBottom: '24px' }}>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Email or Phone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <div className="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <a href="#forgot" className="forgot-password-link">
          Forgot Password?
        </a>

        <button type="submit" className="primary-btn">
          LOGIN
        </button>
      </form>

      <div className="divider">Or login with</div>

      <div className="social-container">
        <button className="social-btn facebook" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
          </svg>
          Facebook
        </button>
        <button className="social-btn instagram" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          Instagram
        </button>
      </div>

      <div className="toggle-mode-text">
        Don't have account?{' '}
        <button className="toggle-mode-btn" onClick={toggleView} type="button">
          Signup Now
        </button>
      </div>
    </div>
  );
};

export default RestaurantLogin;