# ALX Listing App

A simple Airbnb-style listing page built with Next.js and Tailwind CSS. The goal is to learn and showcase modern React/Next.js patterns while building a clean, responsive UI for browsing property listings.

## Project structure

This project uses the Next.js App Router (`app/` directory). In addition, the following directories are used or planned as the app grows:

- `components/` — Reusable UI components (cards, headers, footers, filters, modals, etc.).
- `interfaces/` — TypeScript interfaces and types shared across the app (e.g., Listing, User, Booking).
- `constants/` — App-wide constants and configuration (e.g., filters, sort options, static enums).
- `public/assets/` — Static images and other assets (icons, placeholders, logos). Files in `public/` are served at the site root.

Note: If some of these folders aren’t present yet, they’ll be created as features are implemented.

## Run the project locally

1) Install dependencies

```bash
npm install
```

2) Start the development server

```bash
npm run dev
```

3) Open the app

Visit http://localhost:3000 in your browser.

## Additional notes

- Tech stack: Next.js (App Router), React, TypeScript, Tailwind CSS.
- Styling: Tailwind CSS v4 is configured via PostCSS and imported in `app/globals.css`.
- Entry points: The main layout is in `app/layout.tsx` and the default page is `app/page.tsx`.
