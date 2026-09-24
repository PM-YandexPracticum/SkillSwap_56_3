import { useAppSelector } from '@/store/hooks';
import { selectUsers } from '@/entities/user/model/usersSelectors';
import { UserCard } from '@/shared/ui/user-card';
import type { FavoritesSectionProps } from './type';
import styles from './favorites-section.module.css';

export const FavoritesSection = ({
  ids,
  extraClass = '',
}: FavoritesSectionProps) => {
  const allUsers = useAppSelector(selectUsers);
  const favoriteUsers = allUsers.filter((user) =>
    ids.map(String).includes(String(user.id))
  );

  return (
    <section className={`${styles.section} ${extraClass}`.trim()}>
      <h2 className={styles.title}>Избранное</h2>

      <div className={styles.grid}>
        {favoriteUsers.map((user) => (
            <UserCard key={user.id} user={user} isCatalog />
        ))}
      </div>
    </section>
  );
};