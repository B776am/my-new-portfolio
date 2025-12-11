// ======== DOM Content Loaded ========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoading();
    initializeAOS();
    initializeTyped();
    initializeParticles();
    initializeNavbar();
    initializeSkills();
    initializePortfolio();
    initializeContact();
    initializeTheme();
    initializeBackToTop();
    initializeCounters();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeAccessibility();
    updateCurrentYear();
    
    // Mobile optimizations
    if (window.innerWidth <= 768) {
        initializeMobileOptimizations();
    }
    
    // Desktop-only features
    if (window.innerWidth > 768) {
        initializeCursorEffect();
        initializeParallaxEffects();
    }
    
    // Performance optimizations
    optimizePerformance();
    preloadCriticalResources();
});

// ======== Loading Screen ========
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Trigger entrance animations
                triggerEntranceAnimations();
            }, 500);
        }, 1000);
    });
}

function triggerEntranceAnimations() {
    // Add staggered animations to hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('animate-fade-in-up');
    });
}

// ======== AOS (Animate On Scroll) ========
function initializeAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 100,
        delay: 100,
        // Disable animations on mobile for better performance
        disable: window.innerWidth < 768 ? true : false
    });
    
    // Custom scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for custom animations
    document.querySelectorAll('.service-card, .skill-item, .portfolio-card').forEach(el => {
        observer.observe(el);
    });
}

// ======== Typed.js ========
function initializeTyped() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: [
                'مطور واجهات أمامية',
                'مطور تطبيقات موبايل',
                'مصمم UI/UX',
                'مطور Full Stack',
                'خبير في Flutter',
                'متخصص في PHP'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true,
            fadeOut: true,
            fadeOutClass: 'typed-fade-out',
            fadeOutDelay: 500
        });
    }
}

// ======== Enhanced Particles.js ========
function initializeParticles() {
    // Only initialize particles on desktop for better mobile performance
    if (typeof particlesJS !== 'undefined' && window.innerWidth > 768) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: window.innerWidth > 1200 ? 100 : 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b']
                },
                shape: {
                    type: ['circle', 'triangle'],
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 6
                    }
                },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
        
        // Theme-based particle adjustments
        updateParticlesTheme();
    }
}

function updateParticlesTheme() {
    const theme = document.documentElement.getAttribute('data-theme');
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer && window.pJSDom && window.pJSDom[0]) {
        const particles = window.pJSDom[0].pJS.particles;
        if (theme === 'light') {
            particles.opacity.value = 0.2;
            particles.line_linked.opacity = 0.2;
        } else {
            particles.opacity.value = 0.4;
            particles.line_linked.opacity = 0.3;
        }
    }
}

// ======== Enhanced Navbar ========
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // Navbar scroll effect with throttling
    let ticking = false;
    function updateNavbar() {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Enhanced active nav link with smooth transitions
    function updateActiveLink() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    let linkTicking = false;
    window.addEventListener('scroll', () => {
        if (!linkTicking) {
            requestAnimationFrame(updateActiveLink);
            linkTicking = true;
        }
    });
    
    // Enhanced mobile menu
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
            
            // Add ripple effect
            createRippleEffect(e.target, e);
        });
    });
    
    // Enhanced mobile menu toggle
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            
            // Add haptic feedback on mobile
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });
    }
}

// ======== Enhanced Skills Animation ========
function initializeSkills() {
    const skillsSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillsSection && skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(skillsSection);
    }
    
    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            const skillItem = bar.closest('.skill-item');
            
            setTimeout(() => {
                bar.style.width = width;
                
                // Add bounce effect to skill item
                skillItem.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    skillItem.style.transform = 'scale(1)';
                }, 200);
                
                // Add number counting animation
                const percentage = skillItem.querySelector('.skill-percentage');
                animateNumber(percentage, parseInt(width));
                
            }, index * 200);
        });
    }
}

// ======== Enhanced Portfolio Filter ========
function initializePortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Add staggered animation
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        item.classList.remove('hidden');
                        item.style.display = 'block';
                        item.style.animation = `fadeInScale 0.5s ease-out ${index * 0.1}s both`;
                    }, index * 50);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
            
            // Add ripple effect
            createRippleEffect(btn, e);
        });
    });
    
    // Add hover effects to portfolio cards
    portfolioItems.forEach(item => {
        const card = item.querySelector('.portfolio-card');
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
        });
    });
}

