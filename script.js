// Add cool scroll animation and button hover effects

// Fade-in on scroll
const fadeElements = document.querySelectorAll('.feature-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => {
  el.classList.add('opacity-0');
  observer.observe(el);
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const circle = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = size + 'px';
    circle.style.left = e.clientX - rect.left - size/2 + 'px';
    circle.style.top = e.clientY - rect.top - size/2 + 'px';
    circle.classList.add('ripple');
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});


// Carousel functionality
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
const dotNav = document.querySelector('.carousel-dots');

let currentIndex = 0;

// Generate dots
slides.forEach((_, index) => {
  const dot = document.createElement('button');
  if (index === 0) dot.classList.add('active');
  dotNav.appendChild(dot);

  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

const dots = Array.from(dotNav.children);

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Buttons
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Swipe support (mobile)
let startX = 0;
track.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  } else if (endX - startX > 50) {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }
});
