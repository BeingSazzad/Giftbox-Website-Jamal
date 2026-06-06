
export function formatCurrency(amount: number, currency = 'KES'): string {
  return `${amount.toLocaleString()} ${currency}`
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function truncate(str: string, max: number): string {
  return str.length > max ? `${str.slice(0, max)}…` : str
}

export function getImageUrl(image?: string): string {
  const IMG_URL = typeof window !== 'undefined' 
    ? process.env.BASE_URL 
      ? `${process.env.BASE_URL}`
      : 'http://localhost:8000/'
    : 'http://localhost:8000/'
  const NO_USER_IMAGE = '/default.png'
  
  if (!image) return NO_USER_IMAGE
  
  if (image.startsWith('https')) {
    return image
  }
  
  return IMG_URL + image
}
