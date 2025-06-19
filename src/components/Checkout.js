import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart, useMyTickets } from '../context/CartContext';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { addTicket } = useMyTickets();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [guest, setGuest] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guest && (!form.name || !form.email)) {
      setError('Please fill in all fields.');
      return;
    }
    // Add all cart items to tickets
    cart.forEach((item) => {
      addTicket({ ...item });
    });
    clearCart();
    navigate('/confirmation', { state: { name: guest ? 'Guest' : form.name } });
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
          Your cart is empty.
        </h2>
        <Link
          to="/cart"
          style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          ← Back to Cart
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '420px',
        margin: '2rem auto',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(26,34,56,0.10)',
        padding: '2.5rem 2rem',
      }}
    >
      <h2 style={{ color: '#1a2238', marginBottom: '2rem' }}>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            marginBottom: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <input
            type="checkbox"
            id="guest"
            checked={guest}
            onChange={() => setGuest((g) => !g)}
          />
          <label
            htmlFor="guest"
            style={{ color: '#1a2238', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Buy as Guest
          </label>
        </div>
        {guest && (
          <div
            style={{
              marginBottom: '1.2rem',
              color: '#888',
              fontSize: '0.98rem',
            }}
          >
            You can buy tickets as a guest, no account required.
          </div>
        )}
        {!guest && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#1a2238',
                  fontWeight: 'bold',
                }}
              >
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#1a2238',
                  fontWeight: 'bold',
                }}
              >
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              />
            </div>
          </>
        )}
        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
        )}
        <button
          type="submit"
          style={{
            width: '100%',
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
          Buy Tickets
        </button>
      </form>
      <Link
        to="/cart"
        style={{
          display: 'block',
          marginTop: '2rem',
          color: '#007bff',
          textDecoration: 'none',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        ← Back to Cart
      </Link>
    </div>
  );
};

export default Checkout;
