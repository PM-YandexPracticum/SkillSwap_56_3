import type { AuthUser, UserCard, Credentials } from '@/shared/types'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

/** Читает текущего авторизованного пользователя из localStorage */
export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_USER)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

/** Сохраняет пользователя и mock-токен в localStorage */
export function saveAuthUser(user: Omit<AuthUser, 'token'>): AuthUser {
  const authUser: AuthUser = { ...user, token: 'mock_token_' + user.id }
  localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser))
  return authUser
}

/** Удаляет пользователя из localStorage (logout) */
export function clearAuthUser(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_USER)
}

/** Читает пользователей, зарегистрированных в этом браузере */
export function getRegisteredUsers(): UserCard[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.REGISTERED_USERS)
    return raw ? (JSON.parse(raw) as UserCard[]) : []
  } catch {
    return []
  }
}

/** Добавляет нового пользователя и его пароль в localStorage */
export function saveRegisteredUser(user: UserCard, password: string): void {
  const users = getRegisteredUsers()
  localStorage.setItem(LOCAL_STORAGE_KEYS.REGISTERED_USERS, JSON.stringify([...users, user]))

  const credentials = getRegisteredCredentials()
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.REGISTERED_CREDENTIALS,
    JSON.stringify([...credentials, { email: user.email, password }]),
  )
}

/** Читает пароли зарегистрированных пользователей */
export function getRegisteredCredentials(): Credentials[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.REGISTERED_CREDENTIALS)
    return raw ? (JSON.parse(raw) as Credentials[]) : []
  } catch {
    return []
  }
}
