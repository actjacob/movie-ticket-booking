import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { movies } from '../data';
import { useTranslation } from 'react-i18next';

const categories = [
  { label: 'Cinema', active: true },
  { label: 'Theatre', active: false },
  { label: 'Concert', active: false },
  { label: 'Stand Up', active: false },
  { label: 'Sports', active: false },
];

// Mock genres and dates for demo
const getGenres = (movie) => {
  if (movie.id === '1') return ['Adventure', 'Family'];
  if (movie.id === '2') return ['Romance', 'Drama'];
  return ['Action', 'Comedy'];
};
const getDates = (movie) => {
  return movie.showtimes.map((s) => s.time).join(' • ');
};

const MovieList = () => {
  const [search, setSearch] = useState('');
  const { t } = useTranslation();

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div
            style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1a2238' }}
          >
            {t('home')}
          </div>
          {categories.map((cat) => (
            <button
              key={cat.label}
              disabled={!cat.active}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '20px',
                border: 'none',
                background: cat.active ? '#1a2238' : '#e0e0e0',
                color: cat.active ? '#fff' : '#888',
                fontWeight: 'bold',
                cursor: cat.active ? 'pointer' : 'not-allowed',
                boxShadow: cat.active
                  ? '0 2px 8px rgba(26,34,56,0.08)'
                  : 'none',
              }}
            >
              {cat.label}
            </button>
          ))}
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              marginLeft: 'auto',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              width: 320,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.2rem',
          justifyContent: 'center',
        }}
      >
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            style={{
              background: '#fff',
              borderRadius: '14px',
              boxShadow: '0 4px 16px rgba(26,34,56,0.10)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 420,
              border: '1px solid #f2f2f2',
              transition: 'box-shadow 0.15s, transform 0.15s',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow =
                '0 8px 32px rgba(26,34,56,0.16)')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.boxShadow =
                '0 4px 16px rgba(26,34,56,0.10)')
            }
          >
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: '100%', height: '320px', objectFit: 'cover' }}
            />
            <div
              style={{
                padding: '1.1rem 1rem 0.5rem 1rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.08rem',
                  color: '#1a2238',
                  marginBottom: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {movie.title}
              </div>
              <div
                style={{ color: '#222', fontSize: '0.98rem', marginBottom: 4 }}
              >
                {getDates(movie)}
              </div>
              <div
                style={{ color: '#666', fontSize: '0.93rem', marginBottom: 12 }}
              >
                {movie.genres
                  ? movie.genres.map((g, i, arr) => (
                      <span key={g}>
                        {t(g)}
                        {i < arr.length - 1 && (
                          <span style={{ fontWeight: 'bold', margin: '0 6px' }}>
                            •
                          </span>
                        )}
                      </span>
                    ))
                  : null}
              </div>
              <div
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Link
                  to={`/movie/${movie.id}`}
                  style={{
                    background: '#ffe600',
                    color: '#1a2238',
                    fontWeight: 'bold',
                    fontSize: '1.08rem',
                    borderRadius: '6px',
                    padding: '0.7rem 1.5rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(26,34,56,0.08)',
                    border: 'none',
                    letterSpacing: '0.5px',
                    transition: 'background 0.15s',
                    display: 'inline-block',
                  }}
                >
                  {t('getTicket')}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
