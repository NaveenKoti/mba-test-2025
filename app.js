// Application Data
const quizData = [
    {
        question: "What type of work environment excites you most?",
        options: [
            { text: "Fast-paced financial markets", specialization: "finance" },
            { text: "Creative marketing campaigns", specialization: "marketing" },
            { text: "People-focused HR initiatives", specialization: "hr" },
            { text: "Efficient operational processes", specialization: "operations" }
        ]
    },
    {
        question: "Which skill do you want to develop most?",
        options: [
            { text: "Financial analysis and risk assessment", specialization: "finance" },
            { text: "Digital marketing and analytics", specialization: "digital" },
            { text: "Global business strategies", specialization: "international" },
            { text: "Supply chain optimization", specialization: "operations" }
        ]
    },
    {
        question: "What type of impact do you want to make?",
        options: [
            { text: "Drive financial growth and investments", specialization: "finance" },
            { text: "Build strong brands and customer relationships", specialization: "marketing" },
            { text: "Develop talent and organizational culture", specialization: "hr" },
            { text: "Expand business globally", specialization: "international" }
        ]
    },
    {
        question: "Which industry interests you most?",
        options: [
            { text: "Banking and financial services", specialization: "finance" },
            { text: "Technology and digital platforms", specialization: "digital" },
            { text: "Manufacturing and logistics", specialization: "operations" },
            { text: "Consulting and people development", specialization: "hr" }
        ]
    },
    {
        question: "What motivates you in your career?",
        options: [
            { text: "Managing financial portfolios and investments", specialization: "finance" },
            { text: "Creating innovative marketing strategies", specialization: "marketing" },
            { text: "Optimizing business processes", specialization: "operations" },
            { text: "Working across different cultures and markets", specialization: "international" }
        ]
    }
];

const mbaPrograms = {
    finance: {
        name: "Finance & Banking",
        description: "Comprehensive program covering investment banking, risk management, and corporate finance",
        careers: ["Investment Banker", "Risk Manager", "Financial Analyst", "Corporate Finance Manager"]
    },
    marketing: {
        name: "Marketing & Sales",
        description: "Focus on digital marketing, consumer behavior, and brand management",
        careers: ["Marketing Manager", "Brand Strategist", "Digital Marketing Specialist", "Product Manager"]
    },
    hr: {
        name: "Human Resources",
        description: "Talent management, organizational development, and workforce planning",
        careers: ["HR Manager", "Talent Acquisition Specialist", "Training & Development Manager"]
    },
    operations: {
        name: "Operations & Supply Chain",
        description: "Supply chain management, process optimization, and quality control",
        careers: ["Operations Manager", "Supply Chain Analyst", "Process Improvement Specialist"]
    },
    digital: {
        name: "Digital Marketing & Analytics",
        description: "Data-driven marketing, analytics, and digital transformation",
        careers: ["Data Analyst", "Digital Marketing Manager", "Business Intelligence Analyst"]
    },
    international: {
        name: "International Business",
        description: "Global business practices, international trade, and cross-cultural management",
        careers: ["International Business Manager", "Export Manager", "Global Operations Specialist"]
    }
};

const pollData = [
    { text: "Career Growth", votes: 234 },
    { text: "Salary Increase", votes: 189 },
    { text: "Industry Network", votes: 156 },
    { text: "Skill Development", votes: 201 },
    { text: "Entrepreneurship", votes: 98 }
];

// Global Variables
let currentSlide = 0;
let currentQuestion = 0;
let quizAnswers = [];
let hasVoted = false;

// Carousel state
let programsIndex = 0;
let facultyIndex = 0;
let campusIndex = 0;

// DOM Elements
let heroSlides, programsContainer, facultyContainer, campusContainer;
let questionText, optionsContainer, currentQuestionSpan, progressFill;
let prevBtn, nextBtn, quizResult, pollOptions, pollResults;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeHeroCarousel();
    initializeProgramsCarousel();
    initializeFacultyCarousel();
    initializeCampusCarousel();
    initializeQuiz();
    initializePolling();
    initializeMobileNavigation();
    initializeContactForm();
    duplicatePartnersForScroll();
});

