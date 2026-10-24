/* GARAGE AUTO REPAR — interactions communes à tous les thèmes */
(function () {
  document.documentElement.classList.add('js');

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Fermer le menu' : 'Ouvrir le menu';
    nav.classList.toggle('is-open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Ombre de l'en-tête au défilement
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Apparition douce des blocs
  var targets = document.querySelectorAll(
    '.section__header, .about__text, .highlight, .service, .tow__card, .tow__band, .gallery__item, .zones__list, .contact__cta, .contact__info'
  );
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 3) * 80 + 'ms';
      io.observe(el);
    });
  }

  // Location : le parc défile à l'horizontale pendant qu'on fait défiler la page (scène épinglée).
  // Chaque carte reçoit --d (écart au centre de l'écran, -1 à 1) pour la profondeur de sa lettre ;
  // la section reçoit --p (avancement, 0 à 1) pour la route et la dépanneuse.
  var rental = document.querySelector('.rental');
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (rental && !still && window.requestAnimationFrame) {
    var scroller = rental.querySelector('.rental__scroller');
    var stage = rental.querySelector('.rental__sticky');
    var track = rental.querySelector('.rental__track');
    var cards = Array.prototype.slice.call(rental.querySelectorAll('.rental__item'));
    var dist = 0, centers = [], current = 0, raf = 0, seen = false;
    rental.classList.add('is-scrolly');

    function measure() {
      track.style.transform = 'none';
      dist = Math.max(0, track.offsetWidth - stage.clientWidth);
      scroller.style.height = (stage.clientHeight + dist) + 'px';
      centers = cards.map(function (c) {
        return c.offsetLeft + c.offsetWidth / 2; // offsetLeft mesuré depuis la piste (position: relative)
      });
      raf = 0;
      paint(current);
    }
    function target() {
      var top = scroller.getBoundingClientRect().top;
      return dist ? Math.min(1, Math.max(0, -top / dist)) : 0;
    }
    function paint(p) {
      track.style.transform = 'translate3d(' + (-p * dist).toFixed(1) + 'px,0,0)';
      rental.style.setProperty('--p', p.toFixed(4));
      var w = stage.clientWidth;
      cards.forEach(function (c, i) {
        var d = Math.max(-1, Math.min(1, (centers[i] - p * dist - w / 2) / w));
        c.style.setProperty('--d', d.toFixed(3));
        c.style.setProperty('--ad', Math.abs(d).toFixed(3));
        c.classList.toggle('is-center', Math.abs(d) < 0.22);
      });
    }
    function frame() {
      raf = 0;
      var p = target();
      current += (p - current) * 0.16;
      if (Math.abs(p - current) < 0.0005) current = p;
      paint(current);
      if (seen && current !== p) raf = requestAnimationFrame(frame);
    }
    function kick() { if (seen && !raf) raf = requestAnimationFrame(frame); }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { seen = entries[0].isIntersecting; kick(); }).observe(scroller);
    } else {
      seen = true;
    }
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    measure();
  }

  // Visionneuse de la galerie (sans JS, les liens ouvrent simplement la photo)
  var box = document.querySelector('.lightbox');
  var links = Array.prototype.slice.call(document.querySelectorAll('.gallery__link'));
  if (box && box.showModal && links.length) {
    var img = box.querySelector('.lightbox__img');
    var caption = box.querySelector('.lightbox__caption');
    var index = 0;
    function show(i) {
      index = (i + links.length) % links.length;
      var link = links[index];
      img.src = link.getAttribute('href');
      img.alt = link.querySelector('img').alt;
      var cap = link.parentNode.querySelector('figcaption');
      caption.textContent = cap ? cap.textContent : '';
    }
    links.forEach(function (link, i) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        show(i);
        box.showModal();
      });
    });
    box.querySelector('.lightbox__close').addEventListener('click', function () { box.close(); });
    box.querySelector('.lightbox__prev').addEventListener('click', function () { show(index - 1); });
    box.querySelector('.lightbox__next').addEventListener('click', function () { show(index + 1); });
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.classList.contains('lightbox__figure')) box.close();
    });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
    // Balayage sur mobile
    var startX = null;
    box.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  // Formulaire de contact (Web3Forms) : envoi sans quitter la page
  var form = document.getElementById('contact-form');
  if (form && window.fetch) {
    var status = form.querySelector('.contact-form__status');
    var submit = form.querySelector('.contact-form__submit');
    function setStatus(type, text) {
      status.className = 'contact-form__status is-' + type;
      status.textContent = text;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.access_key.value === 'VOTRE_CLE_WEB3FORMS') {
        setStatus('error', "Le formulaire n'est pas encore activé. Appelez-nous au 03 84 44 58 63.");
        return;
      }
      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });
      if (data.name) data.subject = 'Demande site : ' + (data.type_de_demande || 'contact') + ' - ' + data.name;
      submit.disabled = true;
      setStatus('pending', 'Envoi en cours…');
      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (!json.success) throw new Error(json.message);
          form.reset();
          setStatus('success', 'Merci, votre demande a bien été envoyée. Nous vous recontactons rapidement.');
        })
        .catch(function () {
          setStatus('error', "L'envoi a échoué. Réessayez ou appelez-nous au 03 84 44 58 63.");
        })
        .then(function () { submit.disabled = false; });
    });
  }
})();
