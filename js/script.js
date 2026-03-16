// Login Modal Functions
function openLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Simulate login process
  console.log('Login attempt:', { email, password });
  
  // Show success message (in real app, this would be an API call)
  showNotification('¡Bienvenido de nuevo! Redirigiendo...', 'success');
  
  // Close modal after successful login
  setTimeout(() => {
    closeLoginModal();
    // Reset form
    document.getElementById('loginForm').reset();
  }, 1500);
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('loginModal');
  if (event.target == modal) {
    closeLoginModal();
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeLoginModal();
  }
});
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
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

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.tool-card, .metric-card, .game-card');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Basic validation
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            showNotification('Por favor completa todos los campos obligatorios', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor ingresa un email válido', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 15px;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        default: return 'fa-info-circle';
    }
}

// Hero Button Actions
document.addEventListener('DOMContentLoaded', function() {
    const demoBtn = document.querySelector('.btn-primary');
    const toolsBtn = document.querySelector('.btn-secondary');
    
    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            // Scroll to contact form
            const contactSection = document.querySelector('#contacto');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Focus on first input field
                setTimeout(() => {
                    const firstInput = contactSection.querySelector('input');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 800);
            }
        });
    }
    
    if (toolsBtn) {
        toolsBtn.addEventListener('click', function() {
            // Scroll to tools section
            const toolsSection = document.querySelector('#herramientas');
            if (toolsSection) {
                toolsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Interactive Tool Cards
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't trigger if clicking on links or buttons
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            return;
        }
        
        // Add pulse effect
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Game Card Interactions
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.game-image i');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.game-image i');
        if (icon) {
            icon.style.transform = '';
        }
    });
});

// Metric Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number
        if (element.dataset.format === 'currency') {
            element.textContent = '$' + Math.floor(current).toLocaleString() + 'M';
        } else if (element.dataset.format === 'percentage') {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Intersection Observer for counter animations
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.metric-value, .stat-number');
            counters.forEach(counter => {
                const text = counter.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (text.includes('$')) {
                    counter.dataset.format = 'currency';
                    animateCounter(counter, number);
                } else if (text.includes('%')) {
                    counter.dataset.format = 'percentage';
                    animateCounter(counter, number);
                } else {
                    animateCounter(counter, number);
                }
            });
            
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe metrics and stats sections
document.querySelectorAll('.metrics, .hero-stats').forEach(section => {
    counterObserver.observe(section);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Dynamic Year in Footer
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${currentYear} AstraPeople. Todos los derechos reservados.`;
}

// Tool Filter (for future expansion)
function createToolFilter() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'tool-filter';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">Todas</button>
            <button class="filter-btn" data-filter="development">Desarrollo</button>
            <button class="filter-btn" data-filter="management">Gestión</button>
            <button class="filter-btn" data-filter="recognition">Reconocimiento</button>
        </div>
    `;
    
    return filterContainer;
}

// Add hover effects to cards
document.querySelectorAll('.tool-card, .game-card, .metric-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Performance optimization - Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    lazyLoadImages();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add CSS for loaded state
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        margin-left: auto;
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);
