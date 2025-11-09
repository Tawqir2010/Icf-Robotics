// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const interest = formData.get('interest');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show success message (in a real application, this would send the form data to a server)
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
        this.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current page navigation link
window.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Add loading animation for images when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and placeholders for animation
window.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.member-card, .mentor-card, .event-card, .feature, .update-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Theme switching for teams page
if (window.location.pathname.includes('teams.html')) {
    const girlsTeamSection = document.querySelector('[data-theme="girls"]');
    const navbar = document.querySelector('.navbar');
    const teamsSection = document.querySelector('.teams-section');
    
    if (girlsTeamSection && navbar && teamsSection) {
        const themeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navbar.classList.add('teal-theme');
                    teamsSection.classList.add('girls-background');
                } else {
                    navbar.classList.remove('teal-theme');
                    teamsSection.classList.remove('girls-background');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '-50px 0px -50px 0px'
        });
        
        themeObserver.observe(girlsTeamSection);
    }
}

// Parallax scroll effect for floating elements
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    const floatingElements = document.querySelectorAll('.float-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingElements.forEach((element, index) => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const yPos = scrolled * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Awards Modal functionality
    const awardsButton = document.getElementById('awardsButton');
    const awardsModal = document.getElementById('awardsModal');
    const awardsClose = document.getElementById('awardsClose');
    
    if (awardsButton && awardsModal && awardsClose) {
        // Open modal when clicking the awards badge
        awardsButton.addEventListener('click', function() {
            awardsModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal when clicking the X button
        awardsClose.addEventListener('click', function() {
            awardsModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', function(event) {
            if (event.target === awardsModal) {
                awardsModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Simple cache control for development
if (window.location.hostname === 'localhost' || window.location.hostname.includes('repl')) {
    // Disable caching in development
    window.addEventListener('beforeunload', function() {
        if ('caches' in window) {
            caches.keys().then(function(names) {
                names.forEach(function(name) {
                    caches.delete(name);
                });
            });
        }
    });
}
