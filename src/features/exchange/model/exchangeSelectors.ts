import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

export const selectExchangeState = (state: RootState) => state.exchange
export const selectNewExchanges = (state: RootState) => state.exchange.new
export const selectViewedExchanges = (state: RootState) => state.exchange.viewed

export const selectNewExchangesCount = (state: RootState) =>
  state.exchange.new.length

export const selectHasExchange = createSelector(
  [
    selectNewExchanges,
    selectViewedExchanges,
    (_state: RootState, userId: string) => userId,
  ],
  (newItems, viewedItems, userId) =>
    newItems.some((item) => item.userId === userId) ||
    viewedItems.some((item) => item.userId === userId)
)