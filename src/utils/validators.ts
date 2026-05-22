/**
 * Returns true if the given string is a valid email address format.
 * Use this in forms and API payload validation instead of inline regex.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Returns true if the phone number has 9-15 digits (with optional +/spaces/dashes).
 * Use this when validating the phone field on register or profile edit.
 */
export function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s-]{9,15}$/.test(phone)
}

/**
 * Returns true if the password is at least 8 characters long.
 * Extend this function if stricter rules are needed (symbols, numbers, etc.).
 */
export function isStrongPassword(password: string): boolean {
  return password.length >= 8
}
