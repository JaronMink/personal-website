---
layout: multi
title: Bio
permalink: /bio/
description: Biography for Jaron Mink.
hide_page_title: true
---

<section class="bio-text" aria-label="Biography">
{% capture bio_content %}{% include bio.md %}{% endcapture %}
{{ bio_content | markdownify }}
</section>

<div class="page-bottom-rule" aria-hidden="true"></div>
