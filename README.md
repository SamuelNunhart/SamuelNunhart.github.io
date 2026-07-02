# Samuel Nunhart - Games & Interactive Work

Personal portfolio site for selected games, prototypes, and interactive projects.

Live site: [https://samuelnunhart.github.io/](https://samuelnunhart.github.io/)

## About

This repository contains a static GitHub Pages portfolio. It is meant to show game projects in chronological order, with gameplay videos, playable builds, project notes, skills, contact links, and a downloadable CV.

## Files

- `index.html` - page content, project cards, skills, and contact links.
- `styles.css` - responsive layout and visual styling.
- `script.js` - small footer year script.
- `assets/` - images, GIFs, trailer thumbnails, favicon, and CV PDF.

## Run Locally

From the repository root:

```powershell
py -3 -m http.server 8765 --bind 127.0.0.1
```

Then open:

[http://127.0.0.1:8765/](http://127.0.0.1:8765/)

You can also open `index.html` directly in a browser, but the local server better matches how GitHub Pages serves the site.

## Update Content

Edit `index.html` to update:

- project titles, years, engines, roles, descriptions, and links
- skills
- email, LinkedIn, itch.io, and other contact links
- CV link

Add portfolio assets to `assets/`, then reference them from `index.html`.

## Publish

Push changes to the `main` branch. GitHub Actions publishes the static site to GitHub Pages at:

[https://samuelnunhart.github.io/](https://samuelnunhart.github.io/)

GitHub Pages can take a few minutes to rebuild after a push.
