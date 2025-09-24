# ViTech

A modern, single-page e-commerce app for tech accessories.

## Stack
- Vite (dev/build), React 19
- Tailwind CSS v4 + custom CSS variables (`src/vitek.css`)
- shadcn/ui (Button), Radix primitives
- react-router-dom (SPA routing)

## Project Structure
- `rootskelly/` – App source
  - `index.html` – Vite HTML entry
  - `src/` – React app
    - `components/` – UI components and pages
    - `context/CartContext.jsx` – Centralized cart state (localStorage sync)
    - `vitek.css` – App theme/styles (colors, layout, accessibility)
  - `public/images/` – Product images
- `OpenViTek.bat` – Windows launcher (starts dev server and opens Chrome)

## Getting Started
1) Install dependencies
```
cd rootskelly
npm install
```
2) Run the app
```
npm run dev
```
Or double‑click `OpenViTek.bat` from the repository root (Windows).

## Routes
- `/` – Home
- `/shop` – Product grid (search, filter, add to cart)
- `/about` – Mission with full gradient background
- `/contact` – Accessible contact form (validation, aria, live status)
- `/cart` – Cart with quantity controls and totals
- `/checkout` – Order summary and form
- `*` – Not Found

## Theming
--brand-1: #2563eb;
--brand-2: #22d3ee;
--surface: #f6f9fc;
--text: #0f172a;
--muted-text: #475569;
```

## Accessibility
- High-contrast buttons and focus-visible styles
- Live regions for cart quantity and contact form status
- Semantic landmarks and keyboard-focusable controls

## Production Notes
- Keep `rootskelly/index.html` (Vite entry). For static hosting, configure SPA fallback to serve `index.html` for unknown routes.

## License
MIT
