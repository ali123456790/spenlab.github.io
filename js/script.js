// Preloader handling
window.addEventListener('load', function() {
  // Force image loading by creating new Image objects
  const imageUrls = [
    'images/Security Icon.png',
    'images/Hardware.png',
    'images/Privacy Icon.png',
    'images/AI.png',
    'images/Networks Icon.png',
    'images/Security.png'
  ];
  
  // Preload all required images
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
    img.onload = function() {
      console.log('Image loaded:', url);
    };
    img.onerror = function() {
      console.error('Failed to load image:', url);
    };
  });
  
  // Hide preloader when page is fully loaded
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.classList.add('loaded');
    
    // Remove preloader from DOM after transition completes
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
  
  // Add animation class to interest cards
  const interestCards = document.querySelectorAll('.interests-card');
  interestCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate');
    }, 100 + (index * 150)); // Staggered timing
  });
});

// Handle mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navbar = document.getElementById('navbar').querySelector('ul');

navToggle.addEventListener('click', () => {
  navbar.classList.toggle('showNav');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const isClickInsideNav = navbar.contains(e.target);
  const isClickOnToggle = navToggle.contains(e.target);
  
  if (navbar.classList.contains('showNav') && !isClickInsideNav && !isClickOnToggle) {
    navbar.classList.remove('showNav');
  }
});

// Close mobile menu when a link is clicked
const navLinks = navbar.querySelectorAll('a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('showNav');
  });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80, // Offset for header
        behavior: 'smooth'
      });
    }
  });
});

// Mobile-friendly hover for interest cards on touch devices
const interestCards = document.querySelectorAll('.interests-card');
if ('ontouchstart' in window || navigator.maxTouchPoints) {
  interestCards.forEach(card => {
    // On touch start
    card.addEventListener('touchstart', function(e) {
      // Prevent default to avoid scrolling
      e.preventDefault();
      
      // Remove active class from all other cards
      interestCards.forEach(c => {
        if (c !== card) c.classList.remove('touch-active');
      });
      
      // Toggle active class on this card
      this.classList.toggle('touch-active');
    });
    
    // Also handle click events for hybrid devices
    card.addEventListener('click', function(e) {
      // If it's not a touch device or event was already handled
      if (!('ontouchstart' in window) || !e.isTrusted) {
        interestCards.forEach(c => {
          if (c !== card) c.classList.remove('touch-active');
        });
        this.classList.toggle('touch-active');
      }
    });
  });
  
  // Close any open cards when clicking elsewhere
  document.addEventListener('touchstart', function(e) {
    if (!e.target.closest('.interests-card')) {
      interestCards.forEach(c => c.classList.remove('touch-active'));
    }
  });
}

// Dynamically update the footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
}

// Add simple lazy loading for images to improve mobile performance
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
  
  if ('IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});
