# SORI YOO — MICE & Event Portfolio

Responsive Korean/English professional portfolio for Sori Yoo, currently a Director at Speaence.

## Live site

https://jungsuplee-hub.github.io/sori-profile/

## Content

- Current role: Director at Speaence (per the portfolio owner's latest information).
- Historical employment and project roles: Korean resume, professional records and project materials.
- Featured projects: 12 selected international summits, conferences, forums and events.
- Every featured card and each of the 141 archive entries has a local optimized WebP thumbnail in `assets/thumbs/` (no external image dependency).
- Image types in `projects.json`: `project_photo` for photographs taken from the matching project archive; `project_artwork` for a project-specific visual; `illustration` for original topic-based illustrations where publishable imagery was not available. Illustrations are **not** presented as documentary photos of the actual event.
- Searchable archive: 2011–2025 records from the owner's professional folders, grouped as project-delivery/operation materials and planning/proposal materials.
- The archive is an **inventory of working materials**, not a count of successfully completed or awarded projects. A proposal entry does not imply winning the bid, and a project record does not imply sole leadership.
- The source materials are not published. The site omits street addresses, personal contact details, business documents, financial records, confidential participant lists, and original internal project files. Only selected, resized event imagery and original illustrations appear in the public repository.

## Features

- Static HTML, CSS and JavaScript; no frameworks or runtime servers required.
- Korean/English switch with saved preference.
- Selected-project filters, archive search, year and record-type filters, progressive results display.
- All 12 featured project cards open accessible detail dialogs with event background, program highlights, scope of work, a larger image, an event-specific photo gallery where confirmed images are available, and a related-project navigation link.
- Detailed event facts and bilingual descriptions are stored in `project-details.json`; public event-information URLs are linked within the detail view.
- Event gallery images under `assets/gallery/` are reduced-size derivatives of event-specific folders. Not all projects have additional event photographs; do not substitute unrelated images or claim design mockups are event photos.
- Public page content does not include links to this source repository.
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
