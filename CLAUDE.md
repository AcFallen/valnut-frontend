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
- **App Router**: Uses Next.js 13+ app directory structure
- **TypeScript paths**: `@/*` aliases to root directory
- **Component organization**:
  - `components/ui/` - Shadcn/ui components (Button, Card, Input, Label, DropdownMenu)
  - `components/` - Custom components (LoginForm, ThemeProvider, ToggleMode)
  - `lib/` - Utilities (cn function for class merging with clsx + tailwind-merge)

### Styling & Theme
- **CSS Variables**: Tailwind configured to use CSS variables
- **Dark mode**: System-aware theme switching via next-themes
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Base color**: Slate color palette

### Current Features
- Login page with form (`/login`)
- Theme switching (light/dark/system)
- GitHub OAuth login UI (non-functional)

## Development Notes

- Uses TypeScript with strict mode enabled
- Tailwind merge utility (`cn`) in `lib/utils.ts` for conditional classes
- Theme provider wraps the entire application in `app/layout.tsx`
- Components follow Shadcn/ui patterns and conventions
- Uses `suppressHydrationWarning` on html element for theme handling