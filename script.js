const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetPage = item.dataset.page;
        
        // Remove active class from all nav items and pages
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // Add active class to clicked nav item and corresponding page
        item.classList.add('active');
        document.getElementById(targetPage).classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Category buttons
const categoryBtns = document.querySelectorAll('.category-btn');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Add filter logic here
        console.log('Category selected:', btn.textContent);
    });
});

// Alphabet navigation
const alphabetBtns = document.querySelectorAll('.alphabet-btn');

alphabetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        alphabetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Add filter logic here
        console.log('Letter selected:', btn.textContent);
    });
});

// Video cards click
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(card => {
    card.addEventListener('click', () => {
        const videoTitle = card.querySelector('h3').textContent;
        alert(`Video ochilmoqda: ${videoTitle}\n\nBu yerda video pleyer ochiladi.`);
    });
});

// Test buttons
const testBtns = document.querySelectorAll('.test-btn');
const testModal = document.getElementById('testModal');
const closeModalBtn = document.querySelector('.close-btn');

testBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (!btn.classList.contains('disabled')) {
            const testTitle = btn.closest('.test-card').querySelector('h3').textContent;
            
            if (btn.textContent === 'Boshlash') {
                testModal.classList.add('active');
                console.log('Test boshlandi:', testTitle);
            } else {
                alert(`Test takrorlanmoqda: ${testTitle}`);
            }
        }
    });
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    testModal.classList.remove('active');
});

testModal.addEventListener('click', (e) => {
    if (e.target === testModal) {
        testModal.classList.remove('active');
    }
});

// Quiz options
const options = document.querySelectorAll('.option');
const nextBtn = document.querySelector('.next-btn');
let selectedOption = null;

options.forEach(option => {
    option.addEventListener('click', () => {
        // Remove selected class from all options
        options.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        option.classList.add('selected');
        selectedOption = option;
        
        // Enable next button
        nextBtn.disabled = false;
    });
});

// Next button
nextBtn.addEventListener('click', () => {
    if (selectedOption) {
        // Check answer (this is a demo)
        const correctAnswer = 'Salom'; // Demo correct answer
        
        if (selectedOption.textContent === correctAnswer) {
            selectedOption.classList.add('correct');
            setTimeout(() => {
                alert('To\'g\'ri javob! ✅');
                // Load next question or finish test
                testModal.classList.remove('active');
            }, 500);
        } else {
            selectedOption.classList.add('wrong');
            // Show correct answer
            options.forEach(opt => {
                if (opt.textContent === correctAnswer) {
                    opt.classList.add('correct');
                }
            });
            
            setTimeout(() => {
                alert('Noto\'g\'ri javob! ❌\nTo\'g\'ri javob: ' + correctAnswer);
                // Load next question or finish test
                testModal.classList.remove('active');
            }, 500);
        }
    }
});

// Audio buttons
const audioBtns = document.querySelectorAll('.audio-btn');

audioBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = btn.closest('.word-card').querySelector('h3').textContent;
        
        // Add visual feedback
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
        
        console.log('Audio o\'ynalmoqda:', word);
        // Here you would play the actual audio
        alert(`🔊 "${word}" so'zining talaffuzi o'ynalmoqda...`);
    });
});

// Search functionality
const searchInputs = document.querySelectorAll('.search-input');

searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Qidirilmoqda:', searchTerm);
        
        // Add search logic here based on the current page
        const currentPage = document.querySelector('.page.active').id;
        
        if (currentPage === 'videos') {
            filterVideos(searchTerm);
        } else if (currentPage === 'dictionary') {
            filterWords(searchTerm);
        }
    });
});

function filterVideos(searchTerm) {
    const videoCards = document.querySelectorAll('#videos .video-card');
    
    videoCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterWords(searchTerm) {
    const wordCards = document.querySelectorAll('.word-card');
    
    wordCards.forEach(card => {
        const word = card.querySelector('h3').textContent.toLowerCase();
        const translation = card.querySelector('.word-translation').textContent.toLowerCase();
        
        if (word.includes(searchTerm) || translation.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Prevent zoom on double tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add haptic feedback for buttons (if supported)
function addHapticFeedback() {
    if ('vibrate' in navigator) {
        navigator.vibrate(10);
    }
}

// Add haptic feedback to all clickable elements
document.querySelectorAll('button, .video-card, .test-card, .word-card').forEach(element => {
    element.addEventListener('click', addHapticFeedback);
});

// Smooth scroll behavior
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

// Loading animation for images
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.animation = 'fadeIn 0.5s ease-in-out';
    });
});

// Pull to refresh (optional)
let startY = 0;
let isPulling = false;

document.addEventListener('touchstart', (e) => {
    startY = e.touches[0].pageY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    const currentY = e.touches[0].pageY;
    const diff = currentY - startY;
    
    if (diff > 0 && window.scrollY === 0) {
        isPulling = true;
    }
}, { passive: true });

document.addEventListener('touchend', () => {
    if (isPulling) {
        console.log('Yangilanmoqda...');
        // Add refresh logic here
        isPulling = false;
    }
}, { passive: true });

// Performance optimization: Lazy loading
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
        }
    });
}, observerOptions);

// Observe all images for lazy loading
document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

console.log('🇹🇷 Turk tili o\'rganish ilovasi yuklandi!');
