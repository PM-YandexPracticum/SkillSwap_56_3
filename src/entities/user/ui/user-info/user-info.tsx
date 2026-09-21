import { UserInfoProps } from './type'
import style from './user-info.module.css'

export const UserInfo = (props: UserInfoProps) => {
  const initial = props.name.trim().charAt(0).toLocaleUpperCase('ru-RU') || '?'

  return (
    <div className={style.userInfo}>
      <div className={style.avatar}>
        {props.avatarUrl ? (
          <img
            className={style.avatarImage}
            src={props.avatarUrl}
            alt={`Аватар пользователя ${props.name}`}
          />
        ) : (
          <span
            className={style.avatarFallback}
            role="img"
            aria-label={`Аватар пользователя ${props.name}`}
          >
            {initial}
          </span>
        )}
      </div>
      <div className={style.info}>
        <p className={style.name}>{props.name}</p>
        <p className={style.details}>
          {`${props.city}, ${(props.age)}`} {/*Добавить сюда обработку возраста вместо props.age */}
        </p>
      </div>
    </div>
  )
}
