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

export function saveCredentials(credentials:Credentials[], email: string, password: string): void {
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.REGISTERED_CREDENTIALS,
    JSON.stringify([...credentials, { email: email, password }]),
  )
}

/** Добавляет нового пользователя и его пароль в localStorage */
export function saveRegisteredUser(user: UserCard, password: string): void {
  const users = getRegisteredUsers()
  localStorage.setItem(LOCAL_STORAGE_KEYS.REGISTERED_USERS, JSON.stringify([...users, user]))

  const credentials = getRegisteredCredentials()
  saveCredentials(credentials, user.email, password)
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

/** Обновляет зарегистрированного юзера */
export function updateRegisteredUser(
  userId: string,
  patch: Partial<UserCard>
): UserCard | null {
  const users = getRegisteredUsers()
  const index = users.findIndex((user) => user.id === userId)
  if (index === -1) return null

  const updated: UserCard = { ...users[index], ...patch }
  users[index] = updated
  localStorage.setItem(LOCAL_STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users))
  return updated
}

/** Обновляет логин-пароль зарегистрированного юзера */
export function updateCredentials(
  oldEmail: string,
  newEmail: string,
  newPassword?: string
): void {
  const credentials = getRegisteredCredentials()
  const index = credentials.findIndex((c) => c.email === oldEmail)

  if (index === -1) {
    const newEntry: Credentials = {
      email: newEmail,
      password: newPassword ?? '',
    }
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.REGISTERED_CREDENTIALS,
      JSON.stringify([...credentials, newEntry])
    )
    return
  }

  const next = credentials.map((c) =>
    c.email === oldEmail
      ? {
          email: newEmail,
          password: newPassword ?? c.password,
        }
      : c
  )
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.REGISTERED_CREDENTIALS,
    JSON.stringify(next)
  )
}
