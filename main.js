// Intentioned Landing Page - Main JavaScript
// Extracted to external file for CSP compliance

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Mobile hamburger menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Scroll-triggered animations with Intersection Observer
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Scroll zoom observer with lower threshold for zoom effect
    const scrollZoomObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    // Staggered row animation observer
    const gridRowObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index
                const allRows = document.querySelectorAll('.grid-row-animate');
                const index = Array.from(allRows).indexOf(entry.target);
                entry.target.style.transitionDelay = (index * 0.05) + 's';
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    // Observe scroll-zoom elements
    document.querySelectorAll('.scroll-zoom').forEach(function(el) {
        scrollZoomObserver.observe(el);
    });

    // Observe grid row animations with stagger
    document.querySelectorAll('.grid-row-animate').forEach(function(el) {
        gridRowObserver.observe(el);
    });

    // Add scroll animation class to section headers and cards
    document.querySelectorAll('.section-header, .terminal, .stat-card, .tech-pills, .cta h2, .cta p, .cta > div').forEach(function(el) {
        el.classList.add('animate-on-scroll');
        scrollObserver.observe(el);
    });

    // Bento cards with staggered animation
    document.querySelectorAll('.bento-card').forEach(function(card, index) {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = (index * 0.1) + 's';
        scrollObserver.observe(card);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            }
        });
    }

    // Sustainability Index - Table Row Animation
    const tableRowElements = document.querySelectorAll('.table-row-animate');
    if (tableRowElements.length > 0) {
        const tableObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Get all table-row-animate elements within the same row
                    const allCells = Array.from(tableRowElements);
                    const currentIndex = allCells.indexOf(entry.target);
                    const rowIndex = Math.floor(currentIndex / 3); // 3 cells per row
                    
                    // Add delay based on row index for staggered effect
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                    }, (rowIndex % 3) * 150); // Stagger by 150ms per row
                    
                    tableObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        tableRowElements.forEach(function(el) {
            tableObserver.observe(el);
        });
    }

    // Sustainability Index - Commitment Items Animation
    const commitmentItems = document.querySelectorAll('.commitment-item');
    if (commitmentItems.length > 0) {
        const commitmentObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, idx) {
                if (entry.isIntersecting) {
                    const allItems = Array.from(commitmentItems);
                    const itemIndex = allItems.indexOf(entry.target);
                    
                    // Stagger the reveal
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                    }, itemIndex * 200);
                    
                    commitmentObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -30px 0px'
        });

        commitmentItems.forEach(function(item) {
            commitmentObserver.observe(item);
        });
    }

    // Hero word rotator (Slot Machine Style)
    const wrapper = document.getElementById('heroWordWrapper');
    const heroWords = [
        'Conversation',
        'Day out',
        'Presentation',
        'Interview',
        'Meeting',
        'Conference',
        'Negotiation',
        'Debrief',
        'Debate',
    ];

    let currentIndex = 0;

    // Initialize words
    if (wrapper) {
        // Add words + clone of first word for seamless loop
        [...heroWords, heroWords[0]].forEach(function(word) {
            const span = document.createElement('span');
            span.className = 'hero-word';
            span.textContent = word;
            wrapper.appendChild(span);
        });
    }

    function scheduleHeroWordRotate() {
        if (!wrapper) return;
        const delay = 3500 + Math.random() * 4500;
        
        setTimeout(function() {
            currentIndex++;
            
            // Animate
            wrapper.style.transition = 'transform 600ms linear';
            wrapper.style.transform = 'translateY(-' + (currentIndex * 1.1) + 'em)';

            // Handle loop
            if (currentIndex === heroWords.length) {
                // Wait for transition to finish, then snap back
                setTimeout(function() {
                    wrapper.style.transition = 'none';
                    currentIndex = 0;
                    wrapper.style.transform = 'translateY(0)';
                    // Force reflow
                    void wrapper.offsetHeight;
                }, 600);
            }

            scheduleHeroWordRotate();
        }, delay);
    }

    if (wrapper) {
        scheduleHeroWordRotate();
    }

    // Mailing list form handler
    const mailingListForm = document.getElementById('mailingListForm');
    if (mailingListForm) {
        mailingListForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('emailInput').value;
            const messageEl = document.getElementById('mailingListMessage');
            const submitBtn = e.target.querySelector('button[type="submit"]');
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
            
            try {
                const response = await fetch('https://intentioned-license-server.jansherremway.workers.dev/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        language: navigator.language ? navigator.language.split('-')[0] : 'en',
                        consent_launch_notification: true
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    messageEl.style.color = 'var(--success)';
                    messageEl.textContent = '✅ ' + (data.message || "Thanks for subscribing! We'll notify you when we launch.");
                    document.getElementById('emailInput').value = '';
                    submitBtn.textContent = 'Subscribed!';
                } else {
                    throw new Error(data.reason || 'Subscription failed');
                }
            } catch (err) {
                messageEl.style.color = '#ef4444';
                messageEl.textContent = '❌ Something went wrong. Please try again.';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
            }
        });
    }

    // Async load Google Fonts after page render (non-blocking)
    function loadFonts() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
        document.head.appendChild(link);
    }

    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadFonts);
    } else {
        setTimeout(loadFonts, 100);
    }
});

// Global function for closing mobile menu (used by inline onclick)
function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}
