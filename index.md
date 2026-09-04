---
layout: multi
description: Assistant Professor Jaron Mink studies human-centered security for AI, including AI-enabled abuse, AI security adoption, and security/privacy behavior.
---

<section class="home-split">
  <div class="home-identity">
    {% if site.avatar %}
    <div class="home-portrait">
      <img src="{{ site.avatar }}" alt="Portrait of {{ site.title }}" class="home-hero-avatar" />
    </div>
    {% endif %}
    <div class="home-identity-details">
      <p class="home-meta-line"><span class="home-meta-copy">{{ site.data.profile.pronouns_display }}</span></p>
      <p class="home-meta-line"><span class="home-meta-copy">{{ site.position }}</span></p>
      <p class="home-meta-line"><a href="{{ site.data.links.scai_web }}"><span class="home-meta-copy">{{ site.affiliation }}</span></a></p>
      <p class="home-meta-line"><a href="mailto:{{ site.data.profile.email }}"><span class="home-meta-copy">{{ site.data.profile.email }}</span></a></p>
      <nav class="home-identity-icons" aria-label="Profile links">
        {% if site.google_scholar %}
        <a href="{{ site.google_scholar }}" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">
          <i class="ai ai-google-scholar"></i>
        </a>
        {% endif %}
        {% if site.linkedin %}
        <a href="{{ site.linkedin }}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i class="fa-brands fa-linkedin-in"></i>
        </a>
        {% endif %}
        {% if site.bluesky_link %}
        <a href="{{ site.bluesky_link }}" target="_blank" rel="noopener noreferrer" aria-label="Bluesky">
          <i class="fa-brands fa-bluesky"></i>
        </a>
        {% endif %}
        {% if site.twitter_link %}
        <a href="{{ site.twitter_link }}" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <i class="fa-brands fa-twitter"></i>
        </a>
        {% endif %}
      </nav>
    </div>
  </div>

  <div class="home-main">
    <p class="home-lead">
      I'm an Assistant Professor of Computer Science at ASU. I work at the {{ site.data.profile.lab.short_name }} and study human-centered security and safety in AI systems.
    </p>
    {% assign home_research_grid_variant = site.home_research_grid_variant | default: 'current' %}
    <div class="home-research-board home-research-board--grid-{{ home_research_grid_variant | slugify }}">
      <p class="home-interest-map-label">My Research</p>
      <div class="home-grid-switch" role="group" aria-label="Research grid style" hidden aria-hidden="true">
        <button type="button" data-grid-variant="current" aria-pressed="true">Current</button>
        <button type="button" data-grid-variant="strong" aria-pressed="false">Strong</button>
        <button type="button" data-grid-variant="dotted" aria-pressed="false">Dotted</button>
        <button type="button" data-grid-variant="dot-dash" aria-pressed="false">Dot-Dash</button>
      </div>
      <div class="home-interest-grid">
        <section class="home-interest-item">
          <a class="home-interest-summary" href="{{ '/publications/?area=ml-enabled-abuse' | relative_url }}">
            <h3>AI-Enabled Abuse</h3>
            <p class="home-interest-desc">How people abuse AI systems, and how people perceive and respond to abusive AI-generated media.</p>
          </a>
          <p class="home-interest-links-inline">
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-aig-sc-2026' | relative_url }}">AI Sexual Content</a></span>
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-aig-sc-communities-2026' | relative_url }}">Norms, Rules, &amp; Moderation in AI Sexual Communities</a></span>
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-is-this-ai-2026' | relative_url }}">Longitudinal Analysis of AI Detection Methods</a></span>
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-deepfake-moderation-2024' | relative_url }}">Bias in AI Media Moderation</a></span>
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-deepphish-2022' | relative_url }}">Perceptions of AI Media</a></span>
          </p>
        </section>

        <section class="home-interest-item">
          <a class="home-interest-summary" href="{{ '/publications/?area=ml-for-security-applications' | relative_url }}">
            <h3>AI for Security Applications</h3>
            <p class="home-interest-desc">How AI can be integrated into security-sensitive environments.</p>
          </a>
          <p class="home-interest-links-inline">
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-ai-cyber-tutors-2026' | relative_url }}">AI Cyber Tutors</a></span>
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-like-a-hammer-2026' | relative_url }}">LLM Use in SOCs</a></span>
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-everybodys-got-ml-2023' | relative_url }}">AI Use in SOCs</a></span>
          </p>
        </section>

        <section class="home-interest-item">
          <a class="home-interest-summary" href="{{ '/publications/?area=ml-security-and-privacy' | relative_url }}">
            <h3>Security and Privacy of AI</h3>
            <p class="home-interest-desc">How sociotechnical factors impact real-world security and privacy of AI.</p>
          </a>
          <p class="home-interest-links-inline">
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-open-challenges-multi-agent-security-2025' | relative_url }}">Multi-Agent Security</a></span>
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-security-not-my-field-2023' | relative_url }}">AML Defense Barriers</a></span>
          </p>
        </section>

        <section class="home-interest-item">
          <a class="home-interest-summary" href="{{ '/publications/?area=security-and-privacy' | relative_url }}">
            <h3>Security and Privacy (General)</h3>
            <p class="home-interest-desc">Usable security and privacy, system security, and evaluation of HCI methodology.</p>
          </a>
          <p class="home-interest-links-inline">
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-i-can-se-clearly-2026' | relative_url }}">Symbolic Exec GUI</a></span>
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-solk-2024' | relative_url }}">Sociodemographics</a></span>
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-history-early-warning-2023' | relative_url }}">Audit Log SoK</a></span>
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-beyond-bot-detection-2022' | relative_url }}">Bot Survey Fraud</a></span>
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-sok-survey-fraud-2026' | relative_url }}">Survey Fraud SoK</a></span>
            <span class="home-interest-link-item"><a href="{{ '/publications/#pub-users-can-deduce-2022' | relative_url }}">Privacy Zones</a></span>
          </p>
        </section>
      </div>
      <p class="home-subtle-links"><a href="{{ '/publications/' | relative_url }}">View full publication list</a></p>
    </div>
  </div>
</section>

<script>
  (() => {
    const profileLinks = Array.from(document.querySelectorAll('.home-identity-icons a'));
    profileLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        if (event.detail === 0) return;

        link.blur();
        link.classList.add('is-pointer-activated');
      });
      link.addEventListener('pointerleave', () => {
        link.classList.remove('is-pointer-activated');
      });
      link.addEventListener('pointermove', () => {
        link.classList.remove('is-pointer-activated');
      });
    });

    const board = document.querySelector('.home-research-board');
    const switcher = document.querySelector('.home-grid-switch');
    if (!board || !switcher) return;

    const variants = ['current', 'strong', 'dotted', 'dot-dash'];
    const buttons = Array.from(switcher.querySelectorAll('[data-grid-variant]'));

    function setVariant(nextVariant) {
      variants.forEach((variant) => {
        board.classList.toggle(`home-research-board--grid-${variant}`, variant === nextVariant);
      });
      buttons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.gridVariant === nextVariant));
      });
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => setVariant(button.dataset.gridVariant));
    });

    const initialVariant = variants.find((variant) => board.classList.contains(`home-research-board--grid-${variant}`)) || 'current';
    setVariant(initialVariant);
  })();
</script>

<section class="home-awards">
  <h2>Selected Awards</h2>
  {% include award-list.md %}
</section>

<section class="home-contact home-news-coverage">
  <h2>News Coverage</h2>
  {% include news-coverage.html %}
</section>

<section class="home-contact">
  <h2>Contact</h2>
  {% include contact-guidance.html %}
</section>
