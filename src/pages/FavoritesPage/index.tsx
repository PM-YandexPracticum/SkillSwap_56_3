import { Footer } from '@/widgets/footer'
import { MainHeader } from '@/widgets/header/ui/header'
import style from './favorites-page.module.css'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectUsersError,
  selectUsersLoading,
} from '@/entities/user/model/usersSelectors'
import { Button } from '@/shared/ui/button'

import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/lib/constants'
import { Loader } from '@/shared/ui/loader'
import { loadUsers } from '@/entities/user/model/usersThunks'
import { FavoritesSection } from '@/widgets/favorites-section'
import { UserPanel } from '@/widgets/user-panel/user-panel'
import { selectLikedUserIds } from '@/entities/user/model/usersSelectors'

export default function FavoritesPage() {
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(selectUsersLoading)
  const error = useAppSelector(selectUsersError)
  const favorites = useAppSelector(selectLikedUserIds);

  const totalCount = favorites.length

  function renderContent() {
    if (isLoading && favorites.length === 0) {
      return (
        <div className={style.message}>
          <Loader size="large" />
        </div>
      )
    }

    if (error && favorites.length === 0) {
      return (
        <div className={style.message}>
          <p role="alert">{error}</p>

          <Button type="button" extraclass={style.action} onClick={() => dispatch(loadUsers())}>
            Попробовать снова
          </Button>
        </div>
      )
    }

    if (totalCount === 0) {
      return (
        <>
          <div className={style.message}>
            <h2>В избранном пока никого нет</h2>

            <p>Нажмите на сердечко в карточке, чтобы сохранить пользователя.</p>

            <Link to={ROUTES.HOME} className={style.action}>
              Найти интересные навыки
            </Link>
          </div>
        </>
      )
    }

    return <FavoritesSection ids={favorites} />
  }

  return (
    <>
      <MainHeader />

      <main className={style.page}>
        <UserPanel />
        {renderContent()}
      </main>

      <Footer />
    </>
  )
}
