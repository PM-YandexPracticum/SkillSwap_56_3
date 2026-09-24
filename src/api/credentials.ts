import type { Credentials } from '@/shared/types'

const BASE_URL = '/db'

export async function fetchCredentialsByEmail(email: string): Promise<Credentials | undefined> {
  const response = await fetch(`${BASE_URL}/credentials.json`)
  if (!response.ok) throw new Error('Failed to fetch credentials')
  const credentials: Credentials[] = await response.json()
  return credentials.find((item) => item.email === email)
}
