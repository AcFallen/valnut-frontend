# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Valnut", a Next.js application for nutrition professionals ("Sistema para profesionales de la nutrición"). It's built with TypeScript, React 19, Next.js 15.5.2, and uses Turbopack for development builds.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Production build**: `npm run build` (also uses Turbopack)
- **Production server**: `npm run start`
- **Linting**: `npm run lint` (uses ESLint)

## Architecture & Key Technologies

### UI Framework
- **Shadcn/ui**: Component library configured with "new-york" style
- **Tailwind CSS v4**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible components (dropdown-menu, label, slot)
- **Lucide React**: Icon library
- **next-themes**: Theme provider for dark/light mode support

### Project Structure
- **App Router**: Uses Next.js 13+ app directory structure with grouped routes
- **TypeScript paths**: `@/*` aliases to root directory
- **Component organization**:
  - `components/ui/` - Shadcn/ui components (Button, Card, Input, Label, DropdownMenu, Avatar, Badge, Select, Table)
  - `components/` - Shared components (ThemeProvider, Navbar, providers)
  - `components/{module}/` - Module-specific components grouped by feature (e.g., `components/tenants/`)
  - `lib/` - Utilities (cn function, api-client with auth interceptors)
  - `hooks/` - Custom React hooks for data fetching (useTenants)
  - `services/` - API service layers (tenant.service.ts)
  - `types/` - TypeScript type definitions

### Component Organization Guidelines
- **Modular Structure**: Components should be organized by feature/module in dedicated folders
- **Naming Convention**: Use descriptive names that include the module context
- **Examples**:
  - Tenant-related components: `components/tenants/create-tenant-dialog.tsx`
  - User-related components: `components/users/user-profile-form.tsx`
  - Dashboard components: `components/dashboard/stats-card.tsx`
- **Shared Components**: Generic reusable components stay in the root `components/` directory
- **UI Components**: Shadcn/ui components remain in `components/ui/`

### Styling & Theme
- **CSS Variables**: Tailwind configured to use CSS variables
- **Dark mode**: System-aware theme switching via next-themes
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Base color**: Slate color palette

### Data Management & State
- **TanStack Query**: Server state management with React Query v5
- **Axios**: HTTP client with request/response interceptors for auth
- **NextAuth.js**: Authentication with JWT strategy and credentials provider

### Current Features
- NextAuth authentication with username/password login
- Dashboard layout with navigation (`/dashboard`)
- Tenant management system (`/tenants`)
- Theme switching (light/dark/system)
- Protected routes with authentication middleware

## Development Notes

- Uses TypeScript with strict mode enabled
- Tailwind merge utility (`cn`) in `lib/utils.ts` for conditional classes
- Theme provider wraps the entire application in `app/layout.tsx`
- Components follow Shadcn/ui patterns and conventions
- Uses `suppressHydrationWarning` on html element for theme handling