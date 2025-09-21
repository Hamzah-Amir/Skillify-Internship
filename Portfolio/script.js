// Mobile Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Lightbox/Image Popup Feature
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightbox = document.querySelector('.close-lightbox');
    const projectImages = document.querySelectorAll('.project-image');
    
    // Open lightbox when clicking on project images
    projectImages.forEach(image => {
        image.addEventListener('click', function() {
            const card = this.closest('.card');
            const largeImageSrc = card.getAttribute('data-image');
            
            lightboxImage.src = largeImageSrc;
            lightboxImage.alt = this.alt;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close lightbox when clicking the close button
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Back to Top Button with SVG
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Initially hide the button
    backToTopButton.style.display = 'none';
    backToTopButton.style.opacity = '0';
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            backToTopButton.style.display = 'block';
            // Use requestAnimationFrame for smooth animation
            requestAnimationFrame(() => {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.transform = 'translateY(0)';
            });
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(10px)';
            // Hide after animation completes
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effects
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Additional Enhancement: Active Navigation Link Highlighting
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
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
});

// Additional Enhancement: Scroll Animation for Elements
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animation
    const animatedElements = document.querySelectorAll('.card, .about div, .hero');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Dynamic Projects Section with Filtering
document.addEventListener('DOMContentLoaded', function() {
    // Project data array
    const projects = [
        {
            title: "E-Commerce Website",
            description: "A full-stack e-commerce platform built with React and Node.js featuring user authentication, payment integration, and admin dashboard.",
            image: "https://via.placeholder.com/400x300/4a90e2/ffffff?text=E-Commerce+Website",
            largeImage: "https://via.placeholder.com/800x600/4a90e2/ffffff?text=E-Commerce+Website",
            category: "websites",
            liveLink: "https://example.com",
            githubLink: "https://github.com/example",
            technologies: ["React", "Node.js", "MongoDB", "Stripe API"]
        },
        {
            title: "Portfolio Design",
            description: "Modern and responsive portfolio design with smooth animations and interactive elements using CSS3 and JavaScript.",
            image: "https://via.placeholder.com/400x300/7b68ee/ffffff?text=Portfolio+Design",
            largeImage: "https://via.placeholder.com/800x600/7b68ee/ffffff?text=Portfolio+Design",
            category: "designs",
            liveLink: "https://example.com",
            githubLink: "https://github.com/example",
            technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"]
        },
        {
            title: "Task Manager App",
            description: "A productivity app for managing daily tasks with drag-and-drop functionality, due dates, and team collaboration features.",
            image: "https://via.placeholder.com/400x300/20b2aa/ffffff?text=Task+Manager",
            largeImage: "https://via.placeholder.com/800x600/20b2aa/ffffff?text=Task+Manager",
            category: "mini-apps",
            liveLink: "https://example.com",
            githubLink: "https://github.com/example",
            technologies: ["Vue.js", "Firebase", "CSS3"]
        },
        {
            title: "Restaurant Website",
            description: "Beautiful restaurant website with online menu, reservation system, and contact form integration.",
            image: "https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Restaurant+Website",
            largeImage: "https://via.placeholder.com/800x600/ff6b6b/ffffff?text=Restaurant+Website",
            category: "websites",
            liveLink: "https://example.com",
            githubLink: "https://github.com/example",
            technologies: ["HTML5", "CSS3", "JavaScript", "PHP"]
        },
        {
            title: "UI/UX Design System",
            description: "Comprehensive design system with reusable components, color palettes, and typography guidelines for consistent user experience.",
            image: "https://via.placeholder.com/400x300/ffa726/ffffff?text=UI+UX+Design",
            largeImage: "https://via.placeholder.com/800x600/ffa726/ffffff?text=UI+UX+Design",
            category: "designs",
            liveLink: "https://example.com",
            githubLink: "https://github.com/example",
            technologies: ["Figma", "Adobe XD", "Sketch"]
        },
        {
            title: "Weather App",
            description: "Real-time weather application with location-based forecasts, interactive maps, and weather alerts.",
            image: "https://via.placeholder.com/400x300/26c6da/ffffff?text=Weather+App",
            largeImage: "https://via.placeholder.com/800x600/26c6da/ffffff?text=Weather+App",
            category: "mini-apps",
            liveLink: "https://example.com",
            githubLink: "https://github.com/example",
            technologies: ["React", "OpenWeather API", "CSS3"]
        },
        {
            title: "Blog Platform",
            description: "Content management system for bloggers with rich text editor, comment system, and SEO optimization.",
            image: "https://via.placeholder.com/400x300/8e24aa/ffffff?text=Blog+Platform",
            largeImage: "https://via.placeholder.com/800x600/8e24aa/ffffff?text=Blog+Platform",
            category: "websites",
            liveLink: "https://example.com",
            githubLink: "https://github.com/example",
            technologies: ["Next.js", "Prisma", "PostgreSQL"]
        },
        {
            title: "Mobile App Design",
            description: "Fitness tracking mobile app design with intuitive user interface and engaging user experience.",
            image: "https://via.placeholder.com/400x300/43a047/ffffff?text=Mobile+App+Design",
            largeImage: "https://via.placeholder.com/800x600/43a047/ffffff?text=Mobile+App+Design",
            category: "designs",
            liveLink: "https://example.com",
            githubLink: "https://github.com/example",
            technologies: ["Figma", "Principle", "Adobe After Effects"]
        }
    ];

    const projectCardsContainer = document.getElementById('project-cards');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';

    // Function to create project card HTML
    function createProjectCard(project) {
        return `
            <div class="card" data-category="${project.category}" data-image="${project.largeImage}">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-overlay">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.liveLink}" target="_blank" class="project-link">Live Demo</a>
                        <a href="${project.githubLink}" target="_blank" class="project-link">GitHub</a>
                    </div>
                </div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
    }

    // Function to render projects
    function renderProjects(filter = 'all') {
        const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);
        
        projectCardsContainer.innerHTML = filteredProjects.map(project => createProjectCard(project)).join('');
        
        // Re-initialize lightbox functionality for new cards
        initializeLightbox();
        
        // Re-initialize scroll animation for new cards
        initializeScrollAnimation();
    }

    // Function to initialize lightbox functionality
    function initializeLightbox() {
        const projectImages = document.querySelectorAll('.project-image');
        
        projectImages.forEach(image => {
            // Remove existing event listeners to prevent duplicates
            image.removeEventListener('click', handleImageClick);
            image.addEventListener('click', handleImageClick);
        });
    }

    // Function to handle image click for lightbox
    function handleImageClick(event) {
        const card = event.target.closest('.card');
        const largeImageSrc = card.getAttribute('data-image');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        
        lightboxImage.src = largeImageSrc;
        lightboxImage.alt = event.target.alt;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Function to initialize scroll animation for new cards
    function initializeScrollAnimation() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        const newCards = document.querySelectorAll('.card');
        newCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            currentFilter = this.getAttribute('data-filter');
            
            // Render filtered projects
            renderProjects(currentFilter);
        });
    });

    // Initial render
    renderProjects();
});