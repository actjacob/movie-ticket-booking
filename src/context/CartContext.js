import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();
const MyTicketsContext = createContext();

export const useCart = () => useContext(CartContext);
export const useMyTickets = () => useContext(MyTicketsContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [tickets, setTickets] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const addTicket = (ticket) => {
    setTickets((prev) => [...prev, ticket]);
  };

  const getTickets = () => tickets;

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      <MyTicketsContext.Provider value={{ tickets, addTicket, getTickets }}>
        {children}
      </MyTicketsContext.Provider>
    </CartContext.Provider>
  );
};
