import { ROUTES } from '@/shared/lib/constants';
import { Link } from 'react-router-dom';
import { Icon } from '../icon/Icon';

export const FavouritesLink = () => {
  return (
    <Link
      to={ROUTES.FAVORITES}
      aria-label="Избранное"
    >
      <Icon name='heart' size={24}/>
    </Link>
  );
};