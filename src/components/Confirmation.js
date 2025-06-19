import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const name = location.state?.name || 'Guest';

  return (
    <div
      style={{
        maxWidth: '420px',
        margin: '2rem auto',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(26,34,56,0.10)',
        padding: '2.5rem 2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
      <h2 style={{ color: '#1a2238', marginBottom: '1rem' }}>
        Thank you, {name}!
      </h2>
      <p style={{ color: '#444', marginBottom: '2rem' }}>
        Your order has been confirmed.
      </p>
      <Link
        to="/my-tickets"
        style={{
          color: '#fff',
          background: '#1a2238',
          padding: '0.8rem 2rem',
          borderRadius: '24px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          boxShadow: '0 2px 8px rgba(26,34,56,0.08)',
          transition: 'background 0.15s',
        }}
      >
        Go to My Tickets
      </Link>
    </div>
  );
};

export default Confirmation;
