// ===== Animaties met GSAP =====
// Intro, scroll-animaties, parallax en magnetische knoppen.
// Wie "minder beweging" heeft aangezet op zijn apparaat, krijgt alles direct te zien.

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const mm = gsap.matchMedia();

document.fonts.ready.then(() => {
  mm.add({
    motion: '(prefers-reduced-motion: no-preference)',
    reduce: '(prefers-reduced-motion: reduce)',
    desktop: '(min-width: 861px)',
  }, ctx => {
    const { motion, desktop } = ctx.conditions;

    if (!motion) {
      root.classList.remove('anim-loading');
      return;
    }

    // ----- 1. Intro van de hero -----
    const heroTitle = SplitText.create('.hero h1', { type: 'words,chars', mask: 'words' });

    gsap.timeline({ defaults: { ease: 'power4.out' }, onStart: () => root.classList.remove('anim-loading') })
      .from('.hero__bg', { scale: 1.25, duration: 2.2, ease: 'power3.out' })
      .from('.hero__burst', { scale: 0, rotation: -180, duration: 1.2, ease: 'back.out(1.7)' }, 0.3)
      .from(heroTitle.chars, { yPercent: 110, duration: 1.1, stagger: 0.035 }, 0.45)
      .from('.hero__sub', { autoAlpha: 0, y: 20, letterSpacing: '0.8em', duration: 1.2 }, 0.9)
      .from('.hero__top > *', { autoAlpha: 0, y: -20, duration: 0.8, stagger: 0.1 }, 1)
      .from('.nav', { autoAlpha: 0, y: -30, duration: 0.8 }, 1.1)
      .from('.hero__scroll', { autoAlpha: 0, duration: 0.8 }, 1.4);

    // Hero parallax: foto zakt mee, titel schuift weg
    gsap.to('.hero__bg', {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero__center', {
      yPercent: -40, autoAlpha: 0, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 20%', scrub: true },
    });

    // ----- 2. Statement / over mij -----
    const bigLine = SplitText.create('.statement__big', { type: 'words', mask: 'words' });
    gsap.timeline({ scrollTrigger: { trigger: '.statement', start: 'top 70%' } })
      .from('.statement__small', { autoAlpha: 0, x: -30, duration: 0.8, ease: 'power3.out' })
      .from(bigLine.words, { yPercent: 110, duration: 1, stagger: 0.08, ease: 'power4.out' }, 0.1)
      .from('.statement__body p', { autoAlpha: 0, y: 30, duration: 0.9, stagger: 0.15, ease: 'power3.out' }, 0.5);

    gsap.fromTo('.statement__img',
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut',
        scrollTrigger: { trigger: '.statement__img', start: 'top 85%' } });

    // ----- 3. Reels-titel: rijen schuiven van links en rechts naar binnen -----
    const rows = gsap.utils.toArray('.poster-title__row');
    gsap.timeline({ scrollTrigger: { trigger: '.poster-title', start: 'top bottom', end: 'center 45%', scrub: 1 } })
      .from(rows[0], { xPercent: -45, ease: 'none' }, 0)
      .from(rows[1], { xPercent: 45, ease: 'none' }, 0);
    gsap.from('.poster-title__script', {
      scale: 0, rotation: -40, duration: 1.1, ease: 'elastic.out(1, 0.5)',
      scrollTrigger: { trigger: '.poster-title', start: 'top 60%' },
    });

    gsap.from('.reel', {
      y: 80, autoAlpha: 0, rotation: (i) => [-4, 0, 4][i % 3], duration: 1, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.reels__grid', start: 'top 80%' },
    });

    // ----- 4. Full-bleed foto: inzoomen tijdens scrollen -----
    gsap.fromTo('.bleed img', { scale: 1.3 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: '.bleed', start: 'top bottom', end: 'bottom top', scrub: true },
    });
    const quote = SplitText.create('.bleed__quote', { type: 'words,chars', mask: 'words' });
    gsap.timeline({ scrollTrigger: { trigger: '.bleed', start: 'center 70%' } })
      .from('.bleed .label', { autoAlpha: 0, y: 15, duration: 0.6 })
      .from(quote.chars, { yPercent: 110, duration: 0.8, stagger: 0.025, ease: 'power4.out' }, 0.1);

    // ----- 5. Galerij: foto's onthullen per rij -----
    gsap.set('.gallery figure', { clipPath: 'inset(0 0 100% 0)' });
    ScrollTrigger.batch('.gallery figure', {
      start: 'top 88%',
      once: true,
      onEnter: batch => gsap.to(batch, {
        clipPath: 'inset(0 0 0% 0)', duration: 1.2, stagger: 0.12, ease: 'power4.inOut',
      }),
    });
    if (desktop) {
      // Middelste kolom beweegt iets sneller: subtiele diepte
      gsap.utils.toArray('.gallery figure:nth-child(3n+2)').forEach(fig => {
        gsap.to(fig, {
          y: -60, ease: 'none',
          scrollTrigger: { trigger: '.gallery', start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }

    // ----- 6. Samenwerken -----
    const collabTitle = SplitText.create('.collab h2', { type: 'words', mask: 'words' });
    gsap.timeline({ scrollTrigger: { trigger: '.collab', start: 'top 70%' } })
      .from('.collab .label', { autoAlpha: 0, y: 15, duration: 0.6 })
      .from(collabTitle.words, { yPercent: 110, duration: 1, stagger: 0.1, ease: 'power4.out' }, 0.1)
      .from('.collab__lead', { autoAlpha: 0, y: 25, duration: 0.8 }, 0.5);
    gsap.from('.collab__list li', {
      autoAlpha: 0, x: 60, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.collab__list', start: 'top 80%' },
    });

    // ----- 7. Contact -----
    gsap.fromTo('.contact__bg', { yPercent: -12 }, {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: true },
    });
    const contactTitle = SplitText.create('.contact h2', { type: 'words,chars', mask: 'words' });
    gsap.timeline({ scrollTrigger: { trigger: '.contact', start: 'top 60%' } })
      .from('.contact .label', { autoAlpha: 0, y: 15, duration: 0.6 })
      .from(contactTitle.chars, { yPercent: 110, duration: 1, stagger: 0.03, ease: 'power4.out' }, 0.1)
      .from('.contact .pill--big', { autoAlpha: 0, scale: 0.8, duration: 0.8, ease: 'back.out(1.7)' }, 0.6)
      .from('.contact__socials a', { autoAlpha: 0, y: 15, duration: 0.6, stagger: 0.1 }, 0.8);

    // ----- 8. Logo-symbool draait mee met scrollen -----
    gsap.to('.nav__logo svg', {
      rotation: 720, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.5 },
    });

    // ----- 9. Magnetische knoppen (alleen met muis) -----
    const cleanups = [];
    if (desktop && matchMedia('(hover: hover)').matches) {
      gsap.utils.toArray('.pill').forEach(btn => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        const move = e => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.35);
          yTo((e.clientY - r.top - r.height / 2) * 0.35);
        };
        const leave = () => { xTo(0); yTo(0); };
        btn.addEventListener('mousemove', move);
        btn.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          btn.removeEventListener('mousemove', move);
          btn.removeEventListener('mouseleave', leave);
        });
      });
    }
    return () => cleanups.forEach(fn => fn());
  });

  // Posities opnieuw berekenen zodra alle foto's geladen zijn
  window.addEventListener('load', () => ScrollTrigger.refresh());
});
