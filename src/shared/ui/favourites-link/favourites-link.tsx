import { Link } from 'react-router-dom';

export const FavouritesLink = () => {
  return (
    <Link
      to="/profile/favourites"
      aria-label="Избранное"
    >
      {/*ЗАМЕНИТЬ НА ICON*/}
      <img src='src/icons/like.svg'/>
    </Link>
  );
};