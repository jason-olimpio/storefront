# Storefront

A full-featured e-commerce storefront built with Next.js, featuring authentication, role-based access, real-time notifications, localization, and end-to-end order management.

## Key features

- Authentication & authorization with role-based access (Admin/User)
- Real-time notifications (order updates, role changes)
- Internationalization
- Shopping cart and checkout flow
- Order management (user order history + admin order dashboard)
- User management (admin role updates)
- Dark/light theme switching
- Responsive UI with Tailwind CSS
- Strong type-safety and validation (TypeScript + Zod)

## Tech stack

- Next.js (App Router), React
- TypeScript
- Tailwind CSS
- Redux Toolkit
- TanStack Query (React Query)
- next-intl
- Axios
- Zod
- next-themes

## Getting started

### Prerequisites
- Node.js 18+
- npm 9+ (or yarn/pnpm)

### Install & run (development)

```
git clone https://github.com/username/Storefront.git
cd Storefront
npm install
npm run dev
```

App runs at `http://localhost:3000`.

### Production build

```
npm run build
npm start
```

## Scripts

- `npm run dev` — Starts development server
- `npm run build` — Creates production build
- `npm run deploy:gh-pages` — Builds and pushes the out directory to GitHub Pages.
- `npm run lint` — Runs ESLint and attempts to fix issues
- `npm run lint:next` — Runs Next.js ESLint rules
- `npm run format` — Formats with Prettier
- `npm run format:check` — Checks formatting

## Project structure

```
src/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin pages
│   ├── api/               # API services and client
│   ├── components/        # React components
│   │   ├── auth/         # Authentication components
│   │   ├── cart/         # Shopping cart components
│   │   ├── dropdowns/    # Dropdown components
│   │   ├── navbar/       # Navigation components
│   │   ├── orders/       # Order components
│   │   └── users/        # User management components
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Redux store and slices
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Utilities
│       └── mock/         # Mock services (localStorage)
├── messages/              # i18n translation files
└── public/                # Static assets
```
