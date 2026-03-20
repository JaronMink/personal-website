(function () {
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

  function currentTheme() {
    var explicit = document.documentElement.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function renderButton(theme) {
    var nextTheme = theme === 'dark' ? 'light' : 'dark';
    button.textContent = nextTheme === 'dark' ? '☾' : '☀';
    button.setAttribute('aria-label', 'Switch to ' + nextTheme + ' mode');
  }

  renderButton(currentTheme());
  releaseThemePreload();

  button.addEventListener('click', function () {
    if (themeToggleLocked) return;
    themeToggleLocked = true;

    var theme = currentTheme();
    var nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);

    try {
      localStorage.setItem('theme', nextTheme);
    } catch (e) {}

    renderButton(nextTheme);
    window.setTimeout(function () {
      themeToggleLocked = false;
    }, 250);
  });
})();
