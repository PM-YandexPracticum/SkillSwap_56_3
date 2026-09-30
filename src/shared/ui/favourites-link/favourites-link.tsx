import { ROUTES } from '@/shared/lib/constants';
import { Link } from 'react-router-dom';
import { Icon } from '../icon/Icon';
import styles from './favorites-link.module.css'

export const FavouritesLink = () => {
  return (
    <Link
      className={styles.link}
      to={ROUTES.FAVORITES}
      aria-label="Избранное"
    >
      <Icon name='heart' size={24}/>
    </Link>
  );
};