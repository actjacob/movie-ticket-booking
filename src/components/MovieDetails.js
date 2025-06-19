import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { movies } from '../data';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);

  if (!movie) return <div>Movie not found.</div>;

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '2rem auto',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(26,34,56,0.10)',
        padding: '2rem',
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ flex: '1 1 320px', minWidth: 260 }}>
        <img
          src={movie.poster}
          alt={movie.title}
          style={{
            width: '100%',
            borderRadius: '14px',
            boxShadow: '0 2px 8px rgba(26,34,56,0.10)',
          }}
        />
      </div>
      <div
        style={{
          flex: '2 1 400px',
          minWidth: 260,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2 style={{ marginTop: 0, color: '#1a2238', fontSize: '2rem' }}>
            {movie.title}
          </h2>
          <p
            style={{ color: '#444', fontSize: '1.1rem', marginBottom: '2rem' }}
          >
            {movie.description}
          </p>
          <h4 style={{ color: '#1a2238', marginBottom: '1rem' }}>Showtimes</h4>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}
          >
            {movie.showtimes.map((show) => (
              <button
                key={show.id}
                onClick={() =>
                  navigate(`/movie/${movie.id}/showtime/${show.id}`)
                }
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '20px',
                  border: 'none',
                  background: '#1a2238',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(26,34,56,0.08)',
                  transition: 'background 0.15s',
                }}
              >
                {show.time}
              </button>
            ))}
          </div>
        </div>
        <Link
          to="/"
          style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 'bold',
            marginTop: 'auto',
            alignSelf: 'flex-start',
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default MovieDetails;
