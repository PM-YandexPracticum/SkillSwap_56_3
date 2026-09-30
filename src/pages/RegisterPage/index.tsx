import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  updateDraft,
  setDraftErrors,
} from '@/features/auth/model/authSlice'
import { register } from '@/features/auth/model/authThunks'
import {
  selectRegistrationDraft,
  selectDraftErrors,
  selectAuthLoading,
  selectIsAuthenticated,
} from '@/features/auth/model/authSelectors'
import { selectMeta } from '@/entities/user/model/usersSelectors'
import {
  validateStep1AndLogin,
  validateStep2,
  validateStep3,
  hasErrors,
} from '@/features/auth/lib/validation'
import { RegisterStep1 } from '@/widgets/register/register-step-1'
import { RegisterStep2 } from '@/widgets/register/register-step-2'
import { RegisterStep3 } from '@/widgets/register/register-step-3'
import { SkillPreview } from '@/widgets/register/skill-preview/skill-preview'
import { SuccessModal } from '@/widgets/success-modal/success-modal'

export default function RegisterPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const draft = useAppSelector(selectRegistrationDraft)
  const errors = useAppSelector(selectDraftErrors)
  const isLoading = useAppSelector(selectAuthLoading)
  const isAuth = useAppSelector(selectIsAuthenticated)
  const meta = useAppSelector(selectMeta)

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const handleFieldChange = (patch: Record<string, unknown>) => {
    dispatch(updateDraft(patch))
  }

  const handleAvatarChange = (file: File) => {
    const url = URL.createObjectURL(file)
    dispatch(updateDraft({ avatar: url }))
  }

  const handleNext = () => {
    let nextErrors = {}
    if (step === 1) nextErrors = validateStep1AndLogin(draft)
    if (step === 2) nextErrors = validateStep2(draft)
    if (step === 3) nextErrors = validateStep3(draft)

    dispatch(setDraftErrors(nextErrors))
    if (hasErrors(nextErrors)) return

    if (step < 3) setStep((s) => (s + 1) as 1 | 2 | 3)
  }

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as 1 | 2 | 3)
  }

  const handleOpenPreview = () => {
    const nextErrors = validateStep3(draft)
    dispatch(setDraftErrors(nextErrors))
    if (hasErrors(nextErrors)) return

    setIsPreviewOpen(true)
  }

  const handleEdit = () => {
    setIsPreviewOpen(false)
  }

  const handleConfirm = () => {
    dispatch(register(draft))
  }

  useEffect(() => {
    if (isAuth) {
      setIsPreviewOpen(false)
      setIsSuccessOpen(true)
    }
  }, [isAuth])

  const handleSuccessDone = () => {
    setIsSuccessOpen(false)
    navigate('/')
  }

  if (!meta) return null

  return (
    <>
      {step === 1 && (
        <RegisterStep1
          values={{ email: draft.email, password: draft.password }}
          errors={errors}
          onFieldChange={handleFieldChange}
          onNext={handleNext}
        />
      )}

      {step === 2 && (
        <RegisterStep2
          values={{
            avatar: draft.avatar,
            name: draft.name,
            birthDate: draft.birthDate,
            gender: draft.gender,
            city: draft.city,
            learnSelections: draft.learnSelections,
          }}
          errors={errors}
          categories={meta.categories}
          onFieldChange={handleFieldChange}
          onAvatarChange={handleAvatarChange}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}

      {step === 3 && (
        <RegisterStep3
          values={{
            teachSkillName: draft.teachSkillName,
            teachSelections: draft.teachSelections,
            teachDescription: draft.teachDescription,
            teachImages: draft.teachImages,
          }}
          errors={errors}
          categories={meta.categories}
          onFieldChange={handleFieldChange}
          onBack={handleBack}
          onOpenPreview={handleOpenPreview}
          isLoading={isLoading}
        />
      )}

      <SkillPreview
        isOpen={isPreviewOpen}
        values={{
          teachSkillName: draft.teachSkillName,
          teachSelections: draft.teachSelections,
          teachDescription: draft.teachDescription,
          teachImages: draft.teachImages,
        }}
        onEdit={handleEdit}
        onConfirm={handleConfirm}
        isLoading={isLoading}
      />

      <SuccessModal isOpen={isSuccessOpen} onDone={handleSuccessDone} />
    </>
  )
}