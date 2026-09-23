import styles from './skills-popover-content.module.css';
import { SkillsPopoverContentProps } from './type';

const CATEGORY_COLORS: Record<string, string> = {
  'business-career': '#EEE7F7',
  'creativity-art': '#F7E7F2',
  'foreign-languages': '#EBE5C5',
  'education-development': '#E7F2F6',
  'home-comfort': '#F7EBE5',
  'health-lifestyle': '#E9F7E7',
};

export const SkillsPopoverContent = ({ categories }: SkillsPopoverContentProps) => {
  return (
    <div className={styles.content}>
      {categories.map((cat) => (
        <div key={cat.id} className={styles.category}>
          <div
            className={styles.iconWrapper}
            style={{ backgroundColor: CATEGORY_COLORS[cat.id] ?? '#f0f0f0' }}
          >
            <img className={styles.icon} src={cat.icon} alt={cat.name} />
          </div>
          <div className={styles.categoryContent}>
            <span className={styles.categoryName}>{cat.name}</span>
            <ul className={styles.subcategoryList}>
              {cat.subcategories.map((sub) => (
                <li key={sub.id} className={styles.subcategoryItem}>
                  {sub.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};