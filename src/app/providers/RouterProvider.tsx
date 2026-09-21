import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ROUTES } from '@/shared/lib/constants'
import { MainHeader } from '@/widgets/header/ui/header'

// Lazy-загрузка страниц — каждая страница грузится только при переходе на неё
const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const SkillPage = lazy(() => import('@/pages/SkillPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'))
const CreateSkillPage = lazy(() => import('@/pages/CreateSkillPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const TestAndreyPage = lazy(() => import('@/pages/TestAndreyPage'))

const ROUTES_WITHOUT_HEADER: string[] = [ROUTES.TEST_ANDREY]

function Header() {
  const { pathname } = useLocation()

  if (ROUTES_WITHOUT_HEADER.includes(pathname)) {
    return null
  }

  return <MainHeader />
}

export function AppRouter() {
  return (
    <BrowserRouter>
    <Header/>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path={ROUTES.HOME} element={<CatalogPage />} />
          <Route path={ROUTES.SKILL} element={<SkillPage />} />
          <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<LoginPage />} />

          {/* Защищённые маршруты — добавь PrivateRoute обёртку */}
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.CREATE} element={<CreateSkillPage />} />

		  {/* Для тестирования */}
          <Route path={ROUTES.TEST_ANDREY} element={<TestAndreyPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
