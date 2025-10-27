// src/pages/EventSchedule.jsx
import React, { useState, useRef } from 'react';
import './EventSchedule.css';

const EventSchedule = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);

  const eventsListRef = useRef(null);

  // Data dummy event
  const events = [
    {
      id: 1,
      title: "Tech Conference 2025",
      location: "Jakarta Convention Center",
      time: "11:00 — 12:00",
      image: "/images/event1.png",
      description: "Ini adalah deskripsi adalah deskripsi adalah deskripsi adalah deskripsi adalah deskripsi adalah deskripsi adalah deskripsi adalah deskripsi."
    },
    {
      id: 2,
      title: "Music Festival",
      location: "Bali Beach Arena",
      time: "14:00 — 16:00",
      image: "/images/event2.png",
      description: "Nikmati musik live dari artis terkenal di pantai Bali dengan pemandangan matahari terbenam yang spektakuler."
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      location: "Bandung Tech Hub",
      time: "18:00 — 20:00",
      image: "/images/event3.png",
      description: "Pertemuan para startup muda untuk mempresentasikan ide mereka kepada investor dan mentor profesional."
    },
    {
      id: 4,
      title: "Art & Culture Expo",
      location: "Yogyakarta Art Museum",
      time: "09:00 — 17:00",
      image: "/images/event4.png",
      description: "Pameran seni rupa kontemporer dari seniman lokal dan internasional. Termasuk workshop dan diskusi budaya."
    },
    {
      id: 5,
      title: "Gaming Tournament",
      location: "Surabaya Esports Arena",
      time: "13:00 — 18:00",
      image: "/images/event5.png",
      description: "Turnamen game multiplayer terbesar se-Indonesia. Hadiah total Rp 500 juta dan merchandise eksklusif."
    },
    {
      id: 6,
      title: "Food Truck Festival",
      location: "Medan City Park",
      time: "10:00 — 22:00",
      image: "/images/event6.png",
      description: "Ratusan food truck dari seluruh Indonesia siap memanjakan lidahmu dengan kuliner khas daerah dan street food modern."
    }
  ];

  const currentEvent = selectedEvent || events[0];

  // Handler untuk drag scroll
  const handleMouseDown = (e) => {
    if (!eventsListRef.current) return;
    setIsDragging(true);
    setStartY(e.clientY);
    setStartScrollTop(eventsListRef.current.scrollTop);
    e.preventDefault(); // Cegah seleksi teks saat drag
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !eventsListRef.current) return;
    const deltaY = e.clientY - startY;
    eventsListRef.current.scrollTop = startScrollTop - deltaY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Auto-scroll ke atas saat event dipilih (opsional)
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="event-schedule-page">
      {/* Sidebar Kiri: Daftar Event (Draggable) */}
      <div
        className="events-list"
        ref={eventsListRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {events.map(event => (
        <div
            key={event.id}
            className={`event-item ${selectedEvent?.id === event.id ? 'active' : ''}`}
            onClick={() => handleEventClick(event)}
            data-id={event.id}
        >
            <img src={event.image} alt={event.title} />
            <div className="event-title">{event.title}</div>
        </div>
        ))}
      </div>

      {/* Konten Kanan: Detail Event */}
      <div className="event-detail">
        <h2>Event Details</h2>
        <div className="detail-card">
          <img src={currentEvent.image} alt={currentEvent.title} className="detail-image" />
          <div className="detail-info">
            <div className="title-location">
              <h3>{currentEvent.title}</h3>
              <span className="location">{currentEvent.location}</span>
            </div>
            <div className="time">{currentEvent.time}</div>
            <p className="description">{currentEvent.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSchedule;