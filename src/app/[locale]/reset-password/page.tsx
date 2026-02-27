'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { FormEvent, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { z } from 'zod'

import { useRouter } from '@/i18n/navigation'
import { useForm } from '@/hooks'

import { resetPassword } from '@/api/services'

import { Input, Snackbar, SubmitButton } from '@/components'

const ResetPassword = () => {
  const translations = useTranslations('ResetPassword')
  const registerTranslations = useTranslations('Register')

  const router = useRouter()
  const searchParams = useSearchParams()
  const locale = useLocale()

  const token = searchParams.get('token')
  const email = searchParams.get('email')

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

  const [snackbar, setSnackbar] = useState<{
    message: string
    open: boolean
    variant: 'success' | 'error' | 'info'
  }>({
    message: '',
    open: false,
    variant: 'error'
  })

  useEffect(() => {
    if (!token || !email) router.push('/', { locale })
  }, [token, email, router, locale])

  const mutation = useMutation({
    mutationFn: ({
      email,
      token,
      password
    }: {
      token: string
      email: string
      password: string
    }) => resetPassword({ email, resetCode: token, newPassword: password }),
    onSuccess: messageKey => {
      setSnackbar({
        message: translations(messageKey),
        open: true,
        variant: 'success'
      })

      setTimeout(() => router.push('/', { locale }), 3000)
    },
    onError: (error: Error) =>
      setSnackbar({
        message: translations(error.message),
        open: true,
        variant: 'error'
      })
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!validate()) return

    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: translations('passwordMismatch')
      })

      return
    }

    if (!token || !email) {
      setSnackbar({
        message: translations('invalidResetLink'),
        open: true,
        variant: 'error'
      })
      return
    }

    mutation.mutate({
      token,
      email,
      password: password
    })
  }

  const handleSnackbarClose = () =>
    setSnackbar(previousState => ({ ...previousState, open: false }))

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

        <SubmitButton label={translations('resetPassword')} className="mt-8" />
      </form>

      <Snackbar {...snackbar} onClose={handleSnackbarClose} />
    </div>
  )
}

export default ResetPassword
