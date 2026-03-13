# ◆ Q-Tech AI-Solutions

A modern, responsive portfolio website for an AI-driven freelance agency — featuring an interactive 3D hero model, smooth scroll animations, and a dark-themed design system.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

## ✨ Features

- **Interactive 3D Hero** — Spline-powered robot model that tracks cursor movement in real time
- **Scroll Animations** — Intersection Observer-driven fade-up reveals and staggered card entrances
- **Cursor Glow** — Smooth magnetic glow effect that follows the mouse on desktop
- **Contact Form** — Async form submission via Formspree with loading and success states
- **Responsive Design** — Fluid typography with `clamp()` and layouts that adapt from mobile to desktop
- **Parallax Effects** — Subtle depth shifts on the about-section mesh element
- **Performance Optimized** — Spline canvas pauses rendering when the tab is hidden

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic, accessible) |
| Styling | CSS3 (custom properties, flexbox, grid) |
| Scripting | Vanilla JavaScript (no frameworks) |
| 3D | [Spline](https://spline.design/) runtime via CDN |
| Forms | [Formspree](https://formspree.io/) |
| Fonts | Google Fonts — Barlow Condensed & Inter |

## 📁 Project Structure

```
3D-Model-Site/
├── index.html      # Main page markup
├── style.css       # Design system and responsive styles
├── main.js         # Interactions, 3D setup, and form handling
├── favicon.svg     # Brand mark icon
├── LICENSE         # MIT License
└── README.md       # You are here
```

## 🚀 Getting Started

This is a **zero-dependency static site** — no build tools or package managers required.

### Option 1 — Open directly

```bash
open index.html
```

### Option 2 — Local server

```bash
# Python
python3 -m http.server 8000

# Node.js
npx http-server

# Then visit http://localhost:8000
```

## 🎨 Design System

The site uses CSS custom properties for a consistent dark theme:

| Token | Value | Usage |
|-------|-------|-------|
| `--c-bg` | `#050508` | Page background |
| `--c-surface` | `#08090f` | Card / section surfaces |
| `--c-text` | `#e8eaf0` | Primary text |
| `--c-text-muted` | `#b0b5c8` | Secondary text |
| `--c-accent` | `#4a7fd4` | CTAs and highlights |

## 📄 Sections

| Section | Description |
|---------|-------------|
| **Hero** | 3D robot model, headline, social-proof client pills |
| **Services** | Four animated cards for AI/ML, Automation, Software Dev, and Data & Analytics |
| **About** | Value proposition with parallax mesh and three key advantages |
| **Tech Marquee** | Scrolling ticker of technologies (Python, TensorFlow, AWS, etc.) |
| **Testimonials** | Three client review cards with author details |
| **Contact** | Two-column layout with an async form and email CTA |

## ♿ Accessibility

- Semantic HTML landmarks (`<nav>`, `<section>`, `<article>`)
- ARIA labels and roles on interactive elements
- Properly associated form labels
- Meets WCAG color-contrast guidelines

## 📝 License

This project is licensed under the [MIT License](LICENSE).

© 2026 Sahil Sayyed
