import { useState, useRef, useEffect } from 'react';
import styles from './base-popover.module.css';
import { BasePopoverProps } from './type';

export const BasePopover = ({ trigger, children }: BasePopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (contentRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      close();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div ref={triggerRef} className={styles.trigger}>
        {trigger({ isOpen, toggle })}
      </div>

      {isOpen && (
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      )}
    </>
  );
};