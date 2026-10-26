// ===== JE LAATSTE 3 REELS =====
// Plak hier de links van je nieuwste reels (nieuwste eerst).
// Zolang de lijst leeg is, tonen we foto's die naar je Instagram linken.
const REELS = [
  'https://www.instagram.com/reel/De1zuY3xsWe/',
  'https://www.instagram.com/reel/DLR-MgWNsZ2/',
  'https://www.instagram.com/reel/DakYSXoAOtw/',
];

// ===== RELEVANTE INSTAGRAM-POSTS =====
// Posts voor het kopje "Op Instagram" (bouldercontent). Links van een post of reel mogen allebei.
const POSTS = [
  'https://www.instagram.com/p/De4LbOkkYH-/',
  'https://www.instagram.com/reel/Dey7AlngZTa/',
  'https://www.instagram.com/reel/Dewfkx1AfqB/',
  'https://www.instagram.com/reel/DebpzZMAmox/',
  'https://www.instagram.com/reel/DeZIgO_R-WS/',
  'https://www.instagram.com/reel/DeXRTsiRQDF/',
];

// Maakt van een Instagram-link een embed (blockquote die embed.js omzet in een post)
const embed = url => {
  const m = url.match(/\/(reel|p)\/([^/?]+)/);
  if (!m) return '';
  const link = `https://www.instagram.com/${m[1]}/${m[2]}/`;
  return `<div class="reel"><blockquote class="instagram-media" data-instgrm-permalink="${link}" data-instgrm-version="14">
    <a href="${link}" target="_blank" rel="noopener">Bekijk deze post op Instagram</a></blockquote></div>`;
};

const reelsGrid = document.getElementById('reels-grid');
document.getElementById('posts-grid').innerHTML = POSTS.map(embed).join('');
const fallbackImgs = ['assets/img/hal-1.jpg', 'assets/img/hal-klimmen.jpg', 'assets/img/hal-2.jpg'];

if (REELS.length) {
  reelsGrid.innerHTML = REELS.slice(0, 3).map(embed).join('');
} else {
  fallbackImgs.forEach(src => {
    reelsGrid.insertAdjacentHTML('beforeend',
      `<a class="reel reel--placeholder" href="https://www.instagram.com/loekjorna/reels/" target="_blank" rel="noopener">
        <img src="${src}" alt="Bekijk de reels van Loek op Instagram" loading="lazy"></a>`);
  });
}

// Officieel Instagram-script: maakt van elke blockquote een afspeelbare post of reel
if (REELS.length || POSTS.length) {
  const s = document.createElement('script');
  s.src = 'https://www.instagram.com/embed.js';
  s.async = true;
  document.body.append(s);
}

// ===== Navigatie: donkere balk zodra je voorbij de hero scrollt =====
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 80);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Jaartal in footer
document.getElementById('year').textContent = new Date().getFullYear();
