/**
 * Spen Lab Website - Enhanced Mobile-Optimized JavaScript
 * Version: 1.2.0
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

  // Initialize mobile navigation - ENHANCED
  initMobileNavigation();

  // Initialize interest cards
  initInterestCards();

  // Set up lazy loading - ENHANCED
  initLazyLoading();

  // Add smooth scrolling
  initSmoothScrolling();

  // Update footer year
  updateFooterYear();

  // Handle preloader - ENHANCED
  handlePreloader();

  // Add touch device detection
  detectTouchDevice();

  // Initialize Tab Navigation (if present)
  initTabNavigation();

  // Fix background image sizing for mobile - NEW
  fixBackgroundImageSizing();

  // Fix button sizing and layout for mobile - NEW
  optimizeButtonsForMobile();

  /**
   * Enhanced Mobile Navigation Functionality
   */
  function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navbar = document.getElementById('navbar')?.querySelector('ul');
    const header = document.querySelector('header');

    if (!navToggle || !navbar) return;

    // Set ARIA attributes
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'navbar');
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');

    // Make sure the toggle button is visible and properly styled on mobile
    if (config.isMobile()) {
      navToggle.style.display = 'block';
      // Ensure that the nav is initially hidden on mobile
      navbar.classList.remove('showNav');
    }

    // Toggle navigation menu
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent event bubbling

      const isExpanded = navbar.classList.contains('showNav');
      navbar.classList.toggle('showNav');

      // Update ARIA attribute
      navToggle.setAttribute('aria-expanded', !isExpanded);

      // Add overlay when menu is open
      if (!isExpanded) {
        // Create overlay if it doesn't exist
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
          overlay = document.createElement('div');
          overlay.className = 'nav-overlay';
          document.body.appendChild(overlay);
          
          // Add fade in animation
          setTimeout(() => {
            overlay.style.opacity = '1';
          }, 10);
          
          // Close menu when overlay is clicked
          overlay.addEventListener('click', closeMenu);
        } else {
          overlay.style.display = 'block';
          setTimeout(() => {
            overlay.style.opacity = '1';
          }, 10);
        }
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = 'hidden';
      } else {
        removeOverlay();
        document.body.style.overflow = '';
      }

      // Apply scrollable menu if content exceeds viewport height
      if (!isExpanded && navbar.scrollHeight > window.innerHeight) {
        navbar.style.maxHeight = `${window.innerHeight - header.offsetHeight}px`;
        navbar.style.overflowY = 'auto';
      }
    });

    function closeMenu() {
      navbar.classList.remove('showNav');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      removeOverlay();
    }

    function removeOverlay() {
      const overlay = document.querySelector('.nav-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 300); // Match this to your CSS transition time
      }
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      const isClickInsideNav = navbar.contains(e.target);
      const isClickOnToggle = navToggle.contains(e.target);

      if (navbar.classList.contains('showNav') && !isClickInsideNav && !isClickOnToggle) {
        closeMenu();
      }
    });

    // Close mobile menu when a link is clicked
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Delay menu closing if it's a smooth scroll to an anchor
        if (link.getAttribute('href').startsWith('#')) {
          setTimeout(closeMenu, 100);
        } else {
          closeMenu();
        }
      });
    });

    // Handle resize events
    window.addEventListener('resize', function() {
      if (window.innerWidth > config.breakpoints.mobile && navbar.classList.contains('showNav')) {
        closeMenu();
      }
      
      // Dynamically adjust nav styling based on viewport
      if (config.isMobile()) {
        navToggle.style.display = 'block';
      } else {
        navToggle.style.display = 'none';
        navbar.style.maxHeight = '';
        navbar.style.overflowY = '';
      }
    });
    
    // Initial check for proper display
    if (config.isMobile()) {
      navToggle.style.display = 'block';
    } else {
      navToggle.style.display = 'none';
    }
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
   * Enhanced Lazy Loading for Images
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
              
              // If this is a header or hero image, add special handling
              if (lazyImage.classList.contains('hero-background') || 
                  lazyImage.closest('.hero') || 
                  lazyImage.closest('header')) {
                optimizeHeroImage(lazyImage);
              }
            };
            img.onerror = function() {
              console.error('Failed to load image:', lazyImage.dataset.src);
              // Attempt to load with regular method as fallback
              lazyImage.src = lazyImage.dataset.src;
            };
            img.src = lazyImage.dataset.src;

            // Remove data-src to prevent double-loading
            lazyImage.removeAttribute('data-src');
            
            // Stop observing once loaded
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      }, {
        rootMargin: '100px 0px', // Increased margin to load earlier
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
        lazyImage.removeAttribute('data-src');
      });
    }
    
    // Special handling for hero images
    function optimizeHeroImage(img) {
      // For very small screens, adjust hero image
      if (window.innerWidth <= config.breakpoints.smallMobile) {
        img.style.objectPosition = 'center center';
        img.style.objectFit = 'cover';
        img.style.maxHeight = '200px';
      }
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
          const extraPadding = config.isMobile() ? 10 : 20; // Less padding on mobile

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
   * Enhanced Preloader
   */
  function handlePreloader() {
    // List of critical images to preload (priority loading)
    const criticalImageUrls = [
      'images/logo.png',
      'images/2.png'
    ];
    
    // Secondary images (non-blocking)
    const secondaryImageUrls = [
      'images/Security Icon.png',
      'images/Hardware.png',
      'images/Privacy Icon.png',
      'images/AI.png',
      'images/Networks Icon.png',
      'images/Security.png'
    ];

    // Track loaded images
    let criticalLoaded = 0;
    const totalCritical = criticalImageUrls.length;

    // Preload critical images first
    criticalImageUrls.forEach(url => {
      const img = new Image();
      img.src = url;

      img.onload = img.onerror = function() {
        criticalLoaded++;
        if (criticalLoaded === totalCritical) {
          // Show minimum content when critical images are loaded
          showMinimumContent();
          
          // Then load secondary images
          loadSecondaryImages();
        }
      };
    });

    function showMinimumContent() {
      // Hide preloader after critical images load
      const preloader = document.querySelector('.preloader');
      if (preloader) {
        preloader.classList.add('loaded');

        // Remove preloader from DOM after transition completes
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }
      
      // Make sure header and main navigation are visible
      const header = document.querySelector('header');
      if (header) {
        header.style.visibility = 'visible';
        header.style.opacity = '1';
      }
    }
    
    function loadSecondaryImages() {
      secondaryImageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    }

    // Set a maximum time to wait before showing content anyway
    setTimeout(showMinimumContent, 2000); // Reduced from 3000 to 2000ms
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
  function initTabNavigation() {
    const tabLinks = document.querySelectorAll('.tab-link');
    if (tabLinks.length > 0) {
      // Make tabs more touchable on mobile
      if (config.isMobile()) {
        tabLinks.forEach(link => {
          link.style.padding = '0.8rem 1rem';
          link.style.minHeight = '44px';
        });
      }
      
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
          const tabContent = document.getElementById(tabID);
          
          if (tabContent) {
            tabContent.classList.add('active');
            
            // Scroll to tab content on mobile for better UX
            if (config.isMobile()) {
              setTimeout(() => {
                const tabsTop = tabContent.getBoundingClientRect().top + window.pageYOffset;
                const header = document.querySelector('header');
                const headerOffset = header ? header.offsetHeight : 0;
                
                window.scrollTo({
                  top: tabsTop - headerOffset - 20,
                  behavior: 'smooth'
                });
              }, 100);
            }
          }
        });
      });
    }
  }

  /**
   * Fix background image sizing for mobile - NEW
   */
  function fixBackgroundImageSizing() {
    const heroSection = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background-image');
    
    if (heroSection && config.isMobile()) {
      // Adjust hero section height for mobile
      heroSection.style.minHeight = 'auto';
      heroSection.style.maxHeight = '50vh';
      
      // If there's a background image, optimize it
      if (heroBackground) {
        heroBackground.style.height = '200px';
        heroBackground.style.objectFit = 'cover';
        heroBackground.style.objectPosition = 'center center';
      }
    }
    
    // Also fix the icon strip for mobile
    const iconStrip = document.querySelector('.icon-strip');
    if (iconStrip && config.isMobile()) {
      // Make icon strip more compact on mobile
      iconStrip.style.padding = '0.5rem 0';
      const icons = iconStrip.querySelectorAll('img');
      icons.forEach(icon => {
        icon.style.height = config.isMobile() ? 
          (window.innerWidth <= config.breakpoints.smallMobile ? '50px' : '80px') : 
          '250px';
      });
    }
  }

  /**
   * Fix button sizing and layout for mobile - NEW
   */
  function optimizeButtonsForMobile() {
    if (!config.isMobile()) return;
    
    // Optimize CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
      button.style.width = '100%';
      button.style.maxWidth = '280px';
      button.style.margin = '0.5rem auto';
      button.style.padding = '0.8rem 1rem';
      button.style.minHeight = '44px'; // Recommended minimum touch target size
      button.style.display = 'block';
      button.style.textAlign = 'center';
    });
    
    // Fix hero buttons container
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
      heroButtons.style.flexDirection = 'column';
      heroButtons.style.alignItems = 'center';
    }
    
    // Make form submit buttons more touchable
    const submitButtons = document.querySelectorAll('.submit-button, button[type="submit"]');
    submitButtons.forEach(button => {
      button.style.width = '100%';
      button.style.minHeight = '44px';
      button.style.padding = '0.8rem 1rem';
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
    
    // Force reload critical elements after resize (fixes some layout issues)
    const navToggle = document.getElementById('navToggle');
    const navbar = document.getElementById('navbar')?.querySelector('ul');
    
    if (navToggle && navbar) {
      if (window.innerWidth <= 768) {
        navToggle.style.display = 'block';
        if (navbar.classList.contains('showNav')) {
          navbar.style.maxHeight = `${window.innerHeight - document.querySelector('header').offsetHeight}px`;
        }
      } else {
        navToggle.style.display = 'none';
        navbar.style.maxHeight = '';
        navbar.style.overflowY = '';
      }
    }
  }, 400);
});

