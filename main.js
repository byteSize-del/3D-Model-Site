/* ═══════════════════════════════════════════════════════════════
   Q-TECH AI-SOLUTIONS — main.js
   Handles: nav scroll state · cursor · IO reveal · cursor glow
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── Nav scroll state ──────────────────────────────────────── */
(function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 10) {
      nav.style.background = 'rgba(8,8,8,0.95)';
    } else {
      nav.style.background = 'rgba(8,8,8,0.72)';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ─── Intersection-observer fade-up reveals ─────────────────── */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
})();


/* ─── Smooth magnetic cursor glow ───────────────────────────── */
(function initCursorGlow() {
  // Only on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  Object.assign(glow.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '340px',
    height: '340px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: '9999',
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 0.3s ease',
    opacity: '0',
  });
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  function animate() {
    // Lerp for smooth trailing
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    rafId = requestAnimationFrame(animate);
  }
  rafId = requestAnimationFrame(animate);
})();


/* ─── Active nav link on scroll ──────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.style.color = '';  // reset
            link.style.removeProperty('color');
          });
          const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
          if (active) active.style.color = '#fff';
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
})();


/* ─── Service & Testimonial cards — stagger reveal ────────── */
(function initStaggerCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const allCards = [...serviceCards, ...testimonialCards];
  
  if (!allCards.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If this is a testimonial, only animate testimonials in view
          const isTestimonial = entry.target.classList.contains('testimonial-card');
          const siblingClass = isTestimonial ? '.testimonial-card' : '.service-card';
          
          const sectionCards = entry.target.closest('section').querySelectorAll(siblingClass);
          
          sectionCards.forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 150);
          });
          
          // Unobserve all cards in this section so they don't re-trigger loops
          sectionCards.forEach(c => obs.unobserve(c));
        }
      });
    },
    { threshold: 0.1 }
  );

  // Start hidden
  allCards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease, background 0.3s ease';
    observer.observe(card);
  });
})();


/* ─── Subtle Parallax for About Mesh ──────────────────────── */
(function initParallax() {
  const mesh = document.querySelector('.about__mesh');
  const aboutSection = document.getElementById('about');
  if (!mesh || !aboutSection) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Only run math if About section is somewhat near the viewport
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Calculate how far the section is from the center of the screen
          const centerOffset = (rect.top + rect.height / 2) - (window.innerHeight / 2);
          
          // Move the mesh slightly in the opposite direction (-0.15 multiplier)
          const yPos = centerOffset * -0.15;
          
          // The base mesh CSS already has transform: perspective(600px) rotateX(60deg) translateY(-100px) rotateZ(-45deg);
          // We need to carefully append our parallax without breaking the 3D projection.
          // The easiest way is to wrap it or use a CSS variable. Let's update the DOM element's style.
          mesh.style.marginTop = `${yPos}px`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ─── Spline lazy-load helper ───────────────────────────────────
   Locates #spline-bg, dynamically imports the runtime, and
   wires up resize + visibility handlers automatically.
──────────────────────────────────────────────────────────────── */
window.loadSpline = async function loadSpline(sceneUrl) {
  const canvas = document.getElementById('spline-bg');
  if (!canvas) {
    console.warn('[Q-Tech] #spline-bg canvas not found.');
    return;
  }

  const { Application } = await import(
    'https://unpkg.com/@splinetool/runtime/build/runtime.js'
  );

  const spline = new Application(canvas);
  await spline.load(sceneUrl);

  // Remove placeholder glows once Spline is loaded
  document.querySelectorAll('.hero__glow').forEach((el) => el.remove());

  // Wait an extra small amount of time for the rendering engine to paint the scene fully 
  setTimeout(() => {
    const loader = document.getElementById('global-loader');
    if (loader) {
      loader.classList.add('hidden');
      document.body.classList.remove('loading-locked');
      setTimeout(() => loader.remove(), 800);
    }
  }, 500);

  // Keep canvas sharp on resize
  const syncSize = () => spline.setSize(canvas.clientWidth, canvas.clientHeight);
  window.addEventListener('resize', syncSize, { passive: true });

  // Pause GPU when tab hidden
  document.addEventListener('visibilitychange', () => {
    document.hidden ? spline.setSize(0, 0) : syncSize();
  });

  console.log('[Q-Tech] Spline scene loaded ✓');

  /* ─── Smooth Mouse Follow Integration (per SKILL.md Section 8) ─── */
  // 1. Find the target object using the official API
  // In Spline, object names are case-sensitive. Assuming 'Bot' based on the asset.
  let targetObject = spline.findObjectByName('Bot');
  
  if (!targetObject) {
    console.warn('[Q-Tech] Object exactly named "Bot" not found. Falling back to tracking the entire scene.');
    targetObject = spline._scene; // Fallback so the whole scene moves gracefully
  }

  // Shift the model towards the right side of the screen
  if (targetObject && targetObject.position) {
    targetObject.position.x += 137; // Decreased from 200 to shift it slightly left
  }

  // 2. Setup mouse tracking and smooth lerping
  let mouseX = 0;
  let mouseY = 0;
  
  // Store the initial rotation so we just ADD to it, rather than overwriting it
  const initialRotX = targetObject.rotation.x || 0;
  const initialRotY = targetObject.rotation.y || 0;
  
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  window.addEventListener('mousemove', (e) => {
    // Normalize coordinates to a range of -1 to 1
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    mouseX = x;
    mouseY = y;
  }, { passive: true });

  // 3. Animation loop for buttery smooth movement
  function renderLoop() {
    // Adjust these multipliers to control how far the robot rotates
    targetRotY = mouseX * 0.4; // Look left/right
    targetRotX = mouseY * 0.2; // Look up/down

    // Linear interpolation (lerp) for smooth easing
    currentRotX += (targetRotX - currentRotX) * 0.05;
    currentRotY += (targetRotY - currentRotY) * 0.05;

    // Apply the offset to the robot's initial position
    targetObject.rotation.x = initialRotX - currentRotX;
    targetObject.rotation.y = initialRotY + currentRotY;

    requestAnimationFrame(renderLoop);
  }
  
  renderLoop();

  return spline;
};

/* ─── Activate Spline scene ─────────────────────────────────── */
window.loadSpline('https://prod.spline.design/vgmtZgY66nSQXRGp/scene.splinecode');

/* ─── Async Form Submission ──────────────────────────────────── */
(function initFormSubmit() {
  const form = document.querySelector('.contact__form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent full page reload
    
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    // Show loading state
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success animation state
        btn.textContent = 'Message Sent! ✓';
        btn.style.backgroundColor = '#4a7fd4';
        btn.style.borderColor = '#4a7fd4';
        btn.style.color = '#fff';
        btn.style.opacity = '1';
        
        form.reset(); // Reset the form fields
        
        // Restore button after delay
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.style.borderColor = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      // Error state
      btn.textContent = 'Error. Try Again.';
      btn.style.color = '#ff6b6b';
      btn.style.borderColor = '#ff6b6b';
      btn.style.opacity = '1';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.color = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 3000);
    }
  });
})();
