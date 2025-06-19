import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const navLinks = [
  { to: '/', labelKey: 'home' },
  { to: '/cart', labelKey: 'cart', icon: '🛒' },
  { to: '/my-tickets', labelKey: 'myTickets', icon: '🎟️' },
];

const languages = [{ code: 'en', label: 'EN' }];

const Navbar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: '#1a2238',
        color: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            letterSpacing: '1px',
            color: '#e0e0e0',
          }}
        >
          🎬 MovieTickets
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {navLinks.map((link) => {
          const isActive =
            link.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : '500',
                fontSize: '1rem',
                padding: '0.5rem',
                borderRadius: '4px',
                borderBottom: isActive
                  ? '3px solid #ffe600'
                  : '3px solid transparent',
                background: isActive ? 'rgba(255,230,0,0.08)' : 'transparent',
                transition: 'background 0.15s, border-bottom 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              {link.icon} {t(link.labelKey)}
            </Link>
          );
        })}
        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '2rem' }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              style={{
                background:
                  currentLang === lang.code ? '#ffe600' : 'transparent',
                color: currentLang === lang.code ? '#1a2238' : '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                padding: '0.3rem 0.7rem',
                cursor: 'pointer',
                fontSize: '1rem',
                outline: 'none',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
