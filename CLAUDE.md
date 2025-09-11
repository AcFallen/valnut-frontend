# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Valnut", a Next.js application for nutrition professionals ("Sistema para profesionales de la nutrición"). It's built with TypeScript, React 19, Next.js 15.5.2, and uses Turbopack for development builds.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Production build**: `npm run build` (also uses Turbopack)
- **Production server**: `npm run start`
- **Linting**: `npm run lint` (ESLint configured with Next.js core-web-vitals, but currently disabled with `ignores: ["**/*"]`)
- **Type checking**: No separate typecheck command - Next.js handles TypeScript compilation

## Architecture & Key Technologies

### UI Framework
- **Shadcn/ui**: Component library configured with "new-york" style and slate color palette
- **Tailwind CSS v4**: Utility-first CSS framework with CSS variables
- **Radix UI**: Unstyled, accessible components (extensive set including dialog, select, popover, etc.)
- **Lucide React**: Icon library
- **next-themes**: Theme provider for dark/light/system mode support
- **Framer Motion**: Animation library for page transitions and micro-interactions
- **FullCalendar**: Calendar component library with dayGrid, timeGrid, and list views for appointment scheduling

### Authentication & Authorization
- **NextAuth.js**: JWT-based authentication with credentials provider
- **Role-based access control**: Three user types with different permissions:
  - `system_admin`: Access to tenant management (`/tenants`)
  - `tenant_owner`: Access to settings (`/settings`)
  - `tenant_owner` & `tenant_user`: Access to patients (`/patients`) and appointments (`/appointments`)
- **Protected routes**: Middleware enforces authentication and authorization

### Project Structure
- **App Router**: Uses Next.js 13+ app directory with grouped routes `(dashboard)`
- **TypeScript paths**: `@/*` aliases configured for all major directories
- **Modular component organization**:
  - `components/ui/` - Shadcn/ui base components
  - `components/{module}/` - Feature-specific components (tenants, patients, appointments, settings)
  - `components/` - Shared components (navbar, providers, forms)
- **Service layer architecture**:
  - `services/` - API service classes for each domain
  - `hooks/` - Custom React Query hooks for data fetching
  - `types/` - TypeScript interfaces and type definitions
  - `lib/` - Utilities and configurations

### Data Management & State
- **TanStack Query v5**: Server state management with React Query
- **Axios**: HTTP client with automatic token injection and 401 handling
- **API client**: Centralized in `lib/api-client.ts` with auth interceptors
- **Form handling**: React Hook Form with Zod validation
- **Toast notifications**: react-hot-toast positioned at top-center
- **Date handling**: date-fns for date manipulation and formatting

### Current Application Modules
- **Dashboard**: Main navigation hub with animated route transitions
- **Tenant Management**: Multi-tenant system with ownership and membership assignment
- **Patient Management**: Patient records with CRUD operations and detailed sidebar
- **Appointment Scheduling**: Full-featured calendar interface with FullCalendar integration, appointment management with patient-nutritionist pairing
- **User Settings**: User management within tenant context
- **Theme System**: System-aware theme switching with persistent preferences

### Key Patterns
- **Provider hierarchy**: QueryProvider > SessionProvider > ThemeProvider structure
- **Route protection**: Middleware-based with role checking (`middleware.ts`)
- **Component composition**: Dialog-based modals for CRUD operations
- **State management**: Server state via React Query, UI state via React hooks
- **Error handling**: Centralized in API client with automatic login redirect
- **Animation**: Framer Motion for smooth page transitions in dashboard layout

## Development Notes

- API base URL configurable via `NEXT_PUBLIC_API_BASE_URL` environment variable
- NextAuth secret required via `NEXTAUTH_SECRET` environment variable
- TypeScript strict mode enabled with comprehensive type coverage
- Shadcn/ui components follow consistent patterns for customization
- Form validation uses Zod schemas with React Hook Form
- Table components include pagination, filtering, and search functionality
- Uses react-hot-toast for consistent notification styling

## Important Implementation Patterns

### Route Protection Implementation
- Middleware (`middleware.ts`) handles role-based access control:
  - `system_admin`: `/tenants` access only
  - `tenant_owner`: `/settings` access + patient/appointment management
  - `tenant_user`: Patient and appointment management only
  - All authenticated users: `/dashboard` access
- NextAuth JWT tokens carry `userType` for authorization decisions

### API Integration Architecture
- Centralized API client in `lib/api-client.ts` with automatic JWT token injection
- Service classes in `services/` directory for each domain (tenants, patients, appointments, users)
- Custom React Query hooks in `hooks/` for data fetching with built-in error handling
- 401 responses trigger automatic redirect to login page

### Component Organization Standards
- Feature-specific components organized by module: `components/{module}/`
- Shared UI components in `components/ui/` (Shadcn/ui base components)
- Dialog-based modals for all CRUD operations following consistent patterns
- Form components use React Hook Form + Zod validation throughout
- Domain-specific utilities in `lib/utils.ts` include patient age categorization and avatar selection logic