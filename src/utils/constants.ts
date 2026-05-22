export const APP_NAME = 'Gift Box'

// ── Storage Keys ──────────────────────────────────────────────
/** localStorage key for the JWT auth token */
export const TOKEN_STORAGE_KEY = 'token'

/** localStorage key for the selected UI language */
export const LANG_STORAGE_KEY = 'gb_lang'

// ── API Config ────────────────────────────────────────────────
/** Default request timeout in milliseconds */
export const API_TIMEOUT = 10_000

// ── Routes ────────────────────────────────────────────────────
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/my-draws',
  PROFILE: '/profile',
  MY_DRAWS: '/my-draws',
} as const
