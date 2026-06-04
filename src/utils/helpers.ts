/**
 * Formats a number as a currency string.
 * @example formatCurrency(2500) // "2,500 KES"
 */
export function formatCurrency(amount: number, currency = 'KES'): string {
  return `${amount.toLocaleString()} ${currency}`
}

/**
 * Formats a date string or Date object into a readable short date.
 * @example formatDate('2024-01-15') // "Jan 15, 2024"
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Truncates a string to `max` characters, appending an ellipsis if needed.
 * @example truncate('Hello World', 5) // "Hello…"
 */
export function truncate(str: string, max: number): string {
  return str.length > max ? `${str.slice(0, max)}…` : str
}

/**
 * Returns the proper image URL for a user profile image.
 * If image URL starts with https, returns it as-is.
 * Otherwise, prepends the API base URL.
 * Falls back to no_user.png if no image provided.
 * @example getImageUrl('profile.jpg') // "http://localhost:8000/profile.jpg"
 * @example getImageUrl('https://example.com/pic.jpg') // "https://example.com/pic.jpg"
 * @example getImageUrl('') // "/assets/images/provider/no_user.png"
 */
export function getImageUrl(image?: string): string {
  // Use direct imports to avoid require in client code
  // IMG_URL and NO_USER_IMAGE are from src/utils/constants
  // fallback values if constants aren't available
  const IMG_URL = typeof window !== 'undefined' 
    ? process.env.BASE_URL 
      ? `${process.env.BASE_URL}`
      : 'http://localhost:8000/'
    : 'http://localhost:8000/'
  const NO_USER_IMAGE = '/assets/images/provider/no_user.png'
  
  if (!image) return NO_USER_IMAGE
  
  // If image starts with https, return as-is
  if (image.startsWith('https')) {
    return image
  }
  
  // Otherwise, prepend the API base URL
  return IMG_URL + image
}