// ======== Enhanced Contact Form ========
function initializeContact() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formButton = contactForm.querySelector('.btn');
            
            // Show loading state with animation
            contactForm.classList.add('loading');
            formButton.disabled = true;
            formButton.style.transform = 'scale(0.95)';
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message with animation
                showNotification('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
                contactForm.reset();
                
                // Reset form labels with animation
                resetFormLabels(contactForm);
                
                // Add success animation
                formButton.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    formButton.style.transform = 'scale(1)';
                }, 200);
                
            } catch (error) {
                showNotification('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
                
                // Add error shake animation
                contactForm.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    contactForm.style.animation = '';
                }, 500);
                
            } finally {
                // Hide loading state
                contactForm.classList.remove('loading');
                formButton.disabled = false;
                formButton.style.transform = 'scale(1)';
            }
        });
        
        // Enhanced form validation with real-time feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
            input.addEventListener('focus', handleFieldFocus);
            
            // Add floating label animation
            input.addEventListener('input', () => {
                const label = input.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    if (input.value.trim()) {
                        label.style.transform = 'translateY(-1.5rem) scale(0.85)';
                        label.style.color = 'var(--primary-color)';
                    } else {
                        label.style.transform = 'translateY(0) scale(1)';
                        label.style.color = 'var(--text-muted)';
                    }
                }
            });
        });
    }
}

// ======== Enhanced Theme Toggle ========
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add transition class to body
            document.body.classList.add('theme-transition');
            
            // Apply new theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Update particles if they exist
            updateParticlesTheme();
            
            // Add ripple effect to theme toggle
            createRippleEffect(themeToggle);
            
            // Remove transition class after animation
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 300);
            
            // Add haptic feedback on mobile
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
            updateParticlesTheme();
        }
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const moonIcon = themeToggle.querySelector('.fa-moon');
        const sunIcon = themeToggle.querySelector('.fa-sun');
        
        if (theme === 'dark') {
            moonIcon.style.opacity = '1';
            moonIcon.style.transform = 'rotate(0deg) scale(1)';
            sunIcon.style.opacity = '0';
            sunIcon.style.transform = 'rotate(180deg) scale(0)';
        } else {
            sunIcon.style.opacity = '1';
            sunIcon.style.transform = 'rotate(0deg) scale(1)';
            moonIcon.style.opacity = '0';
            moonIcon.style.transform = 'rotate(-180deg) scale(0)';
        }
    }
}

// ======== Enhanced Back to Top ========
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        let ticking = false;
        
        function updateBackToTop() {
            const scrolled = window.scrollY > 300;
            backToTopBtn.classList.toggle('visible', scrolled);
            
            // Add progress indicator
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            backToTopBtn.style.background = `conic-gradient(var(--primary-color) ${scrollPercent}%, var(--bg-secondary) ${scrollPercent}%)`;
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateBackToTop);
                ticking = true;
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            // Add click animation
            backToTopBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                backToTopBtn.style.transform = 'scale(1)';
            }, 150);
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });
    }
}

// ======== Enhanced Counter Animation ========
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            
            // Add completion animation
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

function animateNumber(element, target) {
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '%';
    }, 16);
}

// ======== Enhanced Smooth Scroll ========
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                // Add click animation to link
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
                
                // Smooth scroll with easing
                smoothScrollTo(offsetTop, 800);
            }
        });
    });
    
    // Add scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                smoothScrollTo(aboutSection.offsetTop - 80, 800);
            }
        });
    }
}

function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    
    requestAnimationFrame(animation);
}

// ======== Scroll Animations ========
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-animate');
                element.classList.add(`animate-${animation}`);
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ======== Cursor Effect (Desktop Only) ========
function initializeCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease, background-color 0.2s ease;
        opacity: 0;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    cursorTrail.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorTrail);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '0.7';
        cursorTrail.style.opacity = '0.3';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.7';
        cursorTrail.style.opacity = '0.3';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorTrail.style.opacity = '0';
    });
    
    // Smooth cursor movement
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        trailX += (mouseX - trailX) * 0.05;
        trailY += (mouseY - trailY) * 0.05;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        cursorTrail.style.left = trailX - 20 + 'px';
        cursorTrail.style.top = trailY - 20 + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Enhanced hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .portfolio-card, .service-card, .skill-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'var(--accent-color)';
            cursorTrail.style.transform = 'scale(1.2)';
            cursorTrail.style.borderColor = 'var(--accent-color)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--primary-color)';
            cursorTrail.style.transform = 'scale(1)';
            cursorTrail.style.borderColor = 'var(--primary-color)';
        });
    });
}

