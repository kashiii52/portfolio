document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbar.classList.contains('active')) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.classList.add('animate__animated', 'animate__fadeInUp');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('animate__animated', 'animate__fadeInUp');
                }
            });
        });
    });

    // Portfolio Lightbox
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const lightbox = document.querySelector('.lightbox');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;

    portfolioLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = index;
            const portfolioItem = this.closest('.portfolio-item');
            const imgSrc = portfolioItem.querySelector('img').getAttribute('src');
            const caption = portfolioItem.querySelector('h3').textContent;

            lightboxImg.setAttribute('src', imgSrc);
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    });

    closeLightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // Play Reel Videos
    const playBtns = document.querySelectorAll('.play-btn');
    const reelVideos = document.querySelectorAll('.reel-video video');

    playBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const video = reelVideos[index];
            if (video.paused) {
                video.play();
                btn.innerHTML = '<i class="fas fa-pause"></i>';
                video.setAttribute('controls', 'true');
            } else {
                video.pause();
                btn.innerHTML = '<i class="fas fa-play"></i>';
                video.removeAttribute('controls');
            }
        });
    });

    // Animate on Scroll
    const animateElements = document.querySelectorAll('.animate__animated');

    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                const animationClass = Array.from(element.classList).find(className => 
                    className.startsWith('animate__')
                );
                if (animationClass) {
                    element.classList.add(animationClass);
                }
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});