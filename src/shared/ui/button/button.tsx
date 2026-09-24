import styles from './button.module.css';
import { ButtonProps } from './type';

export const Button = ({
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${props.extraClass}`}
    >
      {props.children}
    </button>
  );
};