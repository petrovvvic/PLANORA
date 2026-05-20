document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.hero-slider');

    if (!slider) {
        return;
    }

    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    const titleElement = slider.querySelector('#heroSlideTitle');
    const copyElement = slider.querySelector('#heroSlideCopy');
    const dotsContainer = slider.querySelector('.slider-dots');
    const previousButton = slider.querySelector('[data-slider-prev]');
    const nextButton = slider.querySelector('[data-slider-next]');
    const slideDelay = 5000;
    let currentIndex = 0;
    let timerId;

    const dots = slides.map((_, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'slider-dot';
        button.setAttribute('aria-label', `Slide ${index + 1} anzeigen`);
        button.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(button);
        return button;
    });

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === currentIndex;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === currentIndex);
        });

        const activeSlide = slides[currentIndex];
        titleElement.textContent = activeSlide.dataset.title || '';
        copyElement.textContent = activeSlide.dataset.copy || '';
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function previousSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        timerId = window.setInterval(nextSlide, slideDelay);
    }

    function stopAutoPlay() {
        if (timerId) {
            window.clearInterval(timerId);
        }
    }

    previousButton.addEventListener('click', () => {
        previousSlide();
        startAutoPlay();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        startAutoPlay();
    });

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    showSlide(0);
    startAutoPlay();
});