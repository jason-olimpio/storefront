'use client'

import { FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useTranslations, useLocale } from 'next-intl'
import { z } from 'zod'

import { useRouter } from '@/i18n/navigation'
import { useForm, useSnackbarState } from '@/hooks'

import { registerUser, loginUser } from '@/api/services'
import { setAuthState, RootState } from '@/store'
import { setTokens } from '@/utils'
import {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  DEFAULT_USER_EMAIL,
  DEFAULT_USER_PASSWORD
} from '@/components/auth/constants'

type UseAuthFormProps = {
  isRegister: boolean
  schema: z.ZodType<any>
  initialData: any
}

export const useAuthForm = ({
  isRegister,
  schema,
  initialData
}: UseAuthFormProps) => {
  const translations = useTranslations(isRegister ? 'Register' : 'Login')
  const dispatch = useDispatch()
  const router = useRouter()
  const locale = useLocale()

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  const { formData, errors, handleChange, validate, setFormData } = useForm(
    schema,
    initialData
  )

  const { snackbar, show, close } = useSnackbarState()

  useEffect(() => {
    if (isAuthenticated) router.replace('/', { locale })
  }, [isAuthenticated, router, locale])

  const mutation = useMutation({
    mutationFn: (data: any) =>
      isRegister ? registerUser(data) : loginUser(data),
    onSuccess: ({ accessToken, refreshToken }) => {
      if (!accessToken || !refreshToken) return

      setTokens(String(accessToken), String(refreshToken))
      dispatch(setAuthState(true))

      router.push('/', { locale })
    },
    onError: (error: Error) =>
      show({
        message: translations(error.message),
        variant: 'error'
      })
  })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!validate()) {
      close()
      return
    }

    mutation.mutate(formData)
  }

  const fillAdminCredentials = () =>
    setFormData({
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASSWORD
    })

  const fillUserCredentials = () =>
    setFormData({
      email: DEFAULT_USER_EMAIL,
      password: DEFAULT_USER_PASSWORD
    })

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    snackbar,
    closeSnackbar: close,
    isPending: mutation.isPending,
    fillAdminCredentials,
    fillUserCredentials,
    isAuthenticated
  }
}
