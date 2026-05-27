// ============================================
// Scroll Animations (IntersectionObserver)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// Mobile Menu Toggle
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// ============================================
// Section: hero
// ============================================
// Hero section entrance animations and interactions
(function() {
  const heroSection = document.querySelector('.section-hero');
  const heroImage = document.querySelector('.hero-image');
  
  // Trigger color reveal on image when section comes into view
  if (heroImage) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroImage.style.filter = 'grayscale(0%)';
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(heroImage);
  }
  
  // CTA button interaction
  const ctaButton = document.querySelector('.hero-cta');
  if (ctaButton) {
    ctaButton.addEventListener('click', function() {
      // Scroll to contact form or open modal
      const contactSection = document.querySelector('[id*="contact"]');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
})();

// ============================================
// Section: features
// ============================================
// Optional JS for features section
(function() {
  // Intersection Observer for staggered animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe feature cards
  document.querySelectorAll('.feature-card').forEach((card) => {
    observer.observe(card);
  });

  // Observe header elements
  document.querySelectorAll('.features-title, .features-subtitle').forEach((el) => {
    observer.observe(el);
  });
})();

// ============================================
// Section: about
// ============================================
// Section: about - Intersection Observer for animations
(function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe animated elements
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const animatedElements = aboutSection.querySelectorAll('.about-text, .about-team, .about-contact-bar');
    animatedElements.forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }
})();

// ============================================
// Section: testimonials
// ============================================
// Testimonials Carousel Controller
(function() {
  const carousel = document.querySelector('.testimonials-carousel');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.dot');
  
  let currentIndex = 0;
  const cardWidth = cards[0]?.offsetWidth || 0;
  const gap = 24; // 1.5rem in pixels
  
  function updateCarousel() {
    const scrollAmount = currentIndex * (cardWidth + gap);
    carousel.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  }
  
  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });
  
  // Auto-scroll on scroll snap
  let scrollTimeout;
  carousel?.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollLeft = carousel.scrollLeft;
      const closestIndex = Math.round(scrollLeft / (cardWidth + gap));
      if (closestIndex !== currentIndex) {
        currentIndex = closestIndex;
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      }
    }, 100);
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    updateCarousel();
  });
})();

// ============================================
// Section: faq
// ============================================
// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqTriggers = document.querySelectorAll('[data-faq-trigger]');
  
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      const faqAnswer = faqItem.querySelector('[data-faq-answer]');
      const isOpen = this.getAttribute('aria-expanded') === 'true';
      
      // Close all other items
      faqTriggers.forEach(otherTrigger => {
        if (otherTrigger !== this) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherAnswer = otherTrigger.closest('.faq-item').querySelector('[data-faq-answer]');
          otherAnswer.setAttribute('data-open', 'false');
        }
      });
      
      // Toggle current item
      this.setAttribute('aria-expanded', !isOpen);
      faqAnswer.setAttribute('data-open', !isOpen);
    });
  });
});

// ============================================
// Section: footer
// ============================================
// Optional JS for footer interactions
(function() {
  // Smooth scroll for footer links
  const footerLinks = document.querySelectorAll('.footer-link');
  
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Phone number click handler
  const phoneLink = document.querySelector('a[href^="tel:"]');
  if (phoneLink) {
    phoneLink.addEventListener('click', function(e) {
      // Allow default behavior on mobile, prevent on desktop
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        e.preventDefault();
        alert('Telefone: (41) 99929-2905');
      }
    });
  }

  // CTA Button handler
  const ctaButton = document.querySelector('.btn-footer-cta');
  if (ctaButton) {
    ctaButton.addEventListener('click', function() {
      // Scroll to contact section or open contact form
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback: open WhatsApp
        window.open('https://wa.me/5541999292905', '_blank');
      }
    });
  }
})();