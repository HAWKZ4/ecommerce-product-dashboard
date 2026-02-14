# 🛍️ E-Commerce Product Dashboard

Frontend Developer Take-Home Assignment — Next.js + TypeScript

A modern product inventory dashboard built with **Next.js App Router**, **TypeScript**, and **TanStack Query**, integrated with the **DummyJSON Products API**.

This project demonstrates real-world frontend architecture, advanced data-fetching UX patterns, accessibility, performance optimization, and component-driven design.

---

## 🚀 Live Demo

👉 **Netlify Deployment:** [product-dashboard1.netlify.app](https://product-dashboard1.netlify.app/)

---

## 📌 Overview

This application provides a fully interactive product dashboard with:

- Real API integration
- Responsive product grid
- Search, filter, sort, pagination
- Detailed product modal
- UI shopping cart with persistence
- Dark mode with persistence
- Smooth animations
- Background loading indicators (premium UX)
- Unit testing

Built following modern frontend engineering standards and scalable project structure.

---

## 🧰 Tech Stack

- **Next.js App Router**
- **React 19**
- **TypeScript (strict mode)**
- **Tailwind CSS**
- **TanStack Query (React Query)**
- **Framer Motion**
- **Headless UI**
- **Lucide Icons**
- **Jest + React Testing Library**
- **Netlify Deployment**

---

## 🔌 API Integration

Using **DummyJSON Products API**

Base URL:

[https://dummyjson.com](https://dummyjson.com/)

### Endpoints Used

Feature

Endpoint

All products

`/products`

Search

`/products/search?q=`

Categories

`/products/categories`

Category filter

`/products/category/{slug}`

Single product

`/products/{id}`

API calls are centralized in:

```
src/lib/api.ts

```

Includes:

✔ typed responses  
✔ centralized error handling  
✔ no-store caching strategy  
✔ reusable query abstraction

---

## ✨ Features

---

### 🧱 Product Grid + Pagination

- Responsive product layout
- 12 products per page
- Previous / Next + page numbers
- Smooth scroll to top on page change
- Stock status badges
- Discount display
- Category tags

---

### 🔎 Real-Time Search

- API search endpoint
- 300ms debounced input
- Results count display
- Clear search button
- Empty state UI

---

### 🏷 Category Filtering

- Dynamic category list
- Active filter state
- Reset to "All"
- Filtered result count

---

### ↕ Sorting

- Price (asc / desc)
- Title (A-Z / Z-A)
- Rating (highest)
- API sort parameters + client fallback

---

### 🧾 Product Detail Modal

- Image gallery
- Full description
- Pricing + discount
- Rating display
- Brand + SKU
- Dimensions + weight
- Warranty + shipping
- Customer review mock
- Keyboard accessible
- ESC / backdrop / button close

---

### 🛒 Shopping Cart (UI Only)

- Add to cart buttons
- Header cart counter
- LocalStorage persistence
- Toast feedback animation

---

### 🌙 Dark Mode

- System preference detection
- Manual toggle
- Persistent theme
- Hydration-safe SSR setup

---

### 🎬 Animations

- Modal transitions
- Micro-interactions
- Layout motion
- Smooth hover feedback

Built with **Framer Motion**

---

### ⚡ Advanced Loading UX (Production-Grade)

This app implements **modern data-fetching UX patterns** used in real production dashboards:

State

Behavior

First page load

Skeleton grid

Filter / sort / pagination

Previous data remains visible

Background refetch

Animated updating indicator

No flicker

Smooth UI transitions

Implemented using:

- React Query `keepPreviousData`
- React Query `isFetching`
- Custom **UpdatingBar** component

Result:

✔ No layout jumps  
✔ No empty flashes  
✔ Smooth perceived performance

---

### 🧪 Unit Testing (Bonus)

Tested using:

- Jest
- React Testing Library
- jsdom environment

Coverage includes:

✔ API logic  
✔ Pagination behavior  
✔ Filters interaction  
✔ Product card events  
✔ Modal async rendering

Test folders:

```
test/
  setup.tsx
  test-utils.tsx

src/components/__tests__/
src/lib/__tests__/

```

Run tests:

```bash
npm test

```

Watch mode:

```bash
npm run test:watch

```

---

## 🧠 Architecture & Best Practices

✔ Centralized data layer  
✔ Component composition  
✔ Strict TypeScript  
✔ Semantic HTML  
✔ Accessible UI patterns  
✔ Skeleton loading states  
✔ Background fetch indicators  
✔ Error handling  
✔ Empty states  
✔ Reusable UI primitives  
✔ URL query state syncing  
✔ Suspense boundary for App Router  
✔ Hydration-safe theme handling

---

## 🧩 Rendering Architecture (Next.js App Router)

The homepage is split into:

### Server Component

```
src/app/page.tsx

```

Wraps UI in Suspense boundary.

### Client Component

```
src/app/HomePageClient.tsx

```

Handles:

- search params
- data fetching
- state management
- UI rendering

This prevents CSR bailouts and ensures correct production prerendering.

---

## 📂 Project Structure

```
src/
  app/
    page.tsx
    HomePageClient.tsx
    providers.tsx

  components/
    UpdatingBar.tsx
    ProductGrid.tsx
    ProductModal.tsx
    Pagination.tsx
    FiltersBar.tsx
    Header.tsx
    Skeletons.tsx
    __tests__/

  hooks/
    useDebounce.ts

  lib/
    api.ts
    cart.ts
    types.ts
    utils.ts
    __tests__/

test/
  setup.tsx
  test-utils.tsx

public/

```

---

## ⚙ Installation

```bash
npm install
npm run dev

```

App runs at:

[http://localhost:3000](http://localhost:3000/)

---

## 🏗 Production Build

```bash
npm run build
npm start

```

---

## ☁ Deployment

Deployed using **Netlify**

Supports:

✔ Next.js App Router  
✔ SSR / hybrid rendering  
✔ Edge runtime compatible  
✔ Environment variables

---

## 👨‍💻 Design & Engineering Goals

This project focuses on:

- Production-grade UX patterns
- Predictable data flow
- Scalable component structure
- Real-world loading states
- Accessibility & semantics
- Performance-first rendering

---

## 📄 License

Assignment project — frontend evaluation.

---
