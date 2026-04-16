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
      <p class="home-meta-line">{{ site.data.profile.pronouns_display }}</p>
      <p class="home-meta-line">{{ site.position }}</p>
      <p class="home-meta-line"><a href="{{ site.data.links.scai_web }}">{{ site.affiliation }}</a></p>
      <p class="home-meta-line"><a href="{{ site.data.profile.lab.url }}">{{ site.data.profile.lab.short_name }}</a></p>
      <p class="home-meta-line"><a href="mailto:{{ site.data.profile.email }}">{{ site.data.profile.email }}</a></p>
      <div class="home-identity-icons" aria-label="Profile links">
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
      </div>
    </div>
  </div>

  <div>
    <p class="home-lead">
      I'm an Assistant Professor in the School of Computing and Augmented Intelligence at Arizona State University. I direct the <a href="{{ site.data.profile.lab.url }}">{{ site.data.profile.lab.full_name }}</a> ({{ site.data.profile.lab.short_name }}), where we study human-centered security for AI systems. Across my work, I examine how human factors are exploited to weaken AI security and how they can be harnessed to make AI systems safer in practice.
    </p>
    <div class="home-interest-grid">
      <section class="home-interest-item">
        <h3><a href="{{ '/publications/?area=ml-enabled-abuse' | relative_url }}">AI-Enabled Abuse</a></h3>
        <p class="home-interest-desc">How people abuse AI systems, and how people perceive and respond to abusive AI-generated media.</p>
        <p class="home-interest-links-inline">
          <a href="{{ '/publications/#pub-aig-sc-2026' | relative_url }}">AI Sexual Content</a> &bull;
          <a href="{{ '/publications/#pub-deepfake-moderation-2024' | relative_url }}">Bias in AI Media Moderation</a> &bull;
          <a href="{{ '/publications/#pub-deepphish-2022' | relative_url }}">Perceptions of AI Media</a>
        </p>
      </section>

      <section class="home-interest-item">
        <h3><a href="{{ '/publications/?area=ml-for-security-applications' | relative_url }}">AI for Security Applications</a></h3>
        <p class="home-interest-desc">How AI can be integrated into security-sensitive environments.</p>
        <p class="home-interest-links-inline">
          <a href="{{ '/publications/#pub-ai-cyber-tutors-2026' | relative_url }}">AI Cyber Tutors</a> &bull;
          <a href="{{ '/publications/#pub-like-a-hammer-2026' | relative_url }}">LLM Use in SOCs</a> &bull;
          <a href="{{ '/publications/#pub-everybodys-got-ml-2023' | relative_url }}">AI Use in SOCs</a>
        </p>
      </section>

      <section class="home-interest-item">
        <h3><a href="{{ '/publications/?area=ml-security-and-privacy' | relative_url }}">AI Security and Privacy</a></h3>
        <p class="home-interest-desc">How sociotechnical factors impact real-world adoption of AI defenses.</p>
        <p class="home-interest-links-inline">
          <a href="{{ '/publications/#pub-security-not-my-field-2023' | relative_url }}">AML Defense Barriers</a>
        </p>
      </section>

      <section class="home-interest-item">
        <h3><a href="{{ '/publications/?area=security-and-privacy' | relative_url }}">Security and Privacy (General)</a></h3>
        <p class="home-interest-desc">Usable security and privacy, system security, and evaluation of HCI methodology.</p>
        <p class="home-interest-links-inline">
          <a href="{{ '/publications/#pub-i-can-se-clearly-2026' | relative_url }}">Symbolic Exec GUI</a> &bull;
          <a href="{{ '/publications/#pub-solk-2024' | relative_url }}">Sociodemographics & Security</a> &bull;
          <a href="{{ '/publications/#pub-history-early-warning-2023' | relative_url }}">Audit Log SoK</a> &bull;
          <a href="{{ '/publications/#pub-beyond-bot-detection-2022' | relative_url }}">Bot Survey Fraud</a> &bull;
          <a href="{{ '/publications/#pub-users-can-deduce-2022' | relative_url }}">Privacy Zones</a>
        </p>
      </section>
    </div>
    <p class="home-subtle-links"><a href="{{ '/publications/' | relative_url }}">View full publication list</a></p>
  </div>
</section>

<section class="home-awards">
  <h2>Selected Awards</h2>
  {% include award-list.md %}
</section>

<section class="home-contact">
  <h2>Contact</h2>
  <p>{% include contact-guidance.html %}</p>
</section>
