/**
 * Graceful-04 Wedding Invitation Interactive Engine
 * Groom: Trọng Tiến · Bride: Thu Hương
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Interactive 3D Envelope Opening Experience
  initEnvelope();

  // 1. URL Parameter Guest Personalization
  initGuestName();

  // 2. Audio Player & Autoplay Handling
  initAudioPlayer();

  // 3. Countdown Timer
  initCountdown();

  // 4. Side Switcher (Nhà Gái / Nhà Trai)
  initSideSwitcher();

  // 5. Scroll Reveal Observer
  initScrollReveal();

  // 6. Interactive Lightbox
  initLightbox();

  // 7. Interactive Gift Box Modal & QR Banking
  initGiftModal();

  // 8. Live Guestbook & Wishes System
  initGuestbook();

  // 9. RSVP Form Handling
  initRSVP();

  // 10. Ambient Canvas Particles (Falling Petals & Gold Dust)
  initParticles();

  // 11. Handle Curtain Opening Sides Fadeout
  initCurtains();
});

/* ==========================================================
   0. INTERACTIVE 3D ENVELOPE OPENING EXPERIENCE
   ========================================================== */
function initEnvelope() {
  const envelopeScreen = document.getElementById('envelopeScreen');
  const envelopeCard = document.getElementById('envelopeCard');
  const openBtn = document.getElementById('openInvitationBtn');
  const waxSeal = document.getElementById('waxSeal');
  const envelopeFlap = document.getElementById('envelopeFlap');
  const envelopeLetter = document.getElementById('envelopeLetter');
  const envelopeGuestName = document.getElementById('envelopeGuestName');

  if (!envelopeScreen) return;

  // Sync guest name from URL parameter (?to= or ?guest=)
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to') || urlParams.get('guest');
  if (guestName && envelopeGuestName) {
    envelopeGuestName.textContent = decodeURIComponent(guestName).trim();
  }

  let isOpening = false;

  function handleOpenEnvelope(e) {
    if (e) e.stopPropagation();
    if (isOpening) return;
    isOpening = true;

    // 1. Play wedding audio immediately upon direct user gesture
    playAudio();

    // 2. Break wax seal with pop & golden fade
    if (waxSeal) {
      waxSeal.classList.add('broken');
    }

    // 3. Open top flap with 3D rotation
    setTimeout(() => {
      if (envelopeFlap) envelopeFlap.classList.add('opened');
    }, 120);

    // 4. Slide letter up from inside envelope
    setTimeout(() => {
      if (envelopeLetter) envelopeLetter.classList.add('slide-up');
    }, 380);

    // 5. Trigger celebratory confetti burst
    triggerConfettiBurst();

    // 6. Smoothly fade out envelope screen to reveal main invitation
    setTimeout(() => {
      envelopeScreen.classList.add('opened');
    }, 850);

    // 7. Hide completely to allow full page scrolling and interaction
    setTimeout(() => {
      envelopeScreen.style.display = 'none';
    }, 1600);
  }

  if (openBtn) openBtn.addEventListener('click', handleOpenEnvelope);
  if (waxSeal) waxSeal.addEventListener('click', handleOpenEnvelope);
  if (envelopeCard) envelopeCard.addEventListener('click', handleOpenEnvelope);
}

function triggerConfettiBurst() {
  const colors = ['#E07A8B', '#C85A70', '#FAD2E1', '#FFF0F5', '#FFFFFF', '#DDA7A5', '#FCE7EC'];
  const burstCount = 46;

  for (let i = 0; i < burstCount; i++) {
    const el = document.createElement('div');
    el.className = 'envelope-confetti';
    const bg = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 6;
    const isCircle = Math.random() > 0.45;

    el.style.cssText = `
      position: fixed;
      left: 50%;
      top: 50%;
      width: ${size}px;
      height: ${size * (isCircle ? 1 : 1.7)}px;
      background: ${bg};
      border-radius: ${isCircle ? '50%' : '2px'};
      pointer-events: none;
      z-index: 10001;
      opacity: 1;
      transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg);
      transition: transform 1.25s cubic-bezier(0.12, 0.8, 0.32, 1), opacity 1.25s ease-out;
    `;
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 280 + 90;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance + (Math.random() * 60 + 25);

    requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) rotate(${Math.random() * 720}deg) scale(${Math.random() * 0.5 + 0.5})`;
      el.style.opacity = '0';
    });

    setTimeout(() => el.remove(), 1450);
  }
}

/* ==========================================================
   1. GUEST NAME PERSONALIZATION (?to=Tên_Khách)
   ========================================================== */
function initGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to') || urlParams.get('guest');
  if (guestName) {
    const formatted = decodeURIComponent(guestName).trim();
    const guestNameEl = document.querySelector('.styles-module__WlSJYG__invitation-guest-name');
    if (guestNameEl) {
      guestNameEl.textContent = formatted;
    }
    // Pre-fill RSVP input
    const rsvpInput = document.querySelector('.styles-module__WlSJYG__form-group input');
    if (rsvpInput) {
      rsvpInput.value = formatted;
    }
    document.title = `Thiệp Mời Cưới Trọng Tiến & Thu Hương · Kính mời: ${formatted}`;
  }
}

/* ==========================================================
   2. AUDIO PLAYER
   ========================================================== */
let audioPlaying = false;
const weddingAudio = new Audio('assets/audio/wedding-song.mp3');
weddingAudio.volume = 0.6;
weddingAudio.loop = true;

function initAudioPlayer() {
  const discBtn = document.getElementById('vinylDiscBtn');
  if (!discBtn) return;

  discBtn.addEventListener('click', toggleAudio);

  // Play on first user gesture anywhere on screen
  const enableAudioOnGesture = () => {
    if (!audioPlaying) {
      playAudio();
    }
    document.removeEventListener('click', enableAudioOnGesture);
    document.removeEventListener('touchstart', enableAudioOnGesture);
  };

  document.addEventListener('click', enableAudioOnGesture, { once: true });
  document.addEventListener('touchstart', enableAudioOnGesture, { once: true });
}

function playAudio() {
  weddingAudio.currentTime = Math.max(weddingAudio.currentTime, 7); // skip silence intro
  weddingAudio.play().then(() => {
    audioPlaying = true;
    const discBtn = document.getElementById('vinylDiscBtn');
    if (discBtn) {
      discBtn.classList.remove('paused');
      discBtn.classList.add('spinning');
    }
    showToast('🎵 Đang phát nhạc: Cùng Anh (Acoustic)');
  }).catch(() => {
    // Autoplay was blocked
  });
}

function pauseAudio() {
  weddingAudio.pause();
  audioPlaying = false;
  const discBtn = document.getElementById('vinylDiscBtn');
  if (discBtn) {
    discBtn.classList.add('paused');
  }
}

function toggleAudio() {
  if (audioPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

/* ==========================================================
   3. REALTIME COUNTDOWN
   ========================================================== */
function initCountdown() {
  // Target: March 7, 2027 07:00:00 GMT+7
  const weddingDate = new Date('2026-11-28T16:00:00+07:00').getTime();
  const digitValues = document.querySelectorAll('.styles-module__WlSJYG__countdown-piece .styles-module__WlSJYG__value');

  function update() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      if (digitValues.length >= 4) {
        digitValues[0].textContent = '00';
        digitValues[1].textContent = '00';
        digitValues[2].textContent = '00';
        digitValues[3].textContent = '00';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (digitValues.length >= 4) {
      digitValues[0].textContent = days < 10 ? '0' + days : days;
      digitValues[1].textContent = hours < 10 ? '0' + hours : hours;
      digitValues[2].textContent = minutes < 10 ? '0' + minutes : minutes;
      digitValues[3].textContent = seconds < 10 ? '0' + seconds : seconds;
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================
   4. SIDE SWITCHER (Nhà Gái / Nhà Trai)
   ========================================================== */
function initSideSwitcher() {
  const switchBtns = document.querySelectorAll('.styles-module__WlSJYG__side-switch button');
  const eventContainer = document.getElementById('eventsBlockContainer');
  if (!switchBtns.length || !eventContainer) return;

  const eventsData = {
    bride: `
      <div data-event-style="standard" class="styles-module__WlSJYG__invitation-event-block">
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__event-title styles-module__WlSJYG__is-visible">Lễ Thành Hôn</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__is-visible" style="font-family: var(--font-g4-lora, serif); font-size: 16px; font-weight: 600; color: #8C5B66; margin-top: 4px; text-align: center; letter-spacing: 0.5px;">Bữa Cơm Thân Mật</div>
        <div class="styles-module__WlSJYG__date-and-time">
          <div class="styles-module__WlSJYG__date-and-time-inner">
            <div class="styles-module__WlSJYG__reveal styles-module__WlSJYG__reveal-soft-scale styles-module__WlSJYG__time styles-module__WlSJYG__is-visible">16:00 - Thứ Bảy</div>
            <div class="styles-module__WlSJYG__reveal styles-module__WlSJYG__reveal-soft-scale styles-module__WlSJYG__date styles-module__WlSJYG__is-visible">28.11.2026</div>
          </div>
          <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__lunar-date styles-module__WlSJYG__is-visible">(Tức ngày 20 tháng 10 năm Bính Ngọ)</div>
        </div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__venue-label styles-module__WlSJYG__is-visible">Địa điểm:</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__hotel styles-module__WlSJYG__is-visible">Tư gia Nhà gái</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__address styles-module__WlSJYG__is-visible">Thôn Cam Giá, xã Vĩnh Phú, tỉnh Phú Thọ</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__is-visible" style="margin-top: 10px;">
          <a class="styles-module__WlSJYG__location-button" href="https://www.google.com/maps/search/?api=1&query=Th%C3%B4n+Cam+Gi%C3%A1%2C+x%C3%A3+V%C4%A9nh+Ph%C3%BA%2C+t%E1%BB%89nh+Ph%C3%BA+Th%E1%BB%8D" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg> Chỉ đường
          </a>
        </div>
      </div>
    `,
    groom: `
      <div data-event-style="standard" class="styles-module__WlSJYG__invitation-event-block">
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__event-title styles-module__WlSJYG__is-visible">Lễ Thành Hôn</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__is-visible" style="font-family: var(--font-g4-lora, serif); font-size: 16px; font-weight: 600; color: #8C5B66; margin-top: 4px; text-align: center; letter-spacing: 0.5px;">Bữa Cơm Thân Mật</div>
        <div class="styles-module__WlSJYG__date-and-time">
          <div class="styles-module__WlSJYG__date-and-time-inner">
            <div class="styles-module__WlSJYG__reveal styles-module__WlSJYG__reveal-soft-scale styles-module__WlSJYG__time styles-module__WlSJYG__is-visible">16:00 - Thứ Bảy</div>
            <div class="styles-module__WlSJYG__reveal styles-module__WlSJYG__reveal-soft-scale styles-module__WlSJYG__date styles-module__WlSJYG__is-visible">28.11.2026</div>
          </div>
          <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__lunar-date styles-module__WlSJYG__is-visible">(Tức ngày 20 tháng 10 năm Bính Ngọ)</div>
        </div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__venue-label styles-module__WlSJYG__is-visible">Địa điểm:</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__hotel styles-module__WlSJYG__is-visible">Tư gia Nhà trai</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__address styles-module__WlSJYG__is-visible">Thôn Phương Man, xã Đông Thụy Anh, tỉnh Hưng Yên</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__is-visible" style="margin-top: 10px;">
          <a class="styles-module__WlSJYG__location-button" href="https://www.google.com/maps/search/?api=1&query=Th%C3%B4n+Ph%C6%B0%C6%A1ng+Man%2C+x%C3%A3+%C4%90%C3%B4ng+Th%E1%BB%A5y+Anh%2C+t%E1%BB%89nh+H%C6%B0ng+Y%C3%AAn" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg> Chỉ đường
          </a>
        </div>
      </div>
    `
  };

  function setSide(isGroom) {
    switchBtns.forEach(b => {
      const match = isGroom ? b.textContent.includes('Nhà trai') : b.textContent.includes('Nhà gái');
      b.classList.toggle('styles-module__WlSJYG__active', match);
    });
    eventContainer.innerHTML = isGroom ? eventsData.groom : eventsData.bride;
  }

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isGroom = btn.textContent.includes('Nhà trai');
      setSide(isGroom);
    });
  });

  // Check URL parameter (?side=trai / ?side=gai)
  const urlParams = new URLSearchParams(window.location.search);
  const sideParam = urlParams.get('side');
  if (sideParam) {
    if (sideParam.toLowerCase().includes('gai') || sideParam.toLowerCase().includes('bride')) {
      setSide(false);
    } else if (sideParam.toLowerCase().includes('trai') || sideParam.toLowerCase().includes('groom')) {
      setSide(true);
    }
  }
}


/* ==========================================================
   5. SCROLL REVEAL OBSERVER
   ========================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.styles-module__WlSJYG__reveal, .reveal-fade-up');
  
  reveals.forEach(el => {
    el.classList.add('styles-module__WlSJYG__reveal-ready');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('styles-module__WlSJYG__is-visible');
        entry.target.classList.add('styles-module__WlSJYG__reveal-settled');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================
   6. INTERACTIVE LIGHTBOX
   ========================================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const closeBtn = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImg) return;

    const galleryImages = [
    'assets/photos/gallery-tilted-1.jpg',
    'assets/photos/gallery-tilted-2.jpg',
    'assets/photos/gallery-1.jpg',
    'assets/photos/gallery-2.jpg',
    'assets/photos/gallery-3.jpg',
    'assets/photos/gallery-4.jpg',
    'assets/photos/gallery-5.jpg',
    'assets/photos/gallery-6.jpg',
    'assets/photos/gallery-7.jpg',
    'assets/photos/gallery-8.jpg'
  ];

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
    lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Click on gallery photos
  const clickablePhotos = document.querySelectorAll(
    '.styles-module__WlSJYG__photo, .styles-module__WlSJYG__gallery-image, .styles-module__WlSJYG__film-images img'
  );
  clickablePhotos.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const img = btn.querySelector('img') || btn;
      const src = img.getAttribute('src');
      const foundIdx = galleryImages.indexOf(src);
      openLightbox(foundIdx !== -1 ? foundIdx : idx % galleryImages.length);
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

/* ==========================================================
   7. INTERACTIVE GIFT MODAL & VIETQR
   ========================================================== */
function initGiftModal() {
  const giftModal = document.getElementById('giftModal');
  const openGiftBtn = document.querySelector('.styles-module__WlSJYG__present-box button');
  const closeGiftBtn = document.getElementById('closeGiftModal');

  if (!giftModal || !openGiftBtn) return;

  openGiftBtn.addEventListener('click', () => {
    giftModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  if (closeGiftBtn) {
    closeGiftBtn.addEventListener('click', () => {
      giftModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  giftModal.addEventListener('click', (e) => {
    if (e.target === giftModal) {
      giftModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Gift Tabs: Groom vs Bride
  const tabGroom = document.getElementById('giftTabGroom');
  const tabBride = document.getElementById('giftTabBride');
  const paneGroom = document.getElementById('giftPaneGroom');
  const paneBride = document.getElementById('giftPaneBride');

  if (tabGroom && tabBride) {
    tabGroom.addEventListener('click', () => {
      tabGroom.classList.add('active');
      tabBride.classList.remove('active');
      paneGroom.style.display = 'block';
      paneBride.style.display = 'none';
    });
    tabBride.addEventListener('click', () => {
      tabBride.classList.add('active');
      tabGroom.classList.remove('active');
      paneGroom.style.display = 'none';
      paneBride.style.display = 'block';
    });
  }

  // Copy Account Number
  window.copyAccountNumber = function(accNumber) {
    navigator.clipboard.writeText(accNumber).then(() => {
      showToast(`✨ Đã sao chép số tài khoản: ${accNumber}`);
    }).catch(() => {
      showToast(`STK: ${accNumber}`);
    });
  };
}

/* ==========================================================
   8. GUESTBOOK & WISHES SYSTEM
   ========================================================== */
const DEFAULT_WISHES = [
  {
    name: 'Bác Nguyễn Văn Hùng',
    side: 'Khách nhà trai',
    time: 'Vừa xong',
    message: 'Chúc hai cháu Trọng Tiến & Thu Hương trăm năm hạnh phúc, đầu bạc răng long, luôn thương yêu và thấu hiểu lẫn nhau!'
  },
  {
    name: 'Chị Mai Linh & Anh Tuấn',
    side: 'Khách nhà gái',
    time: '1 giờ trước',
    message: 'Mừng ngày trọng đại của Thu Hương & Trọng Tiến! Chúc đôi uyên ương có một hành trình hôn nhân ngọt ngào và đong đầy tiếng cười.'
  },
  {
    name: 'Team Bạn Thân Cấp 3',
    side: 'Khách nhà trai',
    time: 'Hôm nay',
    message: 'Chúc mừng chú rể Trọng Tiến đã rước được cô dâu Thu Hương xinh đẹp về dinh! Sớm có thiên thần nhỏ nhé!'
  }
];

function initGuestbook() {
  const guestbookModal = document.getElementById('guestbookModal');
  const openModalBtn = document.querySelector('.styles-module__WlSJYG__guestbook-start-button');
  const closeModalBtn = document.getElementById('closeGuestbookModal');
  const submitWishBtn = document.getElementById('submitWishBtn');
  const wishesListContainer = document.querySelector('.styles-module__WlSJYG__comment-list');
  const signatureCount = document.querySelector('.styles-module__WlSJYG__guestbook-board-heading small');

  if (!guestbookModal || !openModalBtn) return;

  openModalBtn.addEventListener('click', () => {
    guestbookModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      guestbookModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  guestbookModal.addEventListener('click', (e) => {
    if (e.target === guestbookModal) {
      guestbookModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Load wishes from LocalStorage or Default
  let savedWishes = JSON.parse(localStorage.getItem('wedding_wishes') || 'null');
  if (!savedWishes) {
    savedWishes = DEFAULT_WISHES;
    localStorage.setItem('wedding_wishes', JSON.stringify(savedWishes));
  }

  function renderWishes() {
    if (!wishesListContainer) return;
    wishesListContainer.innerHTML = '';
    
    if (signatureCount) {
      signatureCount.textContent = `${savedWishes.length} chữ ký`;
    }

    savedWishes.forEach(w => {
      const card = document.createElement('div');
      card.className = 'guest-wish-card';
      card.innerHTML = `
        <div class="guest-wish-header">
          <span class="guest-wish-name">${escapeHtml(w.name)}</span>
          <span class="guest-wish-tag">${escapeHtml(w.side || 'Khách mời')}</span>
        </div>
        <div class="guest-wish-content">${escapeHtml(w.message)}</div>
        <div class="guest-wish-time">${w.time}</div>
      `;
      wishesListContainer.appendChild(card);
    });
  }

  renderWishes();

  if (submitWishBtn) {
    submitWishBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('wishNameInput');
      const sideInput = document.querySelector('input[name="wishSide"]:checked');
      const msgInput = document.getElementById('wishMessageInput');

      if (!nameInput.value.trim() || !msgInput.value.trim()) {
        alert('Vui lòng nhập Họ tên và Lời chúc của bạn nhé!');
        return;
      }

      const newWish = {
        name: nameInput.value.trim(),
        side: sideInput ? sideInput.value : 'Khách mời',
        time: 'Vừa xong',
        message: msgInput.value.trim()
      };

      savedWishes.unshift(newWish);
      localStorage.setItem('wedding_wishes', JSON.stringify(savedWishes));
      renderWishes();

      // Gửi lưu file text vào server backend nếu có
      try {
        fetch('/api/wish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newWish)
        }).catch(() => {});
      } catch (err) {}

      guestbookModal.classList.remove('active');
      document.body.style.overflow = '';
      nameInput.value = '';
      msgInput.value = '';

      showToast('💌 Cảm ơn lời chúc ngọt ngào của bạn!');
      burstConfetti();
    });
  }
}

/* ==========================================================
   9. RSVP FORM
   ========================================================== */
function initRSVP() {
  const attendanceBtns = document.querySelectorAll('.styles-module__WlSJYG__rsvp-options button');
  const sideBtns = document.querySelectorAll('.styles-module__WlSJYG__guest-side-fields button');
  const stepperMinus = document.querySelector('.styles-module__WlSJYG__attendance-stepper button:first-child');
  const stepperPlus = document.querySelector('.styles-module__WlSJYG__attendance-stepper button:last-child');
  const stepperVal = document.querySelector('.styles-module__WlSJYG__attendance-stepper strong');
  const submitBtn = document.querySelector('.styles-module__WlSJYG__rsvp-submit');
  const nameInput = document.querySelector('.styles-module__WlSJYG__form-group input');

  let attending = 'yes';
  let side = 'Groom';
  let guestCount = 1;

  attendanceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      attendanceBtns.forEach(b => b.classList.remove('styles-module__WlSJYG__active'));
      btn.classList.add('styles-module__WlSJYG__active');
      attending = btn.textContent.includes('sẽ đến') ? 'yes' : 'no';
    });
  });

  sideBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sideBtns.forEach(b => b.classList.remove('styles-module__WlSJYG__active'));
      btn.classList.add('styles-module__WlSJYG__active');
      side = btn.textContent.includes('nhà trai') ? 'Groom' : 'Bride';
    });
  });

  if (stepperMinus && stepperPlus && stepperVal) {
    stepperMinus.addEventListener('click', () => {
      if (guestCount > 1) {
        guestCount--;
        stepperVal.textContent = guestCount;
      }
    });
    stepperPlus.addEventListener('click', () => {
      if (guestCount < 10) {
        guestCount++;
        stepperVal.textContent = guestCount;
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        alert('Vui lòng nhập Họ và tên của bạn nhé!');
        if (nameInput) nameInput.focus();
        return;
      }

      const rsvpData = { name, attending, side, guestCount, date: new Date().toISOString() };
      localStorage.setItem('wedding_rsvp', JSON.stringify(rsvpData));

      // Gửi lưu file text vào server backend nếu có
      try {
        fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rsvpData)
        }).catch(() => {});
      } catch (err) {}

      if (attending === 'yes') {
        showToast(`🎉 Cảm ơn ${name}! Rất hân hạnh được đón tiếp bạn và gia đình!`);
        burstConfetti();
      } else {
        showToast(`💌 Cảm ơn ${name} đã phản hồi! Hẹn gặp bạn trong dịp gần nhất!`);
      }
    });
  }
}

/* ==========================================================
   10. CANVASES PARTICLES (Falling Petals & Golden Sparkles)
   ========================================================== */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const TOTAL_PETALS = 22;

  class Petal {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = -20 - Math.random() * 50;
      this.size = 8 + Math.random() * 12;
      this.speedY = 1 + Math.random() * 1.5;
      this.speedX = Math.random() * 1 - 0.5;
      this.angle = Math.random() * 360;
      this.spin = (Math.random() - 0.5) * 2;
      this.alpha = 0.5 + Math.random() * 0.4;
      const palette = [
        'rgba(255, 182, 193, ', // Soft blush pink
        'rgba(250, 210, 225, ', // Pastel petal pink
        'rgba(224, 122, 139, ', // Modern rose
        'rgba(245, 214, 216, ', // Rose gold shimmer
        'rgba(255, 255, 255, '  // Pure white petal
      ];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }
    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.015) * 1.2 + this.speedX;
      this.angle += this.spin;

      if (this.y > height + 20) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.beginPath();
      // Draw delicate petal shape
      ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < TOTAL_PETALS; i++) {
    particles.push(new Petal());
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(loop);
  }
  loop();
}

/* ==========================================================
   11. CURTAIN OPENING EFFECT
   ========================================================== */
function initCurtains() {
  const openingSides = document.querySelector('.styles-module__WlSJYG__opening-sides');
  if (openingSides) {
    // Hide curtain container after animation completes so it never intercepts touch/clicks
    setTimeout(() => {
      openingSides.style.display = 'none';
    }, 4500);
  }
}

/* ==========================================================
   HELPERS
   ========================================================== */
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3600);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function burstConfetti() {
  // Simple cheerful celebratory confetti burst using particle canvas
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const count = 40;
  const confettis = [];
  const colors = ['#8F1D2C', '#D4AF37', '#FFFDF9', '#E5A93B'];

  for (let i = 0; i < count; i++) {
    confettis.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.8) * 14,
      size: 6 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }

  let frames = 0;
  function animateConfetti() {
    confettis.forEach(c => {
      c.x += c.vx;
      c.y += c.vy;
      c.vy += 0.4; // gravity
      c.alpha -= 0.02;

      if (c.alpha > 0) {
        ctx.save();
        ctx.fillStyle = c.color;
        ctx.globalAlpha = Math.max(0, c.alpha);
        ctx.fillRect(c.x, c.y, c.size, c.size);
        ctx.restore();
      }
    });

    frames++;
    if (frames < 60) {
      requestAnimationFrame(animateConfetti);
    }
  }
  animateConfetti();
}
