/**
 * DesignVerse 2026 — Official Interactive Script
 * Handles Navigation, Countdown, Canvas Particles, Timeline Filters, 
 * Form Validation, Pass Generation, and FAQ Accordion.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Header & Navigation ---
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  // Sticky Header Scroll Effect
  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Mobile Navigation Toggle
  const toggleMobileMenu = () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleMobileMenu);

    // Close when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          closeMobileMenu();
        }
      });
    });

    // Close when clicking outside menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(e.target) && 
          !navToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
        navToggle.focus();
      }
    });
  }

  // --- 2. Active Section Spy (IntersectionObserver) ---
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // --- 3. Live Countdown Timer to Nov 14, 2026, 10:00 AM IST ---
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  // Event Date: November 14, 2026, 10:00:00 IST (+05:30)
  const eventDate = new Date('2026-11-14T10:00:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- 4. Interactive Ambient Canvas Particles ---
  const canvas = document.getElementById('ambient-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(width < 768 ? 24 : 48, 55);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.color = Math.random() > 0.4 ? 'rgba(167, 139, 250, ' : 'rgba(255, 107, 107, ';
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(139, 92, 246, 0.4)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;
    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(renderCanvas);
    }
    renderCanvas();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });
  }

  // --- 5. Interactive Highlight Cards Spotlight Effect ---
  const highlightCards = document.querySelectorAll('.highlight-card');
  highlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const glowLayer = card.querySelector('.card-glow-layer');
      if (glowLayer) {
        glowLayer.style.background = `radial-gradient(circle 180px at ${x}px ${y}px, rgba(139, 92, 246, 0.22), transparent 70%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      const glowLayer = card.querySelector('.card-glow-layer');
      if (glowLayer) {
        glowLayer.style.background = '';
      }
    });
  });

  // --- 6. Schedule Phase Filters ---
  const filterBtns = document.querySelectorAll('.schedule-filters .filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      timelineItems.forEach(item => {
        const itemPhase = item.getAttribute('data-phase');
        if (filter === 'all' || itemPhase === filter) {
          item.classList.remove('filtered-out');
        } else {
          item.classList.add('filtered-out');
        }
      });
    });
  });

  // --- 7. Animated Numbers Counter for Stats ---
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  let statsCounted = false;

  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        statNumbers.forEach(numEl => {
          const target = parseInt(numEl.getAttribute('data-target'), 10);
          const duration = 1600;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
              if (target >= 500) {
                numEl.textContent = `${target}+`;
              } else if (target >= 15) {
                numEl.textContent = `${target}+`;
              } else {
                numEl.textContent = `${target}`;
              }
            } else {
              numEl.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsStrip = document.querySelector('.stats-counter-strip');
  if (statsStrip) {
    countUpObserver.observe(statsStrip);
  }

  // --- 8. Frequently Asked Questions (FAQ) Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerEl = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

      // Close all other accordion items for clean single-open behavior
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      // Toggle current item
      if (isExpanded) {
        item.classList.remove('open');
        questionBtn.setAttribute('aria-expanded', 'false');
        answerEl.hidden = true;
      } else {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
        answerEl.hidden = false;
      }
    });
  });

  // --- 9. Registration Form Validation & Digital Pass Generation ---
  const regForm = document.getElementById('registration-form');
  const alertBanner = document.getElementById('form-alert');
  const alertText = document.getElementById('form-alert-text');
  const successCard = document.getElementById('success-display');
  const printPassBtn = document.getElementById('print-pass-btn');
  const registerAnotherBtn = document.getElementById('register-another-btn');

  // Input Fields
  const fullnameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const collegeInput = document.getElementById('college');
  const yearSelect = document.getElementById('year');
  const interestSelect = document.getElementById('interest');
  const termsCheckbox = document.getElementById('terms');

  // Digital Pass Output Elements
  const passDelegateName = document.getElementById('pass-delegate-name');
  const passNameDisplay = document.getElementById('pass-name-display');
  const passIdDisplay = document.getElementById('pass-id-display');
  const passCollegeDisplay = document.getElementById('pass-college-display');
  const passTrackDisplay = document.getElementById('pass-track-display');

  // Toast Notification System
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '🎉' : '⚠️'}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-leave');
      setTimeout(() => {
        toast.remove();
      }, 350);
    }, 4200);
  }

  // Field Validation Helpers
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

  function validateField(input, condition, errorMsg) {
    const formGroup = input.closest('.form-group') || input.closest('.form-checkbox-group');
    const errorEl = formGroup.querySelector('.field-error-msg');

    if (!condition) {
      formGroup.classList.add('has-error');
      formGroup.classList.remove('has-success');
      if (errorEl && errorMsg) {
        errorEl.textContent = errorMsg;
      }
      return false;
    } else {
      formGroup.classList.remove('has-error');
      formGroup.classList.add('has-success');
      return true;
    }
  }

  // Live validation listeners on typing / change
  if (fullnameInput) {
    fullnameInput.addEventListener('input', () => {
      const val = fullnameInput.value.trim();
      if (val.length >= 2) {
        validateField(fullnameInput, true);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      const val = emailInput.value.trim();
      if (emailRegex.test(val)) {
        validateField(emailInput, true);
      }
    });
  }

  if (collegeInput) {
    collegeInput.addEventListener('input', () => {
      const val = collegeInput.value.trim();
      if (val.length >= 2) {
        validateField(collegeInput, true);
      }
    });
  }

  if (yearSelect) {
    yearSelect.addEventListener('change', () => {
      if (yearSelect.value !== '') {
        validateField(yearSelect, true);
      }
    });
  }

  if (interestSelect) {
    interestSelect.addEventListener('change', () => {
      if (interestSelect.value !== '') {
        validateField(interestSelect, true);
      }
    });
  }

  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', () => {
      if (termsCheckbox.checked) {
        validateField(termsCheckbox, true);
      }
    });
  }

  // Generate Unique Ticket ID
  function generateTicketId() {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    return `DV-2026-${randomCode}`;
  }

  // Form Submit Handler
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      let firstInvalidInput = null;

      // 1. Full name validation
      const nameVal = fullnameInput.value.trim();
      if (!nameVal || nameVal.length < 2) {
        validateField(fullnameInput, false, 'Please enter your full name (minimum 2 letters).');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = fullnameInput;
      } else {
        validateField(fullnameInput, true);
      }

      // 2. Email validation
      const emailVal = emailInput.value.trim();
      if (!emailVal || !emailRegex.test(emailVal)) {
        validateField(emailInput, false, 'Please enter a valid email address.');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = emailInput;
      } else {
        validateField(emailInput, true);
      }

      // 3. College name validation
      const collegeVal = collegeInput.value.trim();
      if (!collegeVal || collegeVal.length < 2) {
        validateField(collegeInput, false, 'Please enter your college or institution name.');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = collegeInput;
      } else {
        validateField(collegeInput, true);
      }

      // 4. Year of study validation
      if (!yearSelect.value) {
        validateField(yearSelect, false, 'Please select your current year of study.');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = yearSelect;
      } else {
        validateField(yearSelect, true);
      }

      // 5. Area of interest validation
      if (!interestSelect.value) {
        validateField(interestSelect, false, 'Please select your primary area of interest.');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = interestSelect;
      } else {
        validateField(interestSelect, true);
      }

      // 6. Terms checkbox validation
      if (!termsCheckbox.checked) {
        validateField(termsCheckbox, false, 'You must confirm student status to register.');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = termsCheckbox;
      } else {
        validateField(termsCheckbox, true);
      }

      // Handle Validation Failure
      if (!isValid) {
        alertBanner.hidden = false;
        alertText.textContent = 'Please fix the highlighted fields to complete your registration.';
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Handle Validation Success
      alertBanner.hidden = true;

      const ticketId = generateTicketId();

      // Populate Delegate Pass Card
      if (passDelegateName) passDelegateName.textContent = nameVal;
      if (passNameDisplay) passNameDisplay.textContent = nameVal;
      if (passIdDisplay) passIdDisplay.textContent = ticketId;
      if (passCollegeDisplay) passCollegeDisplay.textContent = collegeVal;
      if (passTrackDisplay) passTrackDisplay.textContent = `${yearSelect.value} • ${interestSelect.value}`;

      // Smooth switch from form to digital ticket
      regForm.hidden = true;
      successCard.hidden = false;

      // Scroll smoothly to pass
      successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Celebration Toast
      showToast(`Congratulations, ${nameVal}! Your DesignVerse Pass has been generated.`);
    });
  }

  // Print Pass Action
  if (printPassBtn) {
    printPassBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Register Another Attendee Action
  if (registerAnotherBtn) {
    registerAnotherBtn.addEventListener('click', () => {
      if (regForm) {
        regForm.reset();
        
        // Remove validation classes
        const allGroups = regForm.querySelectorAll('.form-group, .form-checkbox-group');
        allGroups.forEach(g => {
          g.classList.remove('has-error', 'has-success');
        });

        regForm.hidden = false;
        successCard.hidden = true;
        alertBanner.hidden = true;

        fullnameInput.focus();
      }
    });
  }

  // --- 10. Smooth Scrolling for all internal anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});
