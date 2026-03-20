(function () {
  var gaTrackingId = window.__GA_TRACKING_ID__;
  if (!gaTrackingId) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;
  window.gtag('js', new Date());
  window.gtag('config', gaTrackingId);

  function isVideoHost(host) {
    return host === 'youtube.com' ||
      host === 'www.youtube.com' ||
      host === 'youtu.be' ||
      host === 'vimeo.com' ||
      host === 'www.vimeo.com';
  }

  function detectPublicationLinkType(urlObj, linkText) {
    var host = (urlObj.host || '').toLowerCase();
    var path = (urlObj.pathname || '').toLowerCase();
    var hrefLower = (urlObj.href || '').toLowerCase();
    var textLower = (linkText || '').toLowerCase();

    if (/\.pdf$/i.test(path)) return 'pdf';
    if (host === 'doi.org' || host === 'www.doi.org') return 'doi';
    if (host === 'arxiv.org' || host === 'www.arxiv.org') return 'arxiv';
    if (isVideoHost(host) || textLower.indexOf('talk') !== -1 || textLower.indexOf('slides') !== -1 || hrefLower.indexOf('talk') !== -1 || hrefLower.indexOf('slides') !== -1) {
      return 'video';
    }
    return '';
  }

  // Track outbound, mailto, internal PDF/CV, and primary nav clicks.
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var isMailto = href.indexOf('mailto:') === 0;
    var parsedHref = null;
    var isExternal = false;
    var isPdfDownload = false;
    var linkPath = '';
    var keyNavEventName = '';
    var keyNavTargets = {
      '/': 'home',
      '/publications/': 'publications',
      '/teaching/': 'teaching',
      '/service/': 'service',
      '/contact/': 'contact'
    };

    try {
      parsedHref = new URL(href, window.location.href);
      linkPath = parsedHref.pathname || '';
      isExternal = parsedHref.host !== window.location.host;
      isPdfDownload = /\.pdf$/i.test(linkPath);
      if (!isExternal && keyNavTargets[linkPath]) {
        keyNavEventName = keyNavTargets[linkPath];
      }
    } catch (e) {
      parsedHref = null;
    }

    if (!isMailto && !parsedHref) return;

    if (!isMailto && href.indexOf('http://') !== 0 && href.indexOf('https://') !== 0 && href.charAt(0) !== '/') {
      isExternal = false;
    }

    var linkText = (link.textContent || '').trim().replace(/\s+/g, ' ');

    if (isMailto || isExternal) {
      window.gtag('event', 'outbound_click', {
        link_url: href,
        link_text: linkText || '(no text)',
        link_domain: parsedHref ? parsedHref.host : (link.host || ''),
        is_mailto: isMailto
      });
    }

    if (!isExternal && isPdfDownload) {
      var fileName = linkPath.split('/').pop() || '';
      var isCv = /curriculum_vitae|\/cv\//i.test(linkPath);
      window.gtag('event', 'file_download', {
        file_name: fileName,
        file_extension: 'pdf',
        link_url: href,
        link_text: linkText || '(no text)',
        is_cv: isCv
      });
    }

    if (!isExternal && keyNavEventName) {
      window.gtag('event', 'primary_nav_click', {
        nav_target: keyNavEventName,
        link_url: href,
        link_text: linkText || '(no text)'
      });
    }

    var publicationItem = link.closest('.pub-item');
    if (publicationItem && parsedHref) {
      var publicationId = publicationItem.getAttribute('id') || '';
      var publicationLinkType = detectPublicationLinkType(parsedHref, linkText);
      if (publicationLinkType) {
        window.gtag('event', 'publication_click', {
          publication_link_type: publicationLinkType,
          publication_id: publicationId || '(none)',
          link_url: href,
          link_text: linkText || '(no text)'
        });
      }
    }
  });
})();
