import { UserCard } from '@/shared/ui/user-card';
import { SkillCard } from '@/widgets/skill-card';

import type { SkillDetailsSectionProps } from './type';
import styles from './skill-details-section.module.css';

export const SkillDetailsSection = ({
  skill,
  author,
}: SkillDetailsSectionProps) => {
  return (
    <section className={styles.section}>
      <aside className={styles.author}>
        <UserCard
          user={author}
          isCatalog={false}
        />
      </aside>

      <SkillCard
        skill={skill}
        extraClass={styles.skillCard}
      />
    </section>
  );
};
