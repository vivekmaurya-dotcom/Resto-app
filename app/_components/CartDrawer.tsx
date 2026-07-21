'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    currencySymbol,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'validating' | 'cooking' | 'delivery' | 'completed'>('idle');

  // Lock scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Simulate checkout process
  const startCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('validating');
  };

  useEffect(() => {
    if (checkoutStep === 'validating') {
      const timer = setTimeout(() => {
        setCheckoutStep('cooking');
      }, 1500);
      return () => clearTimeout(timer);
    } else if (checkoutStep === 'cooking') {
      const timer = setTimeout(() => {
        setCheckoutStep('delivery');
      }, 2000);
      return () => clearTimeout(timer);
    } else if (checkoutStep === 'delivery') {
      const timer = setTimeout(() => {
        setCheckoutStep('completed');
        clearCart(); // Clear cart state once order is successfully placed and tracked
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [checkoutStep, clearCart]);

  const handleClose = () => {
    setIsCartOpen(false);
    // If completed, reset to idle on close
    if (checkoutStep === 'completed') {
      setCheckoutStep('idle');
    }
  };

  const handleNewOrder = () => {
    setCheckoutStep('idle');
    setIsCartOpen(false);
  };

  // Fees calculation
  const deliveryFee = cartSubtotal > 30 ? 0 : (currencySymbol === '$' ? 2.99 : 99);
  const tax = cartSubtotal * 0.1;
  const total = cartSubtotal + deliveryFee + tax;

  const formatPrice = (value: number) => {
    return `${currencySymbol}${value.toFixed(2)}`;
  };

  return (
    <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={handleClose}>
      <div className={`cart-drawer-panel ${isCartOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <h3>Your Order</h3>
            {checkoutStep === 'idle' && cart.length > 0 && (
              <span className="cart-count-pill">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
            )}
          </div>
          <button className="cart-close-btn" onClick={handleClose} aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content depending on checkout state */}
        {checkoutStep === 'idle' ? (
          <>
            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="cart-empty-state">
                <div className="cart-empty-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </div>
                <h4>Your cart is empty</h4>
                <p>Add some delicious meals from our menu to start your order.</p>
                <button className="btn-browse-menu" onClick={handleClose}>
                  Browse Cuisines
                </button>
              </div>
            ) : (
              <div className="cart-items-wrapper">
                {cart.map((item) => (
                  <div className="cart-item-card" key={item.id}>
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
                        {/* Quantity Adjusters */}
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

                        {/* Remove Button */}
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
            )}

            {/* Footer Summary (Sticky if items exist) */}
            {cart.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span className="value">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span className="value">
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="summary-row">
                  <span>GST & Service Tax (10%)</span>
                  <span className="value">{formatPrice(tax)}</span>
                </div>
                <hr className="summary-divider" />
                <div className="summary-row total">
                  <span>Grand Total</span>
                  <span className="value total-price">{formatPrice(total)}</span>
                </div>

                <button className="btn-checkout" onClick={startCheckout}>
                  <span>Proceed to Checkout</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          /* Live Order Tracking Screens */
          <div className="order-tracking-container">
            {checkoutStep === 'validating' && (
              <div className="tracking-step active">
                <div className="tracking-anim-circle pulse">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3>Securing Payment...</h3>
                <p>Verifying transaction details and checking restaurant availability.</p>
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
                <h3>Chef is Preparing!</h3>
                <p>Your gourmet meal is currently being crafted using fresh, premium ingredients.</p>
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
                <h3>Order Out for Delivery!</h3>
                <p>Our RestoRider has picked up your food and is speeding towards your location.</p>
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
                <p className="success-desc">Enjoy your fresh, hot meal. Thank you for ordering with RestoApp!</p>
                
                <div className="success-details-card">
                  <div className="detail-item">
                    <span>Delivery Time:</span>
                    <strong>18 mins (Super Fast)</strong>
                  </div>
                  <div className="detail-item">
                    <span>Order Reference:</span>
                    <strong>#RA-98421</strong>
                  </div>
                </div>

                <button className="btn-new-order" onClick={handleNewOrder}>
                  Place a New Order
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
