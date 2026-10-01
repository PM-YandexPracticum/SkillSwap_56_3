import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

const STORAGE_KEY = LOCAL_STORAGE_KEYS.FAVORITES

/**
 * Читает массив id, с которыми есть лайки
 */
export function getFavoritesIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

/**
 * Добавляет id в список лайков
 */
export function addFavoriteId(userId: string): void {
  const ids = getFavoritesIds()
  if (ids.includes(userId)) return

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids, userId]))
}

/**
 * Удаляет id из списка лайков
 */
export function removeFavoriteId(userId: string): void {
  const ids = getFavoritesIds()
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(ids.filter((id) => id !== userId))
  )
}

/**
 * Полностью очищает список лайков
 */
export function clearFavoriteIds(): void {
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Проверяет, есть ли лайк на конкретном юзере
 */
export function hasFavoriteId(userId: string): boolean {
  return getFavoritesIds().includes(userId)
}