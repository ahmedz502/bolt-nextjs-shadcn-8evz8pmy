import { headers } from 'next/headers'
import { SITE_URL, NODE_ENV } from './env'

export function getCanonicalUrl(path: string): string {
  const headersList = headers()
  const host = headersList.get('host') || new URL(SITE_URL).host
  const protocol = NODE_ENV === 'production' ? 'https' : 'http'
  return `${protocol}://${host}${path}`
}

