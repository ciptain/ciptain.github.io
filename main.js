/* ==========================================================================
   Cipta Informatika Utama — Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     1. Sticky navbar — ubah background saat scroll
     ------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const SCROLL_THRESHOLD = 40;

  const handleNavbarScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  handleNavbarScroll(); // set state awal saat load
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ------------------------------------------------------------------
     2. Smooth scrolling untuk semua link navigasi (anchor link)
     ------------------------------------------------------------------ */
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId.length <= 1) return; // abaikan href="#" kosong

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();

      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Tutup menu mobile setelah link diklik
      closeMobileMenu();
    });
  });

  /* ------------------------------------------------------------------
     3. Toggle menu hamburger (mobile)
     ------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  const openMobileMenu = () => {
    mobileMenu.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
  };

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMobileMenu = () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  };

  menuToggle.addEventListener('click', toggleMobileMenu);

  // Tutup menu saat viewport melebar ke ukuran desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      closeMobileMenu();
    }
  });

  /* ------------------------------------------------------------------
     4. Tahun berjalan otomatis di footer
     ------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
