(function () {
  var THEME_KEY = 'theme';

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

  renderButton(currentTheme());
  releaseThemePreload();

  button.addEventListener('click', function () {
    var nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    renderButton(nextTheme);

    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch (e) {}
  });
})();
