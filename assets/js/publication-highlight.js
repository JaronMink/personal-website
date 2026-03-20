(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hash = window.location.hash;
  if (!hash || hash.length < 2) return;

  var id = '';
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch (e) {
    return;
  }

  var target = document.getElementById(id);
  if (!target || !target.classList.contains('pub-item')) return;

  target.classList.add('is-target-highlighted');
  if (reduceMotion) return;

  document.documentElement.classList.add('pub-highlight-active');

  var dismissed = false;
  var initialScrollY = window.scrollY || 0;
  var scrollBaselineReady = false;
  var scrollDismissThreshold = 24;
  var wheelDismissThreshold = 40;
  var touchDismissThreshold = 18;
  var wheelDeltaTotal = 0;
  var touchStartY = null;

  function cleanupListeners() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
  }

  function dismissHighlight() {
    if (dismissed) return;
    dismissed = true;
    cleanupListeners();
    target.classList.remove('is-target-highlighted');

    if (window.location.hash && window.history && history.replaceState) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Remove active dimming one frame later so opacity transitions can run
    // after hash-based instant styles are no longer active.
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        document.documentElement.classList.remove('pub-highlight-active');
      });
    });
  }

  function onScroll() {
    if (!scrollBaselineReady) {
      initialScrollY = window.scrollY || 0;
      scrollBaselineReady = true;
      return;
    }
    if (Math.abs((window.scrollY || 0) - initialScrollY) > scrollDismissThreshold) {
      dismissHighlight();
    }
  }

  function onWheel(event) {
    wheelDeltaTotal += Math.abs(event.deltaY || 0);
    if (wheelDeltaTotal > wheelDismissThreshold) {
      dismissHighlight();
    }
  }

  function onTouchStart(event) {
    if (event.touches && event.touches[0]) {
      touchStartY = event.touches[0].clientY;
    }
  }

  function onTouchMove(event) {
    if (touchStartY === null || !event.touches || !event.touches[0]) return;
    if (Math.abs(event.touches[0].clientY - touchStartY) > touchDismissThreshold) {
      dismissHighlight();
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('wheel', onWheel, { passive: true });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });

  // Wait for the browser to finish hash-jump positioning before we start
  // considering scroll deltas as user intent.
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      initialScrollY = window.scrollY || 0;
      scrollBaselineReady = true;
    });
  });
})();
