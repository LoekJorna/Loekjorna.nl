// ===== Animaties met GSAP =====
// De intro is gebaseerd op de KokoClimb-video: een donker rood scherm, het "object" (Loek) glijdt
// filmisch binnen en komt tot rust, daarna verschijnen menu en titel vanuit wazig naar scherp.
// Met "minder beweging" staat alles direct stil in beeld.

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const mm = gsap.matchMedia();

document.fonts.ready.then(() => {
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const rise = { autoAlpha: 0, y: 28, duration: 0.9, ease: 'power3.out' };

    // ----- 1. Intro van de hero -----
    const title = SplitText.create('.hero__title', { type: 'words,chars' });

    const intro = gsap.timeline({ onStart: () => root.classList.remove('intro') });
    intro
      .from('.hero__glow', { autoAlpha: 0, scale: 1.2, duration: 1.6, ease: 'power2.out' })
      // Loek glijdt van linksboven binnen en zwaait uit, zoals de karabiner
      .from('.hero__cutout', {
        x: () => -window.innerWidth * 0.55, y: () => -window.innerHeight * 0.45,
        rotation: -38, scale: 1.25, autoAlpha: 0,
        duration: 1.9, ease: 'power3.out',
      }, 0.2)
      .from('.nav', { autoAlpha: 0, y: -16, duration: 0.8, ease: 'power2.out' }, 1.5)
      // Titel: van wazig naar scherp, letter voor letter
      .from(title.chars, {
        autoAlpha: 0, filter: 'blur(18px)', yPercent: 20,
        duration: 1.1, stagger: 0.05, ease: 'power3.out',
      }, 1.4)
      .from('.hero__intro > *', { ...rise, filter: 'blur(8px)', stagger: 0.12 }, 1.9)
      .from('.hero__bottom > *', { ...rise, stagger: 0.12 }, 2.2);

    // Daarna zweeft Loek zachtjes, alsof hij net een dyno maakt
    gsap.to('.hero__cutout', {
      y: -14, rotation: 1.5, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.1,
    });

    // Tellers in de hero
    gsap.utils.toArray('.stat__num').forEach((el, i) => {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || 0, 10);
      const suffix = el.dataset.suffix || '';
      const counter = { val: 0 };
      intro.to(counter, {
        val: target, duration: 1.6, ease: 'power3.out',
        onUpdate: () => {
          el.textContent = counter.val.toLocaleString('nl-NL', {
            minimumFractionDigits: decimals, maximumFractionDigits: decimals,
          }) + suffix;
        },
      }, 2.3 + i * 0.1);
    });

    // Scrollen: Loek stijgt sneller dan de rest, de titel vervaagt
    gsap.to('.hero__cutout', {
      yPercent: -30, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.fromTo('.hero__title', { yPercent: 0, opacity: 1 }, {
      yPercent: 30, opacity: 0.2, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    // ----- 2. Entree per sectie -----
    const enter = (trigger, steps) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger, start: 'top 78%', once: true } });
      steps.forEach(([targets, vars, at]) => tl.from(targets, { ...rise, ...vars }, at));
    };
    const blurIn = { filter: 'blur(12px)' };

    enter('.about', [
      ['.about__media', { y: 0, clipPath: 'inset(100% 0 0 0)', duration: 1.2, ease: 'power4.inOut' }],
      ['.about h2', blurIn, 0.2],
      ['.about__text > p', { stagger: 0.1 }, 0.35],
      ['.about__facts li', { y: 12, stagger: 0.06 }, 0.55],
      ['.about__quote', {}, 0.75],
    ]);

    enter('.niche', [
      ['.niche h2', blurIn],
      ['.niche .section-head p', {}, 0.1],
      ['.niche__card', { y: 60, stagger: 0.12, duration: 1.1 }, 0.2],
    ]);

    enter('.work', [
      ['.work h2', blurIn],
      ['.work .link', {}, 0.1],
      ['.reel', { y: 50, stagger: 0.1 }, 0.2],
    ]);

    enter('.brands', [
      ['.brands h2', blurIn],
      ['.brands .section-head p', {}, 0.1],
      ['.brand', { y: 30, stagger: 0.08 }, 0.2],
    ]);

    enter('.insta', [
      ['.insta h2', blurIn],
      ['.insta .link', {}, 0.1],
      ['.insta__grid a', { y: 30, scale: 0.96, stagger: 0.06 }, 0.2],
    ]);

    enter('.contact', [
      ['.contact__panel', { y: 60, duration: 1.1 }],
      ['.contact h2', blurIn, 0.25],
      ['.contact__panel p', {}, 0.4],
      ['.contact .btn', { y: 16, stagger: 0.08 }, 0.5],
    ]);
  });

  mm.add('(prefers-reduced-motion: reduce)', () => root.classList.remove('intro'));

  window.addEventListener('load', () => ScrollTrigger.refresh());

  // Instagram-embeds laden later en worden dan hoger: posities opnieuw berekenen
  let refreshTimer;
  new ResizeObserver(() => {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);
  }).observe(document.getElementById('reels-grid'));
});
