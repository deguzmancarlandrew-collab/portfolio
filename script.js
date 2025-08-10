// ====== Simple single-page navigation + active link handling ======
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function showSectionById(id) {
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 64;

  sections.forEach(s => {
    if (s.id === id) {
      s.classList.add('active');

      let y = s.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      // prevent overscroll beyond document height
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (y > maxScroll) y = maxScroll;

      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      s.classList.remove('active');
    }
  });

  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-section') === id);
  });
}

// nav click events
navLinks.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('data-section');
    showSectionById(id);
    closeMobileNav();
  });
});

// Hook Home CTA buttons
document.getElementById('hireBtn')?.addEventListener('click', () => {
  showSectionById('contact');
  const emailInput = document.querySelector('#contact input[type="email"]');
  if (emailInput) emailInput.focus();
});
document.getElementById('contactBtn')?.addEventListener('click', () => {
  showSectionById('contact');
});

// mobile toggle (simple)
const mobileToggle = document.querySelector('.mobile-toggle');
const navbarNav = document.querySelector('.navbar nav');
mobileToggle?.addEventListener('click', () => {
  if (navbarNav) {
    const isVisible = navbarNav.style.display === 'flex';
    navbarNav.style.display = isVisible ? 'none' : 'flex';

    // update aria-expanded for accessibility
    mobileToggle.setAttribute('aria-expanded', String(!isVisible));
  }
});

function closeMobileNav() {
  if (window.innerWidth <= 800 && navbarNav) {
    navbarNav.style.display = 'none';
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
  }
}

// ====== Modal logic for Services ======
function openModalById(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal-dialog')?.focus();
  }
}

function closeModalById(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
}

// attach click handlers to service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.getAttribute('data-modal');
    if (modalId) openModalById(modalId);
  });
});

// attach close buttons
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-close');
    if (id) closeModalById(id);
  });
});

// click outside to close modal
window.addEventListener('click', (e) => {
  document.querySelectorAll('.modal.show').forEach(modal => {
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});

// ====== Real Formspree contact form submission handler ======
const form = document.getElementById('contactForm');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      alert("Thanks for your message! I'll get back to you soon.");
      form.reset();
    } else {
      alert("Oops! There was a problem submitting your form.");
    }
  } catch (error) {
    alert("Oops! There was a problem submitting your form.");
  }
});

// initialize default visible section
showSectionById('home');
