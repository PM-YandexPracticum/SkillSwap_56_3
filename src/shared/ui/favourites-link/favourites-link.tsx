import { ROUTES } from '@/shared/lib/constants';
import { Link } from 'react-router-dom';
import { Icon } from '../icon/Icon';
import styles from './favorites-link.module.css'
import { useAppDispatch } from '@/store/hooks';
import { resetFilters } from '@/entities/filter/model/filterSlice';

export const FavouritesLink = () => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(resetFilters())
  }

  return (
    <Link
      className={styles.link}
      to={ROUTES.FAVORITES}
      aria-label="Избранное"
      onClick={handleClick}
    >
      <Icon name='heart' size={24}/>
    </Link>
  );
};