import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/entities/user/model/usersSlice'
import skillsReducer from '@/entities/skill/model/skillsSlice'
import filterReducer from '@/entities/filter/model/filterSlice'
// Импортируй свои slice'ы здесь по мере их создания:
// import authReducer from '@/features/auth/model/authSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    skills: skillsReducer,
    filter: filterReducer,
    // auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
