import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div
        style={{
          maxWidth: '520px',
          margin: '2rem auto',
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 4px 24px rgba(26,34,56,0.10)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#1a2238', marginBottom: '1.5rem' }}>
          {t('cartEmpty') || 'Your cart is empty.'}
        </h2>
        <Link
          to="/"
          style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          {t('backToHome')}
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '2rem auto',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(26,34,56,0.10)',
        padding: '2.5rem 2rem',
      }}
    >
      <h2 style={{ color: '#1a2238', marginBottom: '2rem' }}>
        {t('yourCart') || 'Your Cart'}
      </h2>
      <div style={{ width: '100%', marginBottom: '2rem' }}>
        <div
          style={{
            display: 'flex',
            fontWeight: 'bold',
            color: '#1a2238',
            borderBottom: '1px solid #eee',
            paddingBottom: '0.5rem',
            marginBottom: '0.5rem',
          }}
        >
          <div style={{ flex: 2 }}>{t('movie') || 'Movie'}</div>
          <div style={{ flex: 1 }}>{t('showtime') || 'Showtime'}</div>
          <div style={{ flex: 2 }}>{t('seats') || 'Seats'}</div>
          <div style={{ flex: 1 }}></div>
        </div>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #f4f4f4',
              padding: '0.5rem 0',
            }}
          >
            <div style={{ flex: 2 }}>{item.movieTitle}</div>
            <div style={{ flex: 1 }}>{item.showtime}</div>
            <div style={{ flex: 2 }}>
              {item.seats.map((s) => s.toUpperCase()).join(', ')}
            </div>
            <div style={{ flex: 1 }}>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: '0.3rem 1rem',
                  borderRadius: '20px',
                  border: 'none',
                  background: '#dc3545',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                }}
              >
                {t('remove')}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button
          onClick={handleCheckout}
          style={{
            flex: 1,
            padding: '0.9rem 0',
            borderRadius: '24px',
            border: 'none',
            background: '#1a2238',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(26,34,56,0.08)',
            transition: 'background 0.15s',
          }}
        >
          {t('proceedToCheckout')}
        </button>
        <button
          onClick={clearCart}
          style={{
            flex: 1,
            padding: '0.9rem 0',
            borderRadius: '24px',
            border: 'none',
            background: '#888',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(26,34,56,0.08)',
            transition: 'background 0.15s',
          }}
        >
          {t('clearCart')}
        </button>
      </div>
      <Link
        to="/"
        style={{
          display: 'block',
          marginTop: '2rem',
          color: '#007bff',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        {t('backToHome')}
      </Link>
    </div>
  );
};

export default Cart;
