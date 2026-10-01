import { useState } from 'react';
import { Icon } from '@/shared/ui/icon/Icon';
import type { ImageCarouselProps } from './type';
import styles from './image-carousel.module.css';

export const ImageCarousel = ({
  images,
  alt = 'Фотография',
  maxThumbnails = 3,
  extraclass = '',
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={`${styles.placeholder} ${extraclass}`.trim()}>
        <Icon name="image-placeholder" size={48} />
        <span className={styles.placeholderText}>Нет изображений</span>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const visibleThumbnails = images.slice(0, maxThumbnails);
  const remainingCount = images.length - maxThumbnails;

  return (
    <div className={`${styles.container} ${extraclass}`.trim()}>
      <div className={styles.mainWrapper}>
        <img
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          className={styles.mainImage}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className={`${styles.arrowButton} ${styles.arrowLeft}`}
              aria-label="Предыдущее фото"
            >
              <Icon name="chevron-left" size={24} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className={`${styles.arrowButton} ${styles.arrowRight}`}
              aria-label="Следующее фото"
            >
              <Icon name="chevron-right" size={24} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnailsCol}>
          {visibleThumbnails.map((img, idx) => {
            const isLast = idx === maxThumbnails - 1 && remainingCount > 0;
            const isActive = currentIndex === idx;

            return (
              <button
                key={img + idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`${styles.thumbItem} ${isActive ? styles.activeThumb : ''}`}
                aria-label={`Перейти к фото ${idx + 1}`}
              >
                <img src={img} alt={`Миниатюра ${idx + 1}`} className={styles.thumbImage} />
                {isLast && (
                  <div className={styles.moreOverlay}>
                    +{remainingCount}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};