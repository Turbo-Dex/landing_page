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
