import { Link } from 'react-router-dom';
import styles from './favourites-link.module.css';

export const FavouritesLink = () => {
  return (
    <Link
      to="/profile/favourites"
      className={styles.link}
      aria-label="Избранное"
    >
      {/*ЗАМЕНИТЬ НА ICON*/}
      <img className={styles.icon} src='src/icons/like.svg'/>
    </Link>
  );
};