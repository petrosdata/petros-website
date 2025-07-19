document.addEventListener('DOMContentLoaded', function() {
  // Initialize intersection observer for scroll animations
  const animateElements = document.querySelectorAll('.animate-on-scroll, .fade-in-left, .fade-in-right');
  const staggeredElements = document.querySelectorAll('.stagger-children');
  
  // Observer options
  const observerOptions = {
    root: null, // viewport as root
    rootMargin: '0px',
    threshold: 0.15 // trigger when 15% visible
  };
  
  // Create observer
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        // Observer stops watching once element is animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all animation elements
  animateElements.forEach(element => {
    observer.observe(element);
  });
  
  staggeredElements.forEach(element => {
    observer.observe(element);
  });
  
  // Init floating elements
  const floatingElements = document.querySelectorAll('.float');
  floatingElements.forEach((el, i) => {
    // Add random delay to each floating element for more natural movement
    el.style.animationDelay = (i * 0.5) + 's';
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return; // Skip if href is just "#"
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL hash without jumping
        history.pushState(null, null, targetId);
        
        // Add active class to clicked nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });
  
  // Service icon effect on hover
  document.querySelectorAll('.service-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.classList.add('pulse');
      setTimeout(() => {
        this.classList.remove('pulse');
      }, 600); // Remove class after animation completes
    });
  });
});

// Add "active" class to nav links based on scroll position
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const scrollPosition = window.scrollY + 200; // Offset for better UX
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').substring(1); // Remove the # character
    if (href === currentSection) {
      link.classList.add('active');
    }
  });
});
