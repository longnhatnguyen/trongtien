/**
 * Graceful-04 Wedding Invitation Interactive Engine
 * Groom: Trọng Tiến · Bride: Thu Hương
 */

document.addEventListener('DOMContentLoaded', () => {
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
  const weddingDate = new Date('2027-03-07T07:00:00+07:00').getTime();
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
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__event-title styles-module__WlSJYG__is-visible">Lễ Vu Quy</div>
        <div class="styles-module__WlSJYG__date-and-time">
          <div class="styles-module__WlSJYG__date-and-time-inner">
            <div class="styles-module__WlSJYG__reveal styles-module__WlSJYG__reveal-soft-scale styles-module__WlSJYG__time styles-module__WlSJYG__is-visible">07:00 - Chủ Nhật</div>
            <div class="styles-module__WlSJYG__reveal styles-module__WlSJYG__reveal-soft-scale styles-module__WlSJYG__date styles-module__WlSJYG__is-visible">07.03.2027</div>
          </div>
          <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__lunar-date styles-module__WlSJYG__is-visible">(Nhằm ngày 30 tháng 1 năm Đinh Mùi)</div>
        </div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__venue-label styles-module__WlSJYG__is-visible">Địa điểm:</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__hotel styles-module__WlSJYG__is-visible">Tư gia Nhà gái</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__address styles-module__WlSJYG__is-visible">Xóm 22, Khoái Châu, Hưng Yên</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__is-visible" style="margin-top: 10px;">
          <a class="styles-module__WlSJYG__location-button" href="https://www.google.com/maps/search/?api=1&query=20.828440954639305,105.9531193971634" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg> Chỉ đường
          </a>
        </div>
      </div>
      <div data-event-style="standard" class="styles-module__WlSJYG__invitation-event-block" style="margin-top: 24px;">
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__event-title styles-module__WlSJYG__is-visible">Tiệc Cưới Nhà Gái</div>
        <div class="styles-module__WlSJYG__date-and-time">
          <div class="styles-module__WlSJYG__date-and-time-inner">
            <div class="styles-module__WlSJYG__reveal styles-module__WlSJYG__reveal-soft-scale styles-module__WlSJYG__time styles-module__WlSJYG__is-visible">17:00 - Thứ Sáu</div>
            <div class="styles-module__WlSJYG__reveal styles-module__WlSJYG__reveal-soft-scale styles-module__WlSJYG__date styles-module__WlSJYG__is-visible">06.03.2026</div>
          </div>
          <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__lunar-date styles-module__WlSJYG__is-visible">(Nhằm ngày 18 tháng 1 năm Bính Ngọ)</div>
        </div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__venue-label styles-module__WlSJYG__is-visible">Địa điểm:</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__hotel styles-module__WlSJYG__is-visible">Xóm 22</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__address styles-module__WlSJYG__is-visible">Khoái Châu, Hưng Yên</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__is-visible" style="margin-top: 10px;">
          <a class="styles-module__WlSJYG__location-button" href="https://www.google.com/maps/search/?api=1&query=20.828461010035973,105.9531193971634" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg> Chỉ đường
          </a>
        </div>
      </div>
    `,
    groom: `
      <div data-event-style="standard" class="styles-module__WlSJYG__invitation-event-block">
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__event-title styles-module__WlSJYG__is-visible">Lễ Thành Hôn</div>
        <div class="styles-module__WlSJYG__date-and-time">
          <div class="styles-module__WlSJYG__date-and-time-inner">
            <div class="styles-module__WlSJYG__reveal styles-module__WlSJYG__reveal-soft-scale styles-module__WlSJYG__time styles-module__WlSJYG__is-visible">10:00 - Chủ Nhật</div>
            <div class="styles-module__WlSJYG__reveal styles-module__WlSJYG__reveal-soft-scale styles-module__WlSJYG__date styles-module__WlSJYG__is-visible">07.03.2027</div>
          </div>
          <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__lunar-date styles-module__WlSJYG__is-visible">(Nhằm ngày 30 tháng 1 năm Đinh Mùi)</div>
        </div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__venue-label styles-module__WlSJYG__is-visible">Địa điểm:</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__hotel styles-module__WlSJYG__is-visible">Tư gia Nhà trai</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__address styles-module__WlSJYG__is-visible">Số nhà 5, Ngõ 56, Siêu Quần, Đại Thanh, Hà Nội</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__is-visible" style="margin-top: 10px;">
          <a class="styles-module__WlSJYG__location-button" href="https://www.google.com/maps/search/?api=1&query=20.913905305657302,105.80751836299896" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg> Chỉ đường
          </a>
        </div>
      </div>
      <div data-event-style="standard" class="styles-module__WlSJYG__invitation-event-block" style="margin-top: 24px;">
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__event-title styles-module__WlSJYG__is-visible">Tiệc Cưới Nhà Trai</div>
        <div class="styles-module__WlSJYG__date-and-time">
          <div class="styles-module__WlSJYG__date-and-time-inner">
            <div class="styles-module__WlSJYG__reveal styles-module__WlSJYG__reveal-soft-scale styles-module__WlSJYG__time styles-module__WlSJYG__is-visible">18:00 - Thứ Sáu</div>
            <div class="styles-module__WlSJYG__reveal styles-module__WlSJYG__reveal-soft-scale styles-module__WlSJYG__date styles-module__WlSJYG__is-visible">06.03.2026</div>
          </div>
          <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__lunar-date styles-module__WlSJYG__is-visible">(Nhằm ngày 18 tháng 1 năm Bính Ngọ)</div>
        </div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up text styles-module__WlSJYG__venue-label styles-module__WlSJYG__is-visible">Địa điểm:</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__hotel styles-module__WlSJYG__is-visible">Số nhà 5, Ngõ 56</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__address styles-module__WlSJYG__is-visible">Siêu Quần, Đại Thanh, Hà Nội</div>
        <div class="styles-module__WlSJYG__reveal reveal-fade-up styles-module__WlSJYG__is-visible" style="margin-top: 10px;">
          <a class="styles-module__WlSJYG__location-button" href="https://www.google.com/maps/search/?api=1&query=20.913905305657302,105.80751836299896" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg> Chỉ đường
          </a>
        </div>
      </div>
    `
  };

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchBtns.forEach(b => b.classList.remove('styles-module__WlSJYG__active'));
      btn.classList.add('styles-module__WlSJYG__active');
      const isGroom = btn.textContent.includes('Nhà trai');
      eventContainer.innerHTML = isGroom ? eventsData.groom : eventsData.bride;
    });
  });
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
      this.color = Math.random() > 0.4 
        ? 'rgba(215, 68, 85, ' // Rose red
        : 'rgba(212, 175, 55, '; // Gold dust
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
