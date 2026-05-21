document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const reveals = document.querySelectorAll('.reveal');
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dotsContainer');
  const contactForm = document.getElementById('contactForm');
  const cards = track.querySelectorAll('.testimonial-card');
  let currentSlide = 0;
  const totalSlides = cards.length;

  // NAVBAR SCROLL EFFECT
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);

    // ACTIVE LINK
    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;
        link.classList.toggle('active', y >= top && y < bottom);
      }
    });

    lastScroll = y;
  });

  // HAMBURGER
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // SCROLL REVEAL
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => observer.observe(el));

  // TESTIMONIAL CAROUSEL
  function updateCarousel() {
    track.scrollTo({
      left: currentSlide * track.offsetWidth,
      behavior: 'smooth'
    });
    document.querySelectorAll('.testimonial-dots button').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
      updateCarousel();
    });
  }

  // DOTS
  if (dotsContainer) {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.toggle('active', i === 0);
      dot.addEventListener('click', () => {
        currentSlide = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  // AUTO SLIDE
  let autoSlide = setInterval(() => {
    currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
    updateCarousel();
  }, 5000);

  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
      updateCarousel();
    }, 5000);
  });

  // PLANS CAROUSEL (MOBILE)
  const plansGrid = document.getElementById('plansGrid');
  const plansPrevBtn = document.getElementById('plansPrevBtn');
  const plansNextBtn = document.getElementById('plansNextBtn');
  const plansDots = document.getElementById('plansDots');
  const planCards = plansGrid.querySelectorAll('.plan-card');
  let currentPlan = 1;
  const totalPlans = planCards.length;
  let planAutoSlide;

  function updatePlansCarousel() {
    plansGrid.scrollTo({
      left: currentPlan * plansGrid.offsetWidth,
      behavior: 'smooth'
    });
    plansDots.querySelectorAll('button').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentPlan);
    });
  }

  if (plansPrevBtn && plansNextBtn) {
    plansPrevBtn.addEventListener('click', () => {
      clearInterval(planAutoSlide);
      currentPlan = currentPlan === 0 ? totalPlans - 1 : currentPlan - 1;
      updatePlansCarousel();
      planAutoSlide = setInterval(() => {
        currentPlan = currentPlan === totalPlans - 1 ? 0 : currentPlan + 1;
        updatePlansCarousel();
      }, 5000);
    });

    plansNextBtn.addEventListener('click', () => {
      clearInterval(planAutoSlide);
      currentPlan = currentPlan === totalPlans - 1 ? 0 : currentPlan + 1;
      updatePlansCarousel();
      planAutoSlide = setInterval(() => {
        currentPlan = currentPlan === totalPlans - 1 ? 0 : currentPlan + 1;
        updatePlansCarousel();
      }, 5000);
    });
  }

  if (plansDots) {
    for (let i = 0; i < totalPlans; i++) {
      const dot = document.createElement('button');
      dot.classList.toggle('active', i === 1);
      dot.addEventListener('click', () => {
        clearInterval(planAutoSlide);
        currentPlan = i;
        updatePlansCarousel();
        planAutoSlide = setInterval(() => {
          currentPlan = currentPlan === totalPlans - 1 ? 0 : currentPlan + 1;
          updatePlansCarousel();
        }, 5000);
      });
      plansDots.appendChild(dot);
    }
  }

  setTimeout(() => {
    currentPlan = 1;
    updatePlansCarousel();
  }, 100);

  planAutoSlide = setInterval(() => {
    currentPlan = currentPlan === totalPlans - 1 ? 0 : currentPlan + 1;
    updatePlansCarousel();
  }, 5000);

  plansGrid.addEventListener('touchstart', () => clearInterval(planAutoSlide));
  plansGrid.addEventListener('touchend', () => {
    planAutoSlide = setInterval(() => {
      currentPlan = currentPlan === totalPlans - 1 ? 0 : currentPlan + 1;
      updatePlansCarousel();
    }, 5000);
  });

  // COLLAPSIBLE SECTIONS (SHOW MORE)
  const collapsibles = document.querySelectorAll('.section-collapsible');

  function setupCollapsibles() {
    const isMobile = window.innerWidth <= 768;
    collapsibles.forEach(section => {
      let overlay = section.querySelector('.show-more-overlay');
      const contentWrapper = section.querySelector('.section-content');

      if (!isMobile) {
        section.classList.remove('collapsed', 'expanded');
        contentWrapper.style.maxHeight = '';
        if (overlay) overlay.remove();
        return;
      }

      const sectionStyle = getComputedStyle(section);
      const pt = parseFloat(sectionStyle.paddingTop);
      const pb = parseFloat(sectionStyle.paddingBottom);
      const availableHeight = window.innerHeight - 70 - pt - pb;
      const fits = contentWrapper && contentWrapper.scrollHeight <= availableHeight;

      if (fits) {
        section.classList.remove('collapsed');
        contentWrapper.style.maxHeight = '';
        if (overlay) overlay.remove();
        return;
      }

      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'show-more-overlay';
        overlay.innerHTML = '<button class="show-more-btn">MOSTRE MAIS <i class="fas fa-chevron-down"></i></button>';
        overlay.querySelector('.show-more-btn').addEventListener('click', () => {
          const isExpanded = section.classList.toggle('expanded');
          section.classList.toggle('collapsed');
          contentWrapper.style.maxHeight = isExpanded ? '' : availableHeight + 'px';
          overlay.querySelector('.show-more-btn').innerHTML = isExpanded
            ? 'MOSTRE MENOS <i class="fas fa-chevron-up"></i>'
            : 'MOSTRE MAIS <i class="fas fa-chevron-down"></i>';
        });
        contentWrapper.appendChild(overlay);
      }

      section.classList.add('collapsed');
      section.classList.remove('expanded');
      contentWrapper.style.maxHeight = availableHeight + 'px';
      const btn = overlay.querySelector('.show-more-btn');
      if (btn) btn.innerHTML = 'MOSTRE MAIS <i class="fas fa-chevron-down"></i>';
    });
  }

  setupCollapsibles();
  window.addEventListener('resize', setupCollapsibles);

  // FORM SUBMIT
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    const original = btn.innerHTML;
    btn.innerHTML = 'ENVIADO <i class="fas fa-check"></i>';
    btn.style.background = '#22c55e';
    contactForm.reset();
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
    }, 3000);
  });
});
