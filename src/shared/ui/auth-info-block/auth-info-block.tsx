import styles from './auth-info-block.module.css';
import { AuthInfoBlockProps } from './type';


export const AuthInfoBlock = ({
  image,
  title,
  description,
  extraClass = '',
}: AuthInfoBlockProps) => {
  return (
    <div className={`${styles.content} ${extraClass}`}>
      <div className={styles.image}>{image}</div>

      <h2 className={styles.title}>{title}</h2>

      <p className={styles.description}>{description}</p>
    </div>
  );
};
