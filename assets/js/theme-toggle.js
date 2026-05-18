(function () {
  var THEME_KEY = 'theme';
  var THEME_TOGGLE_COOLDOWN_MS = 320;

  function releaseThemePreload() {
    window.requestAnimationFrame(function () {
      document.documentElement.classList.remove('theme-preload');
    });
  }

  var button = document.getElementById('theme-toggle');
  if (!button) {
    renderFavicons(currentTheme());
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

  function renderFavicons(theme) {
    var activeIcon = document.querySelector('[data-active-theme-favicon]');
    var activeShortcutIcon = document.querySelector('[data-active-theme-shortcut-favicon]');
    var lightIcons = document.querySelectorAll('[data-theme-favicon="light"], [data-theme-shortcut-favicon="light"]');
    var darkIcons = document.querySelectorAll('[data-theme-favicon="dark"], [data-theme-shortcut-favicon="dark"]');
    var selectedIcons = theme === 'dark' ? darkIcons : lightIcons;
    var hiddenIcons = theme === 'dark' ? lightIcons : darkIcons;
    var selectedHref = selectedIcons.length ? selectedIcons[0].getAttribute('href') : null;

    if (selectedHref) {
      if (activeIcon) activeIcon.setAttribute('href', selectedHref);
      if (activeShortcutIcon) activeShortcutIcon.setAttribute('href', selectedHref);
    }

    selectedIcons.forEach(function (icon) {
      icon.setAttribute('media', 'all');
    });

    hiddenIcons.forEach(function (icon) {
      icon.setAttribute('media', 'not all');
    });
  }

  var activeTheme = currentTheme();
  renderButton(activeTheme);
  renderFavicons(activeTheme);
  releaseThemePreload();

  button.addEventListener('click', function () {
    if (themeToggleLocked) return;
    themeToggleLocked = true;

    var nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    activeTheme = nextTheme;
    document.documentElement.setAttribute('data-theme', nextTheme);
    renderButton(nextTheme);
    renderFavicons(nextTheme);

    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch (e) {}

    window.setTimeout(function () {
      themeToggleLocked = false;
    }, THEME_TOGGLE_COOLDOWN_MS);
  });
})();
