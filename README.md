# SORI YOO — MICE & Event Portfolio

Responsive Korean/English professional portfolio for Sori Yoo, currently a Director at Speaence.

## Live site

https://jungsuplee-hub.github.io/sori-profile/

## Content

- Current role: Director at Speaence (per the portfolio owner's latest information).
- Historical employment and project roles: Korean resume, professional records and project materials.
- Featured projects: 12 selected international summits, conferences, forums and events.
- Searchable archive: 2011–2025 records from the owner's professional folders, grouped as project-delivery/operation materials and planning/proposal materials.
- The archive is an **inventory of working materials**, not a count of successfully completed or awarded projects. A proposal entry does not imply winning the bid, and a project record does not imply sole leadership.
- The source materials are not published. The site omits street addresses, personal contact details, business documents, financial records, confidential participant lists, and original internal project files.

## Features

- Static HTML, CSS and JavaScript; no frameworks or runtime servers required.
- Korean/English switch with saved preference.
- Selected-project filters, archive search, year and record-type filters, progressive results display.
- Mobile-first accessible layout, keyboard controls, reduced-motion support.
- No credentials, runtime APIs, or paid services.

## Update project archive

`projects.json` is a reviewed, public-safe listing of `{year, title, kind}` records; `kind` is `operation` or `proposal`. Do not include source paths, personal data, third-party contact information, or private attachments.

## Publish

GitHub Pages: branch `main`, folder `/(root)`.

Local preview:

```sh
python3 -m http.server 8888
```

Visit http://localhost:8888/ to preview the site and archive.
