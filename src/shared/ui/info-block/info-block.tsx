import styles from './info-block.module.css';
import { InfoBlockProps } from './type';


export const InfoBlock = ({
  image,
  title,
  description,
  extraclass = '',
}: InfoBlockProps) => {
  return (
    <div className={`${styles.content} ${extraclass}`}>
      <div className={styles.image}>{image}</div>

      <h2 className={styles.title}>{title}</h2>

      <p className={styles.description}>{description}</p>
    </div>
  );
};
