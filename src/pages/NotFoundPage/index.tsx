import { RouteActions } from '@/shared/ui/route-actions/route-actions'
import style from './not-found-page.module.css'
import { AuthInfoBlock } from '@/shared/ui/auth-info-block'
import { Icon } from '@/shared/ui/icon'

export default function NotFoundPage() {
  return (
    <main className={style.page}>
      <AuthInfoBlock
        image={<Icon name="page404" width={460} height={304} />}
        title="Страница не найдена"
        description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже"
      />

      <RouteActions />
    </main>
  )
}
