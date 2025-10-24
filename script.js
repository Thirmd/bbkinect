/*script.js*/
// === GLOBAL VARIABLE ===
let currentGuestIndex = 0;
let carouselInterval = null;

// Data dummy untuk Schedule
const scheduleData = [
  {
    id: 1,
    title: "Opening Ceremony",
    time: "10:00 - 11:00",
    location: "Main Stage",
    thumbnail: null, // bisa diganti dengan path gambar nanti
    detail: "Acara pembukaan resmi oleh panitia dan sambutan dari ketua acara."
  },
  {
    id: 2,
    title: "Keynote: Future of Tech",
    time: "11:30 - 12:30",
    location: "Hall A",
    thumbnail: null,
    detail: "Pembicara utama membahas tren teknologi 2026."
  },
  {
    id: 3,
    title: "Live Music: DJ Nova",
    time: "14:00 - 15:30",
    location: "Beach Stage",
    thumbnail: null,
    detail: "Penampilan eksklusif dari DJ ternama Asia Tenggara."
  }
];

const guestData = [
  {
    name: "Rizki Febian",
    photo: "assets/images/pprisfeb.png",
    song: {
      title: "Kesempurnaan Cinta",
      artist: "Rizki Febian"
    },
    albums: [
      { title: "Blue Notes", year: "2024", cover: "assets/images/album-blue-notes.jpg" },
      { title: "Late Night Sessions", year: "2023", cover: "assets/images/album-late-night.jpg" },
      { title: "Urban Rhythms", year: "2022", cover: "assets/images/album-urban-rhythms.jpg" }
    ]
  },
  {
    name: "Hindia",
    photo: "assets/images/pphindia.png",
    song: {
      title: "Rumah Ke Rumah",
      artist: "Hindia"
    },
    albums: [
      { title: "Midnight Jazz", year: "2024", cover: "assets/images/album-midnight-jazz.jpg" },
      { title: "Solo Piano", year: "2023", cover: "assets/images/album-solo-piano.jpg" },
      { title: "City Lights", year: "2022", cover: "assets/images/album-city-lights.jpg" }
    ]
  },
  {
    name: "Tenxi",
    photo: "assets/images/pptenxi.png",
    song: {
      title: "Sakit Dadaku",
      artist: "Tenxi"
    },
    albums: [
      { title: "Neural Beats", year: "2024", cover: "assets/images/album-neural-beats.jpg" },
      { title: "Synth Waves", year: "2023", cover: "assets/images/album-synth-waves.jpg" },
      { title: "Future Sound", year: "2022", cover: "assets/images/album-future-sound.jpg" }
    ]
  },
  {
    name: "Bernadya",
    photo: "assets/images/ppbernad.png",
    song: {
      title: "Satu Bulan",
      artist: "Bernadya"
    },
    albums: [
      { title: "Rave Nation", year: "2024", cover: "assets/images/album-rave-nation.jpg" },
      { title: "Bass Drop", year: "2023", cover: "assets/images/album-bass-drop.jpg" },
      { title: "Electro Rush", year: "2022", cover: "assets/images/album-electro-rush.jpg" }
    ]
  }
];

// === NAVIGASI ===
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetPageId = item.dataset.page;

    // Update active item
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Tampilkan halaman yang dipilih
    pages.forEach(page => {
      page.classList.remove('active');
      if (page.id === targetPageId) {
        page.classList.add('active');
      }
    });

    // Jika pindah ke guest, init guest page (sekali saja)
    if (targetPageId === 'guest') {
    // Cek apakah sudah pernah di-init
    if (!window.guestPageInitialized) {
        initGuestPage();
        window.guestPageInitialized = true;
    }
    }
  });
});

// === SCHEDULE ===
function renderSchedule() {
  const container = document.getElementById('schedule-list');
  container.innerHTML = '';

  scheduleData.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <div class="event-thumb">${event.thumbnail ? `<img src="${event.thumbnail}" alt="">` : '🖼️ No Image'}</div>
      <div class="event-title">${event.title}</div>
      <div class="event-time">${event.time} • ${event.location}</div>
      <div class="event-detail">${event.detail}</div>
    `;
    container.appendChild(card);
  });
}
// === RENDER GUEST DETAIL ===
function renderGuestDetail() {
  const guestDetail = document.getElementById('guest-detail');
  const detailPhoto = document.getElementById('detail-photo');
  const guestName = document.getElementById('guest-name');
  const albumsList = document.getElementById('albums-list');
  const songTitle = document.getElementById('song-title');

  const currentGuest = guestData[currentGuestIndex];

  // Render detail
  detailPhoto.innerHTML = `<img src="${currentGuest.photo || 'assets/images/default-guest.jpg'}" alt="${currentGuest.name}">`;
  guestName.textContent = currentGuest.name;
  songTitle.textContent = currentGuest.song?.title || "No Song";

  // Render albums
  albumsList.innerHTML = '';
  currentGuest.albums?.forEach(album => {
    const albumItem = document.createElement('div');
    albumItem.className = 'album-item';
    albumItem.innerHTML = `
      <img src="${album.cover || 'assets/images/default-album.jpg'}" alt="${album.title}">
      <div class="album-info">${album.title}<br>${album.year}</div>
    `;
    albumsList.appendChild(albumItem);
  });

  // Highlight active thumbnail
  updateThumbnailActive();
}

// === UPDATE THUMBNAIL ACTIVE ===
function updateThumbnailActive() {
  const thumbnails = document.querySelectorAll('.thumbnail-item');
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle('active', index === currentGuestIndex);
  });
}

// === INIT CAROUSEL ===
let swiperInstance = null;

function clampValue(min, vw, max) {
  const width = window.innerWidth;
  const value = min + (width * vw / 100);
  return Math.max(min, Math.min(max, value));
}

function initCarousel() {
  const wrapper = document.getElementById('swiper-wrapper');
  if (!wrapper) return;

  // Kosongkan dulu
  wrapper.innerHTML = '';

  // Generate slides
  guestData.forEach((guest, index) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    if (index === currentGuestIndex) slide.classList.add('swiper-slide-active');

    slide.innerHTML = `
      <img src="${guest.photo || 'assets/images/default-guest.jpg'}" alt="${guest.name}">
    `;

    slide.addEventListener('click', () => {
      currentGuestIndex = index;
      renderGuestDetail();
      updateThumbnailActive();
      if (swiperInstance) {
        swiperInstance.slideTo(index); // Scroll ke slide yang dipilih
      }
    });

    wrapper.appendChild(slide);
  });

  // Init Swiper (FILM ROLL MODE)
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper('.guest-swiper', {
    slidesPerView: 'auto', // agar slide tidak penuh layar
    spaceBetween: clampValue(16, 2.5, 24), // gap antar slide
    loop: true,
    freeMode: true, // agar bisa scroll bebas (tidak snap)
    autoplay: {
      delay: 0, // mulai otomatis
      disableOnInteraction: false,
    },
    speed: 3000, // kecepatan scroll (ms)
    allowTouchMove: true, // biarkan user drag
    on: {
      slideChange: function () {
        const realIndex = this.realIndex;
        currentGuestIndex = realIndex % guestData.length;
        renderGuestDetail();
        updateThumbnailActive();
      }
    }
  });

  // Mulai autoplay setelah init
  swiperInstance.autoplay.start();
}


// === INIT GUEST PAGE ===
function initGuestPage() {
  renderGuestDetail();
  initCarousel();
}

// === ON DOM LOAD ===
document.addEventListener('DOMContentLoaded', () => {
  renderSchedule();
});