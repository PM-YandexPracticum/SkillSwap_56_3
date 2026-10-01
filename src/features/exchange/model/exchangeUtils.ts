import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

const STORAGE_KEY = LOCAL_STORAGE_KEYS.REQUESTS ?? 'exchange_ids'

/**
 * Читает массив id, с которыми есть обмен.
 */
export function getExchangeIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

/**
 * Добавляет id в список обменов (если его ещё нет).
 */
export function addExchangeId(userId: string): void {
  const ids = getExchangeIds()
  if (ids.includes(userId)) return

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids, userId]))
}

/**
 * Удаляет id из списка обменов.
 */
export function removeExchangeId(userId: string): void {
  const ids = getExchangeIds()
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(ids.filter((id) => id !== userId))
  )
}

/**
 * Полностью очищает список обменов.
 */
export function clearExchangeIds(): void {
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Проверяет, есть ли обмен с конкретным юзером.
 */
export function hasExchangeId(userId: string): boolean {
  return getExchangeIds().includes(userId)
}