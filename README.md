# SPA Candidato Prefeitura

*[Ler em português](README.pt-BR.md)*

A single-page campaign website for a fictional mayoral candidate — biography, platform, event agenda, and contact — built to practice component composition, third-party UI library integration, and CSS-based responsive design in React, without any backend or data-fetching involved.

Stack: **React 19, Material UI (MUI) + Emotion, React Icons, CSS Modules, Create React App**.

## Table of contents

- [Problem](#problem)
- [Architecture decisions](#architecture-decisions)
- [Running locally](#running-locally)
- [Project structure](#project-structure)
- [What I'd improve with more time](#what-id-improve-with-more-time)

## Problem

Unlike this developer's other React projects, which practice CRUD and REST API consumption, this one is purely presentational: a single scrolling page that has to look and feel like a real campaign site, work across phone/tablet/desktop breakpoints, and hold up visually without any dynamic data behind it. That's a different — and just as necessary — skill set: composing a UI library (MUI) with custom CSS instead of one or the other, structuring layout with pure CSS media queries instead of a component-level responsive framework, and getting a page to feel finished rather than functional.

## Architecture decisions

### 1. Anchor-based single-page navigation instead of a router

There's no `react-router-dom` in this project. The four sections (`Biografia`, `Proposta`, `Agenda`, contact in `Footer`) are all rendered together in `App.js`, and the header's navigation is plain anchor links:

```jsx
<ul className={styles.menuLista}>
    <li><a href="#biografia">Biografia</a></li>
    <li><a href="#proposta">Proposta</a></li>
    <li><a href="#agenda">Agenda</a></li>
    <li><a href="#contato">Contato</a></li>
</ul>
```

Each section has a matching `id` (`id="biografia"`, `id="agenda"`, etc.), so the browser's native anchor scrolling does all the navigation work. A campaign landing page is a linear narrative meant to be read top to bottom, not a set of independent views — a router would add a dependency and a layer of indirection for something the browser already does for free.

### 2. MUI components styled via `sx`, layered with CSS Modules, unified through CSS variables

Structural, per-component layout (positioning, the timeline, the mobile menu overlay) is hand-written in a `.module.css` file next to each component. Interactive/typographic elements (`Card`, `Button`, `IconButton`, `Typography`) come from MUI, styled inline through the `sx` prop rather than MUI's theme provider:

```jsx
<Button
    sx={{
        borderRadius: 7,
        fontWeight: 'bold',
        backgroundColor: 'var(--primary-color)',
        color: 'var(--background)',
    }}
    variant="contained"
>
    Fale Conosco
</Button>
```

The detail that ties both styling systems together: `sx` values reference the same CSS custom properties (`var(--primary-color)`, `var(--background)`) defined once in `global.css`, rather than duplicating hex codes in both the CSS Modules files and the MUI `sx` props. Change a color in one place, and both the hand-written CSS and every MUI component pick it up — including a `prefers-color-scheme: dark` override that flips `--primary-color` and `--background` for users with dark mode enabled at the OS level, with zero component-level dark-mode logic required.

### 3. Two images for two breakpoints, with a real performance lesson learned

The `Biografia` section shows a different portrait crop depending on screen size — a taller, narrower crop for the tablet layout (where the photo sits beside the timeline) versus a wider crop for mobile (where it sits above the timeline, full width). Rather than relying on `object-fit` to force one image into two very different aspect ratios, two separate source images are used, toggled via CSS media queries (`display: none` / `display: block` per breakpoint).

This project also went through a real fix worth documenting: the two images were initially unoptimized stock photos straight out of the camera (7030×4403 and 6799×5135, over 11MB each). Since the CSS shows or hides each `<img>` rather than removing it from the DOM, **both** images were being downloaded on every page load regardless of which one was actually visible — over 20MB transferred just for two portraits that never render larger than 700px wide. Both images were resized down to 1400px (comfortably covering retina displays at the actual render size) and re-compressed, cutting combined size from ~23MB to ~115KB. The images are still both downloaded on every load — a `<picture>` element with per-breakpoint `srcset` would be the architecturally correct fix — but at current sizes that's a non-issue in practice, whereas at the original sizes it was a real, measurable problem.

### 4. Mobile menu as a state-driven overlay

The hamburger menu isn't CSS-only — it's backed by a single `useState`, with a full-screen click-to-close overlay layered underneath the slide-out menu:

```jsx
const [menuAberto, setMenuAberto] = useState(false);
```
```jsx
{menuAberto && (
    <div className={styles.overlay} onClick={() => setMenuAberto(false)}></div>
)}
```

The overlay uses `backdrop-filter: blur(...)` rather than a flat semi-transparent color, so the page content behind the open menu is visibly blurred instead of just dimmed — a small detail, but one that requires the overlay to be a real DOM element with its own z-index stacking, not just a CSS `:focus`/`:target` trick.

### 5. Content as data, mapped to JSX

The six platform proposals, six agenda events, and four social links are all defined as arrays of plain objects at the top of their respective components, then rendered with `.map(...)`:

```jsx
const propostas = [
    { id: 1, titulo: "Educação de Qualidade", descricao: "...", icone: <SchoolIcon /> },
    // ...
];
```

This keeps the JSX itself free of six near-identical `<Card>` blocks copy-pasted with different text — adding a seventh proposal or event means adding one object to the array, not duplicating markup.

## Running locally

> Instructions assume **macOS** with a terminal.

This is a fully static, front-end-only project — there's no API, no environment variables, and no database of any kind to set up.

### Prerequisites

- **Node.js** (v18 or later recommended) and npm installed.

### 1. Clone the repository

```bash
git clone https://github.com/gustavomoliveira/spa-candidato-prefeitura.git
cd spa-candidato-prefeitura
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm start
```

This opens `http://localhost:3000` automatically.

### 4. Try the responsive layout

Open the browser's DevTools and toggle device toolbar (or just resize the window) to see the layout shift across three breakpoints: mobile (default), tablet (768px–1199px), and desktop (1200px+) — the `Biografia` section's image and layout direction change noticeably at each one. Try the hamburger menu on a narrow viewport to see the blurred overlay.

### Opening in IntelliJ

Open the project folder in IntelliJ (with the JavaScript/React plugin enabled, or via WebStorm) — no environment variables or run configuration setup is needed beyond the standard `npm start`.

## Project structure

```
spa-candidato-prefeitura/
├── package.json
├── public/
│   └── images/
│       ├── marco-madureira-retrato-mobile.jpg
│       └── marco-madureira-retrato-tablet.jpg
└── src/
    ├── App.js                          # renders all four sections in order
    ├── styles/
    │   └── global.css                  # CSS custom properties, dark mode override
    └── components/
        ├── Header/
        │   ├── Header.jsx              # nav, hamburger menu, mobile overlay
        │   └── Header.module.css
        ├── Biografia/
        │   ├── Biografia.jsx           # timeline + responsive portrait images
        │   └── Biografia.module.css
        ├── Proposta/
        │   ├── Proposta.jsx            # MUI Cards mapped from a data array
        │   └── Proposta.module.css
        ├── Agenda/
        │   ├── Agenda.jsx              # event cards with date formatting
        │   └── Agenda.module.css
        └── Footer/
            ├── Footer.jsx              # social links + contact info
            └── Footer.module.css
```

## What I'd improve with more time

- **Serve responsive images properly instead of shipping both.** The compression fix solved the immediate performance problem, but the underlying approach — both images always downloaded, one hidden via CSS — is still not the correct pattern. A `<picture>` element with `srcset`/`sizes` (or `loading="lazy"` at minimum) would mean the browser only downloads the image it's actually going to display.
- **No test coverage.** Nothing here is covered by React Testing Library — the mobile menu's open/close state and the overlay's click-to-dismiss behavior would be the first things worth testing, since they're the only real interactive logic in an otherwise static page.
- **The contact section is links only, not a form.** `Footer` currently offers `mailto:` and `tel:` links; a real contact form with validation (consistent with the `react-hook-form` approach used in this developer's other projects) would be a natural next step.
- **No active-section highlighting in the nav.** Clicking a nav link scrolls to the right section, but nothing indicates which section is currently in view while scrolling — a scroll-spy behavior would round out the navigation experience.
