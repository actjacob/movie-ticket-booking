import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import SeatSelection from './components/SeatSelection';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import MyTickets from './components/MyTickets';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route
            path="/movie/:movieId/showtime/:showtimeId"
            element={<SeatSelection />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/my-tickets" element={<MyTickets />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
