import { RouteActions } from '@/shared/ui/route-actions/route-actions'
import style from './not-found-page.module.css'
import { InfoBlock } from '@/shared/ui/info-block'
import { Icon } from '@/shared/ui/icon'

export default function NotFoundPage() {
  return (
    <main className={style.page}>
      <InfoBlock
        image={<Icon name="page404" width={340} height={275} />}
        title="Страница не найдена"
        description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже"
      />

      <RouteActions />
    </main>
  )
}
