// ===== Scroll Reveal Animation =====
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Parallax effect for floral backgrounds
    const floralBgs = document.querySelectorAll('.floral-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floralBgs.forEach((bg, index) => {
            const section = bg.parentElement;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Only apply parallax when section is in view
            if (scrolled >= sectionTop - window.innerHeight && 
                scrolled <= sectionTop + sectionHeight) {
                const yPos = (scrolled - sectionTop) * 0.15;
                bg.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Add subtle animation to event cards on scroll
    const eventCards = document.querySelectorAll('.event-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.2
    });
    
    eventCards.forEach(card => {
        cardObserver.observe(card);
    });
});

// ===== Preloader (optional enhancement) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Floating Petals Animation =====
function createPetal() {
    const container = document.getElementById('petals-container');
    if (!container) return;
    
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Random properties
    const size = Math.random() * 8 + 6; // 6-14px
    const startX = Math.random() * 100; // 0-100% from left
    const duration = Math.random() * 8 + 10; // 10-18 seconds
    const delay = Math.random() * 2;
    const drift = (Math.random() - 0.5) * 150; // -75 to 75px horizontal drift
    
    petal.style.cssText = `
        left: ${startX}%;
        width: ${size}px;
        height: ${size}px;
        opacity: 0;
    `;
    
    container.appendChild(petal);
    
    // Animate the petal
    const animation = petal.animate([
        { 
            top: '-20px', 
            opacity: 0,
            transform: `translateX(0) rotate(0deg)`
        },
        { 
            opacity: 0.5,
            offset: 0.1
        },
        { 
            opacity: 0.4,
            offset: 0.5
        },
        { 
            opacity: 0.2,
            offset: 0.9
        },
        { 
            top: 'calc(100vh + 20px)', 
            opacity: 0,
            transform: `translateX(${drift}px) rotate(${360 + Math.random() * 360}deg)`
        }
    ], {
        duration: duration * 1000,
        easing: 'linear',
        delay: delay * 1000
    });
    
    animation.onfinish = () => {
        petal.remove();
    };
}

// Create petals continuously
function startPetals() {
    // Create initial batch
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createPetal(), i * 800);
    }
    
    // Keep creating new petals
    setInterval(() => {
        createPetal();
    }, 1500);
}

// Start petals after page loads
setTimeout(startPetals, 500);

// ===== Countdown Timer =====
function updateCountdown() {
    // Wedding ceremony date: January 23, 2026 at 8:00 PM Bangladesh Standard Time (UTC+6)
    // Using ISO format with explicit timezone offset for accuracy
    const weddingDate = new Date('2026-01-23T20:00:00+06:00').getTime();
    const now = new Date().getTime();
    const difference = weddingDate - now;
    
    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // Wedding day has arrived!
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.querySelector('.countdown-label').textContent = "The celebration has begun! 🎉";
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

