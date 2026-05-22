/**
 * Centralised environment configuration.
 *
 * All `process.env` access in the app should go through this file.
 * This makes it easy to:
 *  - See all env variables at a glance
 *  - Catch missing variables at startup (not at runtime)
 *  - Swap values for testing or staging without hunting through code
 *
 * ⚠️  Only NEXT_PUBLIC_* variables are available in the browser bundle.
 *     Server-only variables (no NEXT_PUBLIC_ prefix) are only available
 *     in Server Components, Route Handlers, and middleware.
 */

// ── Public (client-safe) ──────────────────────────────────────────────────────

/** Base URL of the backend API. Set in .env.local as NEXT_PUBLIC_API_URL */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

/** App name shown in titles and emails */
export const APP_DISPLAY_NAME =
  process.env.NEXT_PUBLIC_APP_NAME ?? 'Gift Box'

// ── Server-only (never exposed to the browser) ───────────────────────────────
// Add server-only secrets here with process.env.SECRET_KEY etc.
// They will be undefined on the client — intentionally.
