import { RouteActions } from '@/shared/ui/route-actions/route-actions'
import style from './not-found-page.module.css'
import { InfoBlock } from '@/shared/ui/info-block'
import { Icon } from '@/shared/ui/icon'
import { MainHeader } from '@/widgets/header/ui'
import { Footer } from '@/widgets/footer'

export default function NotFoundPage() {

  const main = () => {
    return (
      <main className={style.page}>
        <InfoBlock
          image={<Icon name="page404" width={460} height={304} />}
          title="Страница не найдена"
          description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже"
        />

        <RouteActions />
      </main>
    )
  }

  return (
    <>
      <MainHeader />
      {main()}
      <Footer />
    </>
  )
}