// Initialize DOM Elements
function initializeElements() {
    heroSlides = document.querySelector('.carousel-slides');
    programsContainer = document.querySelector('.programs-container');
    facultyContainer = document.querySelector('.faculty-container');
    campusContainer = document.querySelector('.campus-container');
    
    questionText = document.getElementById('questionText');
    optionsContainer = document.getElementById('optionsContainer');
    currentQuestionSpan = document.getElementById('currentQuestion');
    progressFill = document.getElementById('progressFill');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    quizResult = document.getElementById('quizResult');
    
    pollOptions = document.getElementById('pollOptions');
    pollResults = document.getElementById('pollResults');
}

// Hero Carousel
function initializeHeroCarousel() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.hero-carousel .carousel-btn--prev');
    const nextBtn = document.querySelector('.hero-carousel .carousel-btn--next');
    
    let autoSlideInterval;
    
    function updateCarousel() {
        if (heroSlides) {
            heroSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event Listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide();
        });
    });
    
    // Pause on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        }
        if (touchEndX > touchStartX + 50) {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        }
    }
    
    // Start auto-slide
    startAutoSlide();
}

// Programs Carousel
function initializeProgramsCarousel() {
    const slides = document.querySelectorAll('.program-slide');
    const prevBtn = document.getElementById('programsPrev');
    const nextBtn = document.getElementById('programsNext');
    
    if (!slides.length || !prevBtn || !nextBtn || !programsContainer) return;
    
    function getVisibleSlides() {
        const containerWidth = programsContainer.parentElement.offsetWidth;
        const slideWidth = 316; // 300px + 16px gap
        return Math.max(1, Math.floor(containerWidth / slideWidth));
    }
    
    function updateCarousel() {
        const slideWidth = 316; // 300px + 16px gap
        const translateX = programsIndex * slideWidth;
        programsContainer.style.transform = `translateX(-${translateX}px)`;
        
        // Update button states
        prevBtn.disabled = programsIndex === 0;
        nextBtn.disabled = programsIndex >= slides.length - getVisibleSlides();
    }
    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (programsIndex > 0) {
            programsIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const visibleSlides = getVisibleSlides();
        if (programsIndex < slides.length - visibleSlides) {
            programsIndex++;
            updateCarousel();
        }
    });
    
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
}

// Faculty Carousel
function initializeFacultyCarousel() {
    const slides = document.querySelectorAll('.faculty-slide');
    const prevBtn = document.getElementById('facultyPrev');
    const nextBtn = document.getElementById('facultyNext');
    
    if (!slides.length || !prevBtn || !nextBtn || !facultyContainer) return;
    
    function getVisibleSlides() {
        const containerWidth = facultyContainer.parentElement.offsetWidth;
        const slideWidth = 296; // 280px + 16px gap
        return Math.max(1, Math.floor(containerWidth / slideWidth));
    }
    
    function updateCarousel() {
        const slideWidth = 296; // 280px + 16px gap
        const translateX = facultyIndex * slideWidth;
        facultyContainer.style.transform = `translateX(-${translateX}px)`;
        
        // Update button states
        prevBtn.disabled = facultyIndex === 0;
        nextBtn.disabled = facultyIndex >= slides.length - getVisibleSlides();
    }
    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (facultyIndex > 0) {
            facultyIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const visibleSlides = getVisibleSlides();
        if (facultyIndex < slides.length - visibleSlides) {
            facultyIndex++;
            updateCarousel();
        }
    });
    
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
}

