/* ========================================
   OnTonite Landing Page — Scripts
   ======================================== */

(function () {
    'use strict';

    // --- Sticky Nav ---
    const nav = document.getElementById('nav');

    function handleScroll() {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile Menu Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', function () {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- FAQ Accordion ---
    document.querySelectorAll('.faq-question').forEach(function (button) {
        button.addEventListener('click', function () {
            var item = this.parentElement;
            var isOpen = item.classList.contains('open');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(function (faq) {
                faq.classList.remove('open');
                faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle the clicked item
            if (!isOpen) {
                item.classList.add('open');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    var fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything
        fadeElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }
})();
