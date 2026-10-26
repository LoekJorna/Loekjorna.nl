// Mobiel menu
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav__links a').forEach(link =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  })
);

// Fade-in bij scrollen
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.about, .socials-grid, .gallery, .cards, .contact .wrap').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Jaartal in footer
document.getElementById('year').textContent = new Date().getFullYear();
