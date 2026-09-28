import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectIsAuthenticated } from '@/features/auth/model/authSelectors'
import { ROUTES } from '@/shared/lib/constants'
import { useAppSelector } from '@/store/hooks'

type ProtectedRouteProps = {
  onlyUnAuth?: boolean
}

export const ProtectedRoute = ({ onlyUnAuth = false }: ProtectedRouteProps) => {
  const isAuth = useAppSelector(selectIsAuthenticated)
  const location = useLocation()

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from
    return <Navigate to={from ?? ROUTES.HOME} replace />
  }

  return <Outlet />
}
