# Jaron Mink Personal Website

Source for [jaronm.ink](https://jaronm.ink/), built with Jekyll, mostly vibe-coded.

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

## Content Map

- Homepage: `index.md`
- Bio: `bio.md` and `_includes/bio.md`
- Publications: `_data/publications.yml` and `_includes/publication-list.html`
- Teaching: `_data/teaching.yml`
- Service: `_data/service.yml`
- Links/URLs: `_data/links.yml`
- Profile/contact info: `_data/profile.yml`

## Validation

Useful checks:

```bash
bundle exec script/validate-publications
bundle exec script/validate-site-data
```

Additional optional checks live in `script/`.
