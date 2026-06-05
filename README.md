# E-Commerce Product Listing Application

A React-based e-commerce product listing and detail application built with the DummyJSON API.

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
npm install
npm run dev
```

The app will start at `http://localhost:5173`

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Client-side routing
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## Features

- Product listing with dynamic grid
- Multi-criteria filtering (category, price range, brand)
- Pagination (12 products per page)
- Product detail page with full information
- Filter state preservation on navigation
- Responsive design (mobile, tablet, desktop)
- Loading and error states

## Project Structure

```
src/
├── components/        # Reusable UI components
├── context/          # React Context for state management
├── hooks/            # Custom hooks for data fetching
├── pages/            # Page components (Listing, Detail)
├── services/         # API service layer
├── types/            # TypeScript types and interfaces
├── utils/            # Utilities (formatters, constants)
└── App.tsx           # Main app component
```

## API Integration

Uses the public DummyJSON API:
- `GET /products` - Fetch products with pagination
- `GET /products/categories` - Fetch all categories
- `GET /products/category/{category}` - Fetch products by category
- `GET /products/{id}` - Fetch single product

## Architectural Decisions

1. **Client-side Filtering** - Price and brand filters are applied client-side because the DummyJSON API lacks server-side filtering support
2. **React Context** - Chosen for filter state management (lightweight, no extra dependencies)
3. **Relative Imports** - Avoided path aliases for better compatibility
4. **Tailwind CSS** - Chosen for rapid, utility-first styling without custom component library overhead
5. **React Router State** - Filter state is passed via location state for seamless navigation preservation

## Improvements for Future

- Implement wishlist/favorites feature
- Server-side pagination and filtering
- Shopping cart functionality
- User authentication
- Product image gallery with lightbox
- Advanced filtering (stock status, discount, etc.)
- Performance optimization with lazy loading
- Unit and integration tests
