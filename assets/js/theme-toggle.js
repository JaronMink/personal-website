(function () {
  var THEME_KEY = 'theme';
  var THEME_TOGGLE_COOLDOWN_MS = 250;

  function releaseThemePreload() {
    window.requestAnimationFrame(function () {
      document.documentElement.classList.remove('theme-preload');
    });
  }

  var button = document.getElementById('theme-toggle');
  if (!button) {
    releaseThemePreload();
    return;
  }

  var themeToggleLocked = false;

  function explicitTheme() {
    var theme = document.documentElement.getAttribute('data-theme');
    return theme === 'light' || theme === 'dark' ? theme : null;
  }

  function computedTheme() {
    if (!window.getComputedStyle) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var colorScheme = window.getComputedStyle(document.documentElement).colorScheme || '';
    return colorScheme.indexOf('dark') !== -1 ? 'dark' : 'light';
  }

  function currentTheme() {
    return explicitTheme() || computedTheme();
  }

  function renderButton(theme) {
    var nextTheme = theme === 'dark' ? 'light' : 'dark';
    button.textContent = nextTheme === 'dark' ? '☾' : '☀';
    button.setAttribute('aria-label', 'Switch to ' + nextTheme + ' mode');
  }

  var activeTheme = currentTheme();
  renderButton(activeTheme);
  releaseThemePreload();

  button.addEventListener('click', function () {
    if (themeToggleLocked) return;
    themeToggleLocked = true;

    var nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    activeTheme = nextTheme;
    document.documentElement.setAttribute('data-theme', nextTheme);
    renderButton(nextTheme);

    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch (e) {}

    window.setTimeout(function () {
      themeToggleLocked = false;
    }, THEME_TOGGLE_COOLDOWN_MS);
  });
})();
