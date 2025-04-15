// Mobile Menu Toggle
const menuToggle = document.createElement('div');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('header .container').appendChild(menuToggle);

const nav = document.querySelector('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Smooth scrolling dengan offset untuk fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    // Skip untuk link yang bukan anchor
    if (this.getAttribute('href') === '#') return;
    
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Tutup mobile menu jika aktif
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    }
  });
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Pesan Anda telah terkirim! Saya akan segera menghubungi Anda.');
    this.reset();
  });
}

// Fix untuk halaman yang di-load dengan anchor
window.addEventListener('load', function() {
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      setTimeout(() => {
        const headerHeight = document.querySelector('header').offsetHeight;
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'auto'
        });
      }, 0);
    }
  }
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Check for saved user preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the current theme
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}
// Enhanced Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Fungsi untuk mengaplikasikan tema
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.body.classList.remove('dark-mode');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
    
    // Cek preferensi tema
    const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(currentTheme);
    
    // Toggle tema
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        applyTheme(isDark ? 'light' : 'dark');
    });
    
    // Respons terhadap perubahan preferensi sistem
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});