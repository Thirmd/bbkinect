// src/App.jsx
import React, { useState } from 'react';
import GooeyNav from './GooeyNav';
import CircularGallery from './CircularGallery';
import EventSchedule from './EventSchedule';
import './style.css';

function App() {
  const [activePage, setActivePage] = useState('map');

  // Fungsi untuk render konten berdasarkan halaman aktif
  const renderPage = () => {
    switch (activePage) {
      case 'guest':
        return (
          <section className="page guest-page">
            <h1 className="page-title-guest">🌟 Meet the Guest!</h1>
            <div className="gallery-container">
              <CircularGallery 
                bend={2} 
                textColor="#ffffff" 
                borderRadius={0.05} 
                scrollEase={0.01}
              />
            </div>
          </section>
        );

      case 'event':
        return (
          <section className="page event-page">
            <EventSchedule />
          </section>
        );

      case 'map':
        return (
          <section className="page map-page">
            <h1 className="page-title">🗺️ Event Map</h1>
            <div className="map-placeholder">
              <p>Lokasi event akan ditampilkan di sini.</p>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  // Siapkan item untuk GooeyNav dengan label dan handler klik
  const navItems = [
    { 
      label: "🗺️ Map", 
      onClick: () => setActivePage('map') 
    },
    { 
      label: "🎉 Event Schedule", 
      onClick: () => setActivePage('event') 
    },
    { 
      label: "🌟 Guest Stars", 
      onClick: () => setActivePage('guest') 
    }
  ];

  return (
  <div className="app-container">
    {/* Konten Utama — diberi padding bawah agar tidak tertutup navbar */}
    <main className="main-content" style={{ paddingBottom: '120px' }}>
      {renderPage()}
    </main>

    {/* GooeyNav — sekarang fixed di bawah layar */}
    <GooeyNav
      items={navItems}
      particleCount={7}
      particleDistances={[90, 10]}
      particleR={0}
      initialActiveIndex={0}
      animationTime={600}
      timeVariance={600}
      colors={[1, 2, 3, 1, 2, 3, 1, 4]}
    />
  </div>
);
}

export default App;