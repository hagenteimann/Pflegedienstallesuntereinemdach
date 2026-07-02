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

  /* Chat-Widget: statisches Mini-Panel mit Menü, Rückruf-Formular und Demo-Chat.
     Kein Backend/echter Bot — Formular und Chat-Antwort sind reines Client-Side-Demo-Handling. */
  const chatWidget = document.querySelector('.chat-widget');
  const chatToggle = document.querySelector('.chat-widget__toggle');
  const chatPanel = document.querySelector('.chat-widget__panel');
  if (chatWidget && chatToggle && chatPanel) {
    const chatBack = chatPanel.querySelector('.chat-widget__back');
    const chatViews = chatPanel.querySelectorAll('[data-chat-view]');

    const showChatView = (name) => {
      chatViews.forEach((view) => {
        view.hidden = view.dataset.chatView !== name;
      });
      if (chatBack) chatBack.hidden = name === 'home';
    };

    const closeChat = () => {
      chatPanel.hidden = true;
      chatToggle.setAttribute('aria-expanded', 'false');
      showChatView('home');
    };
    const openChat = () => {
      chatPanel.hidden = false;
      chatToggle.setAttribute('aria-expanded', 'true');
    };

    chatToggle.addEventListener('click', () => {
      if (chatPanel.hidden) {
        openChat();
      } else {
        closeChat();
      }
    });

    chatPanel.querySelector('.chat-widget__close')?.addEventListener('click', () => {
      closeChat();
      chatToggle.focus();
    });

    chatBack?.addEventListener('click', () => showChatView('home'));

    chatPanel.querySelectorAll('[data-chat-goto]').forEach((button) => {
      button.addEventListener('click', () => showChatView(button.dataset.chatGoto));
    });

    document.addEventListener('click', (event) => {
      if (!chatPanel.hidden && !chatWidget.contains(event.target)) {
        closeChat();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !chatPanel.hidden) {
        closeChat();
        chatToggle.focus();
      }
    });

    /* Aktionen, die von der Seite weg navigieren (Kontakt, Anrufen, Standorte) schliessen den Chat */
    chatPanel.querySelectorAll('.chat-widget__action[href]').forEach((link) => {
      link.addEventListener('click', closeChat);
    });

    /* Rückruf-Formular: Demo-Handling ohne Backend */
    const callbackForm = document.getElementById('callbackForm');
    if (callbackForm) {
      callbackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const status = callbackForm.querySelector('.chat-widget__form-status');
        if (status) {
          status.textContent = 'Danke! Wir rufen Sie werktags zeitnah zurück.';
        }
        callbackForm.reset();
      });
    }

    /* Demo-Chat: feste Antwort statt echter KI/Backend-Anbindung */
    const chatMessageForm = document.getElementById('chatMessageForm');
    const chatMessages = document.getElementById('chatMessages');
    const chatMessageInput = document.getElementById('chatMessageInput');
    if (chatMessageForm && chatMessages && chatMessageInput) {
      const addBubble = (text, from) => {
        const bubble = document.createElement('p');
        bubble.className = `chat-bubble chat-bubble--${from}`;
        bubble.textContent = text;
        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      };

      chatMessageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const value = chatMessageInput.value.trim();
        if (!value) return;
        addBubble(value, 'user');
        chatMessageInput.value = '';
        window.setTimeout(() => {
          addBubble(
            'Vielen Dank für Ihre Nachricht! Für eine individuelle Beratung zu unseren Leistungen füllen Sie gerne unser Kontaktformular aus oder rufen Sie uns direkt an — wir melden uns werktags innerhalb von 24 Stunden.',
            'bot'
          );
        }, 500);
      });
    }
  }
});
