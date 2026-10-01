import { describe, it, expect } from 'vitest'
import authReducer, {
  setUser,
  updateUser,
  logout,
  updateDraft,
  resetDraft,
  setError,
  setLoginErrors,
  clearLoginErrors,
  setDraftErrors,
  clearDraftErrors,
} from './authSlice'
import { login, register, getUser, logoutUser } from './authThunks'
import type { AuthState } from './types'
import type { AuthUser } from '@/shared/types'

const user: AuthUser = {
  id: 'u001',
  name: 'Анна',
  email: 'anna@example.com',
  token: 'mock_token_u001',
}

const getInitialState = (): AuthState => authReducer(undefined, { type: 'unknown' })

describe('authSlice', () => {
  it('в начальном состоянии пользователя нет', () => {
    const state = getInitialState()

    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.draft.email).toBe('')
  })

  it('setUser записывает пользователя и включает авторизацию', () => {
    const result = authReducer(getInitialState(), setUser(user))

    expect(result.user).toEqual(user)
    expect(result.isAuthenticated).toBe(true)
  })

  it('updateUser меняет данные пользователя', () => {
    const state = { ...getInitialState(), user, isAuthenticated: true }

    const result = authReducer(state, updateUser({ ...user, name: 'Анна Смирнова' }))

    expect(result.user?.name).toBe('Анна Смирнова')
  })

  it('logout очищает пользователя', () => {
    const state = { ...getInitialState(), user, isAuthenticated: true }

    const result = authReducer(state, logout())

    expect(result.user).toBeNull()
    expect(result.isAuthenticated).toBe(false)
  })

  it('updateDraft обновляет только переданные поля', () => {
    const state = authReducer(getInitialState(), updateDraft({ email: 'test@example.com' }))

    const result = authReducer(state, updateDraft({ name: 'Мария' }))

    expect(result.draft.email).toBe('test@example.com')
    expect(result.draft.name).toBe('Мария')
  })

  it('updateDraft убирает ошибку изменённого поля', () => {
    const state = {
      ...getInitialState(),
      draftErrors: { email: 'Некорректный email', name: 'Введите имя' },
    }

    const result = authReducer(state, updateDraft({ email: 'ok@example.com' }))

    expect(result.draftErrors.email).toBeUndefined()
    expect(result.draftErrors.name).toBe('Введите имя')
  })

  it('resetDraft очищает черновик и его ошибки', () => {
    const state = {
      ...getInitialState(),
      draft: { ...getInitialState().draft, email: 'test@example.com', name: 'Мария' },
      draftErrors: { name: 'Введите имя' },
    }

    const result = authReducer(state, resetDraft())

    expect(result.draft.email).toBe('')
    expect(result.draft.name).toBe('')
    expect(result.draftErrors).toEqual({})
  })

  it('setError и setLoginErrors записывают ошибки, clear очищает', () => {
    const withError = authReducer(getInitialState(), setError('Что-то пошло не так'))
    expect(withError.error).toBe('Что-то пошло не так')

    const withLoginErrors = authReducer(
      getInitialState(),
      setLoginErrors({ form: 'Неверный логин или пароль' }),
    )
    expect(withLoginErrors.loginErrors.form).toBe('Неверный логин или пароль')

    const cleared = authReducer(withLoginErrors, clearLoginErrors())
    expect(cleared.loginErrors).toEqual({})
  })

  it('setDraftErrors и clearDraftErrors работают с ошибками черновика', () => {
    const withErrors = authReducer(getInitialState(), setDraftErrors({ email: 'Введите email' }))
    expect(withErrors.draftErrors.email).toBe('Введите email')

    const cleared = authReducer(withErrors, clearDraftErrors())
    expect(cleared.draftErrors).toEqual({})
  })

  it('login.pending включает загрузку и чистит ошибки', () => {
    const state = { ...getInitialState(), loginErrors: { form: 'Старая ошибка' } }

    const result = authReducer(state, login.pending('', { email: '', password: '' }))

    expect(result.isLoading).toBe(true)
    expect(result.loginErrors).toEqual({})
  })

  it('login.fulfilled сохраняет пользователя', () => {
    const state = { ...getInitialState(), isLoading: true }

    const result = authReducer(state, login.fulfilled(user, '', { email: '', password: '' }))

    expect(result.isLoading).toBe(false)
    expect(result.user).toEqual(user)
    expect(result.isAuthenticated).toBe(true)
  })

  it('login.rejected записывает ошибки полей', () => {
    const state = { ...getInitialState(), isLoading: true }

    const action = login.rejected(
      null,
      '',
      { email: '', password: '' },
      {
        form: 'Неверный логин или пароль',
      },
    )

    const result = authReducer(state, action)

    expect(result.isLoading).toBe(false)
    expect(result.loginErrors.form).toBe('Неверный логин или пароль')
  })

  it('register.fulfilled авторизует и очищает черновик', () => {
    const state = {
      ...getInitialState(),
      draft: { ...getInitialState().draft, email: 'test@example.com' },
      isLoading: true,
    }

    const result = authReducer(state, register.fulfilled(user, '', getInitialState().draft))

    expect(result.user).toEqual(user)
    expect(result.isAuthenticated).toBe(true)
    expect(result.draft.email).toBe('')
  })

  it('getUser.fulfilled подставляет пользователя из localStorage', () => {
    const withUser = authReducer(getInitialState(), getUser.fulfilled(user, ''))
    expect(withUser.isAuthenticated).toBe(true)

    const withoutUser = authReducer(getInitialState(), getUser.fulfilled(null, ''))
    expect(withoutUser.isAuthenticated).toBe(false)
  })

  it('logoutUser.fulfilled сбрасывает пользователя и черновик', () => {
    const state = {
      ...getInitialState(),
      user,
      isAuthenticated: true,
      draft: { ...getInitialState().draft, email: 'test@example.com' },
    }

    const result = authReducer(state, logoutUser.fulfilled(undefined, ''))

    expect(result.user).toBeNull()
    expect(result.isAuthenticated).toBe(false)
    expect(result.draft.email).toBe('')
  })
})
