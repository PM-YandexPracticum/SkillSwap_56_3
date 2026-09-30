import { Logo } from '@/shared/ui/logo'
import styles from './header.module.css'
import { MainNavigation } from '@/widgets/main-navigation/main-navigation'
import { GuestActions } from '@/shared/ui/guest-actions'
import { HeaderPanel } from './type'
import { useState, useEffect } from 'react'
import { SearchInput } from '@/shared/ui/search-input'
import { useAppSelector } from '@/store/hooks'
import { selectMeta } from '@/entities/user/model/usersSelectors'
import { PanelProps } from '@/shared/ui/popover/type'
import { useAppDispatch } from '@/store/hooks'
import { setSearchQuery } from '@/entities/filter/model/filterSlice'
import { selectSearchQuery } from '@/entities/filter/model/filterSelectors'
import { useNavigate } from 'react-router-dom'
import { FAKE_DELAY } from '@/shared/lib/constants'

export const MainHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [openPanel, setOpenPanel] = useState<HeaderPanel | null>(null)
  const searchValue = useAppSelector(selectSearchQuery)
  const categories = useAppSelector(selectMeta)?.categories ?? []

  useEffect(() => {
    if (!searchValue.trim()) return

    const timer = setTimeout(() => {
      navigate('/')
    }, FAKE_DELAY)

    return () => clearTimeout(timer)
  }, [searchValue, navigate])

  function getPanelProps(name: HeaderPanel): PanelProps {
    return {
      isOpen: openPanel === name,
      isOpenChange: (nextOpen) => {
        setOpenPanel((current) => {
          if (nextOpen) return name
          return current === name ? null : current
        })
      },
    }
  }

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value))
  }

  return (
    <header className={`${styles.header} ${styles.header__inner}`}>
      <Logo />
      <MainNavigation categories={categories} panel={getPanelProps('skills')} variant="header" />
      <SearchInput onChange={handleSearchChange} value={searchValue} />
      <GuestActions />
    </header>
  )
}
