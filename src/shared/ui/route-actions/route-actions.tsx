import { Link } from 'react-router-dom'
import { Button } from '../button'
import style from './route-actions.module.css'
import { ROUTES } from '@/shared/lib/constants'

export const RouteActions = () => {
  return (
    <div className={style.actions}>
      <Button type="button" extraClass={`${style.action} ${style.report}`}>
        Сообщить об ошибке
      </Button>

      <Link to={ROUTES.HOME} className={`${style.action} ${style.home}`}>
        На главную
      </Link>
    </div>
  )
}
