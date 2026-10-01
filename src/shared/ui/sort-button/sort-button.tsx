import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Button } from '@/shared/ui/button'
import { toggleSortOrder } from '@/entities/filter/model/filterSlice'
import { selectSortOrder } from '@/entities/filter/model/filterSelectors'
import styles from './sort-button.module.css'
import { Icon } from '../icon/Icon'

export const SortButton = () => {
  const dispatch = useAppDispatch();
  const sortOrder = useAppSelector(selectSortOrder);

  const label = sortOrder === 'newest' ? 'Сначала новые' : 'Сначала старые';

  const handleClick = () => {
    dispatch(toggleSortOrder())
  }

  return (
    <Button onClick={handleClick} extraclass={`${styles.sortToggle}`.trim()}>
      <Icon name='sort'/>
      {label}
    </Button>
  )
}