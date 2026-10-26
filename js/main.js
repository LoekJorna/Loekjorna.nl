// ===== JE LAATSTE 3 REELS =====
// Plak hier de links van je nieuwste reels (nieuwste eerst).
// Zolang de lijst leeg is, tonen we foto's die naar je Instagram linken.
const REELS = [
  'https://www.instagram.com/reel/De1zuY3xsWe/',
  'https://www.instagram.com/reel/DLR-MgWNsZ2/',
  'https://www.instagram.com/reel/DakYSXoAOtw/',
];

const grid = document.getElementById('reels-grid');
const fallbackImgs = ['assets/img/g4.jpg', 'assets/img/g6.jpg', 'assets/img/g3.jpg'];

if (REELS.length) {
  REELS.slice(0, 3).forEach(url => {
    const code = url.match(/\/(?:reel|p)\/([^/?]+)/)?.[1];
    if (!code) return;
    grid.insertAdjacentHTML('beforeend',
      `<div class="reel"><blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/${code}/" data-instgrm-version="14">
        <a href="https://www.instagram.com/reel/${code}/" target="_blank" rel="noopener">Bekijk deze reel op Instagram</a></blockquote></div>`);
  });
  // Officieel Instagram-script: maakt van elke blockquote een afspeelbare reel
  const s = document.createElement('script');
  s.src = 'https://www.instagram.com/embed.js';
  s.async = true;
  document.body.append(s);
} else {
  fallbackImgs.forEach(src => {
    grid.insertAdjacentHTML('beforeend',
      `<a class="reel reel--placeholder" href="https://www.instagram.com/loekjorna/reels/" target="_blank" rel="noopener">
        <img src="${src}" alt="" loading="lazy"><span>BEKIJK OP INSTAGRAM</span></a>`);
  });
}

// ===== Navigatie =====
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

// Crème balk zodra je voorbij de hero scrollt
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Jaartal in footer
document.getElementById('year').textContent = new Date().getFullYear();