// Campus Carousel
function initializeCampusCarousel() {
    const slides = document.querySelectorAll('.campus-slide');
    const prevBtn = document.getElementById('campusPrev');
    const nextBtn = document.getElementById('campusNext');
    
    if (!slides.length || !prevBtn || !nextBtn || !campusContainer) return;
    
    function getVisibleSlides() {
        const containerWidth = campusContainer.parentElement.offsetWidth;
        const slideWidth = 366; // 350px + 16px gap
        return Math.max(1, Math.floor(containerWidth / slideWidth));
    }
    
    function updateCarousel() {
        const slideWidth = 366; // 350px + 16px gap
        const translateX = campusIndex * slideWidth;
        campusContainer.style.transform = `translateX(-${translateX}px)`;
        
        // Update button states
        prevBtn.disabled = campusIndex === 0;
        nextBtn.disabled = campusIndex >= slides.length - getVisibleSlides();
    }
    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (campusIndex > 0) {
            campusIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const visibleSlides = getVisibleSlides();
        if (campusIndex < slides.length - visibleSlides) {
            campusIndex++;
            updateCarousel();
        }
    });
    
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
}

// Quiz Functionality
function initializeQuiz() {
    if (!questionText || !optionsContainer || !prevBtn || !nextBtn) return;
    
    displayQuestion();
    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        previousQuestion();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextQuestion();
    });
    
    const retakeBtn = document.getElementById('retakeQuiz');
    if (retakeBtn) {
        retakeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            restartQuiz();
        });
    }
}

function displayQuestion() {
    if (currentQuestion >= quizData.length) {
        showQuizResult();
        return;
    }
    
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = quizData.length;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Clear and populate options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option.text;
        button.addEventListener('click', () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
    
    // Restore previous selection if exists
    if (quizAnswers[currentQuestion]) {
        const options = document.querySelectorAll('.option');
        const selectedIndex = quizAnswers[currentQuestion].answerIndex;
        if (options[selectedIndex]) {
            options[selectedIndex].classList.add('selected');
            nextBtn.disabled = false;
        }
    } else {
        nextBtn.disabled = true;
    }
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Get Results' : 'Next';
}

function selectOption(index, button) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    
    // Add selection to clicked option
    button.classList.add('selected');
    
    // Store answer
    quizAnswers[currentQuestion] = {
        questionIndex: currentQuestion,
        answerIndex: index,
        specialization: quizData[currentQuestion].options[index].specialization
    };
    
    // Enable next button
    nextBtn.disabled = false;
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showQuizResult();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function showQuizResult() {
    // Hide question container and show result
    const questionContainer = document.querySelector('.question-container');
    if (questionContainer) {
        questionContainer.style.display = 'none';
    }
    if (quizResult) {
        quizResult.classList.remove('hidden');
    }
    
    // Calculate result
    const specializationCounts = {};
    quizAnswers.forEach(answer => {
        const spec = answer.specialization;
        specializationCounts[spec] = (specializationCounts[spec] || 0) + 1;
    });
    
    // Find most frequent specialization
    let maxCount = 0;
    let recommendedSpec = 'finance';
    for (const spec in specializationCounts) {
        if (specializationCounts[spec] > maxCount) {
            maxCount = specializationCounts[spec];
            recommendedSpec = spec;
        }
    }
    
    // Display result
    const program = mbaPrograms[recommendedSpec];
    const resultTitle = document.getElementById('resultTitle');
    const resultDescription = document.getElementById('resultDescription');
    const careerList = document.getElementById('careerList');
    
    if (resultTitle) resultTitle.textContent = program.name;
    if (resultDescription) resultDescription.textContent = program.description;
    
    if (careerList) {
        careerList.innerHTML = '';
        program.careers.forEach(career => {
            const li = document.createElement('li');
            li.textContent = career;
            careerList.appendChild(li);
        });
    }
}

function restartQuiz() {
    currentQuestion = 0;
    quizAnswers = [];
    const questionContainer = document.querySelector('.question-container');
    if (questionContainer) {
        questionContainer.style.display = 'block';
    }
    if (quizResult) {
        quizResult.classList.add('hidden');
    }
    displayQuestion();
}

// Polling System
function initializePolling() {
    if (!pollOptions || !pollResults) return;
    
    // Check if user has already voted - don't use localStorage in sandbox
    hasVoted = false;
    
    // Use default poll data
    let currentVotes = [...pollData];
    
    renderPollOptions(currentVotes);
    renderPollResults(currentVotes);
}

function renderPollOptions(votes) {
    if (!pollOptions) return;
    
    pollOptions.innerHTML = '';
    
    if (hasVoted) {
        const message = document.createElement('p');
        message.textContent = 'Thank you for voting! See the results below.';
        message.style.textAlign = 'center';
        message.style.color = 'var(--color-text-secondary)';
        message.style.marginBottom = '16px';
        pollOptions.appendChild(message);
        return;
    }
    
    votes.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'poll-option';
        button.textContent = option.text;
        button.addEventListener('click', () => vote(index, votes));
        pollOptions.appendChild(button);
    });
}

