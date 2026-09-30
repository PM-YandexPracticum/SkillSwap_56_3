import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ExchangeState } from './types'

const initialState: ExchangeState = {
  new: [],
  viewed: [],
}

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    proposeExchange(state, action: PayloadAction<string>) {
      const userId = action.payload

      const alreadyExists =
        state.new.some((item) => item.userId === userId) ||
        state.viewed.some((item) => item.userId === userId)

      if (alreadyExists) return

      state.new.push({
        userId,
        createdAt: new Date().toISOString(),
      })
    },

    markAsViewed(state, action: PayloadAction<string>) {
      const userId = action.payload
      const index = state.new.findIndex((item) => item.userId === userId)
      if (index === -1) return

      const [item] = state.new.splice(index, 1)
      state.viewed.push(item)
    },

    markAllAsViewed(state) {
      state.viewed.push(...state.new)
      state.new = []
    },

    clearViewed(state) {
      state.viewed = []
    },

    clearAllExchanges(state) {
      state.new = []
      state.viewed = []
    },
  },
})

export const {
  proposeExchange,
  markAsViewed,
  markAllAsViewed,
  clearViewed,
  clearAllExchanges
} = exchangeSlice.actions

export default exchangeSlice.reducer