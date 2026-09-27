import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectUsers } from '@/entities/user/model/usersSelectors';
import { UserCard } from '@/shared/ui/user-card';
import type { RecommendedSectionProps } from './type';
import styles from './recommended-section.module.css';

function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

export const RecommendedSection = ({
  extraClass = '',
}: RecommendedSectionProps) => {
  const users = useAppSelector(selectUsers);
  const [shuffledIds, setShuffledIds] = useState<string[]>([]);

  useEffect(() => {
    if (users.length > 0 && shuffledIds.length === 0) {
      const ids = users.map((u) => u.id);
      setShuffledIds(shuffleArray(ids));
    }
  }, [users, shuffledIds.length]);

  if (!users.length || !shuffledIds.length) {
    return null;
  }

  const usersMap = new Map(users.map((u) => [u.id, u]));
  const orderedUsers = shuffledIds
    .map((id) => usersMap.get(id))
    .filter((user): user is NonNullable<typeof user> => Boolean(user));

  return (
    <section className={`${styles.section} ${extraClass}`.trim()}>
      <h2 className={styles.title}>Рекомендуем</h2>
      <div className={styles.grid}>
        {orderedUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            isCatalog
          />
        ))}
      </div>
    </section>
  );
};