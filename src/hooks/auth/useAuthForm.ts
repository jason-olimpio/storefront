'use client'

import type { ComponentProps } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import z from 'zod'
import { useRouter } from '@/i18n/navigation'

import { useForm, useSnackbarState } from '@/hooks'

import { setAuthState, type RootState } from '@/store'

import useAuthMutation from './useAuthMutation'

import { AuthFormData, AuthMode } from '@/components/auth'

import {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  DEFAULT_USER_EMAIL,
  DEFAULT_USER_PASSWORD
} from '@/components/auth/constants'

import { setTokens } from '@/utils'

type UseAuthFormProps<TForm extends AuthFormData> = {
  mode: AuthMode
  schema: z.ZodType<TForm>
  initialData: TForm
}

const useAuthForm = <TForm extends AuthFormData>({
  mode,
  schema,
  initialData
}: UseAuthFormProps<TForm>) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  const { formData, errors, handleChange, validate, setFormData } = useForm(
    schema,
    initialData
  )

  const { snackbar, show, close } = useSnackbarState()

  const mutation = useAuthMutation(mode, {
    onSuccess: ({ accessToken, refreshToken }) => {
      setTokens(accessToken, refreshToken)
      dispatch(setAuthState(true))
      router.replace('/')
    },
    onErrorMessage: message =>
      show({
        message,
        variant: 'error'
      })
  })

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = event => {
    event.preventDefault()

    if (!validate()) {
      close()
      return
    }

    mutation.mutate(formData)
  }

  const fillAdminCredentials = () =>
    setFormData({
      ...formData,
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASSWORD
    })

  const fillUserCredentials = () =>
    setFormData({
      ...formData,
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
    isAuthenticated,
    setFormData
  }
}

export default useAuthForm