// Handle orientation change specifically for mobile devices
window.addEventListener('orientationchange', function() {
  // Force close the navigation menu on orientation change
  const navbar = document.getElementById('navbar')?.querySelector('ul');
  const navToggle = document.getElementById('navToggle');
  const overlay = document.querySelector('.nav-overlay');

  if (navbar && navbar.classList.contains('showNav')) {
    navbar.classList.remove('showNav');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    }
  }
  
  // After orientation change completes, fix any layout issues
  setTimeout(() => {
    if (window.innerWidth <= 768) {
      // Adjust mobile-specific elements
      const iconStrip = document.querySelector('.icon-strip');
      if (iconStrip) {
        const icons = iconStrip.querySelectorAll('img');
        icons.forEach(icon => {
          icon.style.height = window.innerWidth <= 480 ? '50px' : '80px';
        });
      }
      
      // Make sure the navbar toggle is visible
      if (navToggle) navToggle.style.display = 'block';
    }
  }, 300);
});

// Add CSS for the overlay (creating it in JS to avoid modifying HTML/CSS files)
(function addOverlayStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 99;
      display: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    @media (max-width: 768px) {
      #navbar ul.showNav {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        z-index: 100;
        padding: 1rem 0;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      }
      
      #navbar ul.showNav li {
        margin: 0;
        padding: 0;
      }
      
      #navbar ul.showNav a {
        display: block;
        padding: 0.8rem 1.5rem;
        font-size: 1.1rem;
        text-align: center;
        min-height: 44px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }
      
      #navbar ul.showNav a:active,
      #navbar ul.showNav a:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .header-left img,
      .header-right img {
        max-height: 40px;
        width: auto;
      }
      
      .nav-toggle {
        min-height: 44px;
        min-width: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .hero {
        padding: 1.5rem 1rem;
      }
      
      .headline {
        font-size: 1.5rem;
      }
      
      .sub-headline {
        font-size: 1rem;
      }
    }
  `;
  document.head.appendChild(style);
})();

// Add this to your script.js file to ensure icons display properly on all pages
document.addEventListener('DOMContentLoaded', function() {
  // Force icons to display on all pages
  function fixIcons() {
    // Get all icon strip sections
    const iconStrips = document.querySelectorAll('.icon-strip');
    
    if (iconStrips.length === 0) {
      console.log('No icon strip found, creating one');
      // If no icon strip exists, create one after the header
      const header = document.querySelector('header');
      if (header) {
        const newIconStrip = document.createElement('section');
        newIconStrip.className = 'icon-strip';
        newIconStrip.innerHTML = `
          <img src="images/AI.png" alt="AI Icon" id="AI-icon" width="100" height="100" />
          <img src="images/Hardware.png" alt="Hardware Icon" id="Hardware-icon" width="100" height="100" />
          <img src="images/Security.png" alt="Security Icon" id="Security-icon" width="100" height="100" />
        `;
        header.after(newIconStrip);
      }
      return;
    }
    
    // For each icon strip, ensure it has all three icons
    iconStrips.forEach(strip => {
      // Check for all three icons
      const aiIcon = strip.querySelector('[alt="AI Icon"], #AI-icon');
      const hardwareIcon = strip.querySelector('[alt="Hardware Icon"], #Hardware-icon');
      const securityIcon = strip.querySelector('[alt="Security Icon"], #Security-icon');
      
      // If any icon is missing, rebuild the entire strip
      if (!aiIcon || !hardwareIcon || !securityIcon) {
        console.log('Rebuilding icon strip - missing icons detected');
        strip.innerHTML = `
          <img src="images/AI.png" alt="AI Icon" id="AI-icon" width="100" height="100" />
          <img src="images/Hardware.png" alt="Hardware Icon" id="Hardware-icon" width="100" height="100" />
          <img src="images/Security.png" alt="Security Icon" id="Security-icon" width="100" height="100" />
        `;
      }
      
      // Apply proper styling to ensure visibility
      strip.style.display = 'flex';
      strip.style.justifyContent = 'center';
      strip.style.alignItems = 'center';
      strip.style.gap = window.innerWidth <= 480 ? '0.5rem' : (window.innerWidth <= 768 ? '1rem' : '2rem');
      strip.style.backgroundColor = '#000000';
      strip.style.padding = '1rem 0';
      strip.style.width = '100%';
      
      // Apply styling to each icon
      const icons = strip.querySelectorAll('img');
      const iconHeight = window.innerWidth <= 480 ? '50px' : (window.innerWidth <= 768 ? '60px' : '100px');
      
      icons.forEach(icon => {
        icon.style.height = iconHeight;
        icon.style.width = 'auto';
        icon.style.display = 'inline-block';
        icon.style.visibility = 'visible';
        icon.style.opacity = '1';
      });
    });
  }
  
  // Run icon fix immediately
  fixIcons();
  
  // Also run on resize and load events
  window.addEventListener('resize', fixIcons);
  window.addEventListener('load', fixIcons);
});
