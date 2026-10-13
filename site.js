// Menu openen en sluiten.
(function () {
  var menu = document.getElementById('menu');
  if (!menu) return;
  var openers = document.querySelectorAll('[data-menu-open]');
  var sluiters = menu.querySelectorAll('[data-menu-sluit]');
  var subknoppen = menu.querySelectorAll('[data-sub]');

  function sub(id) {
    subknoppen.forEach(function (k) {
      var actief = k.dataset.sub === id;
      k.setAttribute('aria-expanded', actief);
      document.getElementById(k.dataset.sub).hidden = !actief;
    });
  }

  function zet(open) {
    sub(null);
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    openers.forEach(function (b) { b.setAttribute('aria-expanded', open); });
    (open ? sluiters[0] : openers[0]).focus({ preventScroll: true });
  }

  openers.forEach(function (b) { b.addEventListener('click', function () { zet(true); }); });
  sluiters.forEach(function (b) { b.addEventListener('click', function () { zet(false); }); });
  subknoppen.forEach(function (k) {
    k.addEventListener('click', function () { sub(k.getAttribute('aria-expanded') === 'true' ? null : k.dataset.sub); });
  });
  menu.querySelectorAll('.menu-terug').forEach(function (b) { b.addEventListener('click', function () { sub(null); }); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) zet(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !menu.classList.contains('open')) return;
    if (menu.querySelector('.menu-sub:not([hidden])')) sub(null); else zet(false);
  });
})();

// Tabbladen in de prijsbalk.
document.querySelectorAll('[role="tablist"]').forEach(function (lijst) {
  var tabs = lijst.querySelectorAll('[role="tab"]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var actief = t === tab;
        t.setAttribute('aria-selected', actief);
        document.getElementById(t.getAttribute('aria-controls')).hidden = !actief;
      });
    });
  });
});

// Woningtype kiezen: prijs tonen en de afspraaklink laten meegaan.
document.querySelectorAll('select[data-prijs-in]').forEach(function (sel) {
  var bedrag = document.getElementById(sel.dataset.prijsIn);
  var link = document.getElementById(sel.dataset.linkIn);
  function bijwerken() {
    var o = sel.options[sel.selectedIndex];
    bedrag.textContent = o.dataset.prijs ? '€ ' + o.dataset.prijs : 'Op aanvraag';
    link.href = 'afspraak.html?woning=' + o.value;
  }
  sel.addEventListener('change', bijwerken);
  bijwerken();
});

// Actiebalk onderaan op mobiel: zichtbaar zodra de hero uit beeld is.
(function () {
  var balk = document.querySelector('.actiebalk');
  var hero = document.querySelector('.hero');
  if (!balk || !hero || !('IntersectionObserver' in window)) return;
  document.body.classList.add('met-actiebalk');
  new IntersectionObserver(function (items) {
    balk.classList.toggle('zichtbaar', !items[0].isIntersecting);
  }).observe(hero);
})();