function renderPollResults(votes) {
    if (!pollResults) return;
    
    const totalVotes = votes.reduce((sum, option) => sum + option.votes, 0);
    
    const resultsList = document.getElementById('resultsList');
    if (!resultsList) return;
    
    resultsList.innerHTML = '';
    
    votes.forEach(option => {
        const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
        
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        resultItem.innerHTML = `
            <span class="result-text">${option.text}</span>
            <div class="result-bar">
                <div class="result-fill" style="width: ${percentage}%"></div>
            </div>
            <span class="result-percentage">${percentage}% (${option.votes})</span>
        `;
        
        resultsList.appendChild(resultItem);
    });
    
    const totalVotesSpan = document.getElementById('totalVotes');
    if (totalVotesSpan) {
        totalVotesSpan.textContent = totalVotes;
    }
}

function vote(optionIndex, currentVotes) {
    if (hasVoted) return;
    
    // Increment vote
    currentVotes[optionIndex].votes++;
    hasVoted = true;
    
    // Re-render with immediate feedback
    renderPollOptions(currentVotes);
    renderPollResults(currentVotes);
    
    // Show success message
    const pollContainer = document.querySelector('.poll-container');
    if (pollContainer) {
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Vote recorded! Thank you for participating.';
        successMsg.style.backgroundColor = 'var(--color-success)';
        successMsg.style.color = 'white';
        successMsg.style.padding = '10px';
        successMsg.style.borderRadius = '8px';
        successMsg.style.textAlign = 'center';
        successMsg.style.marginBottom = '16px';
        
        pollContainer.insertBefore(successMsg, pollOptions);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
        }, 3000);
    }
}

// Mobile Navigation
function initializeMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Thank you for your interest! We will contact you soon.';
        successMsg.style.backgroundColor = 'var(--color-success)';
        successMsg.style.color = 'white';
        successMsg.style.padding = '16px';
        successMsg.style.borderRadius = '8px';
        successMsg.style.textAlign = 'center';
        successMsg.style.marginTop = '16px';
        
        contactForm.appendChild(successMsg);
        contactForm.reset();
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
        }, 5000);
    });
}

// Duplicate partners for infinite scroll
function duplicatePartnersForScroll() {
    const partnersTrack = document.getElementById('partnersTrack');
    if (!partnersTrack) return;
    
    const partners = partnersTrack.innerHTML;
    partnersTrack.innerHTML = partners + partners; // Duplicate for seamless loop
}

// Smooth scrolling for navigation links
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

// Window resize handler for carousels
window.addEventListener('resize', () => {
    // Recalculate carousel positions
    if (programsContainer) {
        const programsPrevBtn = document.getElementById('programsPrev');
        if (programsPrevBtn) {
            programsIndex = 0;
            programsContainer.style.transform = 'translateX(0px)';
            programsPrevBtn.disabled = true;
        }
    }
    
    if (facultyContainer) {
        const facultyPrevBtn = document.getElementById('facultyPrev');
        if (facultyPrevBtn) {
            facultyIndex = 0;
            facultyContainer.style.transform = 'translateX(0px)';
            facultyPrevBtn.disabled = true;
        }
    }
    
    if (campusContainer) {
        const campusPrevBtn = document.getElementById('campusPrev');
        if (campusPrevBtn) {
            campusIndex = 0;
            campusContainer.style.transform = 'translateX(0px)';
            campusPrevBtn.disabled = true;
        }
    }
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

// Initialize intersection observer for animations
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

// Observe elements for fade-in animation
document.querySelectorAll('.card, .story-card, .program-card, .faculty-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});