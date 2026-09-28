import style from './info-block.module.css'
import { InfoBlockProps } from './type'

export const InfoBlock = ({ title, image, description }: InfoBlockProps) => {
  return (
    <div className={style.content}>
      <div className={style.image}>{image}</div>

      <h1 className={style.title}>{title}</h1>

      <p className={style.description}>{description}</p>
    </div>
  )
}
