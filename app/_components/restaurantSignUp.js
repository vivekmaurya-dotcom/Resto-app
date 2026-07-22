'use client';
import { useState } from 'react';

const RestaurantSignUp = ({ toggleView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [cuisines, setCuisines] = useState('');
  const [isVeg, setIsVeg] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState('25 mins');
  const [costForTwo, setCostForTwo] = useState('₹300 for two');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newRestaurant = {
      id: Date.now().toString(),
      email,
      password,
      restaurantName,
      city,
      address,
      contact,
      cuisines: cuisines || 'North Indian, Fast Food',
      isVeg,
      deliveryTime: deliveryTime || '25 mins',
      costForTwo: costForTwo || '₹300 for two',
      image: image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80',
      rating: '4.5',
      tag: 'New Outlet'
    };

    try {
      const existing = localStorage.getItem('restaurants');
      const restaurants = existing ? JSON.parse(existing) : [];

      if (restaurants.some((r) => r.email === email)) {
        alert('This Email ID is already registered!');
        return;
      }

      restaurants.push(newRestaurant);
      localStorage.setItem('restaurants', JSON.stringify(restaurants));
      alert('Registration Successful! Please log in.');
      toggleView();
    } catch (err) {
      console.error('Failed to store registration data:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="portal-card">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img src="/logo.jpg" alt="RestoApp Logo" style={{ height: '70px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }} />
      </div>
      <h2 className="portal-title" style={{ marginTop: '0', marginBottom: '24px' }}>SignUp Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <input
            type="email"
            placeholder="Enter Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <div className="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H5v-4h7v4z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Enter Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <div className="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <div className="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Enter Full Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <div className="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </div>
          <input
            type="tel"
            placeholder="Enter Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <div className="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cuisines (e.g. Burgers, Pizza, Chinese)"
            value={cuisines}
            onChange={(e) => setCuisines(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <div className="input-icon">⏱️</div>
          <input
            type="text"
            placeholder="Average Delivery Time (e.g. 25 mins)"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <div className="input-icon">₹</div>
          <input
            type="text"
            placeholder="Cost For Two (e.g. ₹300 for two)"
            value={costForTwo}
            onChange={(e) => setCostForTwo(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <div className="input-icon">🖼️</div>
          <input
            type="url"
            placeholder="Banner Image URL (Unsplash etc.)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', width: '100%' }}>
          <input
            type="checkbox"
            id="isVegCheckbox"
            checked={isVeg}
            onChange={(e) => setIsVeg(e.target.checked)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label htmlFor="isVegCheckbox" style={{ color: '#cbd5e1', fontSize: '13px', cursor: 'pointer', fontWeight: 'bold' }}>🟢 Pure Veg Restaurant</label>
        </div>

        <button type="submit" className="primary-btn">
          SIGN UP
        </button>
      </form>

      <div className="toggle-mode-text">
        Already have Account?{' '}
        <button className="toggle-mode-btn" onClick={toggleView} type="button">
          Login Now
        </button>
      </div>
    </div>
  );
};

export default RestaurantSignUp;