# ◆ Q-Tech AI-Solutions

A modern, responsive single-page agency website focused on AI services, automation, and custom software delivery.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

## Overview

This project is a zero-dependency static website built with:
- **`index.html`** for semantic page structure and content sections
- **`style.css`** for the dark visual system, responsive layout, and animations
- **`main.js`** for interactivity (navigation behavior, reveals, cursor glow, form handling, and motion effects)

## Project Files

```text
3D-Model-Site/
├── index.html        # Main page markup and section content
├── style.css         # Full visual styling and responsive behavior
├── main.js           # Client-side interactions and effects
├── favicon.svg       # Browser tab icon
├── *.png             # Brand/tech logo image assets
├── LICENSE           # MIT license
└── README.md         # Project documentation
```

## HTML Structure (`index.html`)

The page is organized into clearly separated sections:
- Global loader and top navigation
- Hero section with 3D canvas slot and CTA actions
- Services, case studies, and testimonials
- About and technology highlights
- Contact section with form integration
- Footer

The document includes:
- SEO metadata (`title`, `description`, canonical URL)
- Open Graph and Twitter card tags
- Accessible navigation/menu attributes (`aria-*`)

## Styling (`style.css`)

The stylesheet provides:
- Dark-themed design tokens via CSS custom properties
- Typography using **Barlow Condensed** and **Inter**
- Responsive breakpoints for mobile/tablet/desktop
- UI animation layers (cards, reveals, glow, transitions)
- Section-level layout consistency for presentation and readability

## Interactions (`main.js`)

JavaScript currently powers:
- Preloader hide logic
- Mobile menu open/close state
- Sticky nav style change on scroll
- Intersection Observer reveal animations
- Active navigation link tracking by visible section
- Cursor glow effect for non-touch devices
- Staggered card animations and parallax behavior

## Run Locally

No build step is required.

```bash
# Option 1: open directly
open index.html

# Option 2: run a local server
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Notes

- This repository does not include a package manager or automated test/lint setup.
- Keep updates focused on `index.html`, `style.css`, and `main.js` to preserve the current lightweight architecture.

## License

This project is licensed under the [MIT License](LICENSE).

© 2026 Sahil Sayyed
