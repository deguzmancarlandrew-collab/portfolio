// ====== Simple single-page navigation + active link handling ======
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// helper: show one section
function showSectionById(id){
  sections.forEach(s => {
    if(s.id === id){
      s.classList.add('active');
      // scroll into view smoothly (keeps consistent look)
      s.scrollIntoView({behavior:'smooth', block:'start'});
    } else {
      s.classList.remove('active');
    }
  });

  // update active nav link
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
    // close mobile nav if used (optional)
    closeMobileNav();
  });
});

// Hook Home CTA buttons
document.getElementById('hireBtn')?.addEventListener('click', () => {
  // example: open contact form area and focus
  showSectionById('contact');
  const emailInput = document.querySelector('#contact input[type="email"]');
  if(emailInput) emailInput.focus();
});
document.getElementById('contactBtn')?.addEventListener('click', () => {
  showSectionById('contact');
});

// mobile toggle (simple)
const mobileToggle = document.querySelector('.mobile-toggle');
const navbar = document.querySelector('.navbar nav');
mobileToggle?.addEventListener('click', () => {
  if(navbar) navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
});
function closeMobileNav(){ if(window.innerWidth <= 800 && navbar) navbar.style.display = 'none' }

// ====== Modal logic for Services ======
function openModalById(id){
  const modal = document.getElementById(id);
  if(modal){
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  }
}
function closeModalById(id){
  const modal = document.getElementById(id);
  if(modal){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  }
}

// attach click handlers to service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.getAttribute('data-modal');
    if(modalId) openModalById(modalId);
  });
});

// attach close buttons
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-close');
    if(id) closeModalById(id);
  });
});

// click outside to close modal
window.addEventListener('click', (e) => {
  document.querySelectorAll('.modal.show').forEach(modal => {
    if(e.target === modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden','true');
    }
  });
});

// prevent actual form submit for demo
document.getElementById('contactForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  alert('Thanks! (form submission is disabled in this demo)'); // replace with real submit later
});

// initialize default visible section
showSectionById('home');
