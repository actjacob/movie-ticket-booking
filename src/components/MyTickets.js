import React from 'react';
import { useMyTickets } from '../context/CartContext';
import { movies } from '../data';
import { useTranslation } from 'react-i18next';

const MyTickets = () => {
  const { tickets } = useMyTickets();
  const { t } = useTranslation();

  if (!tickets || tickets.length === 0) {
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
          {t('noTickets')}
        </h2>
        <div style={{ color: '#888' }}>{t('ticketsAppear')}</div>
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
        {t('myTickets')}
      </h2>
      <div style={{ width: '100%' }}>
        {tickets.map((item, idx) => {
          const movie = movies.find((m) => m.title === item.movieTitle);
          return (
            <div
              key={item.id + idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #f4f4f4',
                padding: '0.8rem 0',
                gap: '1.2rem',
              }}
            >
              {movie && (
                <img
                  src={movie.poster}
                  alt={item.movieTitle}
                  style={{
                    width: 60,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 1px 4px rgba(26,34,56,0.10)',
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', color: '#1a2238' }}>
                  {item.movieTitle}
                </div>
                <div>{item.showtime}</div>
                <div>{item.seats.map((s) => s.toUpperCase()).join(', ')}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTickets;
