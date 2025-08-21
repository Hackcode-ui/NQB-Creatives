// Main JavaScript for DesignCraft Studio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initPortfolioFilter();
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initTestimonialSlider();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && !event.target.closest('.mobile-menu')) {
                navMenu.classList.remove('show');
            }
        });
    }
}

// Portfolio Filtering
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filters button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter items with animation
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.querySelector('nav ul').classList.remove('show');
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formEntries = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            // For now, we'll just simulate a successful submission
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            successMessage.style.color = '#4ecdc4';
            successMessage.style.padding = '15px 0';
            successMessage.style.fontWeight = '500';
            
            this.reset();
            this.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to a server
            // For now, we'll just simulate a successful subscription
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Thank you for subscribing to our newsletter!';
            successMessage.style.color = '#4ecdc4';
            successMessage.style.padding = '15px 0';
            successMessage.style.fontWeight = '500';
            
            this.reset();
            this.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
}

// Animations
function initAnimations() {
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.slide-up, .service-card, .portfolio-item');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add animation classes to elements
    document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.5s ease';
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const sliderContainer = document.querySelector('.testimonials-slider');
    
    if (testimonials.length > 1 && sliderContainer) {
        let currentIndex = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        dotsContainer.style.display = 'flex';
        dotsContainer.style.justifyContent = 'center';
        dotsContainer.style.marginTop = '30px';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'slider-dot';
            dot.style.width = '12px';
            dot.style.height = '12px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = index === 0 ? '#ff6b6b' : 'rgba(255, 255, 255, 0.3)';
            dot.style.margin = '0 5px';
            dot.style.cursor = 'pointer';
            dot.style.transition = 'background-color 0.3s ease';
            
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        sliderContainer.appendChild(dotsContainer);
        
        // Create navigation arrows
        const prevArrow = document.createElement('div');
        prevArrow.className = 'slider-arrow prev';
        prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevArrow.style.position = 'absolute';
        prevArrow.style.left = '0';
        prevArrow.style.top = '50%';
        prevArrow.style.transform = 'translateY(-50%)';
        prevArrow.style.cursor = 'pointer';
        prevArrow.style.fontSize = '1.5rem';
        prevArrow.style.color = 'white';
        prevArrow.style.zIndex = '10';
        prevArrow.style.padding = '10px';
        
        const nextArrow = document.createElement('div');
        nextArrow.className = 'slider-arrow next';
        nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextArrow.style.position = 'absolute';
        nextArrow.style.right = '0';
        nextArrow.style.top = '50%';
        nextArrow.style.transform = 'translateY(-50%)';
        nextArrow.style.cursor = 'pointer';
        nextArrow.style.fontSize = '1.5rem';
        nextArrow.style.color = 'white';
        nextArrow.style.zIndex = '10';
        nextArrow.style.padding = '10px';
        
        sliderContainer.style.position = 'relative';
        sliderContainer.appendChild(prevArrow);
        sliderContainer.appendChild(nextArrow);
        
        // Add event listeners to arrows
        prevArrow.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        nextArrow.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Function to show testimonial at specific index
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                if (i === index) {
                    testimonial.style.display = 'block';
                    testimonial.style.opacity = '0';
                    setTimeout(() => {
                        testimonial.style.opacity = '1';
                    }, 50);
                } else {
                    testimonial.style.display = 'none';
                }
            });
            
            // Update dots
            document.querySelectorAll('.slider-dot').forEach((dot, i) => {
                dot.style.backgroundColor = i === index ? '#ff6b6b' : 'rgba(255, 255, 255, 0.3)';
            });
            
            currentIndex = index;
        }
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '5px 0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    
    if (heroSection && scrollPosition < heroSection.offsetHeight) {
        const yPos = scrollPosition * 0.5;
        heroSection.style.backgroundPositionY = yPos + 'px';
    }
});

// Portfolio hover effect enhancement
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.portfolio-overlay');
        const img = this.querySelector('.portfolio-img');
        
        overlay.style.opacity = '1';
        img.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.portfolio-overlay');
        const img = this.querySelector('.portfolio-img');
        
        overlay.style.opacity = '0';
        img.style.transform = 'scale(1)';
    });
});

// Active menu item highlighting
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + currentSection) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveMenuItem);
window.addEventListener('load', updateActiveMenuItem);