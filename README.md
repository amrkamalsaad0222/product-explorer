# Product Explorer

A learning project built with Next.js, TypeScript and Tailwind CSS.
It fetches products from the DummyJSON API and lets you search, filter by category, and browse them page by page.

## Features

- Browse with pagination
- Search products
- Filter by category
- Product details page
- Responsive layout for all screen sizes
- Light/dark theme that follows your device settings

## What I learned

- Fetching data with `fetch` and `async/await`
- Handling loading, error and empty states
- Pagination using `limit` and `skip` query parameters
- Fixing a race condition with a cleanup function in `useEffect`
- Dynamic routes in the Next.js App Router (`/products/[id]`)

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- DummyJSON API

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Live demo

https://product-explorer-inky-two.vercel.app/
