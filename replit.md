# Lekvrijdak Dakdekker Website

## Overview

Lekvrijdak is a professional roofing contractor website built to convert visitors into quote requests. The application is designed for the Dutch market, featuring a multi-page website with dedicated service pages, quote request functionality, and an admin dashboard for managing incoming quotes. The design emphasizes trust, professionalism, and conversion optimization, drawing inspiration from high-converting service platforms like HomeAdvisor and Angi.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- React 18+ with TypeScript for type safety and modern component patterns
- Wouter for lightweight client-side routing (alternative to React Router)
- Vite as the build tool and development server
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component library (New York style variant) for pre-built, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for variant-based component styling

**Design System**
- Custom color palette optimized for Dutch market preferences (professional blue, warm orange accents)
- Typography using Google Fonts: Poppins for headings, Inter for body text
- Responsive design with mobile-first approach
- Light and dark mode support through CSS custom properties

**Form Management**
- React Hook Form for performant form state management
- Zod for schema validation
- @hookform/resolvers for Zod integration with React Hook Form
- Two form types: QuickQuoteForm (homepage hero) and AdvancedQuoteForm (service pages with conditional fields)

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server
- TypeScript for type safety across the stack
- Session-based authentication using express-session
- In-memory session storage (ready for PostgreSQL upgrade via connect-pg-simple)

**API Design**
- RESTful API endpoints under `/api` prefix
- Protected routes using authentication middleware
- JSON request/response format
- Centralized error handling middleware

**Data Layer**
- Currently using in-memory storage (MemStorage class) for development
- Designed to transition to PostgreSQL via Drizzle ORM
- Database schema defined in shared/schema.ts for type sharing between client and server

### Database Design

**ORM & Schema**
- Drizzle ORM configured for PostgreSQL dialect
- Type-safe database queries with automatic TypeScript inference
- Drizzle-Zod for automatic validation schema generation from database schema

**Tables**
- `users`: Authentication (id, email, password)
- `quotes`: Quote requests with service-specific fields (serviceType, customer info, project details, status, timestamps)

**Validation Strategy**
- Zod schemas derived from Drizzle table definitions
- Shared validation schemas between client and server (shared/schema.ts)
- Service-specific conditional field validation based on quote type

### External Dependencies

**Database**
- PostgreSQL (via @neondatabase/serverless driver)
- Configured but not yet provisioned (environment variable DATABASE_URL required)
- Migration support via drizzle-kit

**Third-Party UI Libraries**
- Radix UI component primitives (accordion, dialog, dropdown, select, etc.)
- Embla Carousel for image carousels
- Lucide React for icons
- date-fns for date formatting and manipulation (Dutch locale support)
- CMDK for command palette components

**Development Tools**
- Replit-specific plugins for runtime error overlay and dev banner
- ESBuild for production server bundling
- PostCSS with Autoprefixer for CSS processing

**Session Management**
- express-session for server-side session handling
- connect-pg-simple prepared for PostgreSQL session store (when database is provisioned)
- Configurable session secret via environment variable

**Key Integration Points**
- All API requests include credentials for session cookie handling
- Centralized API client (apiRequest) in lib/queryClient.ts
- TanStack Query for automatic request deduplication and caching
- Toast notifications for user feedback on quote submissions