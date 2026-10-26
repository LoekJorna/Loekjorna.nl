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

document.getElementById('posts-grid').innerHTML = POSTS.map(embed).join('');

// Officieel Instagram-script: maakt van elke blockquote een afspeelbare post of reel
if (POSTS.length) {
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

// ===== Contactformulier: versturen zonder de pagina te verlaten =====
const form = document.getElementById('contact-form');
const status = form.querySelector('.form__status');
const submit = form.querySelector('.form__submit');

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (form._honey.value) return; // spambot
  submit.disabled = true;
  status.className = 'form__status';
  status.textContent = 'Bezig met versturen…';
  try {
    const res = await fetch('https://formsubmit.co/ajax/loekjornamarketing@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || String(data.success) === 'false') throw new Error(data.message || res.status);
    form.reset();
    status.classList.add('is-ok');
    status.textContent = 'Bedankt! Je bericht is verstuurd, ik neem snel contact met je op.';
  } catch (err) {
    status.classList.add('is-error');
    status.innerHTML = 'Versturen lukte niet. Mail me direct op <a class="link" href="mailto:loekjornamarketing@gmail.com">loekjornamarketing@gmail.com</a>.';
  } finally {
    submit.disabled = false;
  }
});

// Na versturen zonder JavaScript komt FormSubmit terug op #bedankt
if (location.hash === '#bedankt') {
  status.classList.add('is-ok');
  status.textContent = 'Bedankt! Je bericht is verstuurd, ik neem snel contact met je op.';
  document.getElementById('contact').scrollIntoView();
}

// Jaartal in footer
document.getElementById('year').textContent = new Date().getFullYear();
