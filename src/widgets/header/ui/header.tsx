import { Logo } from '@/shared/ui/logo'
import styles from './header.module.css'
import { HeaderNavigation } from '@/widgets/HeaderNavigation/HeaderNavigation'
import { GuestActions } from '@/shared/ui/guest-actions'
import { HeaderPanel, PanelProps } from './type'
import { useState } from 'react'
import { SearchInput } from '@/shared/ui/search-input'

export const MainHeader = () => {
  const [openPanel, setOpenPanel] = useState<HeaderPanel | null>(null)
  const [searchValue, setSearchValue] = useState('')

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
    <header className={`${styles.header} && ${styles.header__inner}`}>
      <Logo />
      <HeaderNavigation {...getPanelProps('skills')} />
      <SearchInput onChange={setSearchValue} value={searchValue} />
      <GuestActions />
    </header>
  )
}
