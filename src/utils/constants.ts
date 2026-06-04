export const APP_NAME = 'Gift Box'

// ── Image URLs ────────────────────────────────────
/** Base URL for user images from API */
export const IMG_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/` : 'http://localhost:8000/'

/** Fallback image when user has no profile picture */
export const NO_USER_IMAGE = '/assets/images/provider/no_user.png'

// ── Storage Keys ──────────────────────────────────────────────
/** localStorage key for the JWT auth token */
export const TOKEN_STORAGE_KEY = 'token'

/** localStorage key for the selected UI language */
export const LANG_STORAGE_KEY = 'gb_lang'

/** localStorage key for the logged-in user profile */
export const USER_STORAGE_KEY = 'gb_user'

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

// ── Navigation ────────────────────────────────────────────────
export interface NavItem {
  href: string
  label: string
}

export const PUBLIC_LINKS: NavItem[] = [
  { href: '/about', label: 'About Us' },
  { href: '/#how-it-works', label: 'How it Works' },
  { href: '/contact', label: 'Contact' },
]

export const AUTH_LINKS: NavItem[] = [
  { href: '/about', label: 'About Us' },
  { href: ROUTES.MY_DRAWS, label: 'My Draws' },
  { href: '/contact', label: 'Contact' },
]

export const DROPDOWN_LINKS: NavItem[] = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
]
