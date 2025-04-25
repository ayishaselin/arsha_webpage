
const { Html } = require("next/document");

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').style.backgroundColor = 'rgba(55, 81, 126, 0.9)';
            document.querySelector('.navbar').style.padding = '10px 0';
        } else {
            document.querySelector('.navbar').style.backgroundColor = 'var(--primary-color)';
            document.querySelector('.navbar').style.padding = '15px 0';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// Animation on scroll
window.addEventListener('load', function() {
    // Initial animations
    document.querySelectorAll('.animate__animated').forEach(element => {
        element.classList.add('animate__animated');
    });
    
    // Trigger animations when scrolling
    function checkScroll() {
        document.querySelectorAll('.animate__animated').forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (rect.top < windowHeight - 100) {
                if (element.classList.contains('animate__fadeInUp')) {
                    element.style.visibility = 'visible';
                } else if (element.classList.contains('animate__fadeInLeft')) {
                    element.style.visibility = 'visible';
                } else if (element.classList.contains('animate__fadeInRight')) {
                    element.style.visibility = 'visible';
                } else if (element.classList.contains('animate__zoomIn')) {
                    element.style.visibility = 'visible';
                }
            }
        });
    }
    
    // Hide elements initially
    document.querySelectorAll('.animate__animated:not(.animate__fadeInUp):not(.hero-content *)').forEach(element => {
        element.style.visibility = 'hidden';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on page load
});

// Active link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

   // Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation for team section
    initTeamAnimations();
    
    // Initialize animation for pricing section
    initPricingAnimations();
    
    // Initialize scroll animations
    initScrollAnimations();
  });
  
  // Team section animations
  function initTeamAnimations() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach((card, index) => {
      // Add staggered animation delay
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.transitionDelay = `${index * 0.1}s`;
      
      // Set a timeout to start the animation after a short delay
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    });
  }
  
  // Pricing section animations

  
function initPricingAnimations() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach((card, index) => {
      // Add staggered animation delay
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-top-color 0.3s ease';
      card.style.transitionDelay = `${index * 0.1}s`;
      
      // Set a timeout to start the animation after a short delay
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)'; // No special scale for featured card
      }, 100);
    });
  }
  
  // Update the scroll animation function for pricing cards
  function initScrollAnimations() {
    // Check if Intersection Observer API is available
    if ('IntersectionObserver' in window) {
      const sectionTitles = document.querySelectorAll('.section-title');
      const animateElements = document.querySelectorAll('.team-grid, .pricing-grid');
      
      // Create observer for section titles
      const titleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateTitle(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      // Create observer for grid elements
      const gridObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('team-grid')) {
              initTeamAnimations();
            } else if (entry.target.classList.contains('pricing-grid')) {
              initPricingAnimations();
            }
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      // Observe all section titles
      sectionTitles.forEach(title => {
        titleObserver.observe(title);
      });
      
      // Observe all grid elements
      animateElements.forEach(element => {
        gridObserver.observe(element);
      });
    } else {
      // Fallback for browsers without IntersectionObserver support
      const sectionTitles = document.querySelectorAll('.section-title');
      sectionTitles.forEach(title => {
        animateTitle(title);
      });
      
      initTeamAnimations();
      initPricingAnimations();
    }
  }
  
 // Testimonial Carousel Functionality

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-slider');
    const dots = document.querySelectorAll('.testimonial-dot');
    const items = document.querySelectorAll('.testimonial-item');
    
    let currentIndex = 0;
    const totalItems = items.length;
    let slideInterval;

    // Clone first and last slides for infinite loop effect
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, items[0]);

    // Adjust slider position to show first slide (skip clone)
    slider.style.transform = `translateX(-100%)`;

    // Function to update slider position with animation
    function updateSlider(animate = true) {
        if (!animate) {
            slider.style.transition = 'none';
        } else {
            slider.style.transition = 'transform 0.5s ease-in-out';
        }
        slider.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Function to handle infinite loop transition
    function handleInfiniteLoop() {
        if (currentIndex === totalItems) {
            currentIndex = 0;
            setTimeout(() => {
                updateSlider(false);
            }, 500);
        } else if (currentIndex === -1) {
            currentIndex = totalItems - 1;
            setTimeout(() => {
                updateSlider(false);
            }, 500);
        }
    }

    // Function to go to next slide
    function nextSlide() {
        currentIndex++;
        updateSlider();
        handleInfiniteLoop();
    }

    // Function to go to previous slide
    function prevSlide() {
        currentIndex--;
        updateSlider();
        handleInfiniteLoop();
    }

    // Start automatic sliding
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Reset interval when manually changing slide
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
            resetInterval();
        });
    });

    // Add mouse and touch events for slider
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('touchstart', dragStart);
    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('touchend', dragEnd);
    slider.addEventListener('mouseleave', dragEnd);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag);

    function dragStart(event) {
        if (event.type.includes('mouse')) {
            event.preventDefault();
        }
        isDragging = true;
        startPos = getPositionX(event);
    }

    function drag(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function dragEnd() {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (Math.abs(movedBy) > 100) {
            if (movedBy > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }

        prevTranslate = currentTranslate;
        resetInterval();
    }

    // Prevent context menu on long press
    window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };

    // Initialize the slider
    updateSlider();
    startSlideShow();
});

//footer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  // Animation for section titles
  function animateTitle(titleElement) {
    const h2 = titleElement.querySelector('h2');
    const underline = titleElement.querySelector('.underline');
    const p = titleElement.querySelector('p');
    
    // Reset initial styles
    h2.style.opacity = '0';
    h2.style.transform = 'translateY(-20px)';
    h2.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    underline.style.width = '0';
    underline.style.transition = 'width 0.5s ease 0.3s';
    
    p.style.opacity = '0';
    p.style.transform = 'translateY(20px)';
    p.style.transition = 'opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s';
    
    // Trigger animations after a small delay
    setTimeout(() => {
      h2.style.opacity = '1';
      h2.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        underline.style.width = '60px';
        
        setTimeout(() => {
          p.style.opacity = '1';
          p.style.transform = 'translateY(0)';
        }, 200);
      }, 300);
    }, 100);
  }
  
  // Hover effects for team members
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const socialLinks = this.querySelectorAll('.social-links a');
      socialLinks.forEach((link, index) => {
        link.style.transitionDelay = `${index * 0.05}s`;
      });
    });
    
    card.addEventListener('mouseleave', function() {
      const socialLinks = this.querySelectorAll('.social-links a');
      socialLinks.forEach(link => {
        link.style.transitionDelay = '0s';
      });
    });
  });
  
  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for fixed header if needed
          behavior: 'smooth'
        });
      }
    });
  });

//contact
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = document.querySelectorAll('.form-control');
    const submitBtn = document.querySelector('.btn-submit');
    
    // Add subtle animations to form fields when focused
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add pulse animation to submit button on hover
    submitBtn.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 1s infinite';
    });
    
    submitBtn.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
    
    // Form submission animation and validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#f44336';
                setTimeout(() => {
                    input.style.borderColor = '#ced4da';
                }, 2000);
            }
        });
        
        if (isValid) {
            // Show success animation
            submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = 'Send Message';
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }
    });
});

