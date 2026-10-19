# SORI YOO — MICE & Event Portfolio

A responsive, bilingual (Korean / English) professional portfolio for Yoo Sori.

## Live site

After GitHub Pages is enabled: https://jungsuplee-hub.github.io/sori-profile/

## Source material and editorial policy

Content is curated from locally-held 2021-09 Korean resume and project-history documents:
- \`/mnt/synology/homes/sori/01. SORI/01. 이력서/01. 국문/유소리_이력서 & 경력기술서(2021. 9).docx\`
- \`/mnt/synology/homes/sori/03. CAREER\` (project archive, cross-reference only)

This public repository **does not contain the source resume**, personal address, phone, birthday, bank or ID documents, private correspondence, or unauthorized project photos.

The employment timeline is historical; more recent roles should be verified before adding them. Project descriptions include only roles documented in the resume.

## Features

- Responsive, accessible, self-contained static HTML, CSS and JavaScript
- Korean and English language toggle with local preference
- Interactive project filters; reduced-motion support
- SEO and Open Graph metadata
- No build tools, private credentials, runtime APIs, or paid services

## Deploy with GitHub Pages

GitHub repository Settings → Pages → Build and deployment → Deploy from a branch → \`main\` and \`/(root)\`. The site works under the repository subpath \`/sori-profile/\` with no rewrite rule.

## Local preview

\`\`\`sh
python3 -m http.server 8888
\`\`\`

Then open http://localhost:8888/.
