import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/entities/user/model/usersSlice'
import skillsReducer from '@/entities/skill/model/skillsSlice'
import filterReducer from '@/entities/filter/model/filterSlice'
import authReducer from '@/features/auth/model/authSlice'
import exchangeReducer from '@/features/exchange/model/exchangeSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    skills: skillsReducer,
    filter: filterReducer,
    auth: authReducer,
    exchange: exchangeReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
