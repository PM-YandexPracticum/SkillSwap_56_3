import { describe, it, expect } from 'vitest'
import usersReducer, { toggleLike, clearCurrentUser } from './usersSlice'
import { loadUsers, loadUserById } from './usersThunks'
import type { UsersState } from './types'
import type { UserCard, UsersResponse } from '@/shared/types'

const makeUser = (id: string, likesCount = 10): UserCard => ({
  id,
  name: `Пользователь ${id}`,
  email: `${id}@example.com`,
  birthDate: '1995-01-01',
  gender: 'female',
  city: 'moscow',
  likesCount,
  aboutMe: '',
  createdAt: '2024-01-01T00:00:00Z',
  teachSkill: { id: 's1', name: 'Навык', category: 'Дом и уют', subcategory: 'Ремонт' },
  learnSkills: [],
  avatar: '',
})

const getInitialState = (): UsersState => usersReducer(undefined, { type: 'unknown' })

describe('usersSlice', () => {
  it('начальное состояние пустое', () => {
    const state = getInitialState()

    expect(state.users).toEqual([])
    expect(state.likedUserIds).toEqual([])
    expect(state.isLoading).toBe(false)
  })

  it('toggleLike добавляет лайк и увеличивает счётчик', () => {
    const state = { ...getInitialState(), users: [makeUser('u1', 10)] }

    const result = usersReducer(state, toggleLike('u1'))

    expect(result.likedUserIds).toEqual(['u1'])
    expect(result.users[0].likesCount).toBe(11)
  })

  it('toggleLike убирает лайк и уменьшает счётчик', () => {
    const state = {
      ...getInitialState(),
      users: [makeUser('u1', 11)],
      likedUserIds: ['u1'],
    }

    const result = usersReducer(state, toggleLike('u1'))

    expect(result.likedUserIds).toEqual([])
    expect(result.users[0].likesCount).toBe(10)
  })

  it('toggleLike ничего не делает для несуществующего пользователя', () => {
    const state = { ...getInitialState(), users: [makeUser('u1')] }

    const result = usersReducer(state, toggleLike('нет-такого'))

    expect(result.likedUserIds).toEqual([])
  })

  it('clearCurrentUser сбрасывает текущего пользователя', () => {
    const state = {
      ...getInitialState(),
      currentUser: makeUser('u1'),
      errorCurrent: 'Ошибка',
      isLoadingCurrent: true,
    }

    const result = usersReducer(state, clearCurrentUser())

    expect(result.currentUser).toBeNull()
    expect(result.errorCurrent).toBeNull()
    expect(result.isLoadingCurrent).toBe(false)
  })

  it('loadUsers.pending включает загрузку', () => {
    const result = usersReducer(getInitialState(), loadUsers.pending('', undefined))

    expect(result.isLoading).toBe(true)
    expect(result.error).toBeNull()
  })

  it('loadUsers.fulfilled записывает пользователей и meta', () => {
    const payload = {
      meta: { wantFilter: [], genders: [], cities: [], categories: [] },
      data: [makeUser('u1')],
    } as UsersResponse

    const result = usersReducer(
      { ...getInitialState(), isLoading: true },
      loadUsers.fulfilled(payload, '', undefined),
    )

    expect(result.isLoading).toBe(false)
    expect(result.users).toHaveLength(1)
    expect(result.meta).not.toBeNull()
  })

  it('loadUsers.rejected записывает ошибку и сохраняет старые данные', () => {
    const state = { ...getInitialState(), users: [makeUser('u1')], isLoading: true }

    const result = usersReducer(
      state,
      loadUsers.rejected(null, '', undefined, 'Не удалось загрузить'),
    )

    expect(result.isLoading).toBe(false)
    expect(result.error).toBe('Не удалось загрузить')
    expect(result.users).toHaveLength(1)
  })

  it('loadUserById.fulfilled записывает текущего пользователя', () => {
    const user = makeUser('u1')

    const result = usersReducer(
      { ...getInitialState(), isLoadingCurrent: true },
      loadUserById.fulfilled(user, '', 'u1'),
    )

    expect(result.isLoadingCurrent).toBe(false)
    expect(result.currentUser?.id).toBe('u1')
  })

  it('loadUserById.rejected записывает ошибку', () => {
    const result = usersReducer(
      { ...getInitialState(), isLoadingCurrent: true },
      loadUserById.rejected(null, '', 'u1', 'Пользователь не найден'),
    )

    expect(result.isLoadingCurrent).toBe(false)
    expect(result.errorCurrent).toBe('Пользователь не найден')
  })
})
