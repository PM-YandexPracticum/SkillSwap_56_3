import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/entities/user/model/usersSlice'
import filterReducer from '@/entities/filter/model/filterSlice'
// Импортируй свои slice'ы здесь по мере их создания:
// import skillsReducer from '@/entities/skill/model/skillsSlice'
// import authReducer from '@/features/auth/model/authSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    filter: filterReducer,
    // skills: skillsReducer,
    // auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