// ======== Parallax Effects ========
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background, .image-decoration');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ======== Ripple Effect ========
function createRippleEffect(element, event = null) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event ? event.clientX - rect.left - size / 2 : rect.width / 2 - size / 2;
    const y = event ? event.clientY - rect.top - size / 2 : rect.height / 2 - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ======== Form Helper Functions ========
function resetFormLabels(form) {
    const labels = form.querySelectorAll('label');
    labels.forEach(label => {
        label.style.transform = 'translateY(0) scale(1)';
        label.style.color = 'var(--text-muted)';
    });
}

function handleFieldFocus(e) {
    const field = e.target;
    const label = field.nextElementSibling;
    if (label && label.tagName === 'LABEL') {
        label.style.transform = 'translateY(-1.5rem) scale(0.85)';
        label.style.color = 'var(--primary-color)';
    }
}

// ======== Form Validation ========
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove existing error
    clearFieldError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (!value) {
        isValid = false;
        errorMessage = 'هذا الحقل مطلوب';
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
        }
    }
    
    // Name validation
    if (fieldName === 'name' && value && value.length < 2) {
        isValid = false;
        errorMessage = 'الاسم يجب أن يكون أكثر من حرفين';
    }
    
    // Message validation
    if (fieldName === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'الرسالة يجب أن تكون أكثر من 10 أحرف';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        // Add success animation
        field.style.borderColor = 'var(--success-color)';
        setTimeout(() => {
            field.style.borderColor = '';
        }, 1000);
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            existingError.remove();
        }, 300);
    }
    field.style.borderColor = '';
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.cssText = `
        color: var(--error-color);
        font-size: 0.875rem;
        margin-top: 0.5rem;
        animation: fadeInUp 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;
    
    field.style.borderColor = 'var(--error-color)';
    field.parentNode.appendChild(errorElement);
}

// ======== Enhanced Notification System ========
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.style.animation = 'slideOutRight 0.3s ease-in-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#6366f1'
    };
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-times-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 350px;
        font-weight: 500;
        font-size: 0.9rem;
        line-height: 1.4;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    notification.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
            opacity: 0.7;
            transition: opacity 0.2s;
        " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove with progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.3);
        width: 100%;
        animation: progressBar 5s linear;
    `;
    notification.appendChild(progressBar);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// ======== Update Current Year ========
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ======== Mobile Optimizations ========
function initializeMobileOptimizations() {
    // Disable hover effects on mobile
    const hoverElements = document.querySelectorAll('.service-card, .portfolio-card, .feature-item');
    hoverElements.forEach(element => {
        element.style.transform = 'none';
    });
    
    // Optimize touch interactions
    document.addEventListener('touchstart', function() {}, {passive: true});
    document.addEventListener('touchmove', function() {}, {passive: true});
    
    // Reduce particles on mobile
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        particlesContainer.style.display = 'none';
    }
    
    // Add touch feedback
    const touchElements = document.querySelectorAll('.btn, .nav-link, .filter-btn, .portfolio-link');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, {passive: true});
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, {passive: true});
    });
}

// ======== Performance Optimization ========
function optimizePerformance() {
    // Lazy load images
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
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle resize
            if (window.innerWidth <= 768 && !document.body.classList.contains('mobile-optimized')) {
                initializeMobileOptimizations();
                document.body.classList.add('mobile-optimized');
            }
        }, 250);
    });
    
    // Preload critical resources
    const criticalImages = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=400&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ======== Preload Critical Resources ========
function preloadCriticalResources() {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
}

// ======== Accessibility Improvements ========
function initializeAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'تخطي إلى المحتوى الرئيسي';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Improve focus management
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
    
    // Add ARIA labels for better screen reader support
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'تبديل الوضع المظلم والفاتح');
    }
    
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.setAttribute('aria-label', 'العودة إلى أعلى الصفحة');
    }
}

// ======== Error Handling ========
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You can add error reporting here
});

// ======== Service Worker Registration ========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ======== Additional CSS Animations ========
const additionalStyles = `
<style>
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes slideOutRight {
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes progressBar {
    from { width: 100%; }
    to { width: 0%; }
}

@keyframes fadeOut {
    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}

.theme-transition {
    transition: background-color 0.3s ease, color 0.3s ease !important;
}

.theme-transition * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
}

.animate-in {
    animation: fadeInUp 0.6s ease-out;
}

.animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out both;
}

.skip-link:focus {
    top: 6px !important;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

