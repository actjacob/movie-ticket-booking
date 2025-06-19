import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { movies } from '../data';
import { useCart } from '../context/CartContext';

const SeatSelection = () => {
  const { movieId, showtimeId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const movie = movies.find((m) => m.id === movieId);
  const showtime = movie?.showtimes.find((s) => s.id === showtimeId);

  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!movie || !showtime) return <div>Showtime not found.</div>;

  const handleSeatClick = (rowIdx, colIdx) => {
    if (showtime.seats[rowIdx][colIdx]) return; // occupied
    const seatId = `${rowIdx}-${colIdx}`;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId],
    );
  };

  const handleAddToCart = () => {
    if (selectedSeats.length === 0) return;
    addToCart({
      id: `${movieId}-${showtimeId}-${selectedSeats.join(',')}`,
      movieId,
      showtimeId,
      movieTitle: movie.title,
      showtime: showtime.time,
      seats: selectedSeats,
    });
    navigate('/cart');
  };

  return (
    <div
      style={{
        maxWidth: '520px',
        margin: '2rem auto',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(26,34,56,0.10)',
        padding: '2.5rem 2rem',
      }}
    >
      <h2 style={{ color: '#1a2238', marginBottom: '0.5rem' }}>
        {movie.title}{' '}
        <span style={{ color: '#888', fontSize: '1rem' }}>
          ({showtime.time})
        </span>
      </h2>
      <h4 style={{ color: '#1a2238', marginBottom: '1.5rem', fontWeight: 500 }}>
        Select your seats
      </h4>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                display: 'inline-block',
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#fff',
                border: '2px solid #1a2238',
              }}
            ></span>
            <span style={{ color: '#444' }}>Available</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                display: 'inline-block',
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#bbb',
                border: '2px solid #bbb',
              }}
            ></span>
            <span style={{ color: '#444' }}>Occupied</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                display: 'inline-block',
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#28a745',
                border: '2px solid #28a745',
              }}
            ></span>
            <span style={{ color: '#444' }}>Selected</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${showtime.seats.length}, 1fr)`,
          gap: '0.7rem',
          margin: '1rem 0',
        }}
      >
        {showtime.seats.map((row, rowIdx) => (
          <div
            key={rowIdx}
            style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center' }}
          >
            {row.map((occupied, colIdx) => {
              const seatId = `${rowIdx}-${colIdx}`;
              const isSelected = selectedSeats.includes(seatId);
              return (
                <button
                  key={colIdx}
                  onClick={() => handleSeatClick(rowIdx, colIdx)}
                  disabled={occupied}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: occupied
                      ? '2px solid #bbb'
                      : isSelected
                      ? '2px solid #28a745'
                      : '2px solid #1a2238',
                    background: occupied
                      ? '#bbb'
                      : isSelected
                      ? '#28a745'
                      : '#fff',
                    color: occupied ? '#fff' : '#1a2238',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    boxShadow: '0 2px 8px rgba(26,34,56,0.08)',
                    cursor: occupied ? 'not-allowed' : 'pointer',
                    transition: 'background 0.15s, border 0.15s',
                  }}
                  title={occupied ? 'Occupied' : 'Available'}
                >
                  {String.fromCharCode(65 + rowIdx)}
                  {colIdx + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <button
        onClick={handleAddToCart}
        disabled={selectedSeats.length === 0}
        style={{
          marginTop: '1.5rem',
          padding: '0.9rem 2.5rem',
          borderRadius: '24px',
          border: 'none',
          background: selectedSeats.length === 0 ? '#ccc' : '#1a2238',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px rgba(26,34,56,0.08)',
          transition: 'background 0.15s',
        }}
      >
        Add to Cart
      </button>
      <Link
        to={`/movie/${movieId}`}
        style={{
          display: 'block',
          marginTop: '1.5rem',
          color: '#007bff',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        ← Back to Movie
      </Link>
    </div>
  );
};

export default SeatSelection;
