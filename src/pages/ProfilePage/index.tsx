import { useState, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectAuthLoading,
  selectAuthError,
  selectDraftErrors,
} from '@/features/auth/model/authSelectors'
import { updateUserProfile } from '@/features/auth/model/authThunks'
import { setDraftErrors } from '@/features/auth/model/authSlice'
import { UserPanel } from '@/widgets/user-panel'
import { Avatar } from '@/shared/ui/avatar'
import { DatePicker } from '@/shared/ui/date-picker/DatePicker'
import { GenderSelect } from '@/shared/ui/gender-select'
import { CitySelect } from '@/shared/ui/city-select'
import { PasswordInput } from '@/shared/ui/password-input'
import { Button } from '@/shared/ui/button'
import type { GenderValue } from '@/shared/ui/gender-select/type'
import styles from './profile-page.module.css'
import { getAuthUser } from '@/features/auth/model/authUtils'
import { MainHeader } from '@/widgets/header/ui'
import { Footer } from '@/widgets/footer'
import { EmailInput, NameInput } from '@/shared/ui/form-inputs'
import { AboutTextarea } from '@/shared/ui/form-textareas'
import { Icon } from '@/shared/ui/icon'

export default function ProfilePage() {
  const dispatch = useAppDispatch()

  const user = getAuthUser()
  const isLoading = useAppSelector(selectAuthLoading)
  const authError = useAppSelector(selectAuthError)
  const errors = useAppSelector(selectDraftErrors)

  const [email, setEmail] = useState(user?.email ?? '')
  const [name, setName] = useState(user?.name ?? '')
  const [birthDate, setBirthDate] = useState(user?.birthDate ?? '')
  const [gender, setGender] = useState<GenderValue | null>(user?.gender ?? null)
  const [city, setCity] = useState(user?.city ?? '')
  const [aboutMe, setAboutMe] = useState(user?.aboutMe ?? '')
  const [avatar, setAvatar] = useState(user?.avatar ?? '')

  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const clearFieldError = (field: string) => {
    if (!errors[field]) return
    const next = { ...errors }
    delete next[field]
    dispatch(setDraftErrors(next))
  }

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

  const handleAvatarChange = (url: string) => {
    setAvatar(url)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!hasChanges || isLoading) return

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

    dispatch(updateUserProfile(payload))
  }

  const handleCancelPassword = () => {
    setIsChangingPassword(false)
    setOldPassword('')
    setNewPassword('')
    clearFieldError('oldPassword')
    clearFieldError('newPassword')
  }

  return (
    <>
      <MainHeader />
      <main className={styles.page}>
        <UserPanel />
        <form className={styles.content} onSubmit={handleSubmit} noValidate>
          <div className={styles.container}>
            <div className={styles.fields}>
              <EmailInput
                label="Почта"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearFieldError('email')
                }}
                error={errors.email}
                icon={<Icon name="pencil" />}
              />

              {!isChangingPassword ? (
                <Button
                  type="button"
                  onClick={() => setIsChangingPassword(true)}
                  extraclass={styles.changePassword}
                >
                  Изменить пароль
                </Button>
              ) : (
                <div className={styles.passwordBlock}>
                  <PasswordInput
                    label="Текущий пароль"
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value)
                      clearFieldError('oldPassword')
                    }}
                    error={errors.oldPassword}
                  />

                  <PasswordInput
                    label="Новый пароль"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value)
                      clearFieldError('newPassword')
                    }}
                    error={errors.newPassword}
                  />

                  <Button
                    type="button"
                    onClick={handleCancelPassword}
                    extraclass={styles.cancelPassword}
                  >
                    Отмена
                  </Button>
                </div>
              )}

              <NameInput
                label="Имя"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  clearFieldError('name')
                }}
                error={errors.name}
                icon={<Icon name="pencil" />}
              />

              <div className={styles.fieldsContainer}>
                <DatePicker
                  label="Дата рождения"
                  value={birthDate ? new Date(birthDate) : null}
                  onChange={(date) => {
                    setBirthDate(date ? date.toISOString() : '')
                    clearFieldError('birthDate')
                  }}
                />

                <GenderSelect
                  value={gender}
                  onChange={(v) => {
                    setGender(v)
                    clearFieldError('gender')
                  }}
                  error={errors.gender}
                />
              </div>

              <CitySelect
                value={city}
                onChange={(v) => {
                  setCity(v ?? '')
                  clearFieldError('city')
                }}
                error={errors.city}
              />

              <AboutTextarea
                label="О себе"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                icon={<Icon name="pencil" />}
              />

              {errors.form && <p className={styles.error}>{errors.form}</p>}
              {authError && <p className={styles.error}>{authError}</p>}

              <Button
                type="submit"
                disabled={!hasChanges || isLoading || Object.keys(errors).length > 0}
                extraclass={styles.submit}
              >
                {isLoading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </div>

            <div className={styles.avatarCol}>
              <Avatar
                src={avatar}
                alt={`Аватар ${name}`}
                size={244}
                onChange={handleAvatarChange}
              />
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}