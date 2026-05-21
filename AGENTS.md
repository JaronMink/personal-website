# AGENTS.md

This repository is maintained alongside the lab website in `../JaronMink.github.io`.

## Sensitive Information

- Never add, stage, commit, or push sensitive information to git under any circumstances.
- Sensitive information includes secrets, API keys, tokens, passwords, credentials, private keys, unpublished private data, and anything that is not clearly intended to be public.
- If a file or change is not obviously meant to be public, stop and check with the user before adding it to git.
- If sensitive information is found in a working tree or staged diff, do not commit it. Tell the user and ask how they want to handle cleanup.

## Cross-Website Consistency

- When changing content that exists on both sites, update both websites in the same work session.
- Publications are shared content. Keep `_data/publications.yml` consistent with `../JaronMink.github.io/_data/publications.yml` for IDs, order, dates, titles, venues, areas, links, news, and `citation.bibtex`.
- Treat the personal website publication metadata as the canonical version when the two sites disagree, unless the lab site needs extra metadata for functionality.
- Keep lab-only publication metadata limited and explicit. For example, the lab site may use author objects with `class: lab-member` so current lab members can be underlined; preserve equal-contribution suffixes with `suffix: "*"`.
- Keep shared files as transferable as possible between the two sites. Prefer the same field names, URL key patterns, citation blocks, and publication IDs. Avoid site-specific shape changes unless they are required by that site's rendering.
- If adding a link through `url_key`, make sure the corresponding key exists in each site's link registry when needed.
- After publication changes, verify both sites build and, when relevant, compare the two publication YAML files for matching IDs and core fields.

## Validation

- Run `make validate` and `make build` in this repo after publication or site-data changes.
- If the change affects the lab website too, also run `make validate` and `make build` in `../JaronMink.github.io`.
