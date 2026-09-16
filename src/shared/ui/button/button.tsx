import styles from './button.module.css';
import { ButtonProps } from './type';

export const Button = ({
  onClick,
  text,
  type = 'button',
  extraClass = '',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${extraClass}`.trim()}
    >
      {text}
    </button>
  );
};