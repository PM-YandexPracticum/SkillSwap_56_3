import { FavoriteButton } from '../favorite-button'
import { Icon } from '../icon/Icon'
import { IconsBlockProps } from './type'
import style from './icons-block.module.css'
import { Button } from '../button'

export const IconsBlock = ({
  onFavoriteChange,
  isFavorite,
  onShare,
  onMoreClick,
}: IconsBlockProps) => {
  return (
    <ul className={style.list}>
      <li className={style.item}>
        <FavoriteButton onToggle={onFavoriteChange} isFavorite={isFavorite} />
      </li>
      <li className={style.item}>
        <Button type="button" onClick={onShare} aria-label="Поделиться">
          <Icon name="share" size={24} />
        </Button>
      </li>
      <li className={style.item}>
        <Button type="button" onClick={onMoreClick} aria-label="Показать больше">
          <Icon name="moreSquare" size={24} />
        </Button>
      </li>
    </ul>
  )
}
