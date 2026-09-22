import { Logo } from '@/shared/ui/logo'
import styles from './header.module.css'
import { MainNavigation } from '@/widgets/main-navigation/main-navigation'
import { GuestActions } from '@/shared/ui/guest-actions'
import { HeaderPanel } from './type'
import { useState } from 'react'
import { SearchInput } from '@/shared/ui/search-input'
import { useAppSelector } from '@/store/hooks'
import { selectMeta } from '@/entities/user/model/usersSelectors'
import { PanelProps } from '@/shared/ui/popover/type'

export const MainHeader = () => {
  const [openPanel, setOpenPanel] = useState<HeaderPanel | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const categories = useAppSelector(selectMeta)?.categories ?? []

  function getPanelProps(name: HeaderPanel): PanelProps {
    return {
      isOpen: openPanel === name,

      isOpenChange: (nextOpen) => {
        setOpenPanel((current) => {
          if (nextOpen) {
            return name
          }

          return current === name ? null : current
        })
      },
    }
  }

  return (
    <header className={`${styles.header} ${styles.header__inner}`}>
      <Logo />
      <MainNavigation categories={categories} panel={getPanelProps('skills')} variant="header" />
      <SearchInput onChange={setSearchValue} value={searchValue} />
      <GuestActions />
    </header>
  )
}
