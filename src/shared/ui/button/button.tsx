import styles from './button.module.css';
import { ButtonProps } from './type';

export const Button = ({
  onClick,
  children,
  type = 'button',
  extraClass = '',
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${extraClass}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
