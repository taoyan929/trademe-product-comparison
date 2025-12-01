# Mission 5 - Phase 2: Trade Me Marketplace

Team development project building a production-ready auction marketplace.

## Phase 1 Foundation

This project builds on Phase 1 individual work: https://github.com/Lona44/Mission-Ready-L5-Mission-5.git

**Phase 1 Deliverables:**
- MongoDB schema with auction data (title, description, category, location, colour, pricing)
- REST API with search functionality (27 passing tests)
- CLI seeder tool (29 passing tests)
- Basic React search interface
- Full TDD evidence and documentation

## Phase 2 Objectives

Build complete Trade Me marketplace with UX team designs:
- Home/Browse marketplace page with search and filters
- Product detail page with bidding functionality
- Comparison tool for comparing multiple items
- Watchlist feature
- Mobile responsive design
- Production-ready code quality

## Team Structure

**Tech Lead:** Responsible for shared components, backend API, architecture, and code review

**Dev 1:** Home/Browse page + navigation system
- Marketplace grid layout
- Search and filter UI
- Breadcrumb navigation
- Category filtering

**Dev 2:** Product detail page
- Single product view with image gallery
- Product details and specifications
- Seller information
- Questions & Answers section
- Bidding functionality (Phase 2)

**Dev 3:** Comparison tool
- Multi-product comparison view
- Add/remove items from comparison
- Filter products for comparison

**UX Team:** Design handoff, component validation, user testing

## Tech Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Jest for testing

**Frontend:**
- React 18
- Vite
- CSS (Trade Me UI Kit)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Lona44/Mission-Ready-L5-Mission-5-Phase-2.git
cd Mission-Ready-L5-Mission-5-Phase-2
```

2. Install backend dependencies:
```bash
cd auction-backend
npm install
```

3. Install frontend dependencies:
```bash
cd auction-frontend
npm install
```

4. Seed the database:
```bash
cd auction-backend
npm run seed
```

5. Run the backend (http://localhost:3000):
```bash
cd auction-backend
npm run dev
```

6. Run the frontend (http://localhost:5173):
```bash
cd auction-frontend
npm run dev
```

## Project Structure

```
Mission 5 - Phase 2/
├── auction-backend/          # Express REST API
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── models/          # MongoDB models
│   │   └── middleware/      # Express middleware
│   └── __tests__/           # Backend tests
├── auction-frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── shared/      # Shared components (ProductCard, Navbar, etc.)
│   │   │   ├── home/        # Home page components (Dev 1)
│   │   │   ├── product/     # Product detail components (Dev 2)
│   │   │   └── comparison/  # Comparison tool components (Dev 3)
│   │   ├── services/        # API client and utilities
│   │   ├── styles/          # UI Kit theme and global styles
│   │   └── pages/           # Page components
│   └── public/              # Static assets
└── docs/                     # Project documentation
    ├── API.md               # API endpoint documentation
    ├── COMPONENTS.md        # Component library guide
    └── UI-KIT.md            # Design system reference
```

## Development Workflow

1. **Pull latest changes:**
```bash
git pull origin main
```

2. **Create feature branch:**
```bash
git checkout -b feature/your-feature-name
```

3. **Make changes and commit:**
```bash
git add .
git commit -m "Description of changes"
```

4. **Push and create PR:**
```bash
git push origin feature/your-feature-name
```

5. **Request review from Tech Lead**

## Branch Strategy

- `main` - Production-ready code (protected)
- `develop` - Integration branch for testing
- `feature/*` - Individual developer branches

## Code Standards

- ESLint and Prettier for consistent formatting
- All API changes must include tests
- Component props must be documented
- Follow Trade Me UI Kit colors and typography
- Mobile-first responsive design

## API Endpoints

**Base URL:** `http://localhost:3000/api`

```
GET    /auctions              # List all auctions (with search/filters)
GET    /auctions/:id          # Get single auction
POST   /auctions/:id/bid      # Place bid (Phase 2)
GET    /categories            # Get category list for navigation
```

See `docs/API.md` for detailed documentation.

## UI Kit Reference

**Colors:**
- Primary Blue: `#007acd` (buttons, links)
- Heading: `#44413d` (titles, navbar)
- Body Text: `#65605d`
- Urgent Red: `#E34647` (countdown, errors)
- Success Yellow: `#F9AF2C` (notifications)
- Borders: `#D9D9D9`
- Background: `#F5F5F5`

**Typography:**
- Font Stack: Story Sans, Helvetica Neue, Arial

See `docs/UI-KIT.md` for full design system.

## Shared Components

Built and maintained by Tech Lead. Do not modify without approval.

- `<Navbar>` - Site navigation header
- `<Footer>` - Site footer with links
- `<Breadcrumbs>` - Navigation breadcrumb trail
- `<ProductCard>` - Reusable product card (used across all pages)
- `<Button>` - Styled button with variants
- `<Badge>` - Status and notification badges

See `docs/COMPONENTS.md` for usage examples.

## Testing

Run backend tests:
```bash
cd auction-backend
npm test
```

Run frontend tests:
```bash
cd auction-frontend
npm test
```

## Deployment

TBD - Will be deployed to production environment after team development is complete.

## Contact

Tech Lead: [Your contact information]

For questions or issues, create a GitHub issue or contact the tech lead directly.
