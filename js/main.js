document.addEventListener('DOMContentLoaded', () => {
  /* Mobiles Menü */
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (navToggle && navMobile) {
    const main = document.querySelector('main');
    const footer = document.querySelector('.site-footer');

    navToggle.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
      /* Fokus-Falle: Seiteninhalt hinter dem Overlay per inert aus Tab-Reihenfolge/A11y-Baum nehmen */
      if (main) main.inert = isOpen;
      if (footer) footer.inert = isOpen;
      if (isOpen) {
        navMobile.querySelector('a')?.focus();
      }
    });

    const closeNavMobile = () => {
      navMobile.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (main) main.inert = false;
      if (footer) footer.inert = false;
    };

    navMobile.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNavMobile);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMobile.classList.contains('is-open')) {
        closeNavMobile();
        navToggle.focus();
      }
    });
  }

  /* FAQ-Accordion */
  document.querySelectorAll('.accordion-item').forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.accordion-item').forEach((el) => {
        el.classList.remove('is-open');
        el.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Hero-Video: prefers-reduced-motion respektieren (nicht per CSS steuerbar) */
  const heroVideo = document.querySelector('.hero__visual-img');
  if (heroVideo) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotionPreference = () => {
      if (reduceMotion.matches) {
        heroVideo.pause();
        heroVideo.removeAttribute('autoplay');
      } else {
        heroVideo.setAttribute('autoplay', '');
        heroVideo.play().catch(() => {});
      }
    };
    applyMotionPreference();
    reduceMotion.addEventListener('change', applyMotionPreference);
  }

  /* Scroll-Reveal: Cards, Testimonials, Team, Steps fliegen beim Eintritt in den Viewport sanft ein.
     Progressive Enhancement: Elemente sind ohne JS/IntersectionObserver/bei reduced-motion sofort
     sichtbar (siehe css/base.css .reveal) — es wird nur bei normaler Bewegungspraeferenz eine
     kurze "pending"-Phase vor dem Sichtbarwerden hinzugefuegt. */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach((el) => el.classList.add('reveal--pending'));
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal--pending');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* Formular: Demo-Handling ohne Backend */
  const leadForm = document.querySelector('.lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      leadForm.reset();
      const status = leadForm.querySelector('.lead-form__status');
      if (status) {
        status.textContent = 'Vielen Dank! Wir melden uns werktags innerhalb von 24 Stunden bei Ihnen.';
      }
    });
  }
});
