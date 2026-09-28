import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectPopular } from '@/entities/user/model/usersSelectors';
import { UserCard } from '@/shared/ui/user-card';
import { ShowAllButton } from '@/shared/ui/show-all-button';
import type { PopularSectionProps } from './type';
import styles from './popular-section.module.css';

const INITIAL_LIMIT = 3;
const EXPANDED_LIMIT = 9;

export const PopularSection = ({
  extraClass = '',
}: PopularSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const users = useAppSelector(selectPopular);

  if (!users.length) {
    return null;
  }

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const limit = isExpanded ? EXPANDED_LIMIT : INITIAL_LIMIT;
  const visibleUsers = users.slice(0, limit);
  const showButton = users.length > INITIAL_LIMIT;

  return (
    <section className={`${styles.section} ${extraClass}`.trim()}>
      <div className={styles.header}>
        <h2 className={styles.title}>Популярное</h2>
        {showButton && (
          <ShowAllButton
            expanded={isExpanded}
            onClick={handleToggle}
          />
        )}
      </div>

      <div className={styles.grid}>
        {visibleUsers.map((user) => (
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