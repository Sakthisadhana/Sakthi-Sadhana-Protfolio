/* ===========================================================
   Sakthi Sadhana — Portfolio interactions (vanilla JS)
=========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Mobile menu ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const barTop = document.getElementById('barTop');
  const barMid = document.getElementById('barMid');
  const barBot = document.getElementById('barBot');

  function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
    barTop.style.transform = '';
    barMid.style.opacity = '1';
    barBot.style.transform = '';
  }

  function toggleMobileMenu() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
      barTop.style.transform = 'translateY(7px) rotate(45deg)';
      barMid.style.opacity = '0';
      barBot.style.transform = 'translateY(-7px) rotate(-45deg)';
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMobileMenu);
  }

  document.querySelectorAll('#mobileMenu a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------- 2. Smooth scrolling for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = document.getElementById('navbar').offsetHeight;
          const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- 3. Navbar scroll effect ---------- */
  const navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ---------- 4. Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const delay = (index % 6) * 80;
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, delay);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- 6. Active navigation state ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('[data-nav]');

  function setActiveNav(id) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { threshold: 0, rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* ---------- 7. Back-to-top button ---------- */
  const backToTop = document.getElementById('backToTop');
  function handleBackToTop() {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', handleBackToTop, { passive: true });
  handleBackToTop();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 8. Image loading effects ---------- */
  document.querySelectorAll('img').forEach((img) => {
    img.style.opacity = img.complete ? '1' : '0';
    img.style.transition = 'opacity 0.6s ease';
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
  });

});
