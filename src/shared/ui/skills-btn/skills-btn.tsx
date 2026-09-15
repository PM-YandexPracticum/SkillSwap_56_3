import { useState } from 'react';
import { SkillsPopover } from '../skills-popover';
import styles from './skills-btn.module.css';
import { SkillsBtnProps } from './type';

export const SkillsBtn = ({categories}: SkillsBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!categories || categories.length === 0) {
    throw new Error(
      'В приложение сюда нужно передавать meta.categories meta справочника.'
    );
  }

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span className={styles.buttonText}>Все навыки</span>
        <img
          src='src/icons/arrow.svg'
          className={`${styles.buttonIcon} ${isOpen ? styles.buttonIconOpen : ''}`}
        />
      </button>

      <SkillsPopover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        categories={categories}
      />
    </div>
  );
};