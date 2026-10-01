import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { ROUTES } from '@/shared/lib/constants'
import { useAppDispatch } from '@/store/hooks'
import { loadUsers } from '@/entities/user/model/usersThunks'
import { ProtectedRoute } from './ProtectedRoute'
import { getUser } from '@/features/auth/model/authThunks'

// Lazy-загрузка страниц — каждая страница грузится только при переходе на неё
const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const SkillPage = lazy(() => import('@/pages/SkillPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'))
const CreateSkillPage = lazy(() => import('@/pages/CreateSkillPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export function AppRouter() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadUsers())
    dispatch(getUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path={ROUTES.HOME} element={<CatalogPage />} />
          <Route path={ROUTES.SKILL} element={<SkillPage />} />
          <Route element={<ProtectedRoute onlyUnAuth/>}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.CREATE} element={<CreateSkillPage />} />
            <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
