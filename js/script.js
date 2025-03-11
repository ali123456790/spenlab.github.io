/**
 * Spen Lab Website - Mobile-Optimized JavaScript
 * Version: 1.1.0
 * Last Updated: 2025-03-11
 */

// Wait for DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
  // Global state/configuration
  const config = {
    breakpoints: {
      mobile: 768,
      smallMobile: 480
    },
    animation: {
      staggerDelay: {
        desktop: 150,
        mobile: 100
      }
    },
    isMobile: function() {
      return window.innerWidth <= this.breakpoints.mobile;
    },
    isTouch: function() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
  };

  // Initialize mobile navigation
  initMobileNavigation();

  // Initialize interest cards
  initInterestCards();

  // Set up lazy loading
  initLazyLoading();

  // Add smooth scrolling
  initSmoothScrolling();

  // Update footer year
  updateFooterYear();

  // Handle preloader
  handlePreloader();

  // Add touch device detection
  detectTouchDevice();

  /**
   * Mobile Navigation Functionality
   */
  function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navbar = document.getElementById('navbar')?.querySelector('ul');

    if (!navToggle || !navbar) return;

    // Set ARIA attributes
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'navbar');
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');

    // Toggle navigation menu
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();

      const isExpanded = navbar.classList.contains('showNav');
      navbar.classList.toggle('showNav');

      // Update ARIA attribute
      navToggle.setAttribute('aria-expanded', !isExpanded);

      // Prevent body scrolling when menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      const isClickInsideNav = navbar.contains(e.target);
      const isClickOnToggle = navToggle.contains(e.target);

      if (navbar.classList.contains('showNav') && !isClickInsideNav && !isClickOnToggle) {
        navbar.classList.remove('showNav');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu when a link is clicked
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('showNav');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Handle resize events
    window.addEventListener('resize', function() {
      if (window.innerWidth > config.breakpoints.mobile && navbar.classList.contains('showNav')) {
        navbar.classList.remove('showNav');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Interest Cards Functionality
   */
  function initInterestCards() {
    const interestCards = document.querySelectorAll('.interests-card');

    // Skip if no cards found
    if (!interestCards.length) return;

    // Add animation class with staggered delay
    const delay = config.isMobile() ?
                  config.animation.staggerDelay.mobile :
                  config.animation.staggerDelay.desktop;

    interestCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate');
      }, 100 + (index * delay));
    });

    // Handle touch interactions
    if (config.isTouch()) {
      interestCards.forEach(card => {
        // Touch start handler
        card.addEventListener('touchstart', function(e) {
          // Only prevent default when needed to avoid breaking scrolling
          if (e.target.tagName.toLowerCase() !== 'a') {
            e.preventDefault();
          }

          // Remove active class from all other cards
          interestCards.forEach(c => {
            if (c !== card) c.classList.remove('touch-active');
          });

          // Toggle active class on this card
          this.classList.toggle('touch-active');
        });

        // Also handle click events for hybrid devices
        card.addEventListener('click', function(e) {
          // If it's not a direct touch event or it was already handled
          if (!config.isTouch() || !e.isTrusted) {
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
  }

  /**
   * Lazy Loading for Images
   */
  function initLazyLoading() {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

    // Skip if no lazy images found
    if (!lazyImages.length) return;

    // Use Intersection Observer if available
    if ('IntersectionObserver' in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;

            // Create an image loader to handle the transition
            const img = new Image();
            img.onload = function() {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.add('loaded');
            };
            img.onerror = function() {
              console.error('Failed to load image:', lazyImage.dataset.src);
              // Attempt to load with regular method as fallback
              lazyImage.src = lazyImage.dataset.src;
            };
            img.src = lazyImage.dataset.src;

            // Stop observing once loaded
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(function(lazyImage) {
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.add('loaded');
      });
    }
  }

  /**
   * Smooth Scrolling for Anchor Links
   */
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();

          // Calculate offset based on header height
          const header = document.querySelector('header');
          const headerOffset = header ? header.offsetHeight : 0;
          const extraPadding = 20; // Additional padding

          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = targetPosition - headerOffset - extraPadding;

          // Respect user's preference for reduced motion
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

          window.scrollTo({
            top: offsetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });

          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  /**
   * Update Footer Year
   */
  function updateFooterYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      const currentYear = new Date().getFullYear();
      yearSpan.textContent = currentYear;
    }
  }

  /**
   * Handle Preloader
   */
  function handlePreloader() {
    // List of critical images to preload
    const imageUrls = [
      'images/Security Icon.png',
      'images/Hardware.png',
      'images/Privacy Icon.png',
      'images/AI.png',
      'images/Networks Icon.png',
      'images/Security.png',
      'images/logo.png',
      'images/2.png'
    ];

    // Track loaded images
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    // Preload all required images
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;

      img.onload = function() {
        loadedCount++;
        if (loadedCount === totalImages) {
          hidePreloader();
        }
      };

      img.onerror = function() {
        console.error('Failed to load image:', url);
        loadedCount++;
        if (loadedCount === totalImages) {
          hidePreloader();
        }
      };
    });

    // Hide preloader after all images load or after timeout
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      // Set a maximum time to wait before hiding the preloader anyway
      setTimeout(hidePreloader, 3000);
    }

    function hidePreloader() {
      if (preloader && !preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');

        // Remove preloader from DOM after transition completes
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }
    }
  }

  /**
   * Detect Touch Device and Add Class to Body
   */
  function detectTouchDevice() {
    if (config.isTouch()) {
      document.body.classList.add('touch-device');

      // This empty event handler enables :active pseudo-classes on iOS
      document.addEventListener('touchstart', function() {}, false);
    } else {
      document.body.classList.add('no-touch');
    }
  }

  /**
   * Initialize Tab Navigation (if present)
   */
  const tabLinks = document.querySelectorAll('.tab-link');
  if (tabLinks.length > 0) {
    tabLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Remove "active" from all links
        tabLinks.forEach(l => l.classList.remove('active'));

        // Remove "active" from all tab contents
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

        // Add "active" to clicked link
        link.classList.add('active');

        // Get the tab ID and activate matching content
        const tabID = link.getAttribute('data-tab');
        document.getElementById(tabID)?.classList.add('active');
      });
    });
  }
});

/**
 * Global event listeners
 */
// Handle resize events efficiently with debouncing
let resizeTimer;
window.addEventListener('resize', function() {
  // Clear the previous timeout
  clearTimeout(resizeTimer);

  // Add a class during resize to disable transitions
  document.body.classList.add('resize-animation-stopper');

  // Set a timeout to remove the class after resizing is complete
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resize-animation-stopper');
  }, 400);
});

// Handle orientation change specifically for mobile devices
window.addEventListener('orientationchange', function() {
  // Force close the navigation menu on orientation change
  const navbar = document.getElementById('navbar')?.querySelector('ul');
  const navToggle = document.getElementById('navToggle');

  if (navbar && navbar.classList.contains('showNav')) {
    navbar.classList.remove('showNav');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});
