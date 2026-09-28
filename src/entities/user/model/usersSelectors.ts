import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import { UserCard } from '@/shared/types'

export const selectUsersState = (state: RootState) => state.users
export const selectMeta = (state: RootState) => state.users.meta
export const selectUsers = (state: RootState) => state.users.users
export const selectUsersLoading = (state: RootState) => state.users.isLoading
export const selectUsersError = (state: RootState) => state.users.error
export const selectLikedUserIds = (state: RootState) => state.users.likedUserIds

export const selectCurrentUser = (state: RootState) => state.users.currentUser
export const selectCurrentUserLoading = (state: RootState) => state.users.isLoadingCurrent
export const selectCurrentUserError = (state: RootState) => state.users.errorCurrent

export const selectPopular = createSelector([selectUsers], (users) =>
  [...users].sort((a, b) => b.likesCount - a.likesCount).slice(0, 9),
)

export const selectNew = createSelector([selectUsers], (users) =>
  [...users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 9),
)

export const selectUsersByIds = createSelector(
  [selectUsers, (_state: RootState, ids: string[]) => ids],
  (users, ids) => {
    const map = new Map(users.map((u) => [u.id, u]))
    return ids.map((id) => map.get(id)).filter(Boolean) as UserCard[]
  },
)

export const selectSimilarUsers = createSelector(
  [
    selectUsers,
    (_state: RootState, subcategory: string) => subcategory,
    (_state: RootState, _subcategory: string, excludeAuthorId: string) => excludeAuthorId,
  ],
  (users, subcategory, excludeAuthorId) =>
    users.filter(
      (user) => user.teachSkill.subcategory === subcategory && user.id !== excludeAuthorId,
    ),
)

export const selectUserById = (state: RootState, id: string) =>
  state.users.users.find((user) => user.id === id) ?? null
