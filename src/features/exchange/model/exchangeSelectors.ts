import type { RootState } from '@/store'

export const selectExchangeState = (state: RootState) => state.exchange
export const selectNewExchanges = (state: RootState) => state.exchange.new
export const selectViewedExchanges = (state: RootState) => state.exchange.viewed
import { hasExchangeId } from './exchangeUtils'

export const selectNewExchangesCount = (state: RootState) =>
  state.exchange.new.length

export const selectHasExchange = (
  _state: RootState,
  userId: string
): boolean => {
  return hasExchangeId(userId)
}