import { useRef, useEffect } from 'react';
import styles from './skills-popover.module.css';
import { SkillsPopoverProps } from './type';
import '../../../fonts/fonts.css';

const CATEGORY_COLORS: Record<string, string> = {
  'business-career': '#EEE7F7',
  'creativity-art': '#F7E7F2',
  'foreign-languages': '#EBE5C5',
  'education-development': '#E7F2F6',
  'home-comfort': '#F7EBE5',
  'health-lifestyle': '#E9F7E7',
};

export const SkillsPopover = ({ isOpen, onClose, categories }: SkillsPopoverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={ref} className={styles.popover}>
      {categories.map((cat) => (
        <div key={cat.id} className={styles.category}>
          <div className={styles.iconWrapper} style={{ backgroundColor: CATEGORY_COLORS[cat.id] ?? '#f0f0f0' }}>
            <img className={styles.icon} src={cat.icon} alt={cat.name} />
          </div>
          <div className={styles.content}>
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
