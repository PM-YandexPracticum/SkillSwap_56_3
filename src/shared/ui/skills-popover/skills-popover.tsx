import { BasePopover } from '../base-popover/base-popover';
import { SkillsPopoverContent } from './skills-popover-content/skills-popover-content';
import styles from './skills-popover.module.css';
import { SkillsPopoverProps } from './type';
import { Button } from '../button';

export const SkillsPopover = ({ categories }: SkillsPopoverProps) => {
  return (
    <BasePopover
      trigger={({ isOpen, toggle }) => (
        <Button
          type="button"
          extraClass={styles.button}
          onClick={toggle}
        >
          <span className={styles.buttonText}>Все навыки</span>
          <img
            src="src/icons/arrow.svg"
            alt=""
            className={`${styles.buttonIcon} ${isOpen ? styles.buttonIconOpen : ''}`}
          />
        </Button>
      )}
    >
      <SkillsPopoverContent categories={categories} />
    </BasePopover>
  );
};