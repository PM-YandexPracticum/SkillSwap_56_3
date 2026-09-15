import { BasePopover } from '../base-popover/base-popover';
import { SkillsPopoverContent } from './skills-popover-content/skills-popover-content';
import styles from './skills-popover.module.css';
import { SkillsPopoverProps } from './type';

export const SkillsPopover = ({ categories }: SkillsPopoverProps) => {
  return (
    <BasePopover
      trigger={({ isOpen, toggle }) => (
        <button
          type="button"
          className={styles.button}
          onClick={toggle}
        >
          <span className={styles.buttonText}>Все навыки</span>
          <img
            src="src/icons/arrow.svg"
            alt=""
            className={`${styles.buttonIcon} ${isOpen ? styles.buttonIconOpen : ''}`}
          />
        </button>
      )}
    >
      <SkillsPopoverContent categories={categories} />
    </BasePopover>
  );
};