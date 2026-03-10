// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {

// Mobile Menu Toggle
window.toggleMobileMenu = function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

window.closeMobileMenu = function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('active');
}

// Quick Form Submit
window.submitQuickForm = function(e) {
    e.preventDefault();
    const phone = e.target.querySelector('input[type="tel"]').value;
    alert('Спасибо! Перезвоним вам в течение 5 минут на номер ' + phone);
    e.target.reset();
}

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>';
scrollTopBtn.setAttribute('aria-label', 'Наверх');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
    
// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Calculator - Make it global so it can be called from HTML
window.calculatePrice = function() {
    const siteType = parseInt(document.getElementById('siteType').value);
    const urgency = parseInt(document.getElementById('urgency').value);
    
    let total = siteType + urgency;
    let breakdown = [];
    
    // Get site type text
    const siteTypeText = document.getElementById('siteType').options[document.getElementById('siteType').selectedIndex].text;
    breakdown.push({ name: siteTypeText, price: siteType });
    
    // Add checkboxes
    document.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
        const price = parseInt(checkbox.value);
        total += price;
        const label = checkbox.parentElement.textContent.trim().split('(+')[0].trim();
        breakdown.push({ name: label, price: price });
    });
    
    // Add urgency if selected
    if (urgency > 0) {
        breakdown.push({ name: 'Срочная разработка', price: urgency });
    }
    
    // Update total price
    document.getElementById('totalPrice').textContent = total.toLocaleString('ru-RU') + ' ₽';
    
    // Update breakdown
    const breakdownEl = document.getElementById('priceBreakdown');
    if (breakdownEl) {
        breakdownEl.innerHTML = breakdown.map(item => 
            `<div class="breakdown-item">
                <span>${item.name}</span>
                <span>${item.price.toLocaleString('ru-RU')} ₽</span>
            </div>`
        ).join('');
    }
}

// Quiz Modal
let quizData = {
    step: 1,
    totalPrice: 0,
    answers: {}
};

window.openQuiz = function() {
    document.getElementById('quizModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    quizData = { step: 1, totalPrice: 0, answers: {} };
    showQuizStep(1);
}

window.closeQuiz = function() {
    document.getElementById('quizModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showQuizStep(step) {
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    document.querySelector(`[data-step="${step}"]`).classList.add('active');
    
    const progress = (step / 5) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('currentStep').textContent = step;
}

window.selectOption = function(step, answer, price) {
    quizData.answers[step] = answer;
    
    if (step === 1) {
        quizData.totalPrice = price;
    } else {
        quizData.totalPrice += price;
    }
    
    if (step < 4) {
        quizData.step = step + 1;
        showQuizStep(step + 1);
    } else {
        // Show result
        document.getElementById('quizFinalPrice').textContent = 
            quizData.totalPrice.toLocaleString('ru-RU') + ' ₽';
        quizData.step = 5;
        showQuizStep(5);
    }
}

window.submitQuiz = function(e) {
    e.preventDefault();
    alert('Спасибо за заявку! Мы свяжемся с вами в течение часа.\n\nСтоимость вашего сайта: ' + 
          quizData.totalPrice.toLocaleString('ru-RU') + ' ₽');
    closeQuiz();
    e.target.reset();
}

// Modal Functions
window.openContactForm = function() {
    document.getElementById('contactModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeContactForm = function() {
    document.getElementById('contactModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
document.getElementById('contactModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'contactModal') {
        closeContactForm();
    }
});

document.getElementById('quizModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'quizModal') {
        closeQuiz();
    }
});

// Form Submit
window.submitForm = function(e) {
    e.preventDefault();
    alert('Спасибо за заявку! Мы свяжемся с вами в течение часа.');
    closeContactForm();
    e.target.reset();
}

// Smooth Scroll
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

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.benefit-card, .work-card, .price-card, .testimonial-card, .process-step, .service-card, .case-card, .trust-item, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Keyboard navigation for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('quizModal').classList.contains('active')) {
            closeQuiz();
        }
        if (document.getElementById('contactModal').classList.contains('active')) {
            closeContactForm();
        }
        if (document.getElementById('exitIntentModal')?.classList.contains('active')) {
            closeExitIntent();
        }
        if (document.getElementById('leadMagnetModal')?.classList.contains('active')) {
            closeLeadMagnet();
        }
    }
});

// Close modals on outside click
document.getElementById('leadMagnetModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'leadMagnetModal') {
        closeLeadMagnet();
    }
});

// Exit Intent Popup
let exitIntentShown = false;

document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitIntentShown && window.innerWidth > 768) {
        exitIntentShown = true;
        openExitIntent();
    }
});

window.openExitIntent = function() {
    document.getElementById('exitIntentModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeExitIntent = function() {
    document.getElementById('exitIntentModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.submitExitForm = function(e) {
    e.preventDefault();
    const phone = e.target.querySelector('input[type="tel"]').value;
    alert('Отлично! Мы зафиксировали скидку 10% и перезвоним вам в течение часа на номер ' + phone);
    closeExitIntent();
    e.target.reset();
}

// Lead Magnet Modal
window.openLeadMagnet = function() {
    document.getElementById('leadMagnetModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeLeadMagnet = function() {
    document.getElementById('leadMagnetModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.submitLeadMagnet = function(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert('Отлично! Чек-лист отправлен на ' + email + '\nПроверьте почту в течение 5 минут.');
    closeLeadMagnet();
    e.target.reset();
}

// Counter Animation for Stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    statsObserver.observe(el);
});

// Social Share Buttons
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const article = btn.closest('.blog-card');
        const title = article.querySelector('.blog-title').textContent;
        const url = window.location.href;
        
        // Determine which social network
        const isTelegram = btn.querySelector('svg path[d*="M12 2C6.48"]');
        const isVK = btn.querySelector('svg path[d*="M12 2C6.48 2 2 6.48"]');
        
        if (isTelegram) {
            window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        } else if (isVK) {
            window.open(`https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        }
    });
});

// Price Comparison Toggle
window.toggleComparison = function() {
    const table = document.getElementById('comparisonTable');
    const btn = document.querySelector('.comparison-btn');
    
    if (table.style.display === 'none') {
        table.style.display = 'block';
        setTimeout(() => table.classList.add('visible'), 10);
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Скрыть сравнение
        `;
    } else {
        table.classList.remove('visible');
        setTimeout(() => table.style.display = 'none', 300);
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            Сравнить тарифы
        `;
    }
}

// Live Visitor Counter (simulated)
let visitorCount = Math.floor(Math.random() * 3) + 1;
const visitorCounterEl = document.createElement('div');
visitorCounterEl.className = 'live-visitors';
visitorCounterEl.innerHTML = `
    <div class="live-dot"></div>
    <span>${visitorCount} ${visitorCount === 1 ? 'человек смотрит' : 'человека смотрят'} этот сайт</span>
`;
document.body.appendChild(visitorCounterEl);

// Update visitor count randomly
setInterval(() => {
    const change = Math.random() > 0.5 ? 1 : -1;
    visitorCount = Math.max(1, Math.min(5, visitorCount + change));
    visitorCounterEl.querySelector('span').textContent = 
        `${visitorCount} ${visitorCount === 1 ? 'человек смотрит' : 'человека смотрят'} этот сайт`;
}, 15000);

// Initialize calculator on load
if (document.getElementById('totalPrice')) {
    calculatePrice();
}

}); // End DOMContentLoaded
