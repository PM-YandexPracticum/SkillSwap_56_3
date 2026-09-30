import { useState, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectUser,
  selectAuthLoading,
  selectAuthError,
  selectDraftErrors,
} from '@/features/auth/model/authSelectors'
import { updateUserProfile } from '@/features/auth/model/authThunks'
import { setDraftErrors } from '@/features/auth/model/authSlice'
import { UserPanel } from '@/widgets/user-panel'
import { Avatar } from '@/shared/ui/avatar'
import { Input } from '@/shared/ui/input'
import { DatePicker } from '@/shared/ui/date-picker/DatePicker'
import { GenderSelect } from '@/shared/ui/gender-select'
import { CitySelect } from '@/shared/ui/city-select'
import { PasswordInput } from '@/shared/ui/password-input'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import type { GenderValue } from '@/shared/ui/gender-select/type'
import styles from './profile-page.module.css'
import { getAuthUser } from '@/features/auth/model/authUtils'
import { selectAuthState } from '@/features/auth/model/authSelectors'

export default function ProfilePage() {
  const dispatch = useAppDispatch()

  const user = getAuthUser()
  const isLoading = useAppSelector(selectAuthLoading)
  const authError = useAppSelector(selectAuthError)
  const errors = useAppSelector(selectDraftErrors)

  // ─── Поля формы ────────────────────────────────────────
  const [email, setEmail] = useState(user?.email ?? '')
  const [name, setName] = useState(user?.name ?? '')
  const [birthDate, setBirthDate] = useState(user?.birthDate ?? '')
  const [gender, setGender] = useState<GenderValue | null>(user?.gender ?? null)
  const [city, setCity] = useState(user?.city ?? '')
  const [aboutMe, setAboutMe] = useState(user?.aboutMe ?? '')
  const [avatar, setAvatar] = useState(user?.avatar ?? '')

  // ─── Пароль ────────────────────────────────────────────
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const authState = useAppSelector(selectAuthState)

  // ─── Есть ли изменения ─────────────────────────────────
  const hasChanges = useMemo(() => {
    if (!user) return false
    return (
      email !== user.email ||
      name !== user.name ||
      birthDate !== user.birthDate ||
      gender !== user.gender ||
      city !== user.city ||
      aboutMe !== user.aboutMe ||
      avatar !== user.avatar ||
      (isChangingPassword && (oldPassword !== '' || newPassword !== ''))
    )
  }, [
    user,
    email,
    name,
    birthDate,
    gender,
    city,
    aboutMe,
    avatar,
    isChangingPassword,
    oldPassword,
    newPassword,
  ])

  if (!user) return null

  // ─── Аватар ────────────────────────────────────────────
  const handleAvatarChange = (file: File) => {
    const url = URL.createObjectURL(file)
    setAvatar(url)
  }

  // ─── Сохранение ────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (!hasChanges || isLoading) return

  // ─── Логируем текущий стейт auth ───────────────────────
  console.log('auth state before save:', {
    user,
    errors,
    isLoading,
  })

  const payload = {
    name,
    email,
    birthDate,
    gender,
    city,
    aboutMe,
    avatar,
    ...(isChangingPassword && (oldPassword || newPassword)
      ? { oldPassword, newPassword }
      : {}),
  }

  console.log('payload to send:', authState)

  dispatch(updateUserProfile(payload))
}

  // ─── Отмена смены пароля ───────────────────────────────
  const handleCancelPassword = () => {
    setIsChangingPassword(false)
    setOldPassword('')
    setNewPassword('')
    dispatch(setDraftErrors({}))
  }

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        {/* ─── Слева: разделы ──────────────────────── */}
        <UserPanel />

        {/* ─── Справа: форма ───────────────────────── */}
        <form className={styles.content} onSubmit={handleSubmit} noValidate>
          <h1 className={styles.title}>Личные данные</h1>

          <div className={styles.grid}>
            {/* ─── Аватар ──────────────────────────── */}
            <div className={styles.avatarCol}>
              <Avatar
                src={avatar}
                alt={`Аватар ${name}`}
                size={160}
                onChange={handleAvatarChange}
              />
            </div>

            {/* ─── Поля ────────────────────────────── */}
            <div className={styles.fields}>
              <Input
                label="Почта"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />

              <Input
                label="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
              />

              <DatePicker
                label="Дата рождения"
                value={birthDate ? new Date(birthDate) : null}
                onChange={(date) =>
                  setBirthDate(date ? date.toISOString() : '')
                }
              />

              <GenderSelect
                value={gender}
                onChange={(v) => setGender(v)}
                error={errors.gender}
              />

              <CitySelect
                value={city}
                onChange={(v) => setCity(v ?? '')}
                error={errors.city}
              />

              <Textarea
                label="О себе"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              />

              {/* ─── Смена пароля ────────────────────── */}
              {!isChangingPassword ? (
                <Button
                  type="button"
                  onClick={() => setIsChangingPassword(true)}
                  extraClass={styles.changePassword}
                >
                  Изменить пароль
                </Button>
              ) : (
                <div className={styles.passwordBlock}>
                  <PasswordInput
                    label="Текущий пароль"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    error={errors.oldPassword}
                  />

                  <PasswordInput
                    label="Новый пароль"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={errors.newPassword}
                  />

                  <Button
                    type="button"
                    onClick={handleCancelPassword}
                    extraClass={styles.cancelPassword}
                  >
                    Отмена
                  </Button>
                </div>
              )}

              {/* ─── Общая ошибка ────────────────────── */}
              {errors.form && <p className={styles.error}>{errors.form}</p>}
              {authError && <p className={styles.error}>{authError}</p>}

              {/* ─── Сохранить ───────────────────────── */}
              <Button
                type="submit"
                disabled={!hasChanges || isLoading}
                extraClass={styles.submit}
              >
                {isLoading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}