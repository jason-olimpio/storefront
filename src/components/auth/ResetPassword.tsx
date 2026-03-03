'use client'

import { useTranslations } from 'next-intl'

import { ComponentProps } from 'react'
import { useMutation } from '@tanstack/react-query'

import { z } from 'zod'

import { useRouter } from '@/i18n/navigation'

import { useForm, useSnackbarState } from '@/hooks'
import { resetPassword } from '@/api/services'
import { Input, Snackbar, SubmitButton } from '@/components'
import { ResetData } from './form/AuthForm'

type ResetPasswordProps = {
  resetData: ResetData
  onSuccess: () => void
}
const ResetPassword = ({ resetData, onSuccess }: ResetPasswordProps) => {
  const { email, token } = resetData
  const translations = useTranslations('ResetPassword')
  const registerTranslations = useTranslations('Register')
  const router = useRouter()

  const schema = z.object({
    password: z
      .string()
      .min(8, registerTranslations('passwordLength'))
      .regex(/[A-Z]/, registerTranslations('passwordUppercase'))
      .regex(/\d/, registerTranslations('passwordNumber'))
      .regex(/[^a-zA-Z0-9]/, registerTranslations('passwordSpecial')),
    confirmPassword: z.string()
  })

  const { formData, errors, handleChange, validate, setErrors } = useForm(
    schema,
    { password: '', confirmPassword: '' }
  )
  const { password, confirmPassword } = formData

  const { snackbar, show, close } = useSnackbarState()

  const mutation = useMutation({
    mutationFn: () =>
      resetPassword({ email, resetCode: token, newPassword: password }),
    onSuccess: messageKey => {
      show({
        message: translations(messageKey),
        variant: 'success'
      })

      setTimeout(onSuccess, 3000)
    },
    onError: (error: Error) =>
      show({
        message: translations(error.message),
        variant: 'error'
      })
  })

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async event => {
    event.preventDefault()

    if (!validate()) return

    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: translations('passwordMismatch')
      })
      return
    }

    mutation.mutate()
  }

  if (!token || !email) {
    router.push('/')
    return
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <Input
          label={translations('newPassword')}
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          required
          minLength={6}
          maxLength={20}
          error={errors.password}
          className="mb-4"
        />

        <Input
          label={translations('confirmPassword')}
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          required
          minLength={6}
          maxLength={20}
          error={errors.confirmPassword}
        />

        <SubmitButton
          label={translations('resetPassword')}
          className="mt-8"
          disabled={mutation.isPending}
        />
      </form>

      <Snackbar {...snackbar} onClose={close} />
    </div>
  )
}

export default ResetPassword
