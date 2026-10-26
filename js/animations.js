// ===== Animaties met GSAP =====
// Eén luid moment (het hoofdframe opent als een sluiter), daarna rustige entrees per sectie.
// Zonder script of met "minder beweging" staat alles gewoon direct in beeld.

gsap.registerPlugin(ScrollTrigger, SplitText);

const mm = gsap.matchMedia();

document.fonts.ready.then(() => {
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const rise = { autoAlpha: 0, y: 24, duration: 0.9, ease: 'power3.out' };

    // ----- Hero: sluiter op het hoofdframe -----
    const lead = document.querySelector('.frame--lead');
    const others = gsap.utils.toArray('.frame:not(.frame--lead)');
    const title = SplitText.create('.hero h1', { type: 'lines', mask: 'lines' });

    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .fromTo(lead, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power4.inOut' })
      .from(lead.querySelector('img'), { scale: 1.12, duration: 1.4 }, 0)
      .from(others, { autoAlpha: 0, duration: 0.8, stagger: { each: 0.05, from: 'center' } }, 0.5)
      .from(title.lines, { yPercent: 100, duration: 1, stagger: 0.09 }, 0.3)
      .from('.hero .lead', rise, 0.6)
      .from('.hero .button', rise, 0.7)
      .from('.hero__nav', { autoAlpha: 0, y: -12, duration: 0.8 }, 0.8);

    // ----- Entree per sectie: kop, dan tekst, dan beeld -----
    const enter = (trigger, steps) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger, start: 'top 78%', once: true } });
      steps.forEach(([targets, vars, at]) => tl.from(targets, { ...rise, ...vars }, at));
      return tl;
    };

    // Bereik: rijen één voor één, de getallen tellen op
    enter('.stats', [
      ['.stats__title', {}],
      ['.stat', { stagger: 0.08 }, 0.1],
      ['.stats__img', { y: 0, scale: 1.06, duration: 1.2 }, 0.2],
    ]);
    gsap.utils.toArray('.stat__num').forEach((el, i) => {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || 0, 10);
      const suffix = el.dataset.suffix || '';
      const counter = { val: 0 };
      const render = () => {
        el.textContent = counter.val.toLocaleString('nl-NL', {
          minimumFractionDigits: decimals, maximumFractionDigits: decimals,
        }) + suffix;
      };
      gsap.to(counter, {
        val: target, duration: 1.8, delay: 0.1 + i * 0.08, ease: 'power3.out', onUpdate: render,
        scrollTrigger: { trigger: '.stats', start: 'top 78%', once: true },
      });
    });

    // Over mij: de alinea komt regel voor regel
    enter('.about', [
      ['.about__title', {}],
      ['.about__lede', {}, 0.1],
      ['.about__facts li', { stagger: 0.07 }, 0.3],
      ['.about__more', {}, 0.5],
      ['.about__quote', {}, 0.65],
    ]);

    // Niche: elke kolom als lijst, rij voor rij
    enter('.niche', [
      ['.niche__title', {}],
      ['.niche__col h3', { stagger: 0.08 }, 0.15],
      ['.niche__col li', { y: 12, duration: 0.6, stagger: 0.03 }, 0.25],
    ]);

    // Werk
    enter('.work', [
      ['.work__title', {}],
      ['.reel', { y: 40, stagger: 0.09 }, 0.1],
      ['.work__facts > *', { stagger: 0.07 }, 0.4],
    ]);

    // Merken: tegels na elkaar
    enter('.brands', [
      ['.tile', { y: 32, stagger: 0.08 }],
    ]);

    // Instagram: kop, dan de foto's in een golf
    enter('.sheet', [
      ['.sheet__head h2', {}],
      ['.sheet__head p', {}, 0.1],
    ]);
    ScrollTrigger.batch('.tile-img', {
      start: 'top 90%', once: true,
      onEnter: batch => gsap.from(batch, { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.06, ease: 'power3.out' }),
    });

    // Contact
    enter('.contact', [
      ['.contact__line', {}],
      ['.contact__img', { y: 0, clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power4.inOut' }, 0.1],
      ['.contact__links > *', { stagger: 0.07 }, 0.25],
    ]);

    // Eén bewegend beeld: de foto bij het bereik zakt rustig mee met scrollen
    gsap.to('.stats__img', {
      yPercent: -12, ease: 'none',
      scrollTrigger: { trigger: '.stats', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());

  // Instagram-embeds laden later en worden dan hoger: posities opnieuw berekenen
  let refreshTimer;
  new ResizeObserver(() => {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);
  }).observe(document.getElementById('reels-grid'));
});
