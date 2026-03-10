// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // Add checkboxes
    document.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
        total += parseInt(checkbox.value);
    });
    
    document.getElementById('totalPrice').textContent = total.toLocaleString('ru-RU') + ' ₽';
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
    }
});

// Initialize calculator on load
if (document.getElementById('totalPrice')) {
    calculatePrice();
}

}); // End DOMContentLoaded
