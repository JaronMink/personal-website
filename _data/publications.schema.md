# Publications Data Schema

The canonical publication dataset lives in `_data/publications.yml`.

Each publication entry supports the following fields:

- `id` (required, string): stable slug, e.g. `pub-security-not-my-field-2023`
- `year` (required, integer): publication year
- `date` (required, string): ISO 8601 publication date in `YYYY-MM-DD` format, used for chronological ordering; for preprints, use the arXiv posting date
- `preprint` (optional, boolean): set to `true` for preprints and keep it consistent with the `venue` text
- `hidden` (optional, boolean): set to `true` to keep an entry in data while excluding it from public publication lists and JSON output
- `citation` (required, object): curated BibTeX and source metadata used by the site Bib button and JSON export
  - `source` (required, string): URL of the official publisher/proceedings/arXiv page used to verify the citation
  - `verified_date` (required, string): ISO 8601 verification date in `YYYY-MM-DD` format
  - `bibtex` (required, string): final curated BibTeX entry
  - `notes` (optional, string): short explanation for fallbacks or not-yet-final publisher records
- `title` (required, string)
- `authors` (required, non-empty array of strings)
- `venue` (required, string)
- `areas` (required, non-empty array of strings): values must match area slugs nested under `tracks[].areas[]` in `_data/publication-areas.yml`
- `links` (optional, array):
  - `label` (required, string)
  - `style` (optional, string): `primary` or `info`
  - exactly one of:
    - `url` (string), or
    - `url_key` (string key in `_data/links.yml`)
- `news` (optional, array):
  - `label` (required, string)
  - exactly one of `url` or `url_key`

Validation is enforced by `script/validate-publications` and runs in `script/cibuild`.
