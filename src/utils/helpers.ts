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
