# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a live streaming platform called "ohen_live" with the tagline "Your cheers connect. The rewards get real." The codebase follows a monorepo structure with a Next.js frontend application.

## Architecture

- **Frontend**: Next.js 15.4.5 with React 19 using TypeScript
- **Styling**: Tailwind CSS v4 with custom PostCSS configuration
- **Code Quality**: Biome for linting and formatting (replaces ESLint + Prettier)
- **Font**: Geist font family optimized via next/font

## Development Commands

All development commands should be run from the `frontend/` directory:

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Code formatting and linting (Biome)
npm run check
```

## Code Quality Standards

- **Formatter**: Biome with tab indentation and double quotes for JavaScript
- **Linter**: Biome with recommended rules enabled
- **Import Organization**: Automatic import sorting enabled
- The project uses Biome instead of traditional ESLint/Prettier setup

## File Structure

```
frontend/
├── src/app/          # Next.js App Router structure
│   ├── layout.tsx    # Root layout component
│   ├── page.tsx      # Home page component
│   └── globals.css   # Global styles
├── public/           # Static assets
└── package.json      # Dependencies and scripts
```

## Development Notes

- The project uses Next.js App Router (not Pages Router)
- Development server runs with Turbopack for faster builds
- TypeScript is configured for strict type checking
- All code changes should be formatted with Biome before committing

## Required Quality Checks

**IMPORTANT**: After writing or modifying any frontend code, you MUST run the following commands from the `frontend/` directory to ensure code quality:

1. **Build Check**: `npm run build` - Verify the code compiles without errors
2. **Code Quality Check**: `npm run check` - Run Biome linting and formatting checks

Both commands must complete without errors or warnings before the code is considered ready. If either command reports issues, fix them before proceeding.